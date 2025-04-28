import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/register", formData, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      alert(`회원가입 성공: ${response.data.userId}`);
      navigate("/login");
    } catch (error) {
      alert("회원가입 실패");
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
        height: "80vh"
      }}>
        <h2>회원가입 페이지</h2>
        <form onSubmit={handleSubmit} style={{
          display: "flex",
          flexDirection: "column",
          width: "300px"
        }}>
          <label htmlFor="username">닉네임</label>
          <input
            type="text"
            id="username"
            placeholder="닉네임 입력"
            value={formData.username}
            onChange={handleChange}
            style={{ padding: "8px", marginBottom: "15px" }}
          />

          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            placeholder="이메일 입력"
            value={formData.email}
            onChange={handleChange}
            style={{ padding: "8px", marginBottom: "15px" }}
          />

          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            placeholder="비밀번호 입력"
            value={formData.password}
            onChange={handleChange}
            style={{ padding: "8px", marginBottom: "20px" }}
          />

          <button type="submit" style={{
            padding: "10px",
            backgroundColor: "#333",
            color: "white",
            border: "none",
            cursor: "pointer"
          }}>
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;

