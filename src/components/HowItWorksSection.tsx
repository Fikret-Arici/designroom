import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Upload, 
  Search, 
  Brain, 
  Sparkles, 
  ArrowRight, 
  Camera,
  Palette,
  Target,
  CheckCircle
} from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      number: 1,
      icon: <Upload className="w-8 h-8" />,
      title: "Oda Fotoğrafını Yükle",
      description: "Dekoratif ürün yerleştirmek istediğiniz odanın fotoğrafını yükleyin. AI sistemimiz odanızı detaylı şekilde analiz edecek ve sizin odanızın detaylı bir yorumunu size verecek ardından yine odanızı inceleyip size kişileştirilmiş dekoratif ürünleri önericek.",
      features: ["Yüksek çözünürlük desteği", "Otomatik oda tespiti", "Işık analizi"],
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-950/20"
    },
    {
      number: 2,
      icon: <Search className="w-8 h-8" />,
      title: "Ürünü Seç veya Tarif Et",
      description: "İstediğiniz dekoratif ürünü metin ile tarif edin veya fotoğrafını yükleyin. Tarif ettiğiniz ürünün trendyoldaki örneklerini görüntüleyebilirsiniz ve bunların arasından seçim yapabilir direkt sayfasına gidip alışverişinizi yapabilirsiniz.",
      features: ["Akıllı ürün arama", "Görsel tanıma", "Özel ürün yükleme"],
      color: "text-green-500",
      bgColor: "bg-green-50 dark:bg-green-950/20"
    },
    {
      number: 3,
      icon: <Brain className="w-8 h-8" />,
      title: "AI Analizi",
      description: "Yapay zeka ajanlarımız odanızı analiz eder, uygun yerleştirme noktalarını belirler ve dekorasyon yerleşimini size sunar.",
      features: ["Oda boyutu hesaplama", "Stil analizi", "Renk uyumu kontrolü"],
      color: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-950/20"
    },
    {
      number: 4,
      icon: <Target className="w-8 h-8" />,
      title: "Mükemmel Yerleştirme",
      description: "Seçtiğiniz ürün odanıza profesyonel kalitede yerleştirilir. Sonucu beğenmediyseniz farklı seçenekler deneyebilirsiniz.",
      features: ["Gerçekçi görselleştirme", "Çoklu seçenek", "Anında sonuç"],
      color: "text-ai",
      bgColor: "bg-ai/10"
    }
  ];

  const benefits = [
    {
      icon: <CheckCircle className="w-6 h-6 text-green-500" />,
      text: "Saniyeler içinde sonuç alın"
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-green-500" />,
      text: "Profesyonel dekoratör kalitesi"
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-green-500" />,
      text: "Sınırsız deneme hakkı"
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-green-500" />,
      text: "Kişiselleştirilmiş öneriler"
    }
  ];

  const scrollToHero = () => {
    const element = document.querySelector('#hero');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-b from-muted/20 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="text-ai border-ai mb-4">
            Nasıl Çalışır
          </Badge>
          <h2 className="text-4xl font-bold text-foreground mb-6">
            4 Basit Adımda Mükemmel Dekorasyon
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            AI teknolojimiz ile dekorasyon sürecini kolaylaştırdık. 
            Sadece birkaç tıkla hayalinizdeki dekorasyona ulaşın.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="absolute left-6 top-20 w-0.5 h-12 bg-gradient-to-b from-ai to-ai-secondary hidden md:block"></div>
              )}
              
              <Card className="p-8 glass-effect hover:shadow-lg transition-all duration-300">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  {/* Step Number & Icon */}
                  <div className="md:col-span-2">
                    <div className="flex flex-col items-center md:items-start">
                      <div className={`w-12 h-12 rounded-full ${step.bgColor} flex items-center justify-center mb-4`}>
                        <div className={step.color}>
                          {step.icon}
                        </div>
                      </div>
                      <Badge variant="outline" className="text-ai border-ai">
                        Adım {step.number}
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="md:col-span-7">
                    <h3 className="text-2xl font-bold text-foreground mb-4">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {step.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {step.features.map((feature, featureIndex) => (
                        <Badge key={featureIndex} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Visual Element */}
                  <div className="md:col-span-3">
                    <div className={`w-full h-32 rounded-lg ${step.bgColor} flex items-center justify-center`}>
                      <div className={`${step.color} opacity-20`}>
                        {step.number === 1 && <Camera className="w-16 h-16" />}
                        {step.number === 2 && <Palette className="w-16 h-16" />}
                        {step.number === 3 && <Brain className="w-16 h-16" />}
                        {step.number === 4 && <Sparkles className="w-16 h-16" />}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Benefits & CTA Section */}
        <div className="mt-20">
          <Card className="p-8 glass-effect bg-gradient-to-r from-ai/5 to-ai-secondary/5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Benefits */}
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6">
                  Neden AI Dekor Dream?
                </h3>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      {benefit.icon}
                      <span className="text-muted-foreground">
                        {benefit.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="text-center lg:text-right">
                <h4 className="text-xl font-semibold text-foreground mb-4">
                  Hemen Deneyin!
                </h4>
                <p className="text-muted-foreground mb-6">
                  Dekorasyonunuzu AI ile yeniden keşfedin
                </p>
                <Button 
                  onClick={scrollToHero}
                  className="bg-gradient-ai hover:opacity-90 text-white font-semibold px-8 py-3"
                >
                   Başla
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Process Flow Visualization */}
        <div className="mt-16 text-center">
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Upload className="w-5 h-5 text-blue-500" />
              <span>Yükle</span>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground" />
            <div className="flex items-center gap-2 text-muted-foreground">
              <Search className="w-5 h-5 text-green-500" />
              <span>Seç</span>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground" />
            <div className="flex items-center gap-2 text-muted-foreground">
              <Brain className="w-5 h-5 text-purple-500" />
              <span>Analiz</span>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground" />
            <div className="flex items-center gap-2 text-muted-foreground">
              <Sparkles className="w-5 h-5 text-ai" />
              <span>Sonuç</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;