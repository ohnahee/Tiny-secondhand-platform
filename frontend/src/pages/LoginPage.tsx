import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      console.log("로그인 시도:", { email, password }); // 디버깅용

      const res = await axios.post("http://localhost:4000/login", {
        email,
        password
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      const { userId, username } = res.data;
      localStorage.setItem("userId", String(userId));
      localStorage.setItem("username", username);

      alert(`${username}님 환영합니다`);
      navigate("/main");
    } catch (err: any) {
      console.error("로그인 요청 에러:", err.response?.data || err.message);
      alert("로그인 실패: 이메일 또는 비밀번호를 확인하세요");
    }
  };

  return (
    <div>
      <Header />
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
        textAlign: "center"
      }}>
        <h2>로그인</h2>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginBottom: "10px", padding: "10px", width: "250px" }}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: "10px", padding: "10px", width: "250px" }}
        />
        <button
          onClick={handleLogin}
          style={{ padding: "10px 20px", cursor: "pointer" }}
        >
          로그인
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
