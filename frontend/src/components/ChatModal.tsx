import { useState } from "react";

interface ChatModalProps {
  sellerId: number;
  sellerNickname: string;
  onClose: () => void;
}

const ChatModal = ({ sellerId, sellerNickname, onClose }: ChatModalProps) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  const handleSendMessage = () => {
    if (message.trim() === "") return;

    setMessages([...messages, message]);
    setMessage(""); // 입력 필드 초기화

    // 메시지를 서버로 전송하는 코드 (선택 사항)
    console.log(`판매자 ${sellerId}에게 메시지 전송: ${message}`);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          width: "400px",
          maxWidth: "90%",
          boxShadow: "0 0 10px rgba(0,0,0,0.3)",
        }}
      >
        <h3>채팅 - {sellerNickname}</h3>
        <div
          style={{
            height: "200px",
            overflowY: "scroll",
            marginBottom: "10px",
            border: "1px solid #ccc",
            padding: "10px",
          }}
        >
          {messages.map((msg, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <b>나: </b>{msg}
            </div>
          ))}
        </div>

        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ width: "80%", padding: "8px" }}
          placeholder="메시지를 입력하세요"
        />
        <button onClick={handleSendMessage} style={{ padding: "8px", marginLeft: "10px" }}>
          보내기
        </button>

        <button
          onClick={onClose}
          style={{
            backgroundColor: "#ccc",
            padding: "8px",
            marginTop: "10px",
            width: "100%",
          }}
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default ChatModal;
