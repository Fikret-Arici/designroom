// AI Service for handling different AI agent operations using Gemini API
import { apiService } from './apiService';

export interface Product {
  id: string;
  name: string;
  price: string;
  rating: number;
  image: string;
  link: string;
  source: 'Trendyol' | 'Amazon' | 'Google Shopping' | 'Etsy';
  description: string;
  colors: string[];
  discount?: number;
  reviewCount: number;
  brand: string;
  shipping: string;
  score: number;
  recommendation: string;
  compatibility: number;
}

export interface RoomAnalysis {
  style: string;
  dominantColors: string[];
  lightingType: string;
  roomSize: string;
  suggestions: string[];
  placementAreas: { x: number; y: number; width: number; height: number }[];
  confidence: number;
  furniture: string[];
  atmosphere: string;
  decorationStyle: string;
}

export interface PlacementResult {
  success: boolean;
  imageUrl: string;
  confidence: number;
  placementInfo: {
    position: { x: number; y: number };
    scale: number;
    rotation: number;
    lighting: string;
  };
  error?: string;
  message?: string;
}

class AIService {
  private static instance: AIService;
  private apiKey: string = '';

  private constructor() {}

  static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
  }

  // Agent 1: Ürün Arama Ajanı - Gemini API ile
  async searchProducts(query: string, roomStyle?: string, roomColors?: string[]): Promise<Product[]> {
    try {
      console.log('🔍 Agent 1: Gemini ile ürün arama başlatılıyor...');
      
      const response = await apiService.searchProducts(query, roomStyle, roomColors);
      
      if (response.success && response.products) {
        console.log(`✅ ${response.products.length} ürün bulundu`);
        return response.products;
      } else {
        console.error('❌ Ürün arama başarısız:', response);
        return this.getFallbackProducts();
      }
    } catch (error) {
      console.error('❌ Ürün arama hatası:', error);
      return this.getFallbackProducts();
    }
  }

  // Agent 2: Oda Görsel Analiz Ajanı - Gemini Vision API ile
  async analyzeRoom(imageBase64: string): Promise<RoomAnalysis> {
    try {
      console.log('👁️ Agent 2: Gemini Vision ile oda analizi başlatılıyor...');
      
      const response = await apiService.analyzeRoom(imageBase64);
      
      if (response.success && response.analysis) {
        console.log('✅ Oda analizi tamamlandı:', response.analysis);
        return response.analysis;
      } else {
        console.error('❌ Oda analizi başarısız:', response);
        return this.getFallbackRoomAnalysis();
      }
    } catch (error) {
      console.error('❌ Oda analizi hatası:', error);
      return this.getFallbackRoomAnalysis();
    }
  }

  // Agent 3: Yerleştirme Ajanı - Gemini ile
  async placeProductInRoom(
    roomImageBase64: string,
    productImageBase64: string,
    placementArea: { x: number; y: number; width: number; height: number },
    roomAnalysis: RoomAnalysis
  ): Promise<PlacementResult> {
    try {
      console.log('🎨 Agent 3: Gemini ile ürün yerleştirme başlatılıyor...');
      
      const placementData = {
        area: placementArea,
        analysis: roomAnalysis
      };
      
      const response = await apiService.placeProduct(roomImageBase64, productImageBase64, placementData);
      
      if (response.success && response.result) {
        console.log('✅ Ürün yerleştirme tamamlandı');
        return response.result;
      } else {
        console.error('❌ Ürün yerleştirme başarısız:', response);
        return this.getFallbackPlacementResult();
      }
    } catch (error) {
      console.error('❌ Ürün yerleştirme hatası:', error);
      return this.getFallbackPlacementResult();
    }
  }

  // Fallback methods for error cases
  private getFallbackProducts(): Product[] {
    return [
      {
        id: 'fallback_1',
        name: 'Modern Soyut Tablo',
        price: '₺299',
        rating: 4.5,
        image: 'https://via.placeholder.com/300x400/4F46E5/FFFFFF?text=Modern+Tablo',
        link: '#',
        source: 'Trendyol',
        description: 'Modern oda dekorasyonu için ideal soyut sanat eseri',
        colors: ['Mavi', 'Beyaz'],
        reviewCount: 50,
        brand: 'ArtDecor',
        shipping: 'Ücretsiz Kargo',
        score: 85,
        recommendation: 'Modern tarzla uyumlu',
        compatibility: 0.9
      },
      {
        id: 'fallback_2',
        name: 'Doğa Manzarası Canvas',
        price: '₺445',
        rating: 4.8,
        image: 'https://via.placeholder.com/300x400/10B981/FFFFFF?text=Doğa+Canvas',
        link: '#',
        source: 'Amazon',
        description: 'Huzur veren doğa manzarası, her oda için uygun',
        colors: ['Yeşil', 'Kahverengi'],
        reviewCount: 120,
        brand: 'NatureArt',
        shipping: 'Ücretsiz Kargo',
        score: 92,
        recommendation: 'Yüksek kalite ve müşteri memnuniyeti',
        compatibility: 0.85
      }
    ];
  }

  private getFallbackRoomAnalysis(): RoomAnalysis {
    return {
      style: 'Modern Minimalist',
      dominantColors: ['Beyaz', 'Gri', 'Mavi'],
      lightingType: 'Doğal Işık (Gündüz)',
      roomSize: 'Orta Boy Yatak Odası',
      suggestions: [
        'Yatak başı duvarı en uygun yerleştirme alanı',
        'Açık renk tonları oda ile uyumlu',
        'Orta boy (60x40cm) tablolar ideal boyut',
        'Minimalist tarzla uyumlu sade çerçeveler tercih edin'
      ],
      placementAreas: [
        { x: 30, y: 20, width: 40, height: 30 },
        { x: 70, y: 40, width: 25, height: 20 }
      ],
      confidence: 0.75,
      furniture: ['Yatak', 'Komodin', 'Dolap'],
      atmosphere: 'Sakin ve huzurlu',
      decorationStyle: 'Minimalist'
    };
  }

  private getFallbackPlacementResult(): PlacementResult {
    return {
      success: false,
      imageUrl: '',
      confidence: 0,
      placementInfo: {
        position: { x: 0, y: 0 },
        scale: 1.0,
        rotation: 0,
        lighting: 'Varsayılan'
      },
      error: 'Gemini API ile bağlantı kurulamadı',
      message: 'Lütfen internet bağlantınızı kontrol edin veya daha sonra tekrar deneyin'
    };
  }
}

export default AIService;