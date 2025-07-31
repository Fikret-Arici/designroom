// API Service for connecting to backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export interface UploadResponse {
  success: boolean;
  imageId: string;
  base64: string;
  message: string;
}

export interface ProductSearchResponse {
  success: boolean;
  products: any[];
  count: number;
  message: string;
}

export interface RoomAnalysisResponse {
  success: boolean;
  analysis: any;
  message: string;
}

export interface PlacementResponse {
  success: boolean;
  result: any;
  message: string;
}

export interface RoomCommentResponse {
  success: boolean;
  comment: {
    text: string;
    confidence: number;
    timestamp: string;
    isFallback?: boolean;
  };
  message: string;
}

class ApiService {
  private static instance: ApiService;

  private constructor() {}

  static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  // Upload room image
  async uploadRoom(formData: FormData): Promise<UploadResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/upload-room`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Dosya yükleme hatası:', error);
      throw new Error('Dosya yükleme sırasında hata oluştu');
    }
  }

  // Search products
  async searchProducts(query: string, roomStyle?: string, roomColors?: string[]): Promise<ProductSearchResponse> {
    try {
      console.log('🔍 API: Ürün arama isteği gönderiliyor...', { query, roomStyle, roomColors });
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 saniye timeout
      
      const response = await fetch(`${API_BASE_URL}/search-products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          roomStyle,
          roomColors,
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (response.status === 429) {
        throw new Error('Çok fazla istek gönderildi. Lütfen biraz bekleyip tekrar deneyin.');
      }

      if (response.status === 503) {
        throw new Error('Sunucu geçici olarak kullanılamıyor. Lütfen daha sonra tekrar deneyin.');
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ API: Ürün arama yanıtı alındı');
      return result;
    } catch (error) {
      console.error('❌ API: Ürün arama hatası:', error);
      
      if (error.name === 'AbortError') {
        throw new Error('İstek zaman aşımına uğradı. Lütfen tekrar deneyin.');
      }
      
      if (error.message.includes('Rate limit')) {
        throw new Error('Çok fazla istek gönderildi. Lütfen biraz bekleyip tekrar deneyin.');
      }
      
      throw new Error('Ürün arama sırasında hata oluştu');
    }
  }

  // Analyze room
  async analyzeRoom(imageBase64: string): Promise<RoomAnalysisResponse> {
    try {
      console.log('👁️ API: Oda analizi isteği gönderiliyor...');
      
      const response = await fetch(`${API_BASE_URL}/analyze-room`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageBase64,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ API: Oda analizi yanıtı alındı');
      return result;
    } catch (error) {
      console.error('❌ API: Oda analizi hatası:', error);
      throw new Error('Oda analizi sırasında hata oluştu');
    }
  }

  // Place product in room
  async placeProduct(roomImageBase64: string, productImageBase64: string, placementData: any): Promise<PlacementResponse> {
    try {
      console.log('🎨 API: Ürün yerleştirme isteği gönderiliyor...');
      
      const response = await fetch(`${API_BASE_URL}/place-product`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roomImageBase64,
          productImageBase64,
          placementData,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ API: Ürün yerleştirme yanıtı alındı');
      return result;
    } catch (error) {
      console.error('❌ API: Ürün yerleştirme hatası:', error);
      throw new Error('Ürün yerleştirme sırasında hata oluştu');
    }
  }

  // Comment room
  async commentRoom(imageBase64: string): Promise<RoomCommentResponse> {
    try {
      console.log('💬 API: Oda yorumu isteği gönderiliyor...');
      
      const response = await fetch(`${API_BASE_URL}/comment-room`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageBase64,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ API: Oda yorumu yanıtı alındı');
      return result;
    } catch (error) {
      console.error('❌ API: Oda yorumu hatası:', error);
      throw new Error('Oda yorumu sırasında hata oluştu');
    }
  }

  // Health check
  async healthCheck(): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Health check hatası:', error);
      throw new Error('Sunucu bağlantısı kontrol edilemedi');
    }
  }
}

export const apiService = ApiService.getInstance();
export default ApiService; 