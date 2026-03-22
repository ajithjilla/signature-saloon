export default function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "var(--ink2)",
        border: "1px solid var(--ink4)",
        borderRadius: 8,
        padding: "8px 12px",
        fontSize: 12,
      }}
    >
      <div style={{ fontWeight: 600, marginBottom: 4, color: "var(--ash)" }}>{label}</div>
      {payload.map((p) => (
        <div key={p.name} style={{ color: p.color }}>
          {p.name}: <b>₹{Number(p.value).toLocaleString("en-IN")}</b>
        </div>
      ))}
    </div>
  );
}
