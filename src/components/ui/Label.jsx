export default function Label({ children }) {
  return (
    <div
      style={{
        fontSize: 10,
        color: "var(--ash)",
        letterSpacing: ".5px",
        textTransform: "uppercase",
        marginBottom: 5,
        fontWeight: 500,
      }}
    >
      {children}
    </div>
  );
}
