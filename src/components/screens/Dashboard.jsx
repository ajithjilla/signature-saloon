import { AreaChart, Area, PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Plus, ChevronRight, AlertTriangle } from "lucide-react";
import StatusBadge from "../ui/StatusBadge";
import { APTS, incPie } from "../../data";
import { R } from "../../utils/helpers";

export default function Dashboard({ setScreen, products }) {
  const low = products.filter((p) => p.stock <= p.minStock);
  return (
    <div>
      <div className="fu" style={{ marginBottom: 20 }}>
        <h1 className="ph" style={{ fontSize: 28, marginBottom: 2 }}>Good morning, Priya ✦</h1>
        <p style={{ color: "var(--ash)", fontSize: 12 }}>February 2025 · Business at a glance</p>
      </div>
      <div className="fu1" style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 12, marginBottom: 20 }}>
        {[
          { l: "Today's Bookings", v: "15", a: "gold", s: "+3 vs yesterday" },
          { l: "Revenue Today", v: R(12980), a: "green", s: "5 appointments" },
          { l: "Outstanding", v: R(1180), a: "warn", s: "1 unpaid invoice" },
          { l: "Monthly Profit", v: R(17000), a: "green", s: "9.5% margin" },
          { l: "Low Stock", v: String(low.length), a: low.length ? "red" : "green", s: "Need restock" },
        ].map(({ l, v, a, s }) => (
          <div key={l} className={`stat ${a}`}>
            <div className="sl">{l}</div>
            <div className="sv">{v}</div>
            <div className="ssub">{s}</div>
          </div>
        ))}
      </div>
      <div className="fu2" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 20 }}>
        {[
          { l: "+ New Booking", s: "booking", g: "linear-gradient(135deg,#c9a84c,#e8c97a)" },
          { l: "Create Invoice", s: "billing", g: "linear-gradient(135deg,#4caf82,#6dd5a5)" },
          { l: "Add Expense", s: "expenses", g: "linear-gradient(135deg,#e05a5a,#f08080)" },
          { l: "Update Stock", s: "inventory", g: "linear-gradient(135deg,#5b8dee,#7fb3f5)" },
        ].map(({ l, s, g }) => (
          <button key={l} onClick={() => setScreen(s)} style={{ background: "var(--ink2)", border: "1px solid var(--ink4)", borderRadius: "var(--rl)", padding: "16px 18px", cursor: "pointer", textAlign: "left", transition: "all .18s" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--gold)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--ink4)"; e.currentTarget.style.transform = "none"; }}>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: g, marginBottom: 9, display: "flex", alignItems: "center", justifyContent: "center" }}><Plus size={14} color="var(--ink)" /></div>
            <div style={{ fontWeight: 600, fontSize: 13 }}>{l}</div>
          </button>
        ))}
      </div>
      <div className="fu3" style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 18 }}>
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h2 className="ph" style={{ fontSize: 19 }}>Today's Schedule</h2>
            <button className="btn bgh bsm" onClick={() => setScreen("appointments")}>View all <ChevronRight size={12} /></button>
          </div>
          {APTS.map((a) => (
            <div key={a.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 13px", background: "var(--ink3)", border: "1px solid var(--ink4)", borderRadius: "var(--r)", marginBottom: 7 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--gold)", minWidth: 42 }}>{a.time}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 500, fontSize: 12 }}>{a.service}</div>
                <div style={{ fontSize: 11, color: "var(--smoke)" }}>{a.customer} · {a.staff}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontWeight: 600, fontSize: 12 }}>{R(a.price)}</div>
                <StatusBadge status={a.status} />
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {low.length > 0 && (
            <div className="card" style={{ borderColor: "rgba(224,90,90,.3)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 12 }}>
                <AlertTriangle size={14} color="var(--red)" />
                <h3 className="ph" style={{ fontSize: 15, color: "var(--red)" }}>Low Stock Alert</h3>
              </div>
              {low.map((p) => <div key={p.id} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid var(--ink4)", fontSize: 12 }}><span>{p.name}</span><span className="badge gr">{p.stock} left</span></div>)}
              <button className="btn bo bsm bfw" style={{ marginTop: 10 }} onClick={() => setScreen("inventory")}>Manage Stock</button>
            </div>
          )}
          <div className="card">
            <h3 className="ph" style={{ fontSize: 17, marginBottom: 12 }}>Income Split</h3>
            <ResponsiveContainer width="100%" height={140}>
              <PieChart>
                <Pie data={incPie} cx="50%" cy="50%" innerRadius={35} outerRadius={60} dataKey="value" paddingAngle={2}>
                  {incPie.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--ink2)", border: "1px solid var(--ink4)", borderRadius: 7, fontSize: 11 }} formatter={(v) => R(v)} />
                <Legend iconSize={7} wrapperStyle={{ fontSize: 10, color: "var(--ash)" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
