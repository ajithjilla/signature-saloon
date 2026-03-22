import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Logo from "../ui/Logo";
import Label from "../ui/Label";

const STATS = [
  ["500+", "Salons"],
  ["2M+", "Bookings"],
  ["4.9★", "Rating"],
];

export default function Login({ onLogin, onSignup }) {
  const [showPass, setShowPass] = useState(false);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        background: "var(--ink)",
      }}
    >
      <div
        style={{
          background: "var(--ink2)",
          borderRight: "1px solid var(--ink4)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 50,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            top: -100,
            left: -100,
            borderRadius: "50%",
            background: "radial-gradient(circle,rgba(201,168,76,.07) 0%,transparent 70%)",
          }}
        />
        <div style={{ position: "relative", textAlign: "center" }}>
          <div style={{ marginBottom: 24 }}>
            <Logo />
          </div>
          <h1
            className="ph"
            style={{ fontSize: 38, lineHeight: 1.2, marginBottom: 12 }}
          >
            Your Salon,
            <br />
            <span
              style={{
                background: "linear-gradient(135deg,var(--gold),var(--gold2))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Elevated.
            </span>
          </h1>
          <p
            style={{
              color: "var(--smoke)",
              fontSize: 13,
              lineHeight: 1.8,
              maxWidth: 280,
              margin: "0 auto 32px",
            }}
          >
            Appointments · Billing · Inventory · Finance — one system.
          </p>
          <div style={{ display: "flex", gap: 28, justifyContent: "center" }}>
            {STATS.map(([v, l]) => (
              <div key={l}>
                <div
                  className="ph"
                  style={{ fontSize: 24, fontWeight: 700, color: "var(--gold)" }}
                >
                  {v}
                </div>
                <div style={{ fontSize: 10, color: "var(--smoke)", letterSpacing: ".5px" }}>
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 50,
        }}
      >
        <div style={{ width: "100%", maxWidth: 400 }} className="fu">
          <h2 className="ph" style={{ fontSize: 28, marginBottom: 4 }}>
            Welcome back
          </h2>
          <p style={{ color: "var(--ash)", marginBottom: 28, fontSize: 13 }}>
            Sign in to your dashboard
          </p>
          <div style={{ marginBottom: 13 }}>
            <Label>Email or Phone</Label>
            <input className="inp" defaultValue="priya@salon.com" />
          </div>
          <div style={{ marginBottom: 24 }}>
            <Label>Password</Label>
            <div style={{ position: "relative" }}>
              <input
                className="inp"
                type={showPass ? "text" : "password"}
                defaultValue="password123"
                style={{ paddingRight: 40 }}
              />
              <button
                onClick={() => setShowPass(!showPass)}
                style={{
                  position: "absolute",
                  right: 11,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--smoke)",
                }}
              >
                {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>
          <button
            className="btn bg blg bfw"
            onClick={onLogin}
            style={{ marginBottom: 10 }}
          >
            Sign In →
          </button>
          <button className="btn bo bfw" onClick={onSignup}>
            Create New Account
          </button>
          <div
            style={{
              marginTop: 18,
              padding: 10,
              background: "var(--ink3)",
              borderRadius: "var(--r)",
              border: "1px solid var(--ink4)",
              fontSize: 11,
              color: "var(--smoke)",
            }}
          >
            💡 Demo mode — any credentials work
          </div>
        </div>
      </div>
    </div>
  );
}
