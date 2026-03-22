import { useState } from "react";
import { Plus, Search } from "lucide-react";
import PageHeader from "../ui/PageHeader";
import { CUSTS } from "../../data";
import { R } from "../../utils/helpers";

export default function Customers({ setScreen }) {
  const [q, setQ] = useState("");
  const fil = CUSTS.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()) || c.phone.includes(q));
  return (
    <div>
      <PageHeader
        title="Customers"
        sub={`${CUSTS.length} registered clients`}
        action={
          <button className="btn bg">
            <Plus size={14} /> Add Customer
          </button>
        }
      />
      <div className="fu1" style={{ marginBottom: 14 }}>
        <div style={{ position: "relative" }}>
          <Search size={13} style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: "var(--smoke)" }} />
          <input className="inp" placeholder="Search by name or phone…" value={q} onChange={(e) => setQ(e.target.value)} style={{ paddingLeft: 32 }} />
        </div>
      </div>
      <div className="fu2 card" style={{ padding: 0 }}>
        <div className="tw">
          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Visits</th>
                <th>Last Visit</th>
                <th>Lifetime Spend</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {fil.map((c) => (
                <tr key={c.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: "50%",
                          background: "var(--ink4)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 700,
                          fontSize: 12,
                          color: "var(--gold)",
                          flexShrink: 0,
                        }}
                      >
                        {c.name[0]}
                      </div>
                      <span style={{ fontWeight: 500, fontSize: 13 }}>{c.name}</span>
                    </div>
                  </td>
                  <td style={{ color: "var(--ash)", fontSize: 12 }}>{c.phone}</td>
                  <td style={{ color: "var(--smoke)", fontSize: 11 }}>{c.email}</td>
                  <td style={{ fontWeight: 600 }}>{c.visits}</td>
                  <td style={{ color: "var(--ash)", fontSize: 12 }}>{c.lastVisit}</td>
                  <td style={{ fontWeight: 700, color: "var(--gold)" }}>{R(c.totalSpent)}</td>
                  <td>
                    <button className="btn bg bsm" onClick={() => setScreen("booking")}>
                      Book
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
