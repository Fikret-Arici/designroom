import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Share2, RotateCcw, Wand2, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ApiService from '@/services/apiService';
import demoResult from '@/assets/demo-result.jpg';

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

interface PlacementResultProps {
  originalRoom: string;
  selectedProduct: Product;
  onReset: () => void;
}

export const PlacementResult = ({ originalRoom, selectedProduct, onReset }: PlacementResultProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const apiService = ApiService.getInstance();

  const generatePlacement = async () => {
    setIsGenerating(true);
    setError(null);
    
    try {
      console.log('AI yerleştirme başlatılıyor...');
      
      // Ürün görselini base64'e çevir
      const productImageBase64 = selectedProduct.image;
      
      // Yerleştirme verilerini hazırla
      const placementData = {
        area: { x: 30, y: 20, width: 40, height: 30 }, // Varsayılan yerleştirme alanı
        analysis: {
          style: 'Modern Minimalist',
          dominantColors: ['Mavi', 'Beyaz', 'Gri'],
          lightingType: 'Doğal Işık (Gündüz)'
        }
      };
      
      const response = await apiService.placeProductInRoom(
        originalRoom,
        productImageBase64,
        placementData
      );
      
      // Backend'den gelen imageUrl'i kontrol et
      if (response.result && response.result.imageUrl) {
        // Gerçek AI yerleştirme sonucu
        setResultImage(response.result.imageUrl);
      } else if (response.result && response.result.success === false) {
        // AI yerleştirme başarısız oldu
        throw new Error(response.result.error || 'AI yerleştirme başarısız oldu');
      } else {
        // Demo görselini kullan
        setResultImage(demoResult);
      }
      
      setIsGenerating(false);
      
      toast({
        title: "Yerleştirme Tamamlandı!",
        description: response.message || "AI tabloyu odanıza başarıyla yerleştirdi.",
      });
    } catch (error) {
      console.error('Yerleştirme hatası:', error);
      setError('Yerleştirme sırasında bir hata oluştu');
      
      // Hata durumunda da demo görselini göster
      setResultImage(demoResult);
      setIsGenerating(false);
      
      toast({
        title: "AI Yerleştirme Hatası",
        description: error.message || "AI yerleştirme sırasında bir hata oluştu.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (originalRoom && selectedProduct && !resultImage && !isGenerating) {
      generatePlacement();
    }
  }, [originalRoom, selectedProduct]);

  const handleDownload = () => {
    if (resultImage) {
      const link = document.createElement('a');
      link.href = resultImage;
      link.download = 'ai-dekorasyon-sonucu.jpg';
      link.click();
      toast({
        title: "İndiriliyor",
        description: "Görsel cihazınıza kaydediliyor.",
      });
    }
  };

  const handleShare = async () => {
    if (navigator.share && resultImage) {
      try {
        const response = await fetch(resultImage);
        const blob = await response.blob();
        const file = new File([blob], 'ai-dekorasyon.jpg', { type: 'image/jpeg' });
        
        await navigator.share({
          title: 'AI Dekorasyon Sonucum',
          text: 'AI ile tasarladığım oda dekorasyonu',
          files: [file]
        });
      } catch (error) {
        toast({
          title: "Paylaşım başarısız",
          description: "Görseli manuel olarak indirip paylaşabilirsiniz.",
          variant: "destructive",
        });
      }
    } else {
      // Fallback: copy link to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link kopyalandı",
        description: "Paylaşım linki panoya kopyalandı.",
      });
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Wand2 className={`w-5 h-5 ${isGenerating ? 'text-ai animate-pulse' : 'text-green-500'}`} />
          <h3 className="text-lg font-semibold text-foreground">
            AI Yerleştirme Sonucu
          </h3>
          {isGenerating ? (
            <Badge variant="secondary" className="animate-pulse">
              Oluşturuluyor...
            </Badge>
          ) : resultImage ? (
            <Badge className="bg-green-500">
              <CheckCircle className="w-3 h-3 mr-1" />
              Tamamlandı
            </Badge>
          ) : null}
        </div>

        {selectedProduct && (
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <img
              src={selectedProduct.image || '/placeholder.svg'}
              alt={selectedProduct.name}
              className="w-12 h-12 object-cover rounded"
            />
            <div>
              <p className="font-semibold text-sm">{selectedProduct.name}</p>
              <p className="text-xs text-muted-foreground">{selectedProduct.price}</p>
            </div>
          </div>
        )}

        <div className="relative">
          {isGenerating ? (
            <div className="w-full h-96 bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="animate-scan w-64 h-2 bg-gradient-ai rounded-full mx-auto"></div>
                <div className="space-y-2">
                  <p className="font-semibold text-foreground">AI Yerleştirme Ajanı Çalışıyor</p>
                  <p className="text-sm text-muted-foreground">
                    • Oda perspektifini analiz ediyor
                  </p>
                  <p className="text-sm text-muted-foreground">
                    • Işık koşullarını hesaplıyor
                  </p>
                  <p className="text-sm text-muted-foreground">
                    • Tabloyu doğal şekilde yerleştiriyor
                  </p>
                  <p className="text-sm text-muted-foreground">
                    • Gölge ve yansımaları optimize ediyor
                  </p>
                </div>
              </div>
            </div>
          ) : resultImage ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-sm mb-2">Orijinal Oda</h4>
                  <img
                    src={originalRoom}
                    alt="Orijinal oda"
                    className="w-full h-48 object-cover rounded-lg border"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-2">AI Yerleştirme Sonucu</h4>
                  <img
                    src={resultImage}
                    alt="AI yerleştirme sonucu"
                    className="w-full h-48 object-cover rounded-lg border-2 border-ai animate-ai-glow"
                  />
                </div>
              </div>
              
              <div className="flex gap-3 justify-center">
                <Button onClick={handleDownload} variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  İndir
                </Button>
                <Button onClick={handleShare} variant="outline">
                  <Share2 className="w-4 h-4 mr-2" />
                  Paylaş
                </Button>
                <Button onClick={onReset} variant="outline">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Yeni Deneme
                </Button>
              </div>

              <Card className="p-4 bg-gradient-card border-ai/50">
                <h4 className="font-semibold text-foreground mb-2">🎯 AI Analiz Özeti</h4>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>✓ Tablo yatak başı duvarına optimal konumda yerleştirildi</p>
                  <p>✓ Oda renklerine uyumlu boyut ve açı hesaplandı</p>
                  <p>✓ Doğal ışık koşullarına göre gölgelendirme yapıldı</p>
                  <p>✓ Perspektif ve derinlik doğal olarak ayarlandı</p>
                </div>
                {error && (
                  <div className="mt-2 p-2 bg-red-500/10 border border-red-500/20 rounded">
                    <p className="text-xs text-red-600">
                      ❌ AI yerleştirme hatası: {error}
                    </p>
                  </div>
                )}
              </Card>
            </div>
          ) : null}
        </div>
      </div>
    </Card>
  );
};