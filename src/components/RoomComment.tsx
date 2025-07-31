import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { MessageSquare, Sparkles, Clock, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AIService from '@/services/aiService';

interface RoomCommentProps {
  roomImage: string;
  onCommentComplete?: (comment: any) => void;
}

export const RoomComment = ({ roomImage, onCommentComplete }: RoomCommentProps) => {
  const [comment, setComment] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();
  
  const aiService = AIService.getInstance();

  useEffect(() => {
    if (roomImage) {
      generateComment();
    }
  }, [roomImage]);

  const generateComment = async () => {
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

      const result = await aiService.commentRoom(roomImage);
      
      clearInterval(progressInterval);
      setProgress(100);
      
      setComment(result);
      
      if (onCommentComplete) {
        onCommentComplete(result);
      }

      toast({
        title: "Oda Yorumu Tamamlandı",
        description: "AI odanızı detaylı bir şekilde analiz etti!",
      });

    } catch (error) {
      console.error('Oda yorumu hatası:', error);
      toast({
        title: "Hata Oluştu",
        description: "Oda yorumu sırasında bir hata oluştu. Lütfen tekrar deneyin.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = () => {
    setComment(null);
    generateComment();
  };

  if (!roomImage) {
    return null;
  }

  return (
    <Card className="p-6 bg-gradient-card border-ai/20">
      <div className="flex items-center gap-3 mb-4">
        <MessageSquare className="w-6 h-6 text-ai" />
        <h3 className="text-lg font-semibold text-foreground">AI Oda Yorumu</h3>
        <Badge variant="outline" className="text-ai border-ai">
          <Sparkles className="w-3 h-3 mr-1" />
          Gemini AI
        </Badge>
      </div>

      {isLoading && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-ai rounded-full animate-pulse" />
            AI odanızı analiz ediyor...
          </div>
          <Progress value={progress} className="h-2" />
          <div className="text-xs text-muted-foreground">
            Gemini Vision API ile detaylı analiz yapılıyor
          </div>
        </div>
      )}

      {comment && !isLoading && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                <Clock className="w-3 h-3 mr-1" />
                {new Date(comment.timestamp).toLocaleTimeString('tr-TR')}
              </Badge>
              <Badge variant="outline" className="text-xs">
                Güven: %{Math.round(comment.confidence * 100)}
              </Badge>
              {comment.isFallback && (
                <Badge variant="destructive" className="text-xs">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Fallback
                </Badge>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRegenerate}
              className="text-ai border-ai hover:bg-ai hover:text-white"
            >
              <Sparkles className="w-4 h-4 mr-1" />
              Yeniden Oluştur
            </Button>
          </div>

          <div className="bg-background/50 rounded-lg p-4 border">
            <div className="prose prose-sm max-w-none">
              {comment.text.split('\n\n').map((paragraph: string, index: number) => (
                <p key={index} className="text-foreground leading-relaxed mb-3">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MessageSquare className="w-3 h-3" />
            AI tarafından oluşturulan yorum
          </div>
        </div>
      )}

      {!comment && !isLoading && (
        <div className="text-center py-8 text-muted-foreground">
          <MessageSquare className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
          <p>Oda yorumu henüz oluşturulmadı</p>
        </div>
      )}
    </Card>
  );
}; 