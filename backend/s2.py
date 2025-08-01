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
    # Headless modu aktif et
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--disable-extensions")
    chrome_options.add_argument("--disable-logging")
    chrome_options.add_argument("--silent")

    try:
        driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)
        driver.get(url)

        # 5 saniye boyunca sayfayı aşağı kaydır (yorumlar dinamik yüklendiği için)
        start_time = time.time()
        while time.time() - start_time < 5:
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
    except Exception as e:
        print("Browser hatası:", e)
        return []

if __name__ == "__main__":
    import codecs
    import sys
    import os
    
    # Windows'ta Unicode çıktı için UTF-8 encoding kullan
    if sys.platform == "win32":
        # Çevre değişkenini ayarla
        os.environ['PYTHONIOENCODING'] = 'utf-8'
        # stdout'u UTF-8 ile yeniden yapılandır
        if hasattr(sys.stdout, 'reconfigure'):
            sys.stdout.reconfigure(encoding='utf-8')
        else:
            sys.stdout = codecs.getwriter('utf-8')(sys.stdout.detach())
    
    if len(sys.argv) < 2:
        print("Lütfen ürün linkini girin.")
        sys.exit(1)

    original_url = sys.argv[1]
    comments_url = add_comments_path_and_params(original_url)

    print(f"Yorumlar sayfasına gidiliyor: {comments_url}", file=sys.stderr)
    comments = get_comments(comments_url)
    
    # Unicode karakterleri güvenli şekilde çıktıla
    try:
        print(json.dumps(comments, ensure_ascii=False, indent=2))
    except UnicodeEncodeError:
        # Fallback: ASCII çıktı kullan
        print(json.dumps(comments, ensure_ascii=True, indent=2))
