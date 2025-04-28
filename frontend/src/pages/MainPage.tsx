import { useEffect, useState } from "react";  
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ProductModal from "../components/ProductModal";
import ProductCard from "../components/ProductCard";
import ProductDetailModal from "../components/ProductDetailModal";
import { Product } from "../context/ProductContext"; 

function MainPage() {
  const username = localStorage.getItem("username");
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const navigate = useNavigate();

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:4000/products");
      setProducts(response.data);
    } catch (error) {
      console.error("상품 목록 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setShowModal(true); // 상품 클릭 시 모달 열기
  };

  const handleContactSeller = (sellerId: number, sellerNickname: string) => {
    navigate(`/chat/${sellerId}`, { state: { nickname: sellerNickname } });
  };

  return (
    <div>
      <Header />
      <main
        style={{
          padding: "2rem",
          paddingTop: "100px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <h2 style={{ fontSize: "24px", marginBottom: "1.5rem", color: "white" }}>
          원하는 물건 검색하기
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "1.5rem",
          }}
        >
          <input
            type="text"
            placeholder="상품 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "10px",
              fontSize: "16px",
              flex: 1,
              marginRight: "1rem",
            }}
          />
          {username && (
            <button
              onClick={openModal}
              style={{
                padding: "10px 20px",
                backgroundColor: "#333",
                color: "#fff",
                border: "none",
                cursor: "pointer",
              }}
            >
              상품 등록
            </button>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <p style={{ color: "#ccc" }}>등록된 상품이 없습니다.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "4rem 2.0rem",
            }}
          >
            {filteredProducts.map((product) => (
              <div key={product.id} onClick={() => handleProductClick(product)}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </main>

      {/* 상품 등록용 모달 */}
      {showModal && (
        <ProductModal onClose={closeModal} onProductRegistered={fetchProducts} />
      )}

      {/* 상품 상세 보기 모달 */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onContactSeller={handleContactSeller}
        />
      )}
    </div>
  );
}

export default MainPage;
