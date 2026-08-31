import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#07141d",
        color: "#d6b266",
        fontFamily: "serif",
        fontSize: 86,
        fontStyle: "italic",
        fontWeight: 600,
        letterSpacing: -9,
        paddingRight: 9,
      }}
    >
      VS
    </div>,
    size,
  );
}
