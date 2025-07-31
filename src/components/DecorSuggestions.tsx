import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Lightbulb, Sparkles, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AIService, { DecorSuggestions as DecorSuggestionsType } from '@/services/aiService';

interface DecorSuggestionsProps {
  roomImage: string;
  onSuggestionsComplete?: (suggestions: DecorSuggestionsType) => void;
}

export const DecorSuggestions = ({ roomImage, onSuggestionsComplete }: DecorSuggestionsProps) => {
  const [suggestions, setSuggestions] = useState<DecorSuggestionsType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();
  
  const aiService = AIService.getInstance();

  useEffect(() => {
    if (roomImage) {
      generateSuggestions();
    }
  }, [roomImage]);

  const generateSuggestions = async () => {
    if (!roomImage) return;

    setIsLoading(true);
    setProgress(0);

    try {
      // Progress simulation
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const result = await aiService.suggestDecorProducts(roomImage);
      
      clearInterval(progressInterval);
      setProgress(100);
      
      setSuggestions(result);
      
      if (onSuggestionsComplete) {
        onSuggestionsComplete(result);
      }

      toast({
        title: "Dekoratif Öneriler Tamamlandı",
        description: "AI odanız için uygun dekoratif ürünleri analiz etti!",
      });

    } catch (error) {
      console.error('Dekoratif öneriler hatası:', error);
      toast({
        title: "Hata Oluştu",
        description: "Dekoratif öneriler sırasında bir hata oluştu. Lütfen tekrar deneyin.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = () => {
    setSuggestions(null);
    generateSuggestions();
  };

  if (!roomImage) {
    return null;
  }

  return (
    <Card className="p-6 bg-gradient-card border-ai/20 hover:border-ai/40 transition-all duration-300 w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Lightbulb className="w-6 h-6 text-ai" />
          <h3 className="text-lg font-semibold text-foreground">Odaya Konabilecek Dekoratif Ürünler</h3>
          <Badge variant="outline" className="text-ai border-ai">
            <Sparkles className="w-3 h-3 mr-1" />
            Gemini AI
          </Badge>
        </div>
        {suggestions && !isLoading && (
          <Badge
            variant="outline"
            onClick={handleRegenerate}
            className="text-ai border-ai hover:bg-ai hover:text-white cursor-pointer"
          >
            <Sparkles className="w-4 h-4 mr-1" />
            Yeniden Oluştur
          </Badge>
        )}
      </div>

      {isLoading && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-ai rounded-full animate-pulse" />
            AI dekoratif ürünleri analiz ediyor...
          </div>
          <Progress value={progress} className="h-2" />
          <div className="text-xs text-muted-foreground">
            Gemini Vision API ile detaylı analiz yapılıyor
          </div>
        </div>
      )}

      {suggestions && !isLoading && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              <Clock className="w-3 h-3 mr-1" />
              {new Date(suggestions.timestamp).toLocaleTimeString('tr-TR')}
            </Badge>
            <Badge variant="outline" className="text-xs">
              Güven: %{Math.round(suggestions.confidence * 100)}
            </Badge>
            {suggestions.isFallback && (
              <Badge variant="destructive" className="text-xs">
                <AlertCircle className="w-3 h-3 mr-1" />
                Fallback
              </Badge>
            )}
          </div>

          <div className="space-y-4 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {Object.entries(suggestions.categories).map(([category, products]) => (
              <div key={category} className="bg-background/50 rounded-lg p-4 border hover:bg-background/70 transition-colors duration-200">
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-ai" />
                  {category}
                </h4>
                <div className="space-y-2">
                  {products.map((product, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-ai rounded-full" />
                      <span className="text-foreground">{product}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Lightbulb className="w-3 h-3" />
            AI tarafından önerilen dekoratif ürünler
          </div>
        </div>
      )}

      {!suggestions && !isLoading && (
        <div className="text-center py-8 text-muted-foreground">
          <Lightbulb className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
          <p>Dekoratif öneriler henüz oluşturulmadı</p>
        </div>
      )}
    </Card>
  );
}; 