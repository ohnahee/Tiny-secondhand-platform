# Tiny Secondhand Platform
중고 거래를 위한 간단한 웹 서비스

--- 

## 사용 기술 스택
- Frontend : React, Vite
- Backend : Node.js, Express
- Database : PostgreSQL
- DevOps : Docker, Docker Compose

---

## 프로젝트 구조
```
Tiny-secondhand-platform/
├── backend/  #(Node.js + Express)
├── frontend/  #(React + Vite)
├── db/ #PostgreSQL  #초기 데이터 (init.sql)
├── docker-compose.yml
├── README.md
```

---

## 실행하기

### 1. 레포지토리 클론

```
git clone https://github.com/ohnahee/Tiny-secondhand-platform
cd Tiny-secondhand-platform
```

### 2. Docker 실행
   ```
   docker-compose up --build
   ```

- PostgreSQL DB 컨테이너 생성 및 테이블, 초기 데이터 자동 세팅
- 백엔드 / 프론트엔드 서버 자동 구동

### 3. 접속 주소
Frontend : http://localhost:5173   
Backend API : http://localhost:4000
