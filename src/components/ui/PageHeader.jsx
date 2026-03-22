export default function PageHeader({ title, sub, action }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 22,
      }}
      className="fu"
    >
      <div>
        <h1 className="ph" style={{ fontSize: 28, marginBottom: 2 }}>
          {title}
        </h1>
        {sub && (
          <p style={{ color: "var(--ash)", fontSize: 12 }}>{sub}</p>
        )}
      </div>
      {action}
    </div>
  );
}
