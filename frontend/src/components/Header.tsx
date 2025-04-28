import { Link, useNavigate } from "react-router-dom"; // ✅ useState 삭제

function Header() {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    alert("로그아웃 되었습니다.");
    navigate("/login");
  };

  return (
    <header
      style={{
        backgroundColor: "#0f0f0f",
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "#fff",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 999,
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)"
      }}
    >
      {/* 로고 */}
      <Link
        to="/"
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "#fff",
          textDecoration: "none"
        }}
      >
        Tiny Second-hand Shopping Platform
      </Link>

      {/* 로그인/로그아웃 영역 */}
      <div>
        {username ? (
          <>
            <span style={{ marginRight: "1rem" }}>{username}님</span>

            {/* 마이페이지 버튼 */}
            <Link to="/mypage">
              <button
                style={{
                  backgroundColor: "#555",
                  color: "white",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  marginRight: "0.5rem",
                  border: "none",
                  cursor: "pointer"
                }}
              >
                마이페이지
              </button>
            </Link>

            <button
              onClick={handleLogout}
              style={{
                backgroundColor: "#444",
                color: "white",
                padding: "8px 16px",
                borderRadius: "4px",
                cursor: "pointer",
                border: "none"
              }}
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button
                style={{
                  backgroundColor: "#222",
                  color: "white",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  marginRight: "0.5rem",
                  border: "none"
                }}
              >
                Login
              </button>
            </Link>
            <Link to="/register">
              <button
                style={{
                  backgroundColor: "#a855f7",
                  color: "white",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  border: "none"
                }}
              >
                Sign Up
              </button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
