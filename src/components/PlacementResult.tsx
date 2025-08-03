import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Share2, RotateCcw, Wand2, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ApiService from '@/services/apiService';

interface Product {
  id: string;
  name: string;
  price: string;
  rating: number;
  image: string;
  link: string;
  source: string;
  description: string;
}

interface PlacementData {
  success: boolean;
  imageUrl: string;
  productImageUrl: string;
  overlayData: {
    position: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
    rotation: number;
    perspective: string;
    lighting: string;
    shadow: {
      blur: number;
      opacity: number;
      offsetX: number;
      offsetY: number;
      color?: string;
    };
    frameStyle: string;
    integration: string;
    backgroundRemoved: boolean;
  };
  confidence: number;
  message: string;
  processingSteps?: string[];
}

interface PlacementResultProps {
  originalRoom: string;
  selectedProduct: Product;
  onReset: () => void;
}

export const PlacementResult = ({ originalRoom, selectedProduct, onReset }: PlacementResultProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [placementData, setPlacementData] = useState<PlacementData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const apiService = ApiService.getInstance();

  const generatePlacement = async () => {
    setIsGenerating(true);
    setError(null);
    
    try {
      console.log('🎨 AI yerleştirme başlatılıyor...');
      
      // Yerleştirme verilerini hazırla
      const placementRequestData = {
        area: { x: 35, y: 25, width: 30, height: 25 },
        analysis: {
          style: 'Modern Minimalist',
          dominantColors: ['Mavi', 'Beyaz', 'Gri'],
          lightingType: 'Doğal Işık (Gündüz)'
        }
      };

      const response = await apiService.placeProduct(
        originalRoom,
        selectedProduct.image,
        placementRequestData
      );
      
      if (response.success && response.result) {
        setPlacementData(response.result);
        toast({
          title: "✅ Yerleştirme Tamamlandı!",
          description: response.result.message || "AI tabloyu mükemmel şekilde yerleştirdi!"
        });
      } else {
        throw new Error('Yerleştirme başarısız');
      }
      
    } catch (error) {
      console.error('Yerleştirme hatası:', error);
      setError('AI yerleştirme sırasında hata oluştu');
      toast({
        title: "❌ Yerleştirme Hatası",
        description: "Lütfen tekrar deneyin.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // Component mount olduğunda otomatik yerleştirme başlat
  useEffect(() => {
    generatePlacement();
  }, [originalRoom, selectedProduct]);

  const downloadResult = () => {
    if (!placementData) return;

    // Canvas oluştur ve composite image oluştur
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    const roomImg = new Image();
    roomImg.crossOrigin = 'anonymous';
    roomImg.onload = () => {
      canvas.width = roomImg.width;
      canvas.height = roomImg.height;
      
      // Oda görselini çiz
      ctx.drawImage(roomImg, 0, 0);
      
      // Tablo görselini overlay olarak çiz
      const productImg = new Image();
      productImg.crossOrigin = 'anonymous';
      productImg.onload = () => {
        const overlay = placementData.overlayData;
        const x = (overlay.position.x / 100) * canvas.width;
        const y = (overlay.position.y / 100) * canvas.height;
        const width = (overlay.position.width / 100) * canvas.width;
        const height = (overlay.position.height / 100) * canvas.height;
        
        // Gölge efekti
        ctx.shadowColor = 'rgba(0, 0, 0, ' + overlay.shadow.opacity + ')';
        ctx.shadowBlur = overlay.shadow.blur;
        ctx.shadowOffsetX = overlay.shadow.offsetX;
        ctx.shadowOffsetY = overlay.shadow.offsetY;
        
        // Tabloyu çiz
        ctx.drawImage(productImg, x, y, width, height);
        
        // Download link oluştur
        const link = document.createElement('a');
        link.download = 'ai-decor-result.png';
        link.href = canvas.toDataURL();
        link.click();
      };
      productImg.src = selectedProduct.image;
    };
    roomImg.src = originalRoom;

    toast({
      title: "📥 İndiriliyor",
      description: "Sonuç görseli indiriliyor..."
    });
  };

  const shareResult = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'AI Dekorasyon Sonucum',
          text: `${selectedProduct.name} tablom ile oda dekorasyonum!`,
          url: window.location.href
        });
      } catch (error) {
        console.log('Paylaşım hatası:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "🔗 Link Kopyalandı",
        description: "Sonuç linkini paylaşabilirsiniz"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">🎨 AI Yerleştirme Sonucu</h2>
        <p className="text-gray-300">
          Yapay zeka tabloyu odanıza mükemmel şekilde yerleştirdi
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Orijinal Oda */}
        <Card className="bg-gray-900/50 border-gray-700 p-4">
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            📷 Orijinal Oda
          </h3>
          <div className="relative rounded-lg overflow-hidden">
            <img 
              src={originalRoom} 
              alt="Orijinal Oda" 
              className="w-full h-64 object-cover"
            />
          </div>
        </Card>

        {/* AI Yerleştirme Sonucu */}
        <Card className="bg-gray-900/50 border-gray-700 p-4">
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <Wand2 className="h-5 w-5 text-purple-400" />
            AI Yerleştirme Sonucu
            {placementData && (
              <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                <CheckCircle className="h-3 w-3 mr-1" />
                Tamamlandı
              </Badge>
            )}
          </h3>
          
          <div className="relative rounded-lg overflow-hidden bg-gray-800">
            {isGenerating ? (
              <div className="w-full h-64 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
                  <p className="text-white font-semibold">🎨 Professional AI Yerleştirme</p>
                  <div className="mt-3 space-y-1 text-sm text-gray-300">
                                         <p className="animate-pulse">🔄 1/3: BRIA-RMBG-2.0 ile arka plan kaldırılıyor...</p>
                    <p className="animate-pulse">🔄 2/3: AI optimal pozisyon hesaplıyor...</p>
                    <p className="animate-pulse">🔄 3/3: Professional overlay hazırlanıyor...</p>
                  </div>
                  <div className="mt-4 text-xs text-gray-400">
                    Bu süreç 10-15 saniye sürebilir
                  </div>
                </div>
              </div>
            ) : error ? (
              <div className="w-full h-64 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-red-400 mb-2">❌ {error}</p>
                  <Button onClick={generatePlacement} variant="outline" size="sm">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Tekrar Dene
                  </Button>
                </div>
              </div>
            ) : placementData ? (
              <div className="relative w-full h-64">
                {/* Oda Arka Plan */}
                <img 
                  src={placementData.imageUrl} 
                  alt="Oda" 
                  className="w-full h-full object-cover"
                />
                
                {/* Tablo Overlay */}
                <div
                  className="absolute"
                  style={{
                    left: `${placementData.overlayData.position.x}%`,
                    top: `${placementData.overlayData.position.y}%`,
                    width: `${placementData.overlayData.position.width}%`,
                    height: `${placementData.overlayData.position.height}%`,
                    transform: `rotate(${placementData.overlayData.rotation}deg)`,
                    filter: `drop-shadow(${placementData.overlayData.shadow.offsetX}px ${placementData.overlayData.shadow.offsetY}px ${placementData.overlayData.shadow.blur}px rgba(0,0,0,${placementData.overlayData.shadow.opacity}))`,
                    transition: 'all 0.3s ease'
                  }}
                >
                  <img 
                    src={placementData.productImageUrl || selectedProduct.image} 
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover rounded-sm"
                    style={{
                      transform: placementData.overlayData.perspective === 'slight-right' ? 'perspective(500px) rotateY(-2deg)' : 'none'
                    }}
                  />
                  
                  {/* Çerçeve efekti */}
                  <div 
                    className="absolute inset-0 border-2 border-gray-700/50 rounded-sm"
                    style={{
                      boxShadow: 'inset 0 0 10px rgba(0,0,0,0.3)'
                    }}
                  />
                </div>
                
                {/* Güven skoru */}
                <div className="absolute top-2 right-2">
                  <Badge className="bg-green-500/90 text-white">
                    {Math.round(placementData.confidence * 100)}% Uyum
                  </Badge>
                </div>
              </div>
            ) : null}
          </div>
        </Card>
      </div>

             {/* Aksiyon Butonları */}
       {placementData && (
         <div className="flex flex-wrap gap-3 justify-center">
           <Button onClick={downloadResult} className="bg-blue-600 hover:bg-blue-700">
             <Download className="h-4 w-4 mr-2" />
             İndir
           </Button>
           
           <Button onClick={shareResult} variant="outline">
             <Share2 className="h-4 w-4 mr-2" />
             Paylaş
           </Button>
           
           <Button onClick={generatePlacement} variant="outline">
             <RotateCcw className="h-4 w-4 mr-2" />
             Yeni Deneme
           </Button>
           
           <Button onClick={onReset} variant="outline">
             Yeni Oda
           </Button>
         </div>
       )}
    </div>
  );
};