import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#06122a", // fondo oscuro sólido
        }}
      >
        <div
          style={{
            color: "#22e3a3",
            fontSize: 22,
            fontWeight: 900,
            fontFamily: "Arial, sans-serif",
          }}
        >
          M
        </div>
      </div>
    ),
    { ...size }
  );
}
    ),
    { ...size }
  );
}
