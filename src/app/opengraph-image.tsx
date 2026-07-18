import { ImageResponse } from "next/og";

export const alt = "iFlexo Visión Gráfica — Preprensa flexográfica";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Imagen por defecto al compartir en WhatsApp/redes (marca iFlexo).
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#26262b",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -160,
            width: 620,
            height: 620,
            borderRadius: "50%",
            background:
              "linear-gradient(135deg,#fbb215,#f57c1f,#ee3f6d,#c21a76)",
            opacity: 0.4,
            filter: "blur(20px)",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 30,
            color: "rgba(255,255,255,0.75)",
            fontWeight: 600,
            letterSpacing: 2,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              background:
                "linear-gradient(135deg,#fbb215,#f57c1f,#ee3f6d,#c21a76)",
            }}
          />
          PREPRENSA FLEXOGRÁFICA · COLOMBIA
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 84,
            fontWeight: 800,
            color: "white",
            lineHeight: 1.05,
            maxWidth: 900,
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          Impresión flexográfica con&nbsp;
          <span
            style={{
              background:
                "linear-gradient(135deg,#fbb215,#f57c1f,#ee3f6d,#c21a76)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            visión gráfica
          </span>
        </div>
        <div
          style={{
            marginTop: 30,
            fontSize: 34,
            color: "rgba(255,255,255,0.7)",
          }}
        >
          Kodak Flexcel NX · Prueba de color 95% · Bogotá y Medellín
        </div>
      </div>
    ),
    { ...size }
  );
}
