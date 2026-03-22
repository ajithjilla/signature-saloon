export const initProds = [
  { id: 1, name: "L'Oreal Shampoo", category: "Shampoo", brand: "L'Oreal", costPrice: 280, sellPrice: 450, stock: 24, minStock: 5, unit: "bottle" },
  { id: 2, name: "Schwarzkopf Color", category: "Hair Color", brand: "Schwarzkopf", costPrice: 320, sellPrice: 580, stock: 8, minStock: 10, unit: "tube" },
  { id: 3, name: "Wella Conditioner", category: "Conditioner", brand: "Wella", costPrice: 220, sellPrice: 380, stock: 15, minStock: 5, unit: "bottle" },
  { id: 4, name: "Keratin Treatment", category: "Treatment", brand: "TRESemmé", costPrice: 800, sellPrice: 1200, stock: 4, minStock: 3, unit: "kit" },
  { id: 5, name: "Hair Serum 100ml", category: "Serum", brand: "Pantene", costPrice: 180, sellPrice: 320, stock: 30, minStock: 8, unit: "bottle" },
  { id: 6, name: "Nail Polish Set", category: "Nail", brand: "OPI", costPrice: 350, sellPrice: 650, stock: 2, minStock: 5, unit: "set" },
];

export const initExpenses = [
  { id: 1, category: "Rent", name: "HQ Hyderabad Rent", amount: 45000, date: "2025-02-01", isRecurring: true, freq: "Monthly", notes: "Banjara Hills" },
  { id: 2, category: "Rent", name: "Bangalore Rent", amount: 32000, date: "2025-02-01", isRecurring: true, freq: "Monthly", notes: "Indira Nagar" },
  { id: 3, category: "Salary", name: "Priya K. Salary", amount: 35000, date: "2025-02-05", isRecurring: true, freq: "Monthly", notes: "Master Stylist" },
  { id: 4, category: "Salary", name: "Anita R. Salary", amount: 25000, date: "2025-02-05", isRecurring: true, freq: "Monthly", notes: "Stylist" },
  { id: 5, category: "Salary", name: "Rachel M. Salary", amount: 18000, date: "2025-02-05", isRecurring: true, freq: "Monthly", notes: "Receptionist" },
  { id: 6, category: "Salary", name: "Sunita K. Salary", amount: 22000, date: "2025-02-05", isRecurring: true, freq: "Monthly", notes: "Bangalore Stylist" },
  { id: 7, category: "Utility", name: "Electricity HQ", amount: 8500, date: "2025-02-08", isRecurring: true, freq: "Monthly", notes: "TSSPDCL" },
  { id: 8, category: "Inventory", name: "Product Restock", amount: 15600, date: "2025-02-10", isRecurring: false, freq: null, notes: "L'Oreal batch" },
  { id: 9, category: "Marketing", name: "Instagram Ads", amount: 5000, date: "2025-02-12", isRecurring: true, freq: "Monthly", notes: "Bridal season" },
  { id: 10, category: "Maintenance", name: "AC Servicing", amount: 3200, date: "2025-02-14", isRecurring: false, freq: null, notes: "Annual maintenance" },
];

export const initInvoices = [
  { id: 1, invoiceNo: "INV-001", date: "2025-02-01", customer: "Ananya Sharma", items: [{ type: "service", name: "Haircut", qty: 1, unitPrice: 500, tax: 18 }, { type: "product", name: "L'Oreal Shampoo", qty: 1, unitPrice: 450, tax: 18 }], total: 1121, paymentMethod: "UPI", status: "paid" },
  { id: 2, invoiceNo: "INV-002", date: "2025-02-05", customer: "Ravi Patel", items: [{ type: "service", name: "Coloring", qty: 1, unitPrice: 2000, tax: 18 }], total: 2360, paymentMethod: "Card", status: "paid" },
  { id: 3, invoiceNo: "INV-003", date: "2025-02-10", customer: "Kavya Singh", items: [{ type: "service", name: "Hair Spa", qty: 1, unitPrice: 1000, tax: 18 }], total: 1180, paymentMethod: "Cash", status: "unpaid" },
  { id: 4, invoiceNo: "INV-004", date: "2025-02-12", customer: "Meena Reddy", items: [{ type: "service", name: "Bridal Makeup", qty: 1, unitPrice: 7000, tax: 18 }], total: 8260, paymentMethod: "Cash", status: "paid" },
];

export const initMoves = [
  { id: 1, productId: 1, productName: "L'Oreal Shampoo", type: "purchase", qty: 12, unitCost: 280, date: "2025-02-01", notes: "Monthly restock" },
  { id: 2, productId: 2, productName: "Schwarzkopf Color", type: "sale", qty: 2, unitCost: 320, date: "2025-02-05", notes: "Sold to Ravi Patel" },
  { id: 3, productId: 4, productName: "Keratin Treatment", type: "internal_use", qty: 1, unitCost: 800, date: "2025-02-08", notes: "Used for Meena service" },
  { id: 4, productId: 3, productName: "Wella Conditioner", type: "sale", qty: 3, unitCost: 220, date: "2025-02-12", notes: "Counter sale" },
];

export const mthData = [
  { month: "Sep", income: 125000, expenses: 148000 },
  { month: "Oct", income: 142000, expenses: 152000 },
  { month: "Nov", income: 168000, expenses: 155000 },
  { month: "Dec", income: 210000, expenses: 162000 },
  { month: "Jan", income: 185000, expenses: 158000 },
  { month: "Feb", income: 178000, expenses: 161000 },
];

export const incPie = [
  { name: "Services", value: 142000, color: "#c9a84c" },
  { name: "Products", value: 28500, color: "#4caf82" },
  { name: "Packages", value: 7500, color: "#5b8dee" },
];

export const expPie = [
  { name: "Salaries", value: 100000, color: "#e05a5a" },
  { name: "Rent", value: 77000, color: "#e0943a" },
  { name: "Inventory", value: 15600, color: "#c9a84c" },
  { name: "Utilities", value: 11000, color: "#5b8dee" },
  { name: "Marketing", value: 5000, color: "#9b59b6" },
];
