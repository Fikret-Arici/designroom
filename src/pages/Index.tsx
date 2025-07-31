import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ImageUploader } from '@/components/ImageUploader';
import { ProductSearch } from '@/components/ProductSearch';
import { RoomAnalysis } from '@/components/RoomAnalysis';
import { PlacementResult } from '@/components/PlacementResult';
import { RoomComment } from '@/components/RoomComment';
import { AIAgent } from '@/components/AIAgent';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Sparkles, Target, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import aiHeroBg from '@/assets/ai-hero-bg.jpg';
import demoRoom from '@/assets/demo-room.jpg';

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

type Step = 'upload' | 'product' | 'analysis' | 'result';

interface RoomAnalysis {
  style: string;
  dominantColors: string[];
  lightingType: string;
  roomSize: string;
  suggestions: string[];
  placementAreas: { x: number; y: number; width: number; height: number }[];
}

const Index = () => {
  const [currentStep, setCurrentStep] = useState<Step>('upload');
  const [roomImage, setRoomImage] = useState<string>('');
  const [roomFile, setRoomFile] = useState<File | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [roomAnalysis, setRoomAnalysis] = useState<RoomAnalysis | null>(null);
  const [roomComment, setRoomComment] = useState<any>(null);
  const [productMethod, setProductMethod] = useState<'upload' | 'describe'>('describe');
  const { toast } = useToast();

  const steps = [
    { id: 'upload', title: 'Oda Yükle', description: 'Oda fotoğrafınızı yükleyin' },
    { id: 'product', title: 'Ürün Seç', description: 'Yerleştirmek istediğiniz ürünü seçin' },
    { id: 'analysis', title: 'AI Analiz', description: 'Oda analizi yapılıyor' },
    { id: 'result', title: 'Sonuç', description: 'AI yerleştirme sonucu' }
  ];

  const getStepIndex = (step: Step) => steps.findIndex(s => s.id === step);
  const progress = ((getStepIndex(currentStep) + 1) / steps.length) * 100;

  const handleRoomUpload = (file: File, preview: string) => {
    setRoomFile(file);
    setRoomImage(preview);
    setCurrentStep('product');
    
    // Oda yorumunu otomatik olarak başlat
    setTimeout(() => {
      setRoomComment({ isLoading: true });
    }, 1000);
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setCurrentStep('analysis');
  };

  const handleAnalysisComplete = (analysis: RoomAnalysis) => {
    setRoomAnalysis(analysis);
    setCurrentStep('result');
  };

  const handleReset = () => {
    setCurrentStep('upload');
    setRoomImage('');
    setRoomFile(null);
    setSelectedProduct(null);
    setRoomAnalysis(null);
    setRoomComment(null);
    toast({
      title: "Yeniden Başlatıldı",
      description: "Yeni bir dekorasyon deneyimi için hazırsınız!",
    });
  };


  const getActiveAgent = (): 'search' | 'analysis' | 'placement' | null => {
    switch (currentStep) {
      case 'product': return 'search';
      case 'analysis': return 'analysis';
      case 'result': return 'placement';
      default: return null;
    }
  };

  const getCompletedAgents = () => {
    const agents: ('search' | 'analysis' | 'placement')[] = [];
    if (selectedProduct) agents.push('search');
    if (roomAnalysis) agents.push('analysis');
    if (currentStep === 'result') agents.push('placement');
    return agents;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div 
        className="relative h-96 flex items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: `url(${aiHeroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/70"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Brain className="w-12 h-12 text-ai animate-float" />
            <h1 className="text-5xl font-bold bg-gradient-ai bg-clip-text text-transparent">
              AI Dekoratif Yerleştirme
            </h1>
            <Sparkles className="w-8 h-8 text-ai-secondary animate-pulse" />
          </div>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Odanızın fotoğrafını yükleyin, istediğiniz tabloyu tarif edin. 
            AI ajanlarımız size mükemmel yerleştirme önerisi sunsun.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Badge variant="outline" className="text-ai border-ai">
              <Target className="w-3 h-3 mr-1" />
              3 AI Agent
            </Badge>
            <Badge variant="outline" className="text-ai border-ai">
              <Brain className="w-3 h-3 mr-1" />
              GPT-4 Vision
            </Badge>
            <Badge variant="outline" className="text-ai border-ai">
              <Sparkles className="w-3 h-3 mr-1" />
              DALL·E Edit
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Progress Bar */}
        <Card className="p-6 mb-8 bg-gradient-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">İşlem Durumu</h2>
            <Badge variant="outline" className="text-ai border-ai">
              {Math.round(progress)}% Tamamlandı
            </Badge>
          </div>
          <Progress value={progress} className="mb-4" />
          <div className="flex justify-between text-sm">
            {steps.map((step, index) => (
              <div 
                key={step.id}
                className={`flex items-center gap-2 ${
                  getStepIndex(currentStep) >= index 
                    ? 'text-ai font-semibold' 
                    : 'text-muted-foreground'
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${
                  getStepIndex(currentStep) >= index ? 'bg-ai' : 'bg-muted'
                }`} />
                {step.title}
                {index < steps.length - 1 && (
                  <ArrowRight className="w-3 h-3 ml-2 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* AI Agents Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <AIAgent 
            type="search" 
            isActive={getActiveAgent() === 'search'}
            isCompleted={getCompletedAgents().includes('search')}
          />
          <AIAgent 
            type="analysis" 
            isActive={getActiveAgent() === 'analysis'}
            isCompleted={getCompletedAgents().includes('analysis')}
          />
          <AIAgent 
            type="placement" 
            isActive={getActiveAgent() === 'placement'}
            isCompleted={getCompletedAgents().includes('placement')}
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Current Step */}
          <div className="lg:col-span-2 space-y-6">
            {currentStep === 'upload' && (
              <ImageUploader
                onImageUpload={handleRoomUpload}
                title="Oda Fotoğrafınızı Yükleyin"
                description="Tablo yerleştirmek istediğiniz odanın fotoğrafını seçin"
              />
            )}

            {currentStep === 'product' && (
              <div className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Tablo Seçim Yöntemi
                  </h3>
                  <Tabs value={productMethod} onValueChange={(value) => setProductMethod(value as 'upload' | 'describe')}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="describe">Metinle Tarif Et</TabsTrigger>
                      <TabsTrigger value="upload">Tablo Yükle</TabsTrigger>
                    </TabsList>
                    <TabsContent value="describe" className="mt-4">
                      <ProductSearch 
                        onProductSelect={handleProductSelect}
                        roomStyle={roomAnalysis?.style}
                        roomColors={roomAnalysis?.dominantColors}
                      />
                    </TabsContent>
                    <TabsContent value="upload" className="mt-4">
                      <ImageUploader
                        onImageUpload={(file, preview) => {
                          const mockProduct: Product = {
                            id: 'uploaded',
                            name: 'Yüklenen Tablo',
                            price: 'Özel',
                            rating: 5.0,
                            image: preview,
                            link: '#',
                            source: 'Özel Tasarım',
                            description: 'Kullanıcı tarafından yüklenen özel tablo'
                          };
                          handleProductSelect(mockProduct);
                        }}
                        title="Tablo Dosyanızı Yükleyin"
                        description="Yerleştirmek istediğiniz tabloyu seçin"
                      />
                    </TabsContent>
                  </Tabs>
                </Card>
              </div>
            )}

            {(currentStep === 'analysis' || currentStep === 'result') && (
              <RoomAnalysis
                roomImage={roomImage}
                onAnalysisComplete={handleAnalysisComplete}
              />
            )}

            {currentStep === 'result' && selectedProduct && (
              <PlacementResult
                originalRoom={roomImage}
                selectedProduct={selectedProduct}
                onReset={handleReset}
              />
            )}
          </div>

          {/* Right Column - Side Information */}
          <div className="space-y-6">
            {roomImage && (
              <Card className="p-4">
                <h4 className="font-semibold text-foreground mb-3">Yüklenen Oda</h4>
                <img
                  src={roomImage}
                  alt="Yüklenen oda"
                  className="w-full h-32 object-cover rounded-lg border"
                />
              </Card>
            )}

            {roomImage && (
              <RoomComment 
                roomImage={roomImage}
                onCommentComplete={setRoomComment}
              />
            )}

            {selectedProduct && (
              <Card className="p-4">
                <h4 className="font-semibold text-foreground mb-3">Seçilen Ürün</h4>
                <div className="flex items-center gap-3">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-16 h-16 object-cover rounded border"
                  />
                  <div>
                    <p className="font-semibold text-sm">{selectedProduct.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedProduct.price}</p>
                                            <Badge variant="outline" className="text-xs mt-1">
                          {selectedProduct.source}
                        </Badge>
                  </div>
                </div>
              </Card>
            )}

            <Card className="p-4 bg-gradient-card border-ai/50">
              <h4 className="font-semibold text-foreground mb-3">💡 Nasıl Çalışır?</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="flex items-start gap-2">
                  <span className="text-ai">1.</span>
                  Oda fotoğrafınızı yükleyin
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-ai">2.</span>
                  İstediğiniz tabloyu tarif edin veya yükleyin
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-ai">3.</span>
                  AI ajanlar odanızı analiz eder
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-ai">4.</span>
                  Mükemmel yerleştirme önerisi alın
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;