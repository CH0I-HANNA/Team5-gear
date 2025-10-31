# crawler_server.py
from fastapi import FastAPI, HTTPException
import pymysql
import requests
from bs4 import BeautifulSoup
import re

# -------------------------
# ✅ 데이터베이스 연결 설정
# -------------------------
DB_CONFIG = {
    "host": "localhost",
    "user": "root",
    "password": "hannachoesql53!",
    "database": "gear",
    "cursorclass": pymysql.cursors.DictCursor,
    "charset": "utf8mb4"
}

# -------------------------
# ✅ FastAPI 앱 생성
# -------------------------
app = FastAPI(title="GearHub Crawler API", version="2.0.0")

# -------------------------
# ✅ 크롤링 함수 (이미지 + 가격 추출)
# -------------------------
def scrape_product_data(url: str):
    headers = {
        "User-Agent": (
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/121.0.0.0 Safari/537.36"
        )
    }

    try:
        res = requests.get(url, headers=headers, timeout=10)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"요청 실패: {e}")

    if res.status_code != 200:
        raise HTTPException(status_code=400, detail=f"URL 접근 실패 (status {res.status_code})")

    soup = BeautifulSoup(res.text, "html.parser")

    # 🔍 이미지 URL 추출 (og:image)
    image_meta = soup.find("meta", property="og:image")
    image_url = image_meta["content"] if image_meta else None

    # 🔍 가격 추출 (정규식으로 "원" 포함된 숫자 패턴 탐색)
    price = None
    price_texts = soup.find_all(string=re.compile(r"\d{1,3}(?:,\d{3})*원"))
    if price_texts:
        match = re.search(r"\d{1,3}(?:,\d{3})*", price_texts[0])
        if match:
            price = match.group(0)

    return {"image_url": image_url, "price": price}

# -------------------------
# ✅ DB 업데이트 함수
# -------------------------
def update_product_data(equipment_id: int, price: str, image_url: str):
    conn = None
    try:
        conn = pymysql.connect(**DB_CONFIG)
        with conn.cursor() as cursor:
            sql = """
                UPDATE equipment
                SET price = %s,
                    image_url = %s,
                    updated_at = NOW()
                WHERE id = %s
            """
            cursor.execute(sql, (price, image_url, equipment_id))
            conn.commit()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"DB 업데이트 실패: {e}")
    finally:
        if conn:
            conn.close()

# -------------------------
# ✅ DB에서 URL 가져오기
# -------------------------
def get_purchase_url(equipment_id: int):
    conn = None
    try:
        conn = pymysql.connect(**DB_CONFIG)
        with conn.cursor() as cursor:
            cursor.execute("SELECT purchase_url FROM equipment WHERE id = %s", (equipment_id,))
            row = cursor.fetchone()
            if not row:
                raise HTTPException(status_code=404, detail="해당 제품을 찾을 수 없습니다.")
            return row["purchase_url"]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"DB 조회 실패: {e}")
    finally:
        if conn:
            conn.close()

# -------------------------
# ✅ API 엔드포인트: 제품 업데이트
# -------------------------
@app.post("/update")
def update_existing_product(equipment_id: int):
    # 1) DB에서 URL 가져오기
    url = get_purchase_url(equipment_id)

    # 2) 해당 URL 크롤링
    data = scrape_product_data(url)

    if not data["image_url"] and not data["price"]:
        raise HTTPException(status_code=404, detail="이미지 또는 가격 정보를 찾을 수 없습니다.")

    # 3) 크롤링된 데이터로 DB 업데이트
    update_product_data(equipment_id, data["price"], data["image_url"])

    return {
        "message": f"{equipment_id}번 제품 정보가 성공적으로 업데이트되었습니다.",
        "data": data
    }

# -------------------------
# ✅ 헬스체크 (서버 테스트용)
# -------------------------
@app.get("/health")
def health_check():
    return {"status": "ok", "message": "GearHub Crawler API is running."}

# -------------------------
# ✅ 실행 방법 (터미널)
# -------------------------
# cd /Users/choehanna/Documents/gear
# uvicorn crawler_server:app --reload
