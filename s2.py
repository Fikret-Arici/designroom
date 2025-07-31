import sys
import json
import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from urllib.parse import urlparse, urlunparse, parse_qsl, urlencode

def add_comments_path_and_params(original_url):
    """
    İlk linkteki path sonuna '/yorumlar' ekler,
    ve query parametrelerini korur.
    """
    parsed = urlparse(original_url)
    # Path'in sonuna /yorumlar ekle (eğer zaten yoksa)
    if not parsed.path.endswith('/yorumlar'):
        new_path = parsed.path.rstrip('/') + '/yorumlar'
    else:
        new_path = parsed.path

    # Query parametrelerini koru (örneğin boutiqueId, merchantId vb)
    query = parsed.query

    # Yeni URL oluştur
    new_url = urlunparse((
        parsed.scheme,
        parsed.netloc,
        new_path,
        parsed.params,
        query,
        parsed.fragment
    ))
    return new_url

def get_comments(url):
    chrome_options = Options()
    # Headless kapalı olsun ki görsün istiyorsan (açmak istersen aşağıdaki satırı aktif et)
    # chrome_options.add_argument("--headless")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--no-sandbox")

    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)
    driver.get(url)

    # 10 saniye boyunca sayfayı aşağı kaydır (yorumlar dinamik yüklendiği için)
    start_time = time.time()
    while time.time() - start_time < 10:
        driver.execute_script("window.scrollBy(0, 500);")
        time.sleep(0.5)

    try:
        comment_elements = driver.find_elements(By.CLASS_NAME, "comment-text")
        comments = [elem.text.strip() for elem in comment_elements if elem.text.strip()]
    except Exception as e:
        print("Hata:", e)
        comments = []

    driver.quit()
    return comments

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Lütfen ürün linkini girin.")
        sys.exit(1)

    original_url = sys.argv[1]
    comments_url = add_comments_path_and_params(original_url)

    print(f"Yorumlar sayfasına gidiliyor: {comments_url}")
    comments = get_comments(comments_url)
    print(json.dumps(comments, ensure_ascii=False, indent=2))
