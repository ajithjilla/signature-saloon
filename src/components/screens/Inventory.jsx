import { useState } from "react";
import { Plus, Search, AlertTriangle } from "lucide-react";
import Label from "../ui/Label";
import PageHeader from "../ui/PageHeader";
import { R, fd } from "../../utils/helpers";

export default function Inventory({ products, setProducts, movements, setMovements }) {
  const [tab, setT] = useState("products");
  const [showAdd, setSA] = useState(false);
  const [stockMod, setSM] = useState(null);
  const [sf, setSF] = useState({ type: "purchase", qty: "", cost: "", notes: "" });
  const [sq, setSq] = useState("");
  const [np, setNP] = useState({ name: "", category: "", brand: "", costPrice: "", sellPrice: "", stock: "", minStock: "", unit: "bottle" });

  const totalVal = products.reduce((s, p) => s + p.costPrice * p.stock, 0);
  const totalRet = products.reduce((s, p) => s + p.sellPrice * p.stock, 0);
  const lowItems = products.filter((p) => p.stock <= p.minStock);

  const doStock = () => {
    if (!sf.qty) return;
    const qty = Number(sf.qty),
      delta = sf.type === "purchase" ? qty : -qty;
    setProducts((p) => p.map((x) => (x.id === stockMod.id ? { ...x, stock: Math.max(0, x.stock + delta) } : x)));
    setMovements((p) => [
      {
        id: p.length + 1,
        productId: stockMod.id,
        productName: stockMod.name,
        type: sf.type,
        qty,
        unitCost: Number(sf.cost) || stockMod.costPrice,
        date: new Date().toISOString().split("T")[0],
        notes: sf.notes,
      },
      ...p,
    ]);
    setSM(null);
    setSF({ type: "purchase", qty: "", cost: "", notes: "" });
  };
  const doAdd = () => {
    if (!np.name || !np.sellPrice) return;
    setProducts((p) => [...p, { id: p.length + 1, ...np, costPrice: Number(np.costPrice), sellPrice: Number(np.sellPrice), stock: Number(np.stock) || 0, minStock: Number(np.minStock) || 5 }]);
    setSA(false);
    setNP({ name: "", category: "", brand: "", costPrice: "", sellPrice: "", stock: "", minStock: "", unit: "bottle" });
  };

  const filt = products.filter((p) => p.name.toLowerCase().includes(sq.toLowerCase()) || p.category.toLowerCase().includes(sq.toLowerCase()));
  const tc = { purchase: "var(--green)", sale: "var(--blue)", internal_use: "var(--warn)", adjustment: "var(--ash)" };
  const tl = { purchase: "Purchase", sale: "Sale", internal_use: "Internal Use", adjustment: "Adjust" };

  return (
    <div>
      <PageHeader
        title="Inventory"
        sub="Products, stock movements & valuation"
        action={
          <button className="btn bg" onClick={() => setSA(true)}>
            <Plus size={14} /> Add Product
          </button>
        }
      />
      <div className="fu1" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 18 }}>
        {[
          { l: "Total Products", v: String(products.length), a: "gold", s: "active SKUs" },
          { l: "Stock Value", v: R(totalVal), a: "blue", s: "at cost price" },
          { l: "Retail Value", v: R(totalRet), a: "green", s: "potential revenue" },
          { l: "Low Stock", v: String(lowItems.length), a: "red", s: "need reorder" },
        ].map(({ l, v, a, s }) => (
          <div key={l} className={`stat ${a}`}>
            <div className="sl">{l}</div>
            <div className="sv">{v}</div>
            <div className="ssub">{s}</div>
          </div>
        ))}
      </div>
      <div className="fu2" style={{ display: "flex", gap: 7, marginBottom: 16 }}>
        {[
          ["products", "Products"],
          ["movements", "Stock Movements"],
        ].map(([id, l]) => (
          <button key={id} className={`pt ${tab === id ? "active" : ""}`} onClick={() => setT(id)}>
            {l}
          </button>
        ))}
      </div>
      {tab === "products" && (
        <>
          <div style={{ marginBottom: 12 }}>
            <div style={{ position: "relative" }}>
              <Search size={13} style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: "var(--smoke)" }} />
              <input className="inp" placeholder="Search products…" value={sq} onChange={(e) => setSq(e.target.value)} style={{ paddingLeft: 32 }} />
            </div>
          </div>
          <div className="card" style={{ padding: 0 }}>
            <div className="tw">
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Cost</th>
                    <th>Sell</th>
                    <th>Stock</th>
                    <th>Level</th>
                    <th>Value</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filt.map((p) => {
                    const pct = Math.min(100, (p.stock / Math.max(p.minStock * 2, 1)) * 100);
                    const low = p.stock <= p.minStock;
                    return (
                      <tr key={p.id}>
                        <td>
                          <div style={{ fontWeight: 500, fontSize: 13 }}>{p.name}</div>
                          <div style={{ fontSize: 10, color: "var(--smoke)" }}>{p.brand}</div>
                        </td>
                        <td>
                          <span className="badge bg2">{p.category}</span>
                        </td>
                        <td style={{ color: "var(--ash)", fontSize: 12 }}>{R(p.costPrice)}</td>
                        <td style={{ fontWeight: 600, fontSize: 12 }}>{R(p.sellPrice)}</td>
                        <td>
                          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <span style={{ fontWeight: 700, color: low ? "var(--red)" : "var(--white)", fontSize: 13 }}>{p.stock}</span>
                            <span style={{ fontSize: 10, color: "var(--smoke)" }}>{p.unit}{p.stock !== 1 ? "s" : ""}</span>
                            {low && <AlertTriangle size={11} color="var(--red)" />}
                          </div>
                        </td>
                        <td style={{ width: 100 }}>
                          <div className="sb2">
                            <div className="sb2f" style={{ width: `${pct}%`, background: pct < 30 ? "var(--red)" : pct < 60 ? "var(--warn)" : "var(--green)" }} />
                          </div>
                          <div style={{ fontSize: 9, color: "var(--smoke)", marginTop: 2 }}>Min:{p.minStock}</div>
                        </td>
                        <td style={{ fontWeight: 600, color: "var(--gold)", fontSize: 12 }}>{R(p.costPrice * p.stock)}</td>
                        <td>
                          <button className="btn bgh bsm" onClick={() => setSM(p)}>
                            Update
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
      {tab === "movements" && (
        <div className="card" style={{ padding: 0 }}>
          <div className="tw">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Product</th>
                  <th>Type</th>
                  <th>Qty</th>
                  <th>Unit Cost</th>
                  <th>Total Value</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {movements.map((m) => (
                  <tr key={m.id}>
                    <td style={{ color: "var(--ash)", fontSize: 11 }}>{fd(m.date)}</td>
                    <td style={{ fontWeight: 500, fontSize: 13 }}>{m.productName}</td>
                    <td>
                      <span className="badge" style={{ background: `${tc[m.type]}22`, color: tc[m.type], fontSize: 10 }}>
                        {m.type === "purchase" ? "+" : "-"} {tl[m.type]}
                      </span>
                    </td>
                    <td style={{ fontWeight: 700 }}>{m.type === "purchase" ? "+" : "-"}{m.qty}</td>
                    <td style={{ color: "var(--ash)", fontSize: 12 }}>{R(m.unitCost)}</td>
                    <td style={{ fontWeight: 600, color: m.type === "purchase" ? "var(--red)" : "var(--green)", fontSize: 12 }}>
                      {m.type === "purchase" ? "-" : "+"}
                      {R(m.qty * m.unitCost)}
                    </td>
                    <td style={{ color: "var(--smoke)", fontSize: 11 }}>{m.notes || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {stockMod && (
        <div className="overlay" onClick={() => setSM(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="ph" style={{ fontSize: 20, marginBottom: 3 }}>
              Update Stock
            </h2>
            <p style={{ color: "var(--ash)", fontSize: 12, marginBottom: 18 }}>
              {stockMod.name} · Current: <b style={{ color: "var(--white)" }}>{stockMod.stock} {stockMod.unit}s</b>
            </p>
            <div style={{ marginBottom: 13 }}>
              <Label>Movement Type</Label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7 }}>
                {[
                  ["purchase", "📦 Purchase", "Adds stock"],
                  ["sale", "🛒 Sale", "Reduces stock"],
                  ["internal_use", "✂️ Internal Use", "Used in service"],
                  ["adjustment", "🔄 Adjustment", "Manual fix"],
                ].map(([id, l, s]) => (
                  <button
                    key={id}
                    className={`btn ${sf.type === id ? "bg" : "bo"}`}
                    style={{ justifyContent: "flex-start", flexDirection: "column", alignItems: "flex-start", padding: "10px 12px", gap: 2 }}
                    onClick={() => setSF((f) => ({ ...f, type: id }))}
                  >
                    <span style={{ fontSize: 12 }}>{l}</span>
                    <span style={{ fontSize: 10, opacity: 0.7, fontWeight: 400 }}>{s}</span>
                  </button>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: 11 }}>
              <Label>{`Quantity (${stockMod.unit}s)`}</Label>
              <input className="inp" type="number" min="1" placeholder="Enter quantity" value={sf.qty} onChange={(e) => setSF((f) => ({ ...f, qty: e.target.value }))} />
            </div>
            {sf.type === "purchase" && (
              <div style={{ marginBottom: 11 }}>
                <Label>Cost per unit (₹)</Label>
                <input className="inp" type="number" placeholder={`Default: ${stockMod.costPrice}`} value={sf.cost} onChange={(e) => setSF((f) => ({ ...f, cost: e.target.value }))} />
              </div>
            )}
            <div style={{ marginBottom: 18 }}>
              <Label>Notes</Label>
              <input className="inp" placeholder="Reference or reason…" value={sf.notes} onChange={(e) => setSF((f) => ({ ...f, notes: e.target.value }))} />
            </div>
            <div style={{ display: "flex", gap: 9 }}>
              <button className="btn bgh bfw" onClick={() => setSM(null)}>
                Cancel
              </button>
              <button className="btn bg bfw" onClick={doStock}>
                Confirm Update
              </button>
            </div>
          </div>
        </div>
      )}
      {showAdd && (
        <div className="overlay" onClick={() => setSA(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="ph" style={{ fontSize: 20, marginBottom: 18 }}>
              Add New Product
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
              <div style={{ gridColumn: "1/-1" }}>
                <Label>Product Name</Label>
                <input className="inp" placeholder="L'Oreal Shampoo 200ml" value={np.name} onChange={(e) => setNP((p) => ({ ...p, name: e.target.value }))} />
              </div>
              <div>
                <Label>Category</Label>
                <input className="inp" placeholder="Shampoo" value={np.category} onChange={(e) => setNP((p) => ({ ...p, category: e.target.value }))} />
              </div>
              <div>
                <Label>Brand</Label>
                <input className="inp" placeholder="L'Oreal" value={np.brand} onChange={(e) => setNP((p) => ({ ...p, brand: e.target.value }))} />
              </div>
              <div>
                <Label>Cost Price (₹)</Label>
                <input className="inp" type="number" placeholder="280" value={np.costPrice} onChange={(e) => setNP((p) => ({ ...p, costPrice: e.target.value }))} />
              </div>
              <div>
                <Label>Sell Price (₹)</Label>
                <input className="inp" type="number" placeholder="450" value={np.sellPrice} onChange={(e) => setNP((p) => ({ ...p, sellPrice: e.target.value }))} />
              </div>
              <div>
                <Label>Initial Stock</Label>
                <input className="inp" type="number" placeholder="0" value={np.stock} onChange={(e) => setNP((p) => ({ ...p, stock: e.target.value }))} />
              </div>
              <div>
                <Label>Min Stock Alert</Label>
                <input className="inp" type="number" placeholder="5" value={np.minStock} onChange={(e) => setNP((p) => ({ ...p, minStock: e.target.value }))} />
              </div>
              <div style={{ gridColumn: "1/-1" }}>
                <Label>Unit</Label>
                <select className="inp" value={np.unit} onChange={(e) => setNP((p) => ({ ...p, unit: e.target.value }))}>
                  <option>bottle</option>
                  <option>tube</option>
                  <option>kit</option>
                  <option>set</option>
                  <option>piece</option>
                  <option>box</option>
                </select>
              </div>
            </div>
            <div style={{ display: "flex", gap: 9 }}>
              <button className="btn bgh bfw" onClick={() => setSA(false)}>
                Cancel
              </button>
              <button className="btn bg bfw" onClick={doAdd}>
                Add Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
