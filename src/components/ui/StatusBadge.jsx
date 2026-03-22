export default function StatusBadge({ status }) {
  const map = {
    confirmed: "gg",
    pending: "gw",
    cancelled: "gr",
    paid: "gg",
    unpaid: "gw",
    partial: "gb",
  };
  return <span className={`badge ${map[status] || "bg2"}`}>{status}</span>;
}
