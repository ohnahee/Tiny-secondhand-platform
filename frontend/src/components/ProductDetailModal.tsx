import axios from "axios";
import { useState } from "react";
import { Product } from "../context/ProductContext";  // 중복 import 제거

interface ProductDetailModalProps {
  product: Product | null; // ✅ 수정: null 허용
  onClose: () => void;
  onRefresh?: () => void; 
  onContactSeller?: (sellerId: number, sellerNickname: string) => void;
}

function ProductDetailModal({
  product,
  onClose,
  onRefresh,
  onContactSeller,
}: ProductDetailModalProps) {
  if (!product) return null; 

  const {
    id,
    name,
    description,
    price,
    image_url,
    user_id,
    seller_nickname,
    seller_id,
  } = product;

  const imageSrc = image_url ? `http://localhost:4000${image_url}` : "";

  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState(name);
  const [newDescription, setNewDescription] = useState(description);
  const [newPrice, setNewPrice] = useState(price);
  const [newImage, setNewImage] = useState<File | null>(null);

  const userId = localStorage.getItem("userId");
  const isOwner = String(user_id) === userId;

  const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      await axios.delete(`http://localhost:4000/products/${id}`);
      alert("삭제되었습니다.");
      if (onRefresh) onRefresh();
      onClose();
    } catch (err) {
      alert("삭제 실패");
      console.error(err);
    }
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("name", newName);
      formData.append("description", newDescription);
      formData.append("price", newPrice.toString());
      formData.append("user_id", userId ?? "");
      if (newImage) {
        formData.append("image", newImage);
      }

      await axios.put(`http://localhost:4000/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("수정 완료");
      if (onRefresh) onRefresh();
      onClose();
    } catch (err) {
      alert("수정 실패");
      console.error(err);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 9999,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "#fff",
          color: "#000",
          padding: "2rem",
          borderRadius: "8px",
          width: "450px",
          maxWidth: "90%",
          boxShadow: "0 0 10px rgba(0,0,0,0.3)",
        }}
      >
        {imageSrc && !editMode && (
          <img
            src={imageSrc}
            alt={name}
            style={{ width: "100%", height: "200px", objectFit: "contain", marginBottom: "1rem" }}
          />
        )}

        {editMode ? (
          <>
            <input value={newName} onChange={(e) => setNewName(e.target.value)} style={{ width: "100%", marginBottom: "10px" }} />
            <textarea value={newDescription} onChange={(e) => setNewDescription(e.target.value)} style={{ width: "100%", marginBottom: "10px" }} />
            <input type="number" value={newPrice} onChange={(e) => setNewPrice(Number(e.target.value))} style={{ width: "100%", marginBottom: "10px" }} />
            <input type="file" accept="image/*" onChange={(e) => {
              if (e.target.files?.[0]) {
                setNewImage(e.target.files[0]);
              }
            }} style={{ marginBottom: "10px" }} />
          </>
        ) : (
          <>
            <h2 style={{ marginBottom: "0.5rem" }}>{name}</h2>
            <p>{description}</p>
            <p style={{ fontWeight: "bold", marginTop: "1rem" }}>{price.toLocaleString()}원</p>
            <p style={{ marginTop: "0.5rem" }}>
              판매자:{" "}
              <span style={{ color: "blue", fontWeight: "bold" }}>{seller_nickname}</span>
            </p>
          </>
        )}

        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1.5rem", gap: "0.5rem" }}>
          {!isOwner && onContactSeller && (
            <button
              onClick={() => onContactSeller(seller_id, seller_nickname)}
              style={{ backgroundColor: "#1976d2", color: "#fff", padding: "6px 12px", border: "none" }}
            >
              채팅하기
            </button>
          )}

          {isOwner && (
            <>
              {editMode ? (
                <>
                  <button onClick={handleUpdate} style={{ backgroundColor: "#4caf50", color: "#fff", padding: "6px 12px", border: "none" }}>
                    저장
                  </button>
                  <button onClick={() => setEditMode(false)} style={{ backgroundColor: "#888", color: "#fff", padding: "6px 12px", border: "none" }}>
                    취소
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => setEditMode(true)} style={{ backgroundColor: "#333", color: "#fff", padding: "6px 12px", border: "none" }}>
                    수정
                  </button>
                  <button onClick={handleDelete} style={{ backgroundColor: "#e53935", color: "#fff", padding: "6px 12px", border: "none" }}>
                    삭제
                  </button>
                </>
              )}
            </>
          )}
          <button onClick={onClose} style={{ backgroundColor: "#ccc", padding: "6px 12px", border: "none" }}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailModal;
