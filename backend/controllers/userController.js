const pool = require("../db/pool");
const bcrypt = require("bcryptjs");

// 비밀번호 확인
exports.verifyPassword = async (req, res) => {
  const { user_id, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [user_id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false });
    }

    res.json({ success: true });
  } catch (error) {
    console.error("비밀번호 확인 오류:", error);
    res.status(500).json({ message: "서버 오류" });
  }
};

// 사용자 정보 조회
exports.getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("SELECT username, email FROM users WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("사용자 정보 조회 실패:", error);
    res.status(500).json({ message: "서버 오류" });
  }
};

// 닉네임 중복 확인
exports.checkUsername = async (req, res) => {
  const { username } = req.query;

  try {
    const result = await pool.query("SELECT id FROM users WHERE username = $1", [username]);

    if (result.rows.length > 0) {
      return res.json({ available: false });
    } else {
      return res.json({ available: true });
    }
  } catch (error) {
    console.error("닉네임 중복 확인 실패:", error);
    res.status(500).json({ message: "서버 오류" });
  }
};

// 사용자 정보 수정 (닉네임, 비밀번호)
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }

    const user = result.rows[0];
    const newUsername = username || user.username;
    const newPassword = password ? await bcrypt.hash(password, 10) : user.password;

    await pool.query(
      "UPDATE users SET username = $1, password = $2 WHERE id = $3",
      [newUsername, newPassword, id]
    );

    res.json({ message: "회원정보 수정 완료" });
  } catch (error) {
    console.error("회원정보 수정 실패:", error);
    res.status(500).json({ message: "서버 오류" });
  }
};

// 회원 탈퇴
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM users WHERE id = $1", [id]);
    res.json({ message: "회원 탈퇴 완료" });
  } catch (error) {
    console.error("회원 탈퇴 실패:", error);
    res.status(500).json({ message: "서버 오류" });
  }
};
