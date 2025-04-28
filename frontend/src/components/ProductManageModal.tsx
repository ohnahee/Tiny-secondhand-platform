import axios from "axios";
import { useState } from "react";
import { Product } from "../context/ProductContext";

interface Props {
  product: Product;
  onClose: () => void;
  onDelete: (productId: number) => void;
}

function ProductManageModal({ product, onClose, onDelete }: Props) {
  const imageUrl = product.image_url ? `http://localhost:4000${product.image_url}` : "";

  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [newImage, setNewImage] = useState<File | null>(null);

  const userId = localStorage.getItem("userId");

  const handleDelete = async () => {
    const confirm = window.confirm("정말 삭제하시겠습니까?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:4000/products/${product.id}`);
      alert("상품이 삭제되었습니다.");
      onDelete(product.id);
      onClose();
    } catch (err) {
      alert("삭제 실패");
      console.error(err);
    }
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price.toString());
      formData.append("user_id", userId ?? "");
      if (newImage) {
        formData.append("image", newImage);
      }

      await axios.put(`http://localhost:4000/products/${product.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("상품이 수정되었습니다.");
      onClose(); // 모달 닫기
      location.reload(); // 새로고침
    } catch (err) {
      alert("수정 실패");
      console.error(err);
    }
  };

  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: "#fff",
        borderRadius: "8px",
        width: "600px",
        padding: "2rem",
        color: "#000",
        position: "relative"
      }}>
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            background: "transparent",
            border: "none",
            fontSize: "1.2rem",
            cursor: "pointer"
          }}
        >
          ×
        </button>

        {editMode ? (
          <>
            <input value={name} onChange={(e) => setName(e.target.value)} style={{ width: "100%", marginBottom: "10px" }} />
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} style={{ width: "100%", marginBottom: "10px" }} />
            <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} style={{ width: "100%", marginBottom: "10px" }} />
            <input type="file" accept="image/*" onChange={(e) => {
              if (e.target.files?.[0]) {
                setNewImage(e.target.files[0]);
              }
            }} />
          </>
        ) : (
          <>
            <img
              src={imageUrl}
              alt={product.name}
              style={{ width: "100%", height: "300px", objectFit: "contain", marginBottom: "1rem" }}
            />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <strong>{product.price.toLocaleString()}원</strong>
          </>
        )}

        <div style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
          {editMode ? (
            <>
              <button
                onClick={handleUpdate}
                style={{ padding: "10px 20px", backgroundColor: "#4caf50", color: "#fff", border: "none" }}
              >
                저장
              </button>
              <button
                onClick={() => setEditMode(false)}
                style={{ padding: "10px 20px", backgroundColor: "#888", color: "#fff", border: "none" }}
              >
                취소
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setEditMode(true)}
                style={{ padding: "10px 20px", backgroundColor: "#333", color: "#fff", border: "none" }}
              >
                수정
              </button>
              <button
                onClick={handleDelete}
                style={{ padding: "10px 20px", backgroundColor: "#d00", color: "#fff", border: "none" }}
              >
                삭제
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductManageModal;
