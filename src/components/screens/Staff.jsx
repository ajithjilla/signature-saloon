import { Plus, Edit2 } from "lucide-react";
import PageHeader from "../ui/PageHeader";
import { STAFF } from "../../data";
import { R } from "../../utils/helpers";

export default function Staff() {
  return (
    <div>
      <PageHeader
        title="Staff"
        sub="Team members & performance"
        action={
          <button className="btn bg">
            <Plus size={14} /> Add Member
          </button>
        }
      />
      <div className="fu1" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 16 }}>
        {STAFF.map((s, i) => (
          <div key={s.id} className={`card ch fu${i + 1}`}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg,var(--gold),var(--gold2))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: 18,
                  fontWeight: 700,
                  color: "var(--ink)",
                  flexShrink: 0,
                }}
              >
                {s.name[0]}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{s.name}</div>
                <div style={{ fontSize: 11, color: "var(--ash)" }}>
                  {s.role} · {s.branch}
                </div>
              </div>
              <span style={{ color: "var(--gold)", fontWeight: 600, fontSize: 12 }}>★{s.rating}</span>
            </div>
            {s.services.length > 0 && (
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 9, color: "var(--smoke)", letterSpacing: ".5px", marginBottom: 6, textTransform: "uppercase" }}>
                  Services
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {s.services.map((sv) => (
                    <span key={sv} className="badge bg2" style={{ fontSize: 10 }}>
                      {sv}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9, padding: 11, background: "var(--ink3)", borderRadius: "var(--r)", marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 9, color: "var(--smoke)", marginBottom: 2 }}>Bookings</div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{s.bookings || "—"}</div>
              </div>
              <div>
                <div style={{ fontSize: 9, color: "var(--smoke)", marginBottom: 2 }}>Salary</div>
                <div style={{ fontWeight: 700, fontSize: 15, color: "var(--warn)" }}>{R(s.salary)}</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 7 }}>
              <button className="btn bo bsm" style={{ flex: 1 }}>
                Profile
              </button>
              <button className="btn bgh bsm">
                <Edit2 size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
