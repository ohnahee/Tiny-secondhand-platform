const pool = require("../db/pool");

// 전체 상품 조회 + 검색 지원
exports.getProducts = async (req, res) => {
  const search = req.query.search;

  try {
    let result;
    if (search) {
      result = await pool.query(
        "SELECT * FROM products WHERE name ILIKE $1 OR description ILIKE $1",
        [`%${search}%`]
      );
    } else {
      result = await pool.query("SELECT * FROM products ORDER BY created_at DESC");
    }

    res.json(result.rows);
  } catch (error) {
    console.error("상품 목록 조회 실패:", error);
    res.status(500).json({ message: "서버 오류" });
  }
};

// 상품 등록
exports.createProduct = async (req, res) => {
    const { name, description, price, user_id } = req.body;
    const image = req.file; // single이므로 file
  
    if (!name || !description || !price || !image || !user_id) {
      return res.status(400).json({ message: "모든 필드를 입력해주세요." });
    }
  
    const imageUrl = `/uploads/${image.filename}`;
  
    try {
      await pool.query(
        "INSERT INTO products (name, description, price, image_url, user_id) VALUES ($1, $2, $3, $4, $5)",
        [name, description, price, imageUrl, user_id]
      );
      res.status(201).json({ message: "상품 등록 성공" });
    } catch (error) {
      console.error("상품 등록 실패:", error);
      res.status(500).json({ message: "상품 등록 실패" });
    }
  };
  

// 상품 상세 조회
exports.getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "상품을 찾을 수 없습니다." });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("상품 상세 조회 실패:", error);
    res.status(500).json({ message: "서버 오류" });
  }
};

// 특정 사용자의 상품 목록 조회
exports.getProductsByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM products WHERE user_id = $1 ORDER BY created_at DESC",
      [userId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("사용자 상품 조회 실패:", error);
    res.status(500).json({ message: "서버 오류" });
  }
};


exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM products WHERE id = $1", [id]);
    res.status(200).json({ message: "삭제 완료" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "삭제 실패" });
  }
};

// 상품 수정
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, user_id } = req.body;
  const image = req.file; // optional

  try {
    // 권한 확인: 해당 상품이 본인 소유인지 확인
    const check = await pool.query("SELECT * FROM products WHERE id = $1 AND user_id = $2", [id, user_id]);
    if (check.rows.length === 0) {
      return res.status(403).json({ message: "수정 권한이 없습니다." });
    }

    // 이미지가 새로 업로드된 경우 업데이트, 아니면 기존 이미지 유지
    let imageUrl = check.rows[0].image_url;
    if (image) {
      imageUrl = `/uploads/${image.filename}`;
    }

    await pool.query(
      "UPDATE products SET name = $1, description = $2, price = $3, image_url = $4 WHERE id = $5",
      [name, description, price, imageUrl, id]
    );

    res.json({ message: "상품 수정 완료" });
  } catch (error) {
    console.error("상품 수정 실패:", error);
    res.status(500).json({ message: "서버 오류" });
  }
};
