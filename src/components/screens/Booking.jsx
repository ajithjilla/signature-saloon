import { useState } from "react";
import { Users, Scissors, UserCheck, Calendar, Check } from "lucide-react";
import PageHeader from "../ui/PageHeader";
import { CUSTS, SVCS, STAFF } from "../../data";
import { R } from "../../utils/helpers";

export default function Booking({ setScreen }) {
  const [step, setStep] = useState(0);
  const [sel, setSel] = useState({ customer: null, service: null, staff: null, time: null });
  const steps = [
    { l: "Customer", i: Users },
    { l: "Service", i: Scissors },
    { l: "Staff", i: UserCheck },
    { l: "Time", i: Calendar },
    { l: "Confirm", i: Check },
  ];
  const times = ["10:00", "10:30", "11:00", "11:30", "12:00", "14:00", "14:30", "15:00", "15:30", "16:00"];
  const busy = ["10:30", "11:30"];
  return (
    <div>
      <PageHeader title="New Appointment" sub={`Step ${step + 1} of ${steps.length}`} />
      <div className="fu1 card" style={{ marginBottom: 18 }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          {steps.map(({ l, i: Icon }, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", flex: i < steps.length - 1 ? 1 : 0 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: i < step ? "var(--green)" : i === step ? "var(--gold)" : "var(--ink4)",
                    transition: "all .3s",
                  }}
                >
                  {i < step ? <Check size={14} color="#fff" /> : <Icon size={14} color={i === step ? "var(--ink)" : "var(--smoke)"} />}
                </div>
                <span style={{ fontSize: 9, color: i === step ? "var(--gold)" : "var(--smoke)", whiteSpace: "nowrap" }}>{l}</span>
              </div>
              {i < steps.length - 1 && (
                <div style={{ flex: 1, height: 1, background: i < step ? "var(--green)" : "var(--ink4)", margin: "0 5px", marginBottom: 16, transition: "background .3s" }} />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="fu2 card">
        {step === 0 && (
          <div>
            <h2 className="ph" style={{ fontSize: 20, marginBottom: 14 }}>
              Select Customer
            </h2>
            {CUSTS.map((c) => (
              <div
                key={c.id}
                onClick={() => {
                  setSel((s) => ({ ...s, customer: c }));
                  setStep(1);
                }}
                style={{
                  padding: "11px 14px",
                  background: "var(--ink3)",
                  border: `1px solid ${sel.customer?.id === c.id ? "var(--gold)" : "var(--ink4)"}`,
                  borderRadius: "var(--r)",
                  cursor: "pointer",
                  marginBottom: 7,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ fontWeight: 500, fontSize: 13 }}>{c.name}</div>
                  <div style={{ fontSize: 11, color: "var(--smoke)" }}>
                    {c.phone} · {c.lastVisit}
                  </div>
                </div>
                {sel.customer?.id === c.id && <Check size={14} color="var(--gold)" />}
              </div>
            ))}
          </div>
        )}
        {step === 1 && (
          <div>
            <h2 className="ph" style={{ fontSize: 20, marginBottom: 14 }}>
              Select Service
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9 }}>
              {SVCS.map((s) => (
                <div
                  key={s.id}
                  onClick={() => {
                    setSel((p) => ({ ...p, service: s }));
                    setStep(2);
                  }}
                  style={{
                    padding: 13,
                    background: "var(--ink3)",
                    border: `1px solid ${sel.service?.id === s.id ? "var(--gold)" : "var(--ink4)"}`,
                    borderRadius: "var(--r)",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ fontWeight: 500, marginBottom: 3, fontSize: 13 }}>{s.name}</div>
                  <div style={{ fontSize: 11, color: "var(--smoke)", marginBottom: 5 }}>⏱ {s.duration}min</div>
                  <div style={{ fontWeight: 700, color: "var(--gold)", fontSize: 13 }}>{R(s.price)}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        {step === 2 && (
          <div>
            <h2 className="ph" style={{ fontSize: 20, marginBottom: 14 }}>
              Select Staff
            </h2>
            {STAFF.filter((s) => s.services.length > 0).map((s) => (
              <div
                key={s.id}
                onClick={() => {
                  setSel((p) => ({ ...p, staff: s }));
                  setStep(3);
                }}
                style={{
                  padding: "11px 14px",
                  background: "var(--ink3)",
                  border: `1px solid ${sel.staff?.id === s.id ? "var(--gold)" : "var(--ink4)"}`,
                  borderRadius: "var(--r)",
                  cursor: "pointer",
                  marginBottom: 7,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex", gap: 11, alignItems: "center" }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg,var(--gold),var(--gold2))",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      color: "var(--ink)",
                      fontSize: 14,
                    }}
                  >
                    {s.name[0]}
                  </div>
                  <div>
                    <div style={{ fontWeight: 500, fontSize: 13 }}>{s.name}</div>
                    <div style={{ fontSize: 11, color: "var(--smoke)" }}>{s.role}</div>
                  </div>
                </div>
                <span style={{ color: "var(--gold)", fontWeight: 600, fontSize: 12 }}>★{s.rating}</span>
              </div>
            ))}
          </div>
        )}
        {step === 3 && (
          <div>
            <h2 className="ph" style={{ fontSize: 20, marginBottom: 14 }}>
              Date & Time
            </h2>
            <input className="inp" type="date" defaultValue="2025-02-10" style={{ marginBottom: 14 }} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 7 }}>
              {times.map((t) => (
                <div
                  key={t}
                  className={`ts ${busy.includes(t) ? "busy" : ""} ${sel.time === t ? "sel" : ""}`}
                  onClick={() => {
                    if (!busy.includes(t)) {
                      setSel((p) => ({ ...p, time: t }));
                      setStep(4);
                    }
                  }}
                >
                  {t}
                </div>
              ))}
            </div>
          </div>
        )}
        {step === 4 && (
          <div>
            <h2 className="ph" style={{ fontSize: 20, marginBottom: 14 }}>
              Confirm
            </h2>
            <div style={{ background: "var(--ink3)", borderRadius: "var(--r)", padding: 18, marginBottom: 14 }}>
              {[
                ["Customer", sel.customer?.name || "Walk-in"],
                ["Service", sel.service ? `${sel.service.name} (${sel.service.duration}min)` : "Haircut"],
                ["Staff", sel.staff?.name || "Priya K."],
                ["Time", `Feb 10 at ${sel.time || "10:00"} AM`],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid var(--ink4)" }}>
                  <span style={{ color: "var(--ash)", fontSize: 12 }}>{k}</span>
                  <span style={{ fontWeight: 500, fontSize: 12 }}>{v}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0 0" }}>
                <span style={{ fontWeight: 600, fontSize: 14 }}>Total (incl. GST)</span>
                <span className="ph" style={{ fontSize: 22, color: "var(--gold)" }}>{R(sel.service ? Math.round(sel.service.price * 1.18) : 590)}</span>
              </div>
            </div>
            <label style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 12, color: "var(--ash)", cursor: "pointer", marginBottom: 16 }}>
              <input type="checkbox" defaultChecked style={{ accentColor: "var(--gold)" }} />
              Send SMS confirmation
            </label>
            <button
              className="btn bg blg bfw"
              onClick={() => {
                alert("✅ Appointment booked! Ref #BOOK-2025-12345");
                setScreen("dashboard");
              }}
            >
              <Check size={15} /> Confirm Appointment
            </button>
          </div>
        )}
        <div style={{ display: "flex", gap: 9, marginTop: 20, paddingTop: 16, borderTop: "1px solid var(--ink4)" }}>
          {step > 0 && (
            <button className="btn bo" onClick={() => setStep(step - 1)}>
              Back
            </button>
          )}
          <button className="btn bgh" onClick={() => setScreen("dashboard")} style={{ marginLeft: "auto" }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
