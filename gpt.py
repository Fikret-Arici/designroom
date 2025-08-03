import base64
from openai import OpenAI
client = OpenAI(
    api_key='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',
)


prompt = """
Lütfen aşağıdaki oda fotoğrafına, ikinci görseldeki dekoratif ürünü gerçekçi ve doğal bir şekilde yerleştir. Ürünün türünü (örneğin tablo, halı, koltuk, lambader vb.) analiz ederek, odadaki en uygun konuma perspektif, ölçek ve ışık koşullarına dikkat ederek yerleştir. Ürün, odanın mevcut yapısına ve tarzına estetik olarak uyum sağlamalıdır. Gölge, ışık yönü, derinlik hissi ve temas yüzeyi gerçekçi olacak şekilde işlenmelidir. Sadece ikinci görseldeki ürün kullanılmalı; arka plan veya başka öğeler yerleştirilmeyecek. Sonuç görseli tek ve bütünleşik bir yerleştirme olacak şekilde oluşturulmalıdır.
"""

result = client.images.edit(
    model="gpt-image-1",
    image=[
        open("hali.png", "rb"),
        open("oda.png", "rb"),
    ],
    prompt=prompt
)

image_base64 = result.data[0].b64_json
image_bytes = base64.b64decode(image_base64)

# Save the image to a file
with open("gift-basket.png", "wb") as f:
    f.write(image_bytes)