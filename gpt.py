import base64
from openai import OpenAI
client = OpenAI(
    api_key='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',
)


prompt = """
Lütfen aşağıdaki oda fotoğrafına, ikinci görseldeki halıyı gerçekçi bir şekilde yerleştir. Halıyı odanın zeminine, perspektif ve ölçeklendirme kurallarına uygun olarak konumlandır. Işık yönü, gölge uyumu ve halının kenarlarının netliği korunarak, doğal bir şekilde oturtulmalı. Halı dışında ikinci görseldeki hiçbir öğe kullanılmamalıdır. Odanın genel stiline uyacak şekilde halı, odanın ortasına veya en uygun boş alana yerleştirilmelidir. Zemin ile halı arasında gerçekçi bir temas hissi verilmeli ve sonuç tek bir bütünleşik görsel olarak sunulmalıdır.
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