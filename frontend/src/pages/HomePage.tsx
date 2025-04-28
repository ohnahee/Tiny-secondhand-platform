import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function HomePage() {
  const navigate = useNavigate();

  const goToProducts = () => {
    navigate("/main"); // 또는 "/products"로 원한다면 수정 가능
  };

  return (
    <div>
      <Header />
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          paddingTop: "80px", // 헤더 공간 확보
          backgroundColor: "#0f0f0f",
          color: "white",
          textAlign: "center"
        }}
      >
        <h1 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>
          HELLO!
        </h1>

        <button
          onClick={goToProducts}
          style={{
            padding: "12px 24px",
            fontSize: "1rem",
            backgroundColor: "#a855f7",
            color: "#ff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            transition: "background-color 0.3s"
          }}
        >
          중고거래 하러가기 ➜
        </button>
      </main>
    </div>
  );
}

export default HomePage;
