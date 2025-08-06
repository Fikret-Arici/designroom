import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import Header from '@/components/Header';
import { 
  Eye, 
  Heart, 
  Star, 
  ArrowRight, 
  Sofa,
  Lamp,
  PaintBucket,
  Flower,
  Sparkles
} from 'lucide-react';

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: string;
  beforeImage: string;
  afterImage: string;
  productImage: string;
  tags: string[];
  rating: number;
  likes: number;
  views: number;
  createdAt: string;
  author: string;
}

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');


  const categories = [
    { id: 'all', name: 'Tümü', icon: <Star className="w-4 h-4" /> },
    { id: 'living', name: 'Oturma Odası', icon: <Sofa className="w-4 h-4" /> },
    { id: 'bedroom', name: 'Yatak Odası', icon: <Lamp className="w-4 h-4" /> },
    { id: 'kitchen', name: 'Mutfak', icon: <PaintBucket className="w-4 h-4" /> },
    { id: 'decoration', name: 'Dekoratif', icon: <Flower className="w-4 h-4" /> }
  ];

  // Örnek veriler - gerçek uygulamada API'den gelecek
  const portfolioItems: PortfolioItem[] = [
    {
      id: '1',
      title: "Modern Oturma Odası Dekorasyonu",
      category: "living",
      beforeImage: "/api/placeholder/400/300",
      afterImage: "/api/placeholder/400/300",
      productImage: "/api/placeholder/200/200",
      description: "Minimalist tarzda modern oturma odası için AI destekli dekoratif ürün yerleştirmesi",
      tags: ["Modern", "Minimalist", "Oturma Odası"],
      rating: 4.9,
      likes: 234,
      views: 1250,
      createdAt: "2024-01-15",
      author: "Ahmet Yılmaz"
    },
    {
      id: '2',
      title: "Rustik Yatak Odası Tasarımı",
      category: "bedroom",
      beforeImage: "/api/placeholder/400/300",
      afterImage: "/api/placeholder/400/300",
      productImage: "/api/placeholder/200/200",
      description: "Doğal ahşap ve rustik dekoratif öğelerle yatak odası yenileme projesi",
      tags: ["Rustik", "Doğal", "Yatak Odası"],
      rating: 4.8,
      likes: 189,
      views: 890,
      createdAt: "2024-01-10",
      author: "Ayşe Demir"
    }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory);





  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-36">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="text-ai border-ai mb-4">
            Örnek Çalışmalar
          </Badge>
          <h1 className="text-4xl font-bold text-foreground mb-6">
            AI ile Gerçekleştirilen Dekorasyon Projeleri
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Müşterilerimizin yaşam alanlarını nasıl dönüştürdüğümüzü keşfedin. 
            Her proje, AI teknolojimizin gücünü ve yaratıcılığını sergiliyor.
          </p>
          
          
        </div>



        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 ${
                selectedCategory === category.id 
                  ? 'bg-gradient-ai text-white' 
                  : 'hover:bg-ai/10'
              }`}
            >
              {category.icon}
              {category.name}
            </Button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden glass-effect hover:shadow-xl transition-all duration-300 group">
              <div className="relative">
                                 {/* Three Images Side by Side with Smooth Transitions */}
                 <div className="relative h-48 overflow-hidden">
                   <div className="grid grid-cols-3 h-full gap-1">
                     {/* İlk Hali - Boş Oda */}
                     <div className="relative overflow-hidden">
                       <div 
                         className="w-full h-full bg-muted bg-cover bg-center transition-all duration-500 ease-in-out group-hover:scale-110 group-hover:brightness-110"
                         style={{ backgroundImage: `url(${item.beforeImage})` }}
                       >
                         <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-300 group-hover:opacity-30"></div>
                       </div>
                       <div className="absolute top-2 left-2 bg-background/90 backdrop-blur rounded px-2 py-1 transition-all duration-300 group-hover:bg-background/95">
                         <span className="text-xs font-medium">İlk Hali</span>
                       </div>
                     </div>
                     
                     {/* Ürün Resmi */}
                     <div className="relative overflow-hidden">
                       <div 
                         className="w-full h-full bg-muted bg-cover bg-center transition-all duration-500 ease-in-out group-hover:scale-110 group-hover:brightness-110"
                         style={{ backgroundImage: `url(${item.productImage})` }}
                       >
                         <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-300 group-hover:opacity-30"></div>
                       </div>
                       <div className="absolute top-2 left-2 bg-background/90 backdrop-blur rounded px-2 py-1 transition-all duration-300 group-hover:bg-background/95">
                         <span className="text-xs font-medium">Ürün</span>
                       </div>
                     </div>
                     
                     {/* Son Yerleştirilmiş Resim */}
                     <div className="relative overflow-hidden">
                       <div 
                         className="w-full h-full bg-muted bg-cover bg-center transition-all duration-500 ease-in-out group-hover:scale-110 group-hover:brightness-110"
                         style={{ backgroundImage: `url(${item.afterImage})` }}
                       >
                         <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-300 group-hover:opacity-30"></div>
                       </div>
                       <div className="absolute top-2 left-2 bg-background/90 backdrop-blur rounded px-2 py-1 transition-all duration-300 group-hover:bg-background/95">
                         <span className="text-xs font-medium">Sonuç</span>
                       </div>
                     </div>
                   </div>
                 </div>

                {/* Overlay with Stats */}
                <div className="absolute bottom-4 right-4 flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-background/80 backdrop-blur rounded-full px-2 py-1">
                    <Heart className="w-3 h-3 text-red-500" />
                    <span className="text-xs">{item.likes}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-background/80 backdrop-blur rounded-full px-2 py-1">
                    <Eye className="w-3 h-3 text-blue-500" />
                    <span className="text-xs">{item.views}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{item.rating}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {item.tags.slice(0, 2).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{item.author}</span>
                  <span>{new Date(item.createdAt).toLocaleDateString('tr-TR')}</span>
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full group mt-4">
                      Detayları Gör
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                      
                                             <div className="space-y-4">
                         <h4 className="font-semibold mb-2">Proje Görselleri</h4>
                                                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <h5 className="text-sm font-medium mb-2 text-muted-foreground">İlk Hali</h5>
                              <div 
                                className="w-full h-48 bg-muted bg-cover bg-center rounded-lg"
                                style={{ backgroundImage: `url(${item.beforeImage})` }}
                              ></div>
                            </div>
                            <div>
                              <h5 className="text-sm font-medium mb-2 text-muted-foreground">Ürün</h5>
                              <div 
                                className="w-full h-48 bg-muted bg-cover bg-center rounded-lg"
                                style={{ backgroundImage: `url(${item.productImage})` }}
                              ></div>
                            </div>
                            <div>
                              <h5 className="text-sm font-medium mb-2 text-muted-foreground">Son Yerleştirilmiş</h5>
                              <div 
                                className="w-full h-48 bg-muted bg-cover bg-center rounded-lg"
                                style={{ backgroundImage: `url(${item.afterImage})` }}
                              ></div>
                            </div>
                          </div>
                       </div>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {item.tags.map((tag, index) => (
                            <Badge key={index} variant="outline">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span>{item.rating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="w-4 h-4 text-red-500" />
                            <span>{item.likes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4 text-blue-500" />
                            <span>{item.views}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </Card>
          ))}
        </div>

                 {/* Empty State */}
         {filteredItems.length === 0 && (
           <Card className="p-12 text-center glass-effect">
             <div className="space-y-4">
               <Sparkles className="w-16 h-16 mx-auto text-muted-foreground" />
               <h3 className="text-xl font-semibold">Henüz proje bulunmuyor</h3>
               <p className="text-muted-foreground">
                 Bu kategoride henüz proje paylaşılmamış.
               </p>
             </div>
           </Card>
         )}

         {/* Process Flow Diagram */}
         <div className="mt-20 text-center">
           <h3 className="text-2xl font-bold text-foreground mb-8">
             Nasıl Çalışır?
           </h3>
           <div className="flex items-center justify-center gap-4 mb-8">
             {/* Boş Oda */}
             <div className="w-24 h-24 border-4 border-foreground rounded-lg flex items-center justify-center bg-background">
               <span className="text-sm font-medium text-foreground">Boş Oda</span>
             </div>
             
             {/* Plus İşareti */}
             <div className="text-2xl font-bold text-foreground">+</div>
             
             {/* Ürün */}
             <div className="w-24 h-24 border-4 border-foreground rounded-lg flex items-center justify-center bg-background">
               <span className="text-sm font-medium text-foreground">Ürün</span>
             </div>
             
             {/* Ok */}
             <div className="text-2xl font-bold text-foreground">→</div>
             
             {/* Son Görsel */}
             <div className="w-24 h-24 border-4 border-foreground rounded-lg flex items-center justify-center bg-background">
               <span className="text-sm font-medium text-foreground">Son Görsel</span>
             </div>
           </div>
           
           <p className="text-muted-foreground max-w-2xl mx-auto">
             AI teknolojimiz, boş odanızın fotoğrafını alır, seçtiğiniz ürünü analiz eder ve 
             mükemmel yerleştirme sonucunu oluşturur.
           </p>
         </div>
      </div>
    </div>
  );
};

export default Portfolio; 