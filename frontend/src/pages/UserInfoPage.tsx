import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserInfoPage() {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [passwordVerified, setPasswordVerified] = useState(false);
  const [userInfo, setUserInfo] = useState({ username: "", email: "" });

  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [usernameCheckResult, setUsernameCheckResult] = useState("");

  const handlePasswordCheck = async () => {
    try {
      const res = await axios.post(`http://localhost:4000/users/verify-password`, {
        user_id: userId,
        password
      });
      if (res.data.success) {
        setPasswordVerified(true);
      } else {
        alert("비밀번호가 틀렸습니다.");
      }
    } catch (err) {
      alert("비밀번호 확인 실패");
      console.error(err);
    }
  };

  useEffect(() => {
    if (passwordVerified && userId) {
      axios.get(`http://localhost:4000/users/${userId}`)
        .then(res => {
          setUserInfo(res.data);
          setNewUsername(res.data.username);
        })
        .catch(err => console.error("회원정보 불러오기 실패:", err));
    }
  }, [passwordVerified]);

  const handleCheckUsername = async () => {
    if (!newUsername.trim()) return;

    try {
      console.log("📤 닉네임 중복 확인 요청:", newUsername);

      const res = await axios.get(
        `http://localhost:4000/users/check-username?username=${encodeURIComponent(newUsername)}`
      );

      console.log("✅ 중복 확인 응답:", res.data);

      if (res.data.available) {
        setUsernameCheckResult("사용 가능한 닉네임입니다.");
      } else {
        setUsernameCheckResult("이미 사용 중인 닉네임입니다.");
      }
    } catch (err) {
      setUsernameCheckResult("중복 확인 실패");
      console.error("❌ 중복 확인 에러:", err);
    }
  };

  const handleUpdate = async () => {
    try {
      // 서버에 수정된 데이터 전송
      await axios.put(`http://localhost:4000/users/${userId}`, {
        username: newUsername,
        password: newPassword
      });
  
      //수정된 닉네임을 localStorage에 저장
      localStorage.setItem("username", newUsername);
  
      alert("회원정보가 수정되었습니다.");
      navigate("/mypage");
    } catch (err) {
      alert("수정 실패");
      console.error(err);
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm("정말 탈퇴하시겠습니까?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:4000/users/${userId}`);
      localStorage.clear();
      alert("회원 탈퇴가 완료되었습니다.");
      navigate("/");
    } catch (err) {
      alert("회원 탈퇴 실패");
      console.error(err);
    }
  };

  return (
    <div style={{
      maxWidth: "600px",
      margin: "100px auto",
      padding: "2rem",
      color: "#fff",
      backgroundColor: "#111",
      borderRadius: "12px",
      boxShadow: "0 0 12px rgba(255,255,255,0.1)"
    }}>
      <h2 style={{ marginBottom: "1.5rem", fontSize: "24px" }}>회원정보 수정</h2>

      {!passwordVerified ? (
        <>
          <p>비밀번호를 입력해 주세요</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            style={{ padding: "8px", marginRight: "10px", borderRadius: "4px", width: "60%" }}
          />
          <button onClick={handlePasswordCheck} style={{ padding: "8px 16px" }}>확인</button>
        </>
      ) : (
        <>
          <p><strong style={{ color: "#ccc" }}>이메일:</strong> {userInfo.email}</p>

          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem" }}>닉네임</label>
            <input
              type="text"
              value={newUsername}
              onChange={(e) => {
                setNewUsername(e.target.value);
                setUsernameCheckResult(""); // 입력 시 결과 초기화
              }}
              style={{ padding: "8px", marginRight: "10px", borderRadius: "4px", width: "60%" }}
            />
            <button onClick={handleCheckUsername} style={{ padding: "8px 12px" }}>중복확인</button>
            {usernameCheckResult && (
              <p style={{ marginTop: "0.5rem", color: usernameCheckResult.includes("가능") ? "lightgreen" : "salmon" }}>
                {usernameCheckResult}
              </p>
            )}
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem" }}>새 비밀번호</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="새 비밀번호"
              style={{ padding: "8px", borderRadius: "4px", width: "100%" }}
            />
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={handleUpdate} style={{ padding: "10px 20px", backgroundColor: "#4caf50", border: "none", borderRadius: "4px", color: "#fff" }}>
              수정 완료
            </button>
            <button onClick={() => navigate("/mypage")} style={{ padding: "10px 20px", backgroundColor: "#888", border: "none", borderRadius: "4px", color: "#fff" }}>
              취소
            </button>
            <button onClick={handleDelete} style={{ padding: "10px 20px", backgroundColor: "#d32f2f", border: "none", borderRadius: "4px", color: "#fff" }}>
              회원 탈퇴
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default UserInfoPage;
