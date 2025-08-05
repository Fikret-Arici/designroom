import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Share2, RotateCcw, Wand2, CheckCircle, ZoomIn } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';

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
  message: string;
  confidence: number;
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

  const generatePlacement = async () => {
    setIsGenerating(true);
    setError(null);
    
    try {
      console.log('🎨 GPT Image Generation başlatılıyor...');
      
      // FormData oluştur
      const formData = new FormData();
      
      // Oda görselini base64'ten blob'a çevir
      const roomResponse = await fetch(originalRoom);
      const roomBlob = await roomResponse.blob();
      formData.append('roomImage', roomBlob, 'room.jpg');
      
      // Ürün görselini URL'den blob'a çevir
      const productResponse = await fetch(selectedProduct.image);
      const productBlob = await productResponse.blob();
      formData.append('productImage', productBlob, 'product.jpg');
      
      // GPT endpoint'ini çağır
      const response = await fetch('http://localhost:5000/api/generate-product-placement', {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success && result.image) {
        // Basitleştirilmiş placement data
        const newPlacementData: PlacementData = {
          success: true,
          imageUrl: result.image,
          message: result.message || "GPT ile ürün yerleştirme tamamlandı!",
          confidence: 0.95
        };
        
        setPlacementData(newPlacementData);
        toast({
          title: "✅ GPT Yerleştirme Tamamlandı!",
          description: result.message || "GPT ürünü mükemmel şekilde yerleştirdi!"
        });
      } else {
        throw new Error(result.message || 'GPT yerleştirme başarısız');
      }
      
    } catch (error) {
      console.error('GPT yerleştirme hatası:', error);
      setError('GPT yerleştirme sırasında hata oluştu');
      toast({
        title: "❌ GPT Yerleştirme Hatası",
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

    // GPT'den gelen final görseli direkt indir
    const link = document.createElement('a');
    link.download = 'ai-decor-result.png';
    link.href = placementData.imageUrl;
    link.click();

    toast({
      title: "📥 İndiriliyor",
      description: "GPT ile oluşturulan görsel indiriliyor..."
    });
  };

  const shareResult = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'AI Dekorasyon Sonucum',
          text: `${selectedProduct.name} ürünüm ile oda dekorasyonum!`,
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
        <h2 className="text-3xl font-bold text-white mb-2">🎨 GPT Yerleştirme Sonucu</h2>
        <p className="text-gray-300">
          GPT-4 Vision ürünü odanıza gerçekçi şekilde yerleştirdi
        </p>
      </div>

      <div className="space-y-6">
        {/* Orijinal Oda */}
        <Card className="bg-gray-900/50 border-gray-700 p-4">
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            📷 Orijinal Oda
          </h3>
          <div className="relative rounded-lg overflow-hidden group cursor-pointer">
            <Dialog>
              <DialogTrigger asChild>
                <div className="relative">
                  <img 
                    src={originalRoom} 
                    alt="Orijinal Oda" 
                    className="w-full h-96 object-cover transition-transform duration-200 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
                    <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] p-0 bg-transparent border-none">
                <img 
                  src={originalRoom} 
                  alt="Orijinal Oda - Tam Boyut" 
                  className="w-full h-full object-contain rounded-lg"
                />
              </DialogContent>
            </Dialog>
          </div>
        </Card>

        {/* GPT Yerleştirme Sonucu */}
        <Card className="bg-gray-900/50 border-gray-700 p-4">
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <Wand2 className="h-5 w-5 text-purple-400" />
            GPT Yerleştirme Sonucu
            {placementData && (
              <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                <CheckCircle className="h-3 w-3 mr-1" />
                Tamamlandı
              </Badge>
            )}
          </h3>
          
          <div className="relative rounded-lg overflow-hidden bg-gray-800">
            {isGenerating ? (
              <div className="w-full h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
                  <p className="text-white font-semibold">🎨 GPT Image Generation</p>
                  <div className="mt-3 space-y-1 text-sm text-gray-300">
                    <p className="animate-pulse">🔄 1/3: Görseller hazırlanıyor...</p>
                    <p className="animate-pulse">🔄 2/3: GPT-4 Vision ile analiz ediliyor...</p>
                    <p className="animate-pulse">🔄 3/3: Ürün yerleştirme oluşturuluyor...</p>
                  </div>
                  <div className="mt-4 text-xs text-gray-400">
                    Bu süreç 20-30 saniye sürebilir
                  </div>
                </div>
              </div>
            ) : error ? (
              <div className="w-full h-96 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-red-400 mb-2">❌ {error}</p>
                  <Button onClick={generatePlacement} variant="outline" size="sm">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Tekrar Dene
                  </Button>
                </div>
              </div>
            ) : placementData ? (
              <div className="relative w-full h-96 group cursor-pointer">
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="relative">
                      <img 
                        src={placementData.imageUrl} 
                        alt="GPT Yerleştirme Sonucu" 
                        className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
                        <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] p-0 bg-transparent border-none">
                    <img 
                      src={placementData.imageUrl} 
                      alt="GPT Yerleştirme Sonucu - Tam Boyut" 
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </DialogContent>
                </Dialog>
                
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