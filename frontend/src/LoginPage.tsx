// src/pages/LoginPage.tsx
import { useState } from "react";
import axios from "axios";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:3001/login", {
        email,
        password,
      });
      alert(`${res.data.username}님 환영합니다`);
    } catch (err) {
      alert("로그인 실패: 이메일 또는 비밀번호를 확인하세요");
    }
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh"
    }}>
      <h2>로그인</h2>
      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginBottom: "10px" }}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ marginBottom: "10px" }}
      />
      <button onClick={handleLogin}>로그인</button>
    </div>
  );
}

export default LoginPage;
