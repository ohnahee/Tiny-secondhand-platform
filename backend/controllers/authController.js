const bcrypt = require("bcryptjs");
const pool = require("../db/pool");


exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "모든 항목을 입력해주세요." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id",
      [username, email, hashedPassword]
    );
    res.status(201).json({ message: "회원가입 성공", userId: result.rows[0].id });
  } catch (error) {
    console.error("회원가입 실패:", error);
    res.status(500).json({ message: "서버 오류" });
  }
};

exports.login = async (req, res) => {
  console.log("=== 로그인 요청 도착 ===");
  console.log("req.headers:", req.headers);
  console.log("req.body:", req.body);

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "이메일과 비밀번호를 입력해주세요." });
  }

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ message: "존재하지 않는 사용자입니다." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "비밀번호가 올바르지 않습니다." });
    }

    res.status(200).json({ message: "로그인 성공", userId: user.id, username: user.username });
  } catch (error) {
    console.error("로그인 실패:", error);
    res.status(500).json({ message: "서버 오류" });
  }
};

