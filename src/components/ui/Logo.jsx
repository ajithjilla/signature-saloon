import { Scissors } from "lucide-react";

export default function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: "linear-gradient(135deg,#c9a84c,#e8c97a)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Scissors size={15} color="#0d0d0f" />
      </div>
      <div>
        <div className="ph" style={{ fontSize: 16, color: "var(--white)", lineHeight: 1 }}>
          MoiSalon
        </div>
        <div style={{ fontSize: 8, color: "var(--ash)", letterSpacing: "1px", textTransform: "uppercase" }}>
          Management
        </div>
      </div>
    </div>
  );
}
