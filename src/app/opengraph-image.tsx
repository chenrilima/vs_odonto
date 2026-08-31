import { ImageResponse } from "next/og";

export const alt = "VS Odonto — Dr. Vinicius Silva e Silva";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        background: "#07141d",
        color: "#f7f5f0",
        padding: "76px 86px",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 480,
          height: 480,
          border: "1px solid rgba(197,154,70,.35)",
          borderRadius: "50%",
          right: -120,
          top: -130,
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", width: 860 }}>
        <div
          style={{
            display: "flex",
            color: "#d6b266",
            fontFamily: "serif",
            fontSize: 92,
            fontStyle: "italic",
            lineHeight: 1,
            letterSpacing: -9,
          }}
        >
          VS
        </div>
        <div
          style={{
            display: "flex",
            width: 82,
            height: 2,
            background: "#c59a46",
            margin: "30px 0 34px",
          }}
        />
        <div style={{ display: "flex", fontSize: 54, lineHeight: 1.08 }}>
          Dr. Vinicius Silva e Silva
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 22,
            color: "#d6b266",
            fontSize: 25,
            letterSpacing: 5,
            textTransform: "uppercase",
          }}
        >
          Odontologia Planejada
        </div>
        <div style={{ display: "flex", marginTop: 52, fontSize: 23 }}>
          Tatuapé — São Paulo
        </div>
      </div>
    </div>,
    size,
  );
}
