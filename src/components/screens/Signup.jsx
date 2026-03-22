import { useState } from "react";
import { Check, ChevronRight } from "lucide-react";
import Logo from "../ui/Logo";
import Label from "../ui/Label";

export default function Signup({ onDone, onBack }) {
  const [step, setStep] = useState(0);
  const steps = ["Account", "Business", "Location", "Confirm"];
  return (
    <div style={{ minHeight: "100vh", background: "var(--ink)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ width: "100%", maxWidth: 520, background: "var(--ink2)", border: "1px solid var(--ink4)", borderRadius: "var(--rl)", padding: 32 }} className="fu">
        <div style={{ marginBottom: 24 }}><Logo /></div>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 28 }}>
          {steps.map((s, i) => (
            <div key={s} style={{ display: "flex", alignItems: "center", flex: i < steps.length - 1 ? 1 : 0 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                <div style={{ width: 30, height: 30, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, background: i < step ? "var(--green)" : i === step ? "var(--gold)" : "var(--ink4)", color: i === step ? "var(--ink)" : i < step ? "#fff" : "var(--smoke)", animation: i === step ? "pg 1.5s infinite" : undefined }}>
                  {i < step ? <Check size={12} /> : i + 1}
                </div>
                <span style={{ fontSize: 9, color: i === step ? "var(--gold)" : "var(--smoke)", whiteSpace: "nowrap" }}>{s}</span>
              </div>
              {i < steps.length - 1 && <div style={{ flex: 1, height: 1, background: i < step ? "var(--green)" : "var(--ink4)", margin: "0 5px", marginBottom: 16, transition: "background .3s" }} />}
            </div>
          ))}
        </div>
        {step === 0 && <div className="fu"><h2 className="ph" style={{ fontSize: 22, marginBottom: 16 }}>Create account</h2><div style={{ display: "flex", flexDirection: "column", gap: 10 }}><input className="inp" placeholder="Email" defaultValue="priya@salon.com" /><input className="inp" placeholder="Phone (+91)" defaultValue="+91 9999123456" /><input className="inp" type="password" placeholder="Password" defaultValue="password123" /></div></div>}
        {step === 1 && <div className="fu"><h2 className="ph" style={{ fontSize: 22, marginBottom: 16 }}>Business details</h2><div style={{ display: "flex", flexDirection: "column", gap: 10 }}><input className="inp" placeholder="Business name" defaultValue="Priya's Salon & Spa" /><select className="inp"><option>Salon</option><option>Clinic</option><option>Spa</option></select><textarea className="inp" rows={3} defaultValue="Premium salon with bridal specialist" /></div></div>}
        {step === 2 && <div className="fu"><h2 className="ph" style={{ fontSize: 22, marginBottom: 16 }}>Location & hours</h2><div style={{ display: "flex", flexDirection: "column", gap: 10 }}><input className="inp" defaultValue="Banjara Hills, Hyderabad" /><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9 }}><input className="inp" defaultValue="Hyderabad" /><input className="inp" defaultValue="500034" /></div><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9 }}><div><Label>Opening</Label><input className="inp" type="time" defaultValue="10:00" /></div><div><Label>Closing</Label><input className="inp" type="time" defaultValue="21:00" /></div></div></div></div>}
        {step === 3 && <div className="fu"><h2 className="ph" style={{ fontSize: 22, marginBottom: 16 }}>Review & confirm</h2><div style={{ background: "var(--ink3)", borderRadius: "var(--r)", padding: 16, marginBottom: 16 }}>{[["Business", "Priya's Salon & Spa"], ["Type", "Salon"], ["Location", "Banjara Hills, Hyderabad"], ["Hours", "10:00 AM – 9:00 PM"]].map(([k, v]) => <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid var(--ink4)" }}><span style={{ color: "var(--ash)", fontSize: 12 }}>{k}</span><span style={{ fontWeight: 500, fontSize: 12 }}>{v}</span></div>)}</div><label style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 13, cursor: "pointer" }}><input type="checkbox" defaultChecked style={{ accentColor: "var(--gold)" }} />I agree to Terms of Service</label></div>}
        <div style={{ display: "flex", gap: 9, marginTop: 24 }}>
          <button className="btn bgh" onClick={step === 0 ? onBack : () => setStep(step - 1)}>{step === 0 ? "Cancel" : "Back"}</button>
          <div style={{ flex: 1 }} />
          {step < 3 ? <button className="btn bg" onClick={() => setStep(step + 1)}>Continue <ChevronRight size={14} /></button> : <button className="btn bg" onClick={onDone}>Create Business ✓</button>}
        </div>
      </div>
    </div>
  );
}
