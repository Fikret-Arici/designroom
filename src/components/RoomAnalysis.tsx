import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, Palette, Ruler, Lightbulb } from 'lucide-react';
import ApiService from '@/services/apiService';
import { useToast } from '@/hooks/use-toast';

interface RoomAnalysisProps {
  roomImage?: string;
  onAnalysisComplete: (analysis: RoomAnalysis) => void;
}

interface RoomAnalysis {
  style: string;
  dominantColors: string[];
  lightingType: string;
  roomSize: string;
  suggestions: string[];
  placementAreas: { x: number; y: number; width: number; height: number }[];
}

export const RoomAnalysis = ({ roomImage, onAnalysisComplete }: RoomAnalysisProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<RoomAnalysis | null>(null);
  const { toast } = useToast();
  const apiService = ApiService.getInstance();

  const analyzeRoom = async () => {
    if (!roomImage) return;

    setIsAnalyzing(true);
    
    try {
      console.log('AI oda analizi başlatılıyor...');
      const response = await apiService.analyzeRoom(roomImage);
      
      setAnalysis(response.analysis);
      setIsAnalyzing(false);
      onAnalysisComplete(response.analysis);
      
      toast({
        title: "Analiz Tamamlandı",
        description: response.message,
      });
    } catch (error) {
      console.error('Oda analizi hatası:', error);
      toast({
        title: "Analiz Hatası",
        description: "Oda analizi sırasında bir hata oluştu.",
        variant: "destructive",
      });
      setIsAnalyzing(false);
    }
  };

  useEffect(() => {
    if (roomImage && !analysis) {
      analyzeRoom();
    }
  }, [roomImage, analysis]);

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
            AI Oda Analizi
          </h3>
          {isAnalyzing && (
            <Badge variant="secondary" className="animate-pulse">
              Analiz ediliyor...
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
                <p className="text-sm text-foreground">AI Vision analiz ediyor...</p>
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
                Yerleştirme Alanı {index + 1}
              </Badge>
            </div>
          ))}
        </div>

        {analysis && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-ai" />
                  <span className="font-semibold text-sm">Oda Stili</span>
                </div>
                <Badge variant="outline">{analysis.style}</Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-ai" />
                  <span className="font-semibold text-sm">Oda Boyutu</span>
                </div>
                <Badge variant="outline">{analysis.roomSize}</Badge>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-ai" />
                <span className="font-semibold text-sm">Baskın Renkler</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                {analysis.dominantColors.map((color, index) => (
                  <Badge key={index} variant="secondary">{color}</Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-ai" />
                <span className="font-semibold text-sm">AI Önerileri</span>
              </div>
              <div className="space-y-1">
                {analysis.suggestions.map((suggestion, index) => (
                  <p key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-ai">•</span>
                    {suggestion}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};