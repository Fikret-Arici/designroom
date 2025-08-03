import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye } from 'lucide-react';
import ApiService from '@/services/apiService';
import { useToast } from '@/hooks/use-toast';

interface RoomAnalysisProps {
  roomImage?: string;
  selectedProduct?: Product;
  onAnalysisComplete: (analysis: RoomAnalysis) => void;
}

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

interface RoomAnalysis {
  style: string;
  dominantColors: string[];
  lightingType: string;
  roomSize: string;
  suggestions: string[];
  placementAreas: { x: number; y: number; width: number; height: number }[];
}

export const RoomAnalysis = ({ roomImage, selectedProduct, onAnalysisComplete }: RoomAnalysisProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<RoomAnalysis | null>(null);
  const { toast } = useToast();
  const apiService = ApiService.getInstance();

  const analyzeRoom = async () => {
    if (!roomImage) return;

    setIsAnalyzing(true);
    
    try {
      console.log('AI oda analizi başlatılıyor...');
      
      // Eğer seçilen ürün varsa, ürüne özel analiz yap
      if (selectedProduct) {
        console.log('Ürüne özel yerleştirme analizi yapılıyor:', selectedProduct.name);
        const response = await apiService.analyzeRoomWithProduct(roomImage, selectedProduct);
        setAnalysis(response.analysis);
        setIsAnalyzing(false);
        onAnalysisComplete(response.analysis);
        
        toast({
          title: "Ürüne Özel Analiz Tamamlandı",
          description: `${selectedProduct.name} için en uygun yerleştirme alanları belirlendi.`,
        });
      } else {
        // Genel oda analizi
        const response = await apiService.analyzeRoom(roomImage);
        setAnalysis(response.analysis);
        setIsAnalyzing(false);
        onAnalysisComplete(response.analysis);
        
        toast({
          title: "Oda Analizi Tamamlandı",
          description: response.message,
        });
      }
    } catch (error) {
      console.error('Oda analizi hatası:', error);
      
      // Daha detaylı hata mesajı
      let errorMessage = "Oda analizi sırasında bir hata oluştu.";
      
      if (error.message.includes('API anahtarı')) {
        errorMessage = "AI servisi geçici olarak kullanılamıyor. Lütfen daha sonra tekrar deneyin.";
      } else if (error.message.includes('timeout')) {
        errorMessage = "Analiz zaman aşımına uğradı. Lütfen tekrar deneyin.";
      } else if (error.message.includes('network')) {
        errorMessage = "Ağ bağlantısı sorunu. Lütfen internet bağlantınızı kontrol edin.";
      }
      
      toast({
        title: "Analiz Hatası",
        description: errorMessage,
        variant: "destructive",
      });
      setIsAnalyzing(false);
    }
  };

  useEffect(() => {
    if (roomImage) {
      // Seçilen ürün değiştiğinde veya oda resmi değiştiğinde analizi yeniden yap
      setAnalysis(null);
      analyzeRoom();
    }
  }, [roomImage, selectedProduct]);

  if (!roomImage) {
    return (
      <Card className="p-6 text-center">
        <Eye className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">
          Oda analizi için önce oda fotoğrafı yükleyin
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Eye className={`w-5 h-5 ${isAnalyzing ? 'text-ai animate-pulse' : 'text-foreground'}`} />
          <h3 className="text-lg font-semibold text-foreground">
            {selectedProduct ? `${selectedProduct.name} İçin Yerleştirme Analizi` : 'AI Oda Analizi'}
          </h3>
          {isAnalyzing && (
            <Badge variant="secondary" className="animate-pulse">
              {selectedProduct ? 'Ürüne özel analiz ediliyor...' : 'Analiz ediliyor...'}
            </Badge>
          )}
        </div>

        <div className="relative">
          <img
            src={roomImage}
            alt="Analiz edilen oda"
            className="w-full h-48 object-cover rounded-lg border"
          />
          {isAnalyzing && (
            <div className="absolute inset-0 bg-ai/20 rounded-lg flex items-center justify-center">
              <div className="bg-card/90 backdrop-blur-sm rounded-lg p-4">
                <div className="animate-scan w-32 h-1 bg-gradient-ai rounded-full mb-2"></div>
                <p className="text-sm text-foreground">
                  {selectedProduct ? `${selectedProduct.name} için en uygun yerleştirme alanları aranıyor...` : 'AI Vision analiz ediyor...'}
                </p>
              </div>
            </div>
          )}
          {analysis && analysis.placementAreas.map((area, index) => (
            <div
              key={index}
              className="absolute border-2 border-ai bg-ai/20 rounded"
              style={{
                left: `${area.x}%`,
                top: `${area.y}%`,
                width: `${area.width}%`,
                height: `${area.height}%`
              }}
            >
              <Badge className="absolute -top-2 -left-2 text-xs">
                {selectedProduct ? `${selectedProduct.name} İçin En Uygun Alan ${index + 1}` : `Yerleştirme Alanı ${index + 1}`}
              </Badge>
            </div>
          ))}
        </div>

        {analysis && (
          <div className="text-center pt-2">
            <p className="text-sm text-muted-foreground">
              {selectedProduct ? `${selectedProduct.name} için ${analysis.placementAreas.length} farklı yerleştirme alanı önerildi` : `${analysis.placementAreas.length} yerleştirme alanı bulundu`}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};