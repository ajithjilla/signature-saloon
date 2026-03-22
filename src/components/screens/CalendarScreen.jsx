import { useState } from "react";
import { Plus, Eye } from "lucide-react";
import PageHeader from "../ui/PageHeader";
import StatusBadge from "../ui/StatusBadge";
import { APTS } from "../../data";
import { R } from "../../utils/helpers";

export default function CalendarScreen({ setScreen }) {
  const [sel, setSel] = useState(10);
  const hapt = [5, 10, 15, 18, 20, 25, 28];
  return (
    <div>
      <PageHeader
        title="Calendar"
        sub="Manage daily schedule"
        action={
          <button className="btn bg" onClick={() => setScreen("booking")}>
            <Plus size={14} /> New Booking
          </button>
        }
      />
      <div className="fu1" style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 18 }}>
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <h3 className="ph" style={{ fontSize: 16 }}>
              February 2025
            </h3>
            <div style={{ display: "flex", gap: 2 }}>
              <button className="btn bgh bsm">‹</button>
              <button className="btn bgh bsm">›</button>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 2, textAlign: "center" }}>
            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
              <div key={i} style={{ fontSize: 9, color: "var(--smoke)", padding: "4px 0" }}>
                {d}
              </div>
            ))}
            {[...Array(6)].map((_, i) => (
              <div key={`p${i}`} />
            ))}
            {[...Array(28)].map((_, i) => {
              const d = i + 1;
              return (
                <div key={d} className={`cd ${d === sel ? "tod" : ""} ${hapt.includes(d) && d !== sel ? "ha" : ""}`} onClick={() => setSel(d)}>
                  {d}
                </div>
              );
            })}
          </div>
        </div>
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 className="ph" style={{ fontSize: 18 }}>
              Feb {sel} Schedule
            </h3>
            <span className="badge bg2">{APTS.length} appointments</span>
          </div>
          {APTS.map((a) => (
            <div
              key={a.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 14px",
                background: "var(--ink3)",
                border: "1px solid var(--ink4)",
                borderRadius: "var(--r)",
                marginBottom: 8,
                transition: "border-color .15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--gold)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--ink4)")}
            >
              <div style={{ textAlign: "center", minWidth: 42 }}>
                <div style={{ fontWeight: 700, fontSize: 12, color: "var(--gold)" }}>{a.time}</div>
                <div style={{ fontSize: 9, color: "var(--smoke)" }}>AM</div>
              </div>
              <div style={{ width: 3, height: 32, borderRadius: 2, background: a.status === "confirmed" ? "var(--green)" : "var(--warn)", flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 500, fontSize: 13 }}>{a.service}</div>
                <div style={{ fontSize: 11, color: "var(--smoke)" }}>
                  {a.customer} · {a.staff}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontWeight: 700, fontSize: 12 }}>{R(a.price)}</div>
                <StatusBadge status={a.status} />
              </div>
              <button className="btn bgh bsm">
                <Eye size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
