// Trendyol ürün arama servisi
// GitHub'daki ai-product-finder-trendyol projesinden esinlenilerek adaptasyon

export interface TrendyolProduct {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  rating: number;
  reviewCount: number;
  image: string;
  link: string;
  brand: string;
  description: string;
  features: string[];
  colors?: string[];
  sizes?: string[];
}

export interface TrendyolSearchParams {
  query: string;
  color?: string;
  minPrice?: number;
  maxPrice?: number;
  brand?: string;
  sortBy?: 'RELEVANCE' | 'PRICE_LOW_TO_HIGH' | 'PRICE_HIGH_TO_LOW' | 'BEST_SELLING';
  limit?: number;
}

class TrendyolService {
  private static instance: TrendyolService;
  private baseUrl = 'https://www.trendyol.com';
  
  private constructor() {}

  static getInstance(): TrendyolService {
    if (!TrendyolService.instance) {
      TrendyolService.instance = new TrendyolService();
    }
    return TrendyolService.instance;
  }

  // Trendyol'da ürün arama
  async searchProducts(params: TrendyolSearchParams): Promise<TrendyolProduct[]> {
    try {
      console.log('Trendyol\'da ürün aranıyor:', params);
      
      // Bu implementation gerçek production'da backend API çağrısı olacak
      // Backend'de Playwright veya Selenium ile scraping yapılacak
      const searchResults = await this.mockTrendyolSearch(params);
      
      return searchResults;
    } catch (error) {
      console.error('Trendyol arama hatası:', error);
      throw new Error('Ürün arama sırasında hata oluştu');
    }
  }

  // AI tabanlı ürün önerisi (GitHub projesindeki gibi)
  async getAIRecommendations(
    query: string, 
    roomStyle?: string, 
    roomColors?: string[]
  ): Promise<TrendyolProduct[]> {
    try {
      // AI ile sorguyu optimize et
      const optimizedQuery = await this.optimizeSearchQuery(query, roomStyle, roomColors);
      
      // Trendyol'da arama yap
      const searchParams: TrendyolSearchParams = {
        query: optimizedQuery,
        sortBy: 'RELEVANCE',
        limit: 10
      };

      const products = await this.searchProducts(searchParams);
      
      // AI ile ürünleri analiz et ve filtrele
      const analyzedProducts = await this.analyzeProducts(products, query, roomStyle);
      
      return analyzedProducts;
    } catch (error) {
      console.error('AI öneri hatası:', error);
      throw new Error('AI önerisi alınırken hata oluştu');
    }
  }

  // Mock Trendyol arama (gerçek implementasyon için backend gerekli)
  private async mockTrendyolSearch(params: TrendyolSearchParams): Promise<TrendyolProduct[]> {
    // Simulated delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const mockProducts: TrendyolProduct[] = [
      {
        id: 'tr_001',
        name: 'Modern Soyut Mavi Tablo - 50x70 cm',
        price: '289,99 TL',
        originalPrice: '399,99 TL',
        discount: '%28',
        rating: 4.8,
        reviewCount: 156,
        image: '/placeholder.svg',
        link: 'https://www.trendyol.com/mock-product-1',
        brand: 'ArtDecor',
        description: 'Modern yaşam alanları için tasarlanmış soyut mavi tonlarda duvar tablosu',
        features: [
          'UV dayanımlı baskı',
          'Çerçevesiz tasarım',
          'Kolay asım sistemi',
          'Mat finish yüzey'
        ],
        colors: ['Mavi', 'Beyaz', 'Gri'],
        sizes: ['50x70 cm']
      },
      {
        id: 'tr_002',
        name: 'Minimalist Geometrik Duvar Sanatı',
        price: '199,99 TL',
        rating: 4.6,
        reviewCount: 89,
        image: '/placeholder.svg',
        link: 'https://www.trendyol.com/mock-product-2',
        brand: 'HomeArt',
        description: 'Minimalist tarzda geometrik desenli modern duvar dekorasyonu',
        features: [
          'Premium canvas malzeme',
          'Çevre dostu boyalar',
          'Çok boyut seçeneği',
          'Hızlı kargo'
        ],
        colors: ['Siyah', 'Beyaz', 'Gri'],
        sizes: ['40x60 cm', '50x70 cm', '60x80 cm']
      },
      {
        id: 'tr_003',
        name: 'Doğa Temalı Canvas Tablo Seti',
        price: '449,99 TL',
        originalPrice: '599,99 TL',
        discount: '%25',
        rating: 4.9,
        reviewCount: 234,
        image: '/placeholder.svg',
        link: 'https://www.trendyol.com/mock-product-3',
        brand: 'NatureArt',
        description: '3\'lü set halinde doğa manzaralı canvas tablolar',
        features: [
          '3 parça set',
          'Yüksek çözünürlük baskı',
          'Ahşap çerçeve dahil',
          'Kolay montaj kiti'
        ],
        colors: ['Yeşil', 'Kahverengi', 'Mavi'],
        sizes: ['30x40 cm (3\'lü)']
      }
    ];

    // Sorguya göre filtreleme yap
    let filteredProducts = mockProducts;

    if (params.query) {
      const queryLower = params.query.toLowerCase();
      filteredProducts = filteredProducts.filter(product => 
        product.name.toLowerCase().includes(queryLower) ||
        product.description.toLowerCase().includes(queryLower) ||
        product.features.some(feature => feature.toLowerCase().includes(queryLower))
      );
    }

    if (params.color) {
      filteredProducts = filteredProducts.filter(product =>
        product.colors?.some(color => 
          color.toLowerCase().includes(params.color!.toLowerCase())
        )
      );
    }

    if (params.minPrice || params.maxPrice) {
      filteredProducts = filteredProducts.filter(product => {
        const price = parseFloat(product.price.replace(/[^\d,]/g, '').replace(',', '.'));
        if (params.minPrice && price < params.minPrice) return false;
        if (params.maxPrice && price > params.maxPrice) return false;
        return true;
      });
    }

    return filteredProducts.slice(0, params.limit || 10);
  }

  // AI ile arama sorgusunu optimize et
  private async optimizeSearchQuery(
    userQuery: string, 
    roomStyle?: string, 
    roomColors?: string[]
  ): Promise<string> {
    // GPT-4 ile sorguyu optimize et
    let optimizedQuery = userQuery;

    // Oda stiline göre anahtar kelimeler ekle
    if (roomStyle) {
      const styleKeywords = this.getStyleKeywords(roomStyle);
      optimizedQuery += ` ${styleKeywords}`;
    }

    // Oda renklerine göre renk filtresi ekle
    if (roomColors && roomColors.length > 0) {
      optimizedQuery += ` ${roomColors[0]} tonlarda`;
    }

    // Tablo/dekorasyon anahtar kelimeleri ekle
    optimizedQuery += ' tablo duvar dekorasyonu canvas';

    console.log('Optimize edilmiş sorgu:', optimizedQuery);
    return optimizedQuery;
  }

  // Oda stiline göre anahtar kelimeler
  private getStyleKeywords(style: string): string {
    const styleMap: { [key: string]: string } = {
      'Modern Minimalist': 'modern minimalist sade',
      'Klasik': 'klasik antika vintage',
      'Bohem': 'bohem renkli etnik',
      'Endüstriyel': 'endüstriyel metal siyah',
      'Scandinavian': 'nordic beyaz doğa'
    };

    return styleMap[style] || 'modern';
  }

  // AI ile ürün analizi
  private async analyzeProducts(
    products: TrendyolProduct[], 
    originalQuery: string, 
    roomStyle?: string
  ): Promise<TrendyolProduct[]> {
    // AI ile her ürünü analiz et ve skorla
    const analyzedProducts = products.map(product => ({
      ...product,
      aiScore: this.calculateAIScore(product, originalQuery, roomStyle)
    }));

    // AI skoruna göre sırala
    analyzedProducts.sort((a, b) => b.aiScore - a.aiScore);

    return analyzedProducts.slice(0, 5); // En iyi 5 ürünü döndür
  }

  // AI skoru hesaplama
  private calculateAIScore(
    product: TrendyolProduct, 
    query: string, 
    roomStyle?: string
  ): number {
    let score = 0;

    // İsim ve açıklama eşleşmesi
    const queryWords = query.toLowerCase().split(' ');
    const productText = (product.name + ' ' + product.description).toLowerCase();
    
    queryWords.forEach(word => {
      if (productText.includes(word)) {
        score += 10;
      }
    });

    // Rating skoru
    score += product.rating * 5;

    // Yorum sayısı skoru
    score += Math.min(product.reviewCount / 10, 20);

    // İndirim skoru
    if (product.discount) {
      score += 15;
    }

    // Oda stili uyumu
    if (roomStyle && product.description.toLowerCase().includes(roomStyle.toLowerCase())) {
      score += 25;
    }

    return score;
  }

  // Ürün detaylarını getir
  async getProductDetails(productId: string): Promise<TrendyolProduct | null> {
    try {
      // Bu gerçek implementasyonda backend API çağrısı olacak
      const products = await this.mockTrendyolSearch({ query: '', limit: 100 });
      return products.find(p => p.id === productId) || null;
    } catch (error) {
      console.error('Ürün detay hatası:', error);
      return null;
    }
  }
}

export default TrendyolService;