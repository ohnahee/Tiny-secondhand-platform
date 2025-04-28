import React from "react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  seller_nickname: string;
  seller_id: number;
}

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onContactSeller: (sellerId: number, sellerNickname: string) => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onContactSeller
}) => {
  if (!product) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 999
    }}>
      <div style={{
        backgroundColor: "#fff",
        padding: "2rem",
        borderRadius: "8px",
        width: "400px",
        boxShadow: "0 0 10px rgba(0,0,0,0.3)"
      }}>
        <button onClick={onClose} style={{
          float: "right",
          background: "none",
          border: "none",
          fontSize: "1.2rem",
          cursor: "pointer"
        }}>×</button>

        <img
          src={product.image_url}
          alt={product.name}
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
            borderRadius: "4px",
            marginBottom: "1rem"
          }}
        />
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>가격: {product.price}원</p>
        <p>
          판매자:{" "}
          <span
            onClick={() => onContactSeller(product.seller_id, product.seller_nickname)}
            style={{
              color: "blue",
              textDecoration: "underline",
              cursor: "pointer"
            }}
          >
            {product.seller_nickname}
          </span>
        </p>
      </div>
    </div>
  );
};

export default ProductDetailModal;
