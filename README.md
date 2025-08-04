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
- **🔍 Agent 1: Ürün Arama Ajanı** - Gemini AI ile metin tanımından uygun ürünleri bulma
- **🎨 Agent 2: Yerleştirme Ajanı** - GPT-4 Vision ile gerçekçi ürün yerleştirme
- **💬 Agent 3: Oda Yorum Ajanı** - Gemini AI ile detaylı oda analizi ve yorumlar

### ✨ Ana Özellikler
- 📸 **Oda Fotoğrafı Yükleme** - Drag & drop ile kolay yükleme
- 🔍 **Trendtol AI Ürün Arama** - Gemini AI analizi
- 🎨 **GPT-4 Vision Yerleştirme** - Gerçekçi ürün yerleştirme
- 💬 **Gemini AI Oda Yorumları** - Detaylı oda analizi ve öneriler
- 🛍️ **Gemini AI Dekoratif Öneriler** - Oda stiline uygun ürün önerileri
- 📱 **Responsive Tasarım** - Tüm cihazlarda mükemmel deneyim
- ⚡ **Hızlı İşlem** - Optimize edilmiş 3 adımlı süreç
- 🎯 **Tooltip Sistemi** - AI Agent'lar hakkında detaylı bilgi

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
- **Lucide React** - Modern ikonlar

</td>
<td valign="top">

### ⚙️ Backend
- **Node.js** + **Express.js**
- **Multer** - Dosya yükleme
- **Gemini API** - Google AI Vision analizi ve metin işleme
- **GPT-4 Vision API** - Ürün yerleştirme
- **Google Custom Search API** - Ürün arama
- **Puppeteer** - Web scraping
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
- Gemini API anahtarı
- GPT-4 Vision API anahtarı

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
cp env.example .env

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
OPENAI_API_KEY=your-openai-api-key-here


# Server Configuration
PORT=5000
NODE_ENV=development
```

> ⚠️ **Önemli:** 
> - **Gemini API Key**: [Google AI Studio](https://makersuite.google.com/app/apikey) üzerinden ücretsiz alabilirsiniz
> - **OpenAI API Key**: [OpenAI Platform](https://platform.openai.com/api-keys) üzerinden alabilirsiniz



## 🚀 Kullanım

### 📝 Adım Adım Kullanım Kılavuzu

| Adım | Açıklama | Süre |
|------|----------|------|
| 1️⃣ | **Oda Fotoğrafı Yükleyin** - Ana sayfada drag & drop ile oda fotoğrafınızı yükleyin | ~5 saniye |
| 2️⃣ | **Ürün Seçin** - İstediğiniz dekoratif ürünü tarif edin veya yükleyin | ~10 saniye |
| 3️⃣ | **AI Yerleştirme** - GPT-4 Vision ürünü odanıza gerçekçi şekilde yerleştirir | ~20 saniye |

### 💡 İpuçları
- 📷 **Yüksek kaliteli** oda fotoğrafları kullanın
- 🌟 **Detaylı ürün tanımları** yapın  
- 💡 **İyi aydınlatmalı** odalar daha iyi sonuç verir
- 💬 **AI yorumlarını** okuyarak daha iyi öneriler alın
- 🖱️ **AI Agent kartlarına** hover yaparak detaylı bilgi alın

---

## 🏗️ Proje Yapısı

```
ai-decor-dream/
├── 📁 src/
│   ├── 📁 components/              # React bileşenleri
│   │   ├── 🤖 AIAgent.tsx         # AI agent durum göstergesi (tooltip'li)
│   │   ├── 📤 ImageUploader.tsx   # Dosya yükleme bileşeni
│   │   ├── 🔍 ProductSearch.tsx   # Ürün arama bileşeni
│   │   ├── 🎨 PlacementResult.tsx # GPT-4 Vision sonuç gösterimi
│   │   ├── 💬 RoomComment.tsx     # AI oda yorumları
│   │   ├── 🛍️ DecorSuggestions.tsx # Dekoratif ürün önerileri
│   │   └── 📁 ui/                 # Shadcn/ui bileşenleri
│   ├── 📁 services/                # API servisleri
│   │   ├── 🔧 apiService.ts       # Backend API bağlantısı
│   │   └── 🤖 aiService.ts        # AI servisleri
│   ├── 📁 pages/                   # Sayfa bileşenleri
│   │   ├── 🏠 Index.tsx           # Ana sayfa (3 adımlı süreç)
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
| `POST` | `/api/comment-room` | 💬 Gemini AI ile oda yorumu oluşturma | ~6s |
| `POST` | `/api/suggest-decor-products` | 🛍️ Dekoratif ürün önerileri | ~8s |
| `POST` | `/api/generate-product-placement` | 🎨 GPT-4 Vision ile ürün yerleştirme | ~20s |
| `GET` | `/api/health` | ❤️ API durum kontrolü | ~100ms |


```

**Desteklenen E-ticaret Siteleri:**
- 🛍️ **Trendyol** - site:trendyol.com


**AI Özellikleri:**
- 🤖 **Gemini Vision** - Oda analizi, yorumlar ve görsel anlama
- 🤖 **Gemini Text** - Ürün arama optimizasyonu ve metin analizi
- 🎨 **GPT-4 Vision** - Gerçekçi ürün yerleştirme
- 🎯 **Smart Filtering** - Oda stili ve renk uyumu
- 📊 **AI Scoring** - Ürün uyumluluk skoru
- 💡 **Smart Recommendations** - Akıllı öneriler

### 📝 API Yanıt Örnekleri

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

<details>
<summary>💬 Room Comment Response</summary>

```json
{
  "success": true,
  "comment": {
    "text": "Bu oda modern ve minimalist bir tasarıma sahip...",
    "confidence": 0.95,
    "timestamp": "2024-01-15T10:30:00Z",
    "isFallback": false
  }
}
```
</details>

<details>
<summary>🎨 GPT Placement Response</summary>

```json
{
  "success": true,
  "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
  "message": "GPT-4 Vision ile ürün başarıyla yerleştirildi",
  "confidence": 0.95
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
- 🎨 **Kompakt Tasarım** - Optimize edilmiş boşluk kullanımı

### 🎭 Öne Çıkan Özellikler
- **🌈 Modern Animasyonlar** - Micro-interactions ve smooth transitions
- **📊 Progress Tracking** - 3 adımlı ilerleme göstergesi
- **🎉 Toast Bildirimleri** - Kullanıcı dostu geri bildirimler
- **🖱️ Drag & Drop** - Sürükle bırak dosya yükleme
- **🌙 Dark Mode** - Göz yorgunluğunu azaltan karanlık tema
- **💬 Gemini AI Yorum Sistemi** - Detaylı oda analizi ve öneriler
- **🛍️ Gemini AI Dekoratif Öneriler** - Oda stiline uygun ürün önerileri
- **💡 Tooltip Sistemi** - AI Agent'lar hakkında detaylı bilgi

### 🎨 Son Güncellemeler
- **⚡ Optimize Edilmiş Süreç** - Analiz adımı kaldırıldı, direkt sonuç
- **🎨 GPT-4 Vision Entegrasyonu** - Gerçekçi ürün yerleştirme
- **🤖 Gemini AI Entegrasyonu** - Oda analizi, yorumlar ve ürün önerileri
- **💡 Tooltip Sistemi** - AI Agent kartlarına hover ile detaylı bilgi
- **📐 Kompakt Layout** - Daha verimli alan kullanımı
- **🔄 Temizlenmiş Kod** - Kullanılmayan bileşenler kaldırıldı

---

## 🤖 Gemini AI Entegrasyonu

Bu proje **Google Gemini AI** teknolojisini kapsamlı şekilde kullanarak güçlü AI özellikleri sunuyor:

### 🔍 **Gemini AI Kullanım Alanları**

#### **1. Oda Analizi ve Yorumlar**
```javascript
// Gemini Vision API ile oda analizi
const roomAnalysis = await gemini.analyzeImage(roomImage, {
  prompt: "Bu odanın dekorasyon tarzını, renk paletini ve atmosferini analiz et"
});
```

#### **2. Ürün Arama Optimizasyonu**
```javascript
// Gemini Text API ile arama sorgusu optimizasyonu
const optimizedQuery = await gemini.generateText({
  prompt: `"${userQuery}" aramasını dekoratif ürün arama için optimize et`
});
```

#### **3. Dekoratif Ürün Önerileri**
```javascript
// Gemini Vision + Text ile ürün önerileri
const suggestions = await gemini.analyzeImage(roomImage, {
  prompt: "Bu oda için uygun dekoratif ürün kategorilerini ve önerilerini listele"
});
```

### 🎯 **Gemini AI Avantajları**
- **🚀 Hızlı Yanıt** - Düşük latency ile gerçek zamanlı analiz
- **🎨 Görsel Anlama** - Gelişmiş görsel analiz yetenekleri
- **💬 Doğal Dil** - Türkçe dil desteği ile doğal yorumlar
- **🔍 Akıllı Filtreleme** - Oda stili ve renk uyumuna göre öneriler
- **📊 Yüksek Doğruluk** - %95+ güven skoru ile analizler

### 📊 **Gemini API Performansı**
- **Oda Analizi:** ~3-5 saniye
- **Ürün Önerileri:** ~4-6 saniye  
- **Arama Optimizasyonu:** ~1-2 saniye
- **Yorum Oluşturma:** ~2-4 saniye

---

## 🔮 Gelecek Özellikler

### 🎯 Kısa Vadeli (Q1 2026)
- [ ] 📱 **AR Desteği** - Artırılmış gerçeklik ile önizleme
- [ ] 🎨 **Çoklu Ürün Yerleştirme** - Aynı anda birden fazla ürün
- [ ] 💾 **Kayıt Sistemi** - Kullanıcı hesapları ve favoriler
- [ ] 🔄 **Yorum Yenileme** - AI yorumlarını yeniden oluşturma

### 📈 Orta Vadeli (Q2-Q3 2026)
- [ ] 🔗 **Sosyal Medya Entegrasyonu** - Instagram, Pinterest paylaşımı
- [ ] 💳 **Premium Özellikler** - Gelişmiş AI modelleri ve özellikler
- [ ] 🎓 **3D Oda Modelleme** - 3D ortamda ürün yerleştirme
- [ ] 📊 **Analytics Dashboard** - Kullanım istatistikleri

### 🚀 Uzun Vadeli (Q4 2026+)
- [ ] 📱 **Mobil Uygulama** - iOS ve Android native uygulamalar
- [ ] 🤝 **B2B Çözümler** - İç mimar ve mobilyacılar için özel araçlar
- [ ] 🌍 **Çoklu Dil Desteği** - Uluslararası pazara açılım
- [ ] 🤖 **AI Chatbot** - Akıllı asistan entegrasyonu

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
chore: bakım işlemleri
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

- 🤖 [Google AI](https://ai.google.dev/) - Gemini Vision & Text API'leri
- 🎨 [OpenAI](https://openai.com/) - GPT-4 Vision API
- 🎨 [Shadcn/ui](https://ui.shadcn.com/) - Muhteşem UI bileşenleri
- 💨 [Tailwind CSS](https://tailwindcss.com/) - Modern CSS framework
- ⚡ [Vite](https://vitejs.dev/) - Süper hızlı build tool
- ⚛️ [React](https://react.dev/) - Güçlü UI kütüphanesi
- 🔍 [Google Custom Search](https://developers.google.com/custom-search) - Ürün arama API'si

---

<div align="center">

**🎨 AI Destekli Dekoratif Ürün Yerleştirme Sistemi**  
*Geleceğin dekorasyon deneyimi* ✨

[🏠 Ana Sayfa](/) | [📖 Dokümantasyon](./PROJE_DOKUMANTASYONU.md) | [🐛 Hata Bildir](https://github.com/your-username/ai-decor-dream/issues)

</div>