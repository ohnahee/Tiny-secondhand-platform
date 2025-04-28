// src/components/ProductModal.tsx
import React, { useState } from "react";
import axios from "axios";

interface ProductModalProps {
  onClose: () => void;
  onProductRegistered: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ onClose, onProductRegistered }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("로그인이 필요합니다.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price.toString());
    formData.append("user_id", userId);

    if (image) {
      formData.append("image", image);
    }

    try {
      await axios.post("http://localhost:3001/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("상품이 등록되었습니다.");
      onProductRegistered();
      onClose();
    } catch (error) {
      console.error(error);
      alert("상품 등록 실패");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "#fff",
          padding: "2rem",
          borderRadius: "8px",
          width: "400px",
          boxShadow: "0 0 10px rgba(0,0,0,0.3)",
        }}
      >
        <h2>상품 등록</h2>
        <input
          type="text"
          placeholder="상품명"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        />
        <textarea
          placeholder="설명"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        />
        <input
          type="number"
          placeholder="가격"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          style={{ width: "100%", marginBottom: "10px" }}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              setImage(e.target.files[0]);
            }
          }}
          style={{ marginBottom: "10px" }}
        />
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
          <button onClick={handleSubmit} style={{ backgroundColor: "#1976d2", color: "#fff", padding: "8px 16px", border: "none" }}>
            등록
          </button>
          <button onClick={onClose} style={{ backgroundColor: "#888", color: "#fff", padding: "8px 16px", border: "none" }}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
