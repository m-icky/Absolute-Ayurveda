import Reveal from "./Reveal";

const stats = [
  { num: "16+", label: "Years of Healing" },
  { num: "3", label: "Healing Sanctuaries" },
  { num: "∞", label: "Lives Transformed" },
];

export default function StatsBar() {
  return (
    <div
      style={{
        background: "#6B7C5B",
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        textAlign: "center",
      }}
    >
      {stats.map((s, i) => (
        <Reveal
          key={s.label}
          delay={i * 0.1}
          style={{
            padding: "40px 20px",
            borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.15)" : "none",
          }}
        >
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "42px",
              fontWeight: 400,
              color: "white",
              display: "block",
            }}
          >
            {s.num}
          </span>
          <span
            style={{
              fontSize: "11px",
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.65)",
              marginTop: "6px",
              display: "block",
            }}
          >
            {s.label}
          </span>
        </Reveal>
      ))}
    </div>
  );
}
