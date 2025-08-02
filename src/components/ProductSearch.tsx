import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, ExternalLink, Star, TrendingUp, Truck, Sparkles, Tag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ApiService from '@/services/apiService';

interface Product {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  rating: number;
  reviewCount: number;
  image: string;
  link: string;
  source: string;
  brand: string;
  description: string;
  features?: string[];
  colors?: string[];
  sizes?: string[];
  shipping?: string;
  seller?: string;
  aiScore?: number;
  aiRecommendation?: string;
}

interface ProductSearchProps {
  onProductSelect: (product: Product) => void;
  roomStyle?: string;
  roomColors?: string[];
  initialSearchQuery?: string;
  onSearchQueryChange?: (query: string) => void;
}

export const ProductSearch = ({ onProductSelect, roomStyle, roomColors, initialSearchQuery, onSearchQueryChange }: ProductSearchProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const { toast } = useToast();
  const apiService = ApiService.getInstance();

  // initialSearchQuery değiştiğinde searchQuery'yi güncelle ve otomatik arama yap
  useEffect(() => {
    if (initialSearchQuery && initialSearchQuery !== searchQuery) {
      setSearchQuery(initialSearchQuery);
      // Küçük bir delay ile otomatik arama yap
      setTimeout(() => {
        handleSearchWithQuery(initialSearchQuery);
      }, 500);
    }
  }, [initialSearchQuery]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSearchWithQuery = async (query: string) => {
    if (!query.trim()) {
      toast({
        title: "Hata",
        description: "Lütfen aramak istediğiniz ürünü tanımlayın.",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);

    try {
      console.log('AI ürün arama başlatılıyor...');
      const response = await apiService.searchProducts(query, roomStyle, roomColors);

      if (response.products && response.products.length > 0) {
        setProducts(response.products);
        toast({
          title: "Arama Tamamlandı",
          description: `${response.products.length} ürün bulundu`,
        });
      } else {
        setProducts([]);
        toast({
          title: "Ürün Bulunamadı",
          description: "Aradığınız kriterlere uygun ürün bulunamadı. Farklı anahtar kelimeler deneyin.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error('Arama hatası:', error);

      let errorMessage = "Ürün arama sırasında bir hata oluştu.";

      if (error.message.includes('Rate limit') || error.message.includes('Çok fazla istek')) {
        errorMessage = "Çok fazla istek gönderildi. Lütfen 1 dakika bekleyip tekrar deneyin.";
      } else if (error.message.includes('zaman aşımı')) {
        errorMessage = "İstek zaman aşımına uğradı. Lütfen tekrar deneyin.";
      } else if (error.message.includes('Sunucu geçici')) {
        errorMessage = "Sunucu geçici olarak kullanılamıyor. Lütfen daha sonra tekrar deneyin.";
      }

      toast({
        title: "Arama Hatası",
        description: errorMessage,
        variant: "destructive",
      });

      setProducts([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearch = async () => {
    await handleSearchWithQuery(searchQuery);
  };

  const handleProductSelect = (product: Product) => {
    onProductSelect(product);
    toast({
      title: "Ürün Seçildi",
      description: `${product.name} yerleştirme için seçildi.`,
    });
  };

  const formatPrice = (price: string) => {
    return price.replace('TL', '₺');
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            AI Ürün Arama
          </h3>
          <p className="text-sm text-muted-foreground">
            İstediğiniz tabloyu tanımlayın, AI ajanımız Trendyol'dan uygun seçenekleri bulsun
          </p>
          {roomColors && roomColors.length > 0 && (
            <div className="flex items-center gap-1 mt-2">
              <span className="text-xs text-muted-foreground">Oda renkleri:</span>
              {roomColors.map((color, index) => (
                <Badge key={index} variant="outline" className="text-xs">{color}</Badge>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Input
            placeholder="Örn: mavi tonlarda soyut tablo, küçük boyut"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (onSearchQueryChange) {
                onSearchQueryChange(e.target.value);
              }
            }}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button
            onClick={handleSearch}
            disabled={isSearching}
            className="bg-gradient-button"
          >
            {isSearching ? (
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <div className="w-4 h-4 border-2 border-white/30 rounded-full"></div>
                  <div className="absolute top-0 left-0 w-4 h-4 border-2 border-transparent border-t-white rounded-full animate-spin"></div>
                </div>
                <span className="text-xs">Aranıyor</span>
              </div>
            ) : (
              <Search className="w-4 h-4" />
            )}
          </Button>
        </div>

        {isSearching && (
          <Card className="p-6 border-ai/30 bg-gradient-card">
            <div className="flex flex-col items-center space-y-4">
              {/* Modern Loading Animation */}
              <div className="relative">
                <div className="w-16 h-16 border-4 border-ai/20 rounded-full"></div>
                <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-ai rounded-full animate-spin"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-8 h-8 bg-gradient-ai rounded-full animate-pulse"></div>
                </div>
              </div>
              
              {/* Loading Text with Typing Effect */}
              <div className="text-center space-y-2">
                <h4 className="font-semibold text-ai">AI Ajanı Çalışıyor</h4>
                <div className="flex items-center justify-center space-x-1">
                  <span className="text-sm text-muted-foreground">Trendyol'da ürün arıyor</span>
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-ai rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-1 h-1 bg-ai rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-1 h-1 bg-ai rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
              
              {/* Progress Steps */}
              <div className="w-full max-w-xs space-y-2">
                <div className="flex items-center space-x-2 text-xs">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-muted-foreground">AI sorgusu analiz ediliyor</span>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <div className="w-2 h-2 bg-ai rounded-full animate-pulse"></div>
                  <span className="text-ai">Trendyol API'sine bağlanılıyor</span>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <div className="w-2 h-2 bg-muted rounded-full"></div>
                  <span className="text-muted-foreground">Ürünler filtreleniyor</span>
                </div>
              </div>
            </div>
          </Card>
        )}

        {products.length > 0 && !isSearching && (
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Bulunan Ürünler:</h4>
            {products.map((product) => (
              <Card key={product.id} className="p-4 hover:border-ai transition-all duration-300">
                <div className="flex gap-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-lg border"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h5 className="font-semibold text-foreground">{product.name}</h5>
                          {product.aiScore && (
                            <Badge variant="secondary" className="text-xs">
                              <Sparkles className="w-3 h-3 mr-1" />
                              AI: {product.aiScore}
                            </Badge>
                          )}
                        </div>

                        <p className="text-sm text-muted-foreground mb-2">{product.description}</p>

                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-xs">{product.source}</Badge>
                          <Badge variant="outline" className="text-xs">{product.brand}</Badge>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs text-muted-foreground">{product.rating}</span>
                            <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
                          </div>
                        </div>

                        {product.colors && product.colors.length > 0 && (
                          <div className="flex items-center gap-1 mb-2">
                            <span className="text-xs text-muted-foreground">Renkler:</span>
                            {product.colors.map((color, index) => (
                              <Badge key={index} variant="outline" className="text-xs">{color}</Badge>
                            ))}
                          </div>
                        )}

                        {product.aiRecommendation && (
                          <div className="flex items-center gap-1 mb-2">
                            <Tag className="w-3 h-3 text-ai" />
                            <span className="text-xs text-ai">{product.aiRecommendation}</span>
                          </div>
                        )}

                        {product.features && product.features.length > 0 && (
                          <div className="text-xs text-muted-foreground">
                            {product.features.slice(0, 2).join(' • ')}
                          </div>
                        )}
                      </div>

                      <div className="text-right ml-4">
                        <div className="mb-2">
                          {product.originalPrice && (
                            <p className="text-xs text-muted-foreground line-through">
                              {formatPrice(product.originalPrice)}
                            </p>
                          )}
                          <p className="font-bold text-ai text-lg">
                            {formatPrice(product.price)}
                          </p>
                          {product.discount && (
                            <Badge variant="destructive" className="text-xs">
                              {product.discount}
                            </Badge>
                          )}
                        </div>

                        {product.shipping && (
                          <div className="flex items-center gap-1 mb-2">
                            <Truck className="w-3 h-3 text-green-500" />
                            <span className="text-xs text-green-500">{product.shipping}</span>
                          </div>
                        )}

                        <Button
                          size="sm"
                          onClick={() => handleProductSelect(product)}
                          className="w-full"
                        >
                          Seç
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Button variant="ghost" size="sm" asChild>
                    <a href={product.link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};