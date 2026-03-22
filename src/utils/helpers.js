export const R = (n) => `₹${Number(n).toLocaleString("en-IN")}`;
export const fd = (d) => new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
