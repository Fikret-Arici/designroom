import base64
import sys
import os
from openai import OpenAI

def generate_product_placement(room_image_path, product_image_path, output_path, custom_prompt=None):
    client = OpenAI(
        api_key='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',
    )

    # Temel prompt
    base_prompt = """
    Lütfen aşağıdaki oda fotoğrafına, ikinci görseldeki dekoratif ürünü gerçekçi ve doğal bir şekilde yerleştir. Ürünün türünü (örneğin tablo, halı, koltuk, lambader vb.) analiz ederek, odadaki en uygun konuma perspektif, ölçek ve ışık koşullarına dikkat ederek yerleştir. Ürün, odanın mevcut yapısına ve tarzına estetik olarak uyum sağlamalıdır. Gölge, ışık yönü, derinlik hissi ve temas yüzeyi gerçekçi olacak şekilde işlenmelidir. Sadece ikinci görseldeki ürün kullanılmalı; arka plan veya başka öğeler yerleştirilmeyecek. Sonuç görseli tek ve bütünleşik bir yerleştirme olacak şekilde oluşturulmalıdır.
    """
    
    # Eğer özel istek varsa, temel prompt'a ekle
    if custom_prompt and custom_prompt.strip():
        prompt = base_prompt + f"\n\nÖzel İstek: {custom_prompt.strip()}"
    else:
        prompt = base_prompt

    try:
        result = client.images.edit(
            model="gpt-image-1",
            image=[
                open(product_image_path, "rb"),
                open(room_image_path, "rb"),
            ],
            prompt=prompt
        )

        image_base64 = result.data[0].b64_json
        image_bytes = base64.b64decode(image_base64)

        # Save the image to a file
        with open(output_path, "wb") as f:
            f.write(image_bytes)
        
        return True, "Görsel başarıyla oluşturuldu"
    except Exception as e:
        return False, f"Hata oluştu: {str(e)}"

if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Kullanım: python gpt.py <oda_gorseli> <urun_gorseli> <cikti_dosyasi> [ozel_istek]")
        sys.exit(1)
    
    room_image = sys.argv[1]
    product_image = sys.argv[2]
    output_file = sys.argv[3]
    custom_prompt = sys.argv[4] if len(sys.argv) > 4 else None
    
    success, message = generate_product_placement(room_image, product_image, output_file, custom_prompt)
    if success:
        print(f"Başarılı: {message}")
    else:
        print(f"Hata: {message}")
        sys.exit(1)