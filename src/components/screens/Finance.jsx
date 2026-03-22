import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { ArrowUpRight, ArrowDownRight, TrendingUp, Clock, FileText } from "lucide-react";
import PageHeader from "../ui/PageHeader";
import ChartTooltip from "../ui/ChartTooltip";
import { mthData, incPie, expPie } from "../../data";
import { R } from "../../utils/helpers";

export default function Finance() {
  return (
    <div>
      <PageHeader title="Finance & P&L" sub="Revenue, expenses & profitability" />
      <div className="fu1" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 20 }}>
        {[
          { l: "Total Income", v: R(178000), a: "green", i: <ArrowUpRight size={14} color="var(--green)" /> },
          { l: "Total Expenses", v: R(161000), a: "red", i: <ArrowDownRight size={14} color="var(--red)" /> },
          { l: "Net Profit", v: R(17000), a: "gold", i: <TrendingUp size={14} color="var(--gold)" /> },
          { l: "Outstanding", v: R(1180), a: "warn", i: <Clock size={14} color="var(--warn)" /> },
        ].map(({ l, v, a, i }) => (
          <div key={l} className={`stat ${a}`}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}><div className="sl">{l}</div>{i}</div>
            <div className="sv">{v}</div>
          </div>
        ))}
      </div>
      <div className="fu2 card" style={{ marginBottom: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h2 className="ph" style={{ fontSize: 19 }}>Income vs Expenses (6 months)</h2>
          <button className="btn bo bsm"><FileText size={12} /> Export</button>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={mthData} margin={{ top: 4, right: 4, bottom: 4, left: 4 }}>
            <defs>
              <linearGradient id="gi" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#4caf82" stopOpacity={0.22} /><stop offset="95%" stopColor="#4caf82" stopOpacity={0} /></linearGradient>
              <linearGradient id="ge" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#e05a5a" stopOpacity={0.18} /><stop offset="95%" stopColor="#e05a5a" stopOpacity={0} /></linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--ink4)" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: "var(--ash)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "var(--ash)", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v / 1000}k`} />
            <Tooltip content={<ChartTooltip />} />
            <Area type="monotone" dataKey="income" name="Income" stroke="var(--green)" fill="url(#gi)" strokeWidth={2} />
            <Area type="monotone" dataKey="expenses" name="Expenses" stroke="var(--red)" fill="url(#ge)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="fu3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        <div className="card">
          <h3 className="ph" style={{ fontSize: 17, marginBottom: 14 }}>Income Breakdown</h3>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart><Pie data={incPie} cx="50%" cy="50%" outerRadius={65} dataKey="value" paddingAngle={2}>{incPie.map((e, i) => <Cell key={i} fill={e.color} />)}</Pie><Tooltip formatter={(v) => R(v)} contentStyle={{ background: "var(--ink2)", border: "1px solid var(--ink4)", borderRadius: 7, fontSize: 11 }} /></PieChart>
          </ResponsiveContainer>
          {incPie.map((e) => <div key={e.name} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid var(--ink4)", fontSize: 12 }}><div style={{ display: "flex", alignItems: "center", gap: 7 }}><div style={{ width: 8, height: 8, borderRadius: 2, background: e.color }} /></div><span style={{ fontWeight: 600, color: "var(--gold)" }}>{R(e.value)}</span></div>)}
        </div>
        <div className="card">
          <h3 className="ph" style={{ fontSize: 17, marginBottom: 14 }}>Expense Breakdown</h3>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={expPie} layout="vertical" margin={{ left: 10, right: 20 }}>
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="name" tick={{ fill: "var(--ash)", fontSize: 10 }} axisLine={false} tickLine={false} width={60} />
              <Tooltip formatter={(v) => R(v)} contentStyle={{ background: "var(--ink2)", border: "1px solid var(--ink4)", borderRadius: 7, fontSize: 11 }} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>{expPie.map((e, i) => <Cell key={i} fill={e.color} />)}</Bar>
            </BarChart>
          </ResponsiveContainer>
          {expPie.map((e) => <div key={e.name} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: "1px solid var(--ink4)", fontSize: 12 }}><div style={{ display: "flex", alignItems: "center", gap: 7 }}><div style={{ width: 8, height: 8, borderRadius: 2, background: e.color }} /></div><span style={{ fontWeight: 600, color: "var(--red)" }}>{R(e.value)}</span></div>)}
        </div>
      </div>
    </div>
  );
}
