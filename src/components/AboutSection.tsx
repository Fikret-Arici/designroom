import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Home, Target, Users, Award, Sparkles, Zap } from 'lucide-react';

const AboutSection = () => {
  const features = [
    {
      icon: <Home className="w-8 h-8 text-ai" />,
      title: "Yapay Zeka Teknolojisi",
      description: "En gelişmiş AI algoritmaları ile odanızı analiz ediyor ve mükemmel yerleştirme önerileri sunuyoruz."
    },
    {
      icon: <Target className="w-8 h-8 text-ai-secondary" />,
      title: "Hassas Yerleştirme",
      description: "Oda boyutları, ışık koşulları ve mevcut mobilyalar dikkate alınarak optimal yerleştirme yapılır."
    },
    {
      icon: <Sparkles className="w-8 h-8 text-ai-accent" />,
      title: "Kişiselleştirilmiş Öneriler",
      description: "Zevkinize ve odanızın stiline uygun dekoratif ürün önerileri alın."
    },
    {
      icon: <Zap className="w-8 h-8 text-ai" />,
      title: "Hızlı İşlem",
      description: "Saniyeler içinde profesyonel kalitede sonuçlar elde edin."
    }
  ];



  return (
    <section id="about" className="py-20 bg-gradient-to-b from-background to-muted/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="text-ai border-ai bg-ai/5 mb-4">
            Hakkımızda
          </Badge>
          <h2 className="text-4xl font-bold text-foreground mb-6">
            AI Dekor Dream ile Tanışın
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            E-ticaret dünyasında yapay zeka teknolojisini kullanarak, 
            dekoratif ürünleri satın almadan önce evinizde nasıl görüneceğini 
            görmenizi sağlıyoruz. Online alışveriş deneyimini dönüştürüyoruz.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column - Story */}
          <div className="space-y-6">
            <Card className="p-8 bg-white/80 backdrop-blur border border-border/50 shadow-lg rounded-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-ai/10 rounded-full">
                  <Users className="w-8 h-8 text-ai" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Misyonumuz</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                E-ticaret dünyasında yapay zeka teknolojisini kullanarak, 
                müşterilerin dekoratif ürünleri satın almadan önce evlerinde 
                nasıl görüneceğini görmelerini sağlıyoruz.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Amacımız, online alışveriş deneyimini dönüştürerek, 
                müşterilerin güvenle ve bilinçle dekoratif ürün satın almalarını 
                sağlamak ve e-ticaret platformlarında yeni bir standart oluşturmaktır.
              </p>
            </Card>

            <Card className="p-8 bg-white/80 backdrop-blur border border-border/50 shadow-lg rounded-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-ai-secondary/10 rounded-full">
                  <Award className="w-8 h-8 text-ai-secondary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Vizyonumuz</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                E-ticaret sektöründe AI teknolojisinin öncüsü olmak ve 
                tüm online dekoratif ürün satışlarında standart hale gelmek. 
                Müşterilerin satın alma kararlarını kolaylaştırarak, 
                e-ticaret platformlarında yeni bir alışveriş deneyimi yaratmak.
              </p>
            </Card>
          </div>

          {/* Right Column - Features */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Neden AI Dekor Dream?
            </h3>
            {features.map((feature, index) => (
              <Card key={index} className="p-6 bg-white/80 backdrop-blur border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-ai/10 to-ai-secondary/10 rounded-full">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>



        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-lg text-muted-foreground mb-6">
            E-ticaret deneyiminizi AI teknolojisi ile dönüştürün
          </p>
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-ai-secondary" />
            <span className="text-ai font-semibold">
              Güvenle alışveriş yapmanın yeni yolu
            </span>
            <Sparkles className="w-5 h-5 text-ai-secondary" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;