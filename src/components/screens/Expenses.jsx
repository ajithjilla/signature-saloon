import { useState } from "react";
import { Plus, RefreshCw, Trash2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Label from "../ui/Label";
import PageHeader from "../ui/PageHeader";
import ChartTooltip from "../ui/ChartTooltip";
import { R, fd } from "../../utils/helpers";

export default function Expenses({ expenses, setExpenses }) {
  const [showAdd, setSA] = useState(false);
  const [form, setF] = useState({
    category: "Rent",
    name: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    isRecurring: false,
    freq: "Monthly",
    notes: "",
  });
  const cats = ["Rent", "Salary", "Utility", "Inventory", "Marketing", "Maintenance", "Other"];
  const cc = { Rent: "var(--red)", Salary: "var(--warn)", Utility: "var(--blue)", Inventory: "var(--gold)", Marketing: "#9b59b6", Maintenance: "var(--ash)", Other: "var(--smoke)" };
  const total = expenses.reduce((s, e) => s + e.amount, 0);
  const rec = expenses.filter((e) => e.isRecurring).reduce((s, e) => s + e.amount, 0);

  const catTot = cats
    .map((c) => ({
      name: c,
      total: expenses.filter((e) => e.category === c).reduce((s, e) => s + e.amount, 0),
      color: cc[c],
    }))
    .filter((c) => c.total > 0);

  const doAdd = () => {
    if (!form.name || !form.amount) return;
    setExpenses((p) => [...p, { id: p.length + 1, ...form, amount: Number(form.amount) }]);
    setSA(false);
    setF({ category: "Rent", name: "", amount: "", date: new Date().toISOString().split("T")[0], isRecurring: false, freq: "Monthly", notes: "" });
  };

  return (
    <div>
      <PageHeader
        title="Expenses"
        sub="Rent, salaries, utilities & all outgoings"
        action={
          <button className="btn bg" onClick={() => setSA(true)}>
            <Plus size={14} /> Add Expense
          </button>
        }
      />
      <div className="fu1" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 18 }}>
        {[
          { l: "Total Expenses", v: R(total), a: "red", s: "This month" },
          { l: "Recurring", v: R(rec), a: "warn", s: `${expenses.filter((e) => e.isRecurring).length} items` },
          { l: "One-time", v: R(total - rec), a: "gold", s: `${expenses.filter((e) => !e.isRecurring).length} items` },
          { l: "Categories", v: String(catTot.length), a: "blue", s: "expense types" },
        ].map(({ l, v, a, s }) => (
          <div key={l} className={`stat ${a}`}>
            <div className="sl">{l}</div>
            <div className="sv">{v}</div>
            <div className="ssub">{s}</div>
          </div>
        ))}
      </div>
      <div className="fu2" style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 18, marginBottom: 18 }}>
        <div className="card">
          <h3 className="ph" style={{ fontSize: 17, marginBottom: 14 }}>
            Monthly Expense Trend
          </h3>
          <ResponsiveContainer width="100%" height={170}>
            <BarChart data={window.__MTH_DATA__ || []} margin={{ left: 0, right: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--ink4)" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: "var(--ash)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "var(--ash)", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v / 1000}k`} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="expenses" name="Expenses" fill="var(--red)" radius={[4, 4, 0, 0]} fillOpacity={0.8} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <h3 className="ph" style={{ fontSize: 17, marginBottom: 12 }}>
            By Category
          </h3>
          {catTot
            .sort((a, b) => b.total - a.total)
            .map((c) => (
              <div key={c.name} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 3 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 7, height: 7, borderRadius: 2, background: c.color }} />
                    {c.name}
                  </div>
                  <span style={{ fontWeight: 600, color: c.color }}>{R(c.total)}</span>
                </div>
                <div className="sb2">
                  <div className="sb2f" style={{ width: `${(c.total / total) * 100}%`, background: c.color }} />
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="fu3 card" style={{ padding: 0 }}>
        <div className="tw">
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Name</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Type</th>
                <th>Notes</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((e) => (
                <tr key={e.id}>
                  <td>
                    <span className="badge" style={{ background: `${cc[e.category]}22`, color: cc[e.category] }}>
                      {e.category}
                    </span>
                  </td>
                  <td style={{ fontWeight: 500, fontSize: 13 }}>{e.name}</td>
                  <td style={{ fontWeight: 700, color: "var(--red)" }}>{R(e.amount)}</td>
                  <td style={{ color: "var(--ash)", fontSize: 11 }}>{fd(e.date)}</td>
                  <td>
                    {e.isRecurring ? (
                      <span className="badge gw">
                        <RefreshCw size={8} /> {e.freq}
                      </span>
                    ) : (
                      <span className="badge bg2">One-time</span>
                    )}
                  </td>
                  <td style={{ color: "var(--smoke)", fontSize: 11, maxWidth: 150, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{e.notes || "—"}</td>
                  <td>
                    <button className="btn bd bsm" onClick={() => setExpenses((p) => p.filter((x) => x.id !== e.id))}>
                      <Trash2 size={11} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showAdd && (
        <div className="overlay" onClick={() => setSA(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="ph" style={{ fontSize: 20, marginBottom: 18 }}>
              Add Expense
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 11, marginBottom: 18 }}>
              <div>
                <Label>Category</Label>
                <select className="inp" value={form.category} onChange={(e) => setF((f) => ({ ...f, category: e.target.value }))}>
                  {cats.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Expense Name</Label>
                <input className="inp" placeholder="e.g. HQ Rent" value={form.name} onChange={(e) => setF((f) => ({ ...f, name: e.target.value }))} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9 }}>
                <div>
                  <Label>Amount (₹)</Label>
                  <input className="inp" type="number" placeholder="45000" value={form.amount} onChange={(e) => setF((f) => ({ ...f, amount: e.target.value }))} />
                </div>
                <div>
                  <Label>Date</Label>
                  <input className="inp" type="date" value={form.date} onChange={(e) => setF((f) => ({ ...f, date: e.target.value }))} />
                </div>
              </div>
              <label style={{ display: "flex", alignItems: "center", gap: 9, cursor: "pointer", fontSize: 13 }}>
                <input type="checkbox" checked={form.isRecurring} onChange={(e) => setF((f) => ({ ...f, isRecurring: e.target.checked }))} style={{ accentColor: "var(--gold)", width: 14, height: 14 }} />
                Recurring expense
              </label>
              {form.isRecurring && (
                <div>
                  <Label>Frequency</Label>
                  <select className="inp" value={form.freq} onChange={(e) => setF((f) => ({ ...f, freq: e.target.value }))}>
                    <option>Monthly</option>
                    <option>Weekly</option>
                    <option>Yearly</option>
                    <option>Quarterly</option>
                  </select>
                </div>
              )}
              <div>
                <Label>Notes</Label>
                <input className="inp" placeholder="Reference…" value={form.notes} onChange={(e) => setF((f) => ({ ...f, notes: e.target.value }))} />
              </div>
            </div>
            <div style={{ display: "flex", gap: 9 }}>
              <button className="btn bgh bfw" onClick={() => setSA(false)}>
                Cancel
              </button>
              <button className="btn bg bfw" onClick={doAdd}>
                Add Expense
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
