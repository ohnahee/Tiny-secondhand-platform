// src/components/ProductCard.tsx

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url?: string;
}

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

function ProductCard({ product, onClick }: ProductCardProps) {
  const { name, description, price, image_url } = product;
  const imageSrc = image_url ? `http://localhost:4000${image_url}` : undefined;

  return (
    <div
      onClick={onClick}
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "1rem",
        backgroundColor: "#fff",
        color: "#000",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        cursor: "pointer"
      }}
    >
      {imageSrc && (
        <img
          src={imageSrc}
          alt={name}
          style={{
            width: "100%",
            height: "150px",
            objectFit: "contain",
            borderRadius: "4px",
            marginBottom: "0.75rem"
          }}
        />
      )}
      <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>{name}</h3>
      <p style={{ color: "#555", fontSize: "0.9rem", flexGrow: 1 }}>{description}</p>
      <strong style={{ marginTop: "0.75rem", fontSize: "1rem", color: "#000" }}>
        {price.toLocaleString()}원
      </strong>
    </div>
  );
}

export default ProductCard;
