import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh"
    }}>
      <h1>Tiny Second-hand Shopping Platform</h1>
      <div style={{ marginTop: "30px" }}>
        <Link to="/login">
          <button style={{
            padding: "10px 20px",
            fontSize: "20px",
            marginRight: "20px",
            cursor: "pointer"
          }}>
            로그인
          </button>
        </Link>
        <Link to="/register">
          <button style={{
            padding: "10px 20px",
            fontSize: "20px",
            cursor: "pointer"
          }}>
            회원가입
          </button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
