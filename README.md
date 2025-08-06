# 🎨 AI Destekli Dekoratif Ürün Yerleştirme Sistemi

Bu proje, kullanıcıların oda fotoğraflarını yükleyerek AI destekli dekoratif ürün yerleştirme deneyimi yaşamalarını sağlayan modern bir web uygulamasıdır. 3 farklı AI agent koordineli şekilde çalışarak kullanıcıya mükemmel dekorasyon önerileri sunar.

## 📋 İçerik Tablosu

- [🚀 Özellikler](#-özellikler)
- [🛠️ Teknolojiler](#️-teknolojiler)
- [📦 Kurulum](#-kurulum)
- [🚀 Kullanım](#-kullanım)
- [🏗️ Proje Yapısı](#️-proje-yapısı)
- [🔧 Geliştirme](#-geliştirme)
- [📊 API Endpoints](#-api-endpoints)
- [🎨 UI/UX Özellikleri](#-uiux-özellikleri)
- [🔮 Gelecek Özellikler](#-gelecek-özellikler)
- [🤝 Katkıda Bulunma](#-katkıda-bulunma)
- [📄 Lisans](#-lisans)

---

## 🚀 Özellikler

### 🤖 AI Agent Mimarisi
- **🔍 Agent 1: Ürün Arama Ajanı** - Metin tanımından uygun ürünleri bulma
- **👁️ Agent 2: Oda Görsel Analiz Ajanı** - GPT-4 Vision ile oda analizi
- **🎨 Agent 3: Yerleştirme Ajanı** - DALL·E Edit ile fotorealistik yerleştirme

### ✨ Ana Özellikler
- 📸 **Oda Fotoğrafı Yükleme** - Drag & drop ile kolay yükleme
- 🔍 **AI Destekli Ürün Arama** - Amazon, Etsy, Trendyol entegrasyonu
- 🎨 **Otomatik Oda Analizi** - Stil ve renk paletini otomatik tespit
- 🖼️ **Fotorealistik Yerleştirme** - Doğal görünümlü ürün entegrasyonu
- 📱 **Responsive Tasarım** - Tüm cihazlarda mükemmel deneyim
- ⚡ **Gerçek Zamanlı İşlem** - Hızlı AI yanıtları

---

## 🛠️ Teknolojiler

<table>
<tr>
<td valign="top">

### 🎯 Frontend
- **React 18** + **TypeScript**
- **Vite** - Hızlı geliştirme ortamı
- **Tailwind CSS** - Modern UI tasarımı
- **Shadcn/ui** - Hazır bileşenler
- **React Router** - Sayfa yönlendirme
- **React Query** - Veri yönetimi

</td>
<td valign="top">

### ⚙️ Backend
- **Node.js** + **Express.js**
- **Multer** - Dosya yükleme
- **OpenAI API** - GPT-4 Vision ve DALL·E
- **CORS** - Cross-origin desteği

</td>
</tr>
</table>

---

## 📦 Kurulum

### ⚡ Hızlı Başlangıç

#### 🔧 Gereksinimler
- Node.js 18+
- npm veya yarn
- OpenAI API anahtarı

#### 1️⃣ Projeyi Klonlayın
```bash
git clone https://github.com/your-username/ai-decor-dream.git
cd ai-decor-dream
```

#### 2️⃣ Frontend Kurulumu
```bash
# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev
```

#### 3️⃣ Backend Kurulumu
```bash
# Backend dizinine gidin
cd backend

# Bağımlılıkları yükleyin
npm install

# Environment dosyasını oluşturun
cp .env.example .env

# Geliştirme sunucusunu başlatın
npm run dev
```

#### 4️⃣ Environment Yapılandırması

**Frontend (`.env`):**
```env
VITE_API_URL=http://localhost:5000/api
```

**Backend (`backend/.env`):**
```env
# AI API Keys
GEMINI_API_KEY=your-gemini-api-key-here

# Google Custom Search API
GOOGLE_SEARCH_API_KEY=your-google-search-api-key-here
GOOGLE_SEARCH_ENGINE_ID=your-google-search-engine-id-here

# Server Configuration
PORT=5000
NODE_ENV=development
```

> ⚠️ **Önemli:** 
> - **Gemini API Key**: [Google AI Studio](https://makersuite.google.com/app/apikey) üzerinden ücretsiz alabilirsiniz
> - **Google Search API Key**: [Google Cloud Console](https://console.cloud.google.com/apis/credentials) üzerinden alabilirsiniz
> - **Google Search Engine ID**: [Google Programmable Search Engine](https://programmablesearchengine.google.com/about/) üzerinden oluşturabilirsiniz

#### 🔧 Google Custom Search Engine Kurulumu

1. **Search Engine Oluşturma:**
   - [Google Programmable Search Engine](https://programmablesearchengine.google.com/about/) adresine gidin
   - "Create a search engine" butonuna tıklayın
   - Sites to search kısmına şu siteleri ekleyin:
     ```
     trendyol.com
     hepsiburada.com
     n11.com
     amazon.com.tr
     gittigidiyor.com
     ```
   - "Create" butonuna tıklayın

2. **Search Engine ID Alma:**
   - Oluşturulan search engine'de "Setup" sekmesine gidin
   - "Search engine ID" değerini kopyalayın (cx parametresi)

3. **API Key Alma:**
   - [Google Cloud Console](https://console.cloud.google.com/apis/credentials) adresine gidin
   - "Custom Search API" servisini etkinleştirin
   - "Create Credentials" > "API Key" ile yeni anahtar oluşturun

---

## 🚀 Kullanım

### 📝 Adım Adım Kullanım Kılavuzu

| Adım | Açıklama | Süre |
|------|----------|------|
| 1️⃣ | **Oda Fotoğrafı Yükleyin** - Ana sayfada drag & drop ile oda fotoğrafınızı yükleyin | ~5 saniye |
| 2️⃣ | **Ürün Tanımlayın** - İstediğiniz dekoratif ürünü tarif edin | ~10 saniye |
| 3️⃣ | **AI Analizi** - Sistem odanızı otomatik olarak analiz eder | ~15 saniye |
| 4️⃣ | **Ürün Yerleştirme** - AI ürünü odanıza doğal şekilde yerleştirir | ~20 saniye |
| 5️⃣ | **Sonuç İndirin** - Final görseli indirin veya paylaşın | ~2 saniye |

### 💡 İpuçları
- 📷 **Yüksek kaliteli** oda fotoğrafları kullanın
- 🌟 **Detaylı ürün tanımları** yapın  
- 💡 **İyi aydınlatmalı** odalar daha iyi sonuç verir

---

## 🏗️ Proje Yapısı

```
ai-decor-dream/
├── 📁 src/
│   ├── 📁 components/              # React bileşenleri
│   │   ├── 🤖 AIAgent.tsx         # AI agent durum göstergesi
│   │   ├── 📤 ImageUploader.tsx   # Dosya yükleme bileşeni
│   │   ├── 🔍 ProductSearch.tsx   # Ürün arama bileşeni
│   │   ├── 🏠 RoomAnalysis.tsx    # Oda analiz bileşeni
│   │   ├── 🎨 PlacementResult.tsx # Sonuç gösterimi
│   │   └── 📁 ui/                 # Shadcn/ui bileşenleri
│   ├── 📁 services/                # API servisleri
│   │   ├── 🔧 apiService.ts       # Backend API bağlantısı
│   │   ├── 🤖 aiService.ts        # AI servisleri
│   │   └── 🛒 trendyolService.ts  # E-ticaret entegrasyonu
│   ├── 📁 pages/                   # Sayfa bileşenleri
│   │   ├── 🏠 Index.tsx           # Ana sayfa
│   │   └── ❌ NotFound.tsx        # 404 sayfası
│   ├── 📁 hooks/                   # React hooks
│   ├── 📁 lib/                     # Yardımcı fonksiyonlar
│   └── 📁 assets/                  # Görseller ve statik dosyalar
├── 📁 backend/                     # Express.js API
│   ├── 🚀 server.js               # Ana sunucu dosyası
│   ├── 📦 package.json            # Backend bağımlılıkları
│   └── 📁 uploads/                 # Yüklenen dosyalar
└── 📁 public/                      # Statik dosyalar
```

---

## 🔧 Geliştirme

### 💻 Frontend Komutları
```bash
npm run dev          # 🚀 Geliştirme sunucusu başlat
npm run build        # 📦 Production build oluştur
npm run preview      # 👀 Build önizlemesi
npm run lint         # 🔍 Kod kalitesi kontrolü
npm run type-check   # 📝 TypeScript kontrol
```

### ⚙️ Backend Komutları
```bash
cd backend
npm run dev          # 🔄 Nodemon ile geliştirme
npm start            # 🚀 Production sunucu başlat
npm test             # 🧪 Testleri çalıştır
npm run lint         # 🔍 Kod kontrolü
```

---

## 📊 API Endpoints

### 🔌 Backend API

| Method | Endpoint | Açıklama | Yanıt Süresi |
|--------|----------|----------|--------------|
| `POST` | `/api/upload-room` | 📤 Oda fotoğrafı yükleme | ~2s |
| `POST` | `/api/search-products` | 🔍 Google Custom Search API ile ürün arama | ~5s |
| `POST` | `/api/analyze-room` | 👁️ Gemini Vision ile oda analizi | ~8s |
| `POST` | `/api/place-product` | 🎨 Hugging Face REMBG + AI yerleştirme | ~15s |
| `GET` | `/api/health` | ❤️ API durum kontrolü | ~100ms |

### 🔍 Google Custom Search API Entegrasyonu

Proje artık **Google Custom Search API** kullanarak gerçek ürün arama yapıyor:

```javascript
// Google Custom Search API çağrısı
const searchResults = await axios.get('https://www.googleapis.com/customsearch/v1', {
  params: {
    key: GOOGLE_SEARCH_API_KEY,
    cx: GOOGLE_SEARCH_ENGINE_ID,
    q: optimizedQuery,
    searchType: 'image',
    num: 10,
    imgType: 'photo',
    imgSize: 'medium'
  }
});
```

**Desteklenen E-ticaret Siteleri:**
- 🛍️ **Trendyol** - site:trendyol.com
- 🛍️ **Hepsiburada** - site:hepsiburada.com  
- 🛍️ **N11** - site:n11.com
- 🛍️ **Amazon Türkiye** - site:amazon.com.tr
- 🛍️ **GittiGidiyor** - site:gittigidiyor.com

**AI Özellikleri:**
- 🤖 **Gemini Vision** - Ürün görsel analizi
- 🎯 **Smart Filtering** - Oda stili ve renk uyumu
- 📊 **AI Scoring** - Ürün uyumluluk skoru
- 💡 **Smart Recommendations** - Akıllı öneriler

### 📝 API Yanıt Örnekleri

<details>
<summary>📤 Upload Room Response</summary>

```json
{
  "success": true,
  "roomId": "room_123456",
  "imageUrl": "/uploads/room_123456.jpg",
  "message": "Oda fotoğrafı başarıyla yüklendi"
}
```
</details>

<details>
<summary>🔍 Search Products Response</summary>

```json
{
  "success": true,
  "products": [
    {
      "id": "prod_1",
      "name": "Modern Soyut Tablo",
      "price": "₺299",
      "imageUrl": "https://example.com/product1.jpg",
      "source": "trendyol"
    }
  ]
}
```
</details>

---

## 🎨 UI/UX Özellikleri

### ✨ Tasarım Prensipleri
- 🎯 **Kullanıcı Odaklı** - Sezgisel ve kolay kullanım
- 🚀 **Performans** - Hızlı yükleme ve yanıt süreleri
- 📱 **Responsive** - Tüm cihazlarda mükemmel görünüm
- ♿ **Erişilebilirlik** - WCAG 2.1 standartlarına uyum

### 🎭 Öne Çıkan Özellikler
- **🌈 Modern Animasyonlar** - Micro-interactions ve smooth transitions
- **📊 Progress Tracking** - Gerçek zamanlı ilerleme göstergesi
- **🎉 Toast Bildirimleri** - Kullanıcı dostu geri bildirimler
- **🖱️ Drag & Drop** - Sürükle bırak dosya yükleme
- **🌙 Dark Mode** - Göz yorgunluğunu azaltan karanlık tema

---

## 🔮 Gelecek Özellikler

### 🎯 Kısa Vadeli (Q1 2026)
- [ ] 📱 **AR Desteği** - Artırılmış gerçeklik ile önizleme
- [ ] 🎨 **Çoklu Ürün Yerleştirme** - Aynı anda birden fazla ürün
- [ ] 💾 **Kayıt Sistemi** - Kullanıcı hesapları ve favoriler

### 📈 Orta Vadeli (Q2-Q3 2026)
- [ ] 🔗 **Sosyal Medya Entegrasyonu** - Instagram, Pinterest paylaşımı
- [ ] 💳 **Premium Özellikler** - Gelişmiş AI modelleri ve özellikler
- [ ] 🎓 **3D Oda Modelleme** - 3D ortamda ürün yerleştirme

### 🚀 Uzun Vadeli (Q4 2026+)
- [ ] 📱 **Mobil Uygulama** - iOS ve Android native uygulamalar
- [ ] 🤝 **B2B Çözümler** - İç mimar ve mobilyacılar için özel araçlar
- [ ] 🌍 **Çoklu Dil Desteği** - Uluslararası pazara açılım

---

## 🤝 Katkıda Bulunma

Projeye katkıda bulunmak isterseniz:

### 📋 Katkı Süreci
1. 🍴 **Fork** yapın
2. 🌿 **Feature branch** oluşturun (`git checkout -b feature/amazing-feature`)
3. 💾 **Commit** yapın (`git commit -m 'feat: add amazing feature'`)
4. 📤 **Push** yapın (`git push origin feature/amazing-feature`)
5. 🔄 **Pull Request** oluşturun

### 📝 Commit Kuralları
```
feat: yeni özellik ekleme
fix: hata düzeltme
docs: dokümantasyon güncellemesi
style: kod formatı düzenleme
refactor: kod yeniden düzenleme
test: test ekleme/güncelleme
```

### 🐛 Hata Bildirimi
Hata bulduğunuzda lütfen şunları belirtin:
- 🖥️ İşletim sistemi ve tarayıcı bilgisi
- 📋 Hatayı yeniden oluşturma adımları
- 📸 Ekran görüntüleri (varsa)
- 📊 Konsol hata mesajları

---

## 📄 Lisans

Bu proje **MIT Lisansı** altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakabilirsiniz.

```
MIT License - Özgürce kullanabilir, değiştirebilir ve dağıtabilirsiniz! 🎉
```

---

## 🙏 Teşekkürler

Bu projeyi mümkün kılan harika araçlara teşekkürler:

- 🤖 [OpenAI](https://openai.com/) - GPT-4 Vision ve DALL·E API'leri
- 🎨 [Shadcn/ui](https://ui.shadcn.com/) - Muhteşem UI bileşenleri
- 💨 [Tailwind CSS](https://tailwindcss.com/) - Modern CSS framework
- ⚡ [Vite](https://vitejs.dev/) - Süper hızlı build tool
- ⚛️ [React](https://react.dev/) - Güçlü UI kütüphanesi

---

<div align="center">

**🎨 AI Destekli Dekoratif Ürün Yerleştirme Sistemi**  
*Geleceğin dekorasyon deneyimi* ✨

[🏠 Ana Sayfa](/) | [📖 Dokümantasyon](./PROJE_DOKUMANTASYONU.md) | [🐛 Hata Bildir](https://github.com/your-username/ai-decor-dream/issues)

</div>
