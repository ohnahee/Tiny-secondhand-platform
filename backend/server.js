const express = require("express");
const cors = require("cors");
const path = require("path");
const { Pool } = require("pg"); // DB 연결을 위한 추가

const app = express();
const port = 4000; // 3001 → 4000 변경

// 미들웨어 설정
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 정적 파일 경로 설정 (이미지 업로드용)
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// PostgreSQL DB 연결
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'yourusername',
  password: process.env.DB_PASSWORD || 'yourpassword',
  database: process.env.DB_DATABASE || 'yourdatabase',
  port: process.env.DB_PORT || 5432,
});

// 라우터 등록
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

app.use(authRoutes);
app.use(productRoutes);

// 서버 시작
app.listen(port, "0.0.0.0", () => {  // 중요: 0.0.0.0
  console.log(`서버 실행 중: http://localhost:${port}`);
});

// pool export (필요한 곳에서 DB접근 할 수 있게)
module.exports = { pool };
