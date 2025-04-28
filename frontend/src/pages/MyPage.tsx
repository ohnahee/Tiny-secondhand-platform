import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";
import ProductManageModal from "../components/ProductManageModal";
import { Product } from "../context/ProductContext";

function MyPage() {
  const [myProducts, setMyProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) return;

    axios.get(`http://localhost:4000/products/user/${userId}`)
      .then(res => setMyProducts(res.data))
      .catch(err => console.error("내 상품 목록 불러오기 실패:", err));
  }, [userId]);

  const handleDelete = (productId: number) => {
    setMyProducts(prev => prev.filter(p => p.id !== productId));
  };

  return (
    <div>
      <Header />
      <main style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto", marginTop: "100px" }}>
        {/* 회원정보 수정 버튼 */}
        <div style={{ marginBottom: "2rem", textAlign: "right" }}>
          <button
            onClick={() => window.location.href = "/user-info"}
            style={{ padding: "8px 16px", backgroundColor: "#555", color: "#fff", border: "none" }}
          >
            회원정보 수정
          </button>
        </div>

        <h2 style={{ fontSize: "24px", marginBottom: "1.5rem", color: "white" }}>
          내가 등록한 상품
        </h2>

        {myProducts.length === 0 ? (
          <p style={{ color: "#ccc" }}>등록한 상품이 없습니다.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "4rem 2.0rem"
            }}
          >
            {myProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => setSelectedProduct(product)}
              />
            ))}
          </div>
        )}

        {selectedProduct && (
          <ProductManageModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onDelete={handleDelete}
          />
        )}
      </main>
    </div>
  );
}

export default MyPage;
