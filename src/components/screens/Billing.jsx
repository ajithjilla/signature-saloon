import { useState } from "react";
import { Scissors, Package, ShoppingCart, Plus, MinusCircle, X, Search, Receipt, CreditCard, Wallet, DollarSign, Printer } from "lucide-react";
import PageHeader from "../ui/PageHeader";
import Label from "../ui/Label";
import StatusBadge from "../ui/StatusBadge";
import { SVCS, CUSTS } from "../../data";
import { R, fd } from "../../utils/helpers";

export default function Billing({ products, invoices, setInvoices }) {
  const [tab, setT] = useState("new");
  const [cust, setCust] = useState("");
  const [cart, setCart] = useState([]);
  const [pay, setPay] = useState("UPI");
  const [sq, setSq] = useState("");
  const [sf, setSf] = useState("all");

  const add = (item, type) => setCart((p) => {
    const ex = p.find((i) => i.name === item.name && i.type === type);
    if (ex) return p.map((i) => i.name === item.name && i.type === type ? { ...i, qty: i.qty + 1 } : i);
    return [...p, { type, name: item.name, unitPrice: type === "service" ? item.price : item.sellPrice, tax: 18, qty: 1 }];
  });
  const rem = (n, t) => setCart((p) => p.filter((i) => !(i.name === n && i.type === t)));
  const upQ = (n, t, q) => { if (q < 1) { rem(n, t); return; } setCart((p) => p.map((i) => i.name === n && i.type === t ? { ...i, qty: q } : i)); };
  const sub = cart.reduce((s, i) => s + i.unitPrice * i.qty, 0);
  const tax = cart.reduce((s, i) => s + (i.unitPrice * i.qty * i.tax / 100), 0);
  const tot = sub + tax;

  const create = () => {
    if (!cust || !cart.length) { alert("Select customer and add items"); return; }
    const inv = { id: invoices.length + 1, invoiceNo: `INV-${String(invoices.length + 1).padStart(3, "0")}`, date: new Date().toISOString().split("T")[0], customer: cust, items: cart.map((i) => ({ ...i })), total: tot, paymentMethod: pay, status: "paid" };
    setInvoices((p) => [inv, ...p]); setCart([]); setCust("");
    alert(`✅ Invoice ${inv.invoiceNo} created for ${R(Math.round(tot))}!`);
  };

  const filtInv = invoices.filter((i) => {
    const q = sq.toLowerCase();
    return (i.customer.toLowerCase().includes(q) || i.invoiceNo.toLowerCase().includes(q)) && (sf === "all" || i.status === sf);
  });

  return (
    <div>
      <PageHeader title="Billing & POS" sub="Create invoices, process payments" />
      <div className="fu1" style={{ display: "flex", gap: 7, marginBottom: 18 }}>
        {[["new", "+ New Invoice"], ["history", "Invoice History"]].map(([id, l]) => <button key={id} className={`pt ${tab === id ? "active" : ""}`} onClick={() => setT(id)}>{l}</button>)}
      </div>
      {tab === "new" && (
        <div className="fu2" style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 18 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div className="card" style={{ padding: 16 }}>
              <Label>Customer</Label>
              <select className="inp" value={cust} onChange={(e) => setCust(e.target.value)}>
                <option value="">Select customer…</option>
                <option>Walk-in Customer</option>
                {CUSTS.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
              </select>
            </div>
            <div className="card" style={{ padding: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 12 }}><Scissors size={14} color="var(--gold)" /><h3 className="ph" style={{ fontSize: 16 }}>Services</h3></div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {SVCS.map((s) => (
                  <div key={s.id} onClick={() => add(s, "service")} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: "var(--ink3)", border: "1px solid var(--ink4)", borderRadius: "var(--r)", cursor: "pointer", transition: "border-color .15s" }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--gold)"}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--ink4)"}>
                    <div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 500 }}>{s.name}</div><div style={{ fontSize: 10, color: "var(--smoke)" }}>{s.duration}min</div></div>
                    <div style={{ fontWeight: 600, color: "var(--gold)", fontSize: 12 }}>{R(s.price)}</div>
                    <Plus size={13} color="var(--ash)" />
                  </div>
                ))}
              </div>
            </div>
            <div className="card" style={{ padding: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 12 }}><Package size={14} color="var(--blue)" /><h3 className="ph" style={{ fontSize: 16 }}>Products</h3></div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {products.filter((p) => p.stock > 0).map((p) => (
                  <div key={p.id} onClick={() => add(p, "product")} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: "var(--ink3)", border: "1px solid var(--ink4)", borderRadius: "var(--r)", cursor: "pointer", transition: "border-color .15s" }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--gold)"}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--ink4)"}>
                    <div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 500 }}>{p.name}</div><div style={{ fontSize: 10, color: "var(--smoke)" }}>Stock: {p.stock}</div></div>
                    <div style={{ fontWeight: 600, color: "var(--blue)", fontSize: 12 }}>{R(p.sellPrice)}</div>
                    <Plus size={13} color="var(--ash)" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ position: "sticky", top: 70 }}>
            <div className="card">
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}><ShoppingCart size={15} color="var(--gold)" /><h3 className="ph" style={{ fontSize: 17 }}>Invoice</h3></div>
              {cart.length === 0 ? (
                <div style={{ textAlign: "center", padding: "28px 0", color: "var(--smoke)", fontSize: 12 }}><ShoppingCart size={28} style={{ marginBottom: 7, opacity: 0.25 }} /><br />Add services or products</div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 7, marginBottom: 14 }}>
                  {cart.map((item) => (
                    <div key={item.name + item.type} style={{ padding: "9px 11px", background: "var(--ink3)", borderRadius: "var(--r)", border: "1px solid var(--ink4)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                        <div><div style={{ fontSize: 12, fontWeight: 500 }}>{item.name}</div><span className={`badge ${item.type === "service" ? "bg2" : "gb"}`} style={{ fontSize: 9 }}>{item.type}</span></div>
                        <button onClick={() => rem(item.name, item.type)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--smoke)" }}><X size={12} /></button>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                          <button onClick={() => upQ(item.name, item.type, item.qty - 1)} style={{ background: "var(--ink4)", border: "none", cursor: "pointer", borderRadius: 4, width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--white)" }}><MinusCircle size={10} /></button>
                          <span style={{ fontSize: 12, fontWeight: 600, minWidth: 14, textAlign: "center" }}>{item.qty}</span>
                          <button onClick={() => upQ(item.name, item.type, item.qty + 1)} style={{ background: "var(--ink4)", border: "none", cursor: "pointer", borderRadius: 4, width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--white)" }}><PlusCircle size={10} /></button>
                        </div>
                        <span style={{ fontWeight: 600, fontSize: 12, color: "var(--gold)" }}>{R(item.unitPrice * item.qty)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="divider" />
              <div style={{ fontSize: 12, display: "flex", flexDirection: "column", gap: 5, marginBottom: 13 }}>
                <div style={{ display: "flex", justifyContent: "space-between", color: "var(--ash)" }}><span>Subtotal</span><span>{R(sub)}</span></div>
                <div style={{ display: "flex", justifyContent: "space-between", color: "var(--ash)" }}><span>GST 18%</span><span>{R(Math.round(tax))}</span></div>
                <div className="divider" />
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 15 }}>
                  <span>Total</span>
                  <span className="ph" style={{ fontSize: 22, color: "var(--gold)" }}>{R(Math.round(tot))}</span>
                </div>
              </div>
              <div style={{ marginBottom: 13 }}>
                <Label>Payment Method</Label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
                  {[["UPI", <Wallet size={11} />], ["Cash", <DollarSign size={11} />], ["Card", <CreditCard size={11} />]].map(([m, ic]) => (
                    <button key={m} className={`btn ${pay === m ? "bg" : "bo"} bsm`} onClick={() => setPay(m)}>{ic}{m}</button>
                  ))}
                </div>
              </div>
              <button className="btn bg blg bfw" onClick={create} disabled={!cart.length || !cust} style={{ opacity: (!cart.length || !cust) ? 0.5 : 1 }}>
                <Receipt size={15} /> Generate Invoice
              </button>
            </div>
          </div>
        </div>
      )}
      {tab === "history" && (
        <div className="fu2">
          <div style={{ display: "flex", gap: 9, marginBottom: 14 }}>
            <div style={{ flex: 1, position: "relative" }}>
              <Search size={13} style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: "var(--smoke)" }} />
              <input className="inp" placeholder="Search invoice or customer…" value={sq} onChange={(e) => setSq(e.target.value)} style={{ paddingLeft: 32 }} />
            </div>
            <select className="inp" style={{ width: 130 }} value={sf} onChange={(e) => setSf(e.target.value)}>
              <option value="all">All Status</option><option value="paid">Paid</option><option value="unpaid">Unpaid</option>
            </select>
          </div>
          <div className="card" style={{ padding: 0 }}>
            <div className="tw">
              <table>
                <thead><tr><th>Invoice</th><th>Date</th><th>Customer</th><th>Items</th><th>Total</th><th>Payment</th><th>Status</th><th></th></tr></thead>
                <tbody>
                  {filtInv.map((inv) => (
                    <tr key={inv.id}>
                      <td style={{ fontWeight: 600, color: "var(--gold)" }}>{inv.invoiceNo}</td>
                      <td style={{ color: "var(--ash)", fontSize: 12 }}>{fd(inv.date)}</td>
                      <td style={{ fontWeight: 500 }}>{inv.customer}</td>
                      <td style={{ fontSize: 12, color: "var(--ash)" }}>{inv.items.length} item{inv.items.length > 1 ? "s" : ""}</td>
                      <td style={{ fontWeight: 700 }}>{R(Math.round(inv.total))}</td>
                      <td><span className="badge gb">{inv.paymentMethod}</span></td>
                      <td><StatusBadge status={inv.status} /></td>
                      <td><button className="btn bgh bsm"><Printer size={12} /></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
