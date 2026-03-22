import {
  Home,
  TrendingUp,
  Calendar,
  MapPin,
  Plus,
  Receipt,
  DollarSign,
  Package,
  Users,
  UserCheck,
  Scissors,
  LogOut,
  Bell,
} from "lucide-react";
import Logo from "../ui/Logo";

const NAV_ITEMS = [
  { sec: "Overview" },
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "finance", label: "Finance & P&L", icon: TrendingUp },
  { sec: "Operations" },
  { id: "appointments", label: "Calendar", icon: Calendar },
  { id: "booking", label: "New Booking", icon: Plus },
  { id: "billing", label: "Billing / POS", icon: Receipt },
  { sec: "Management" },
  { id: "inventory", label: "Inventory", icon: Package },
  { id: "expenses", label: "Expenses", icon: DollarSign },
  { id: "customers", label: "Customers", icon: Users },
  { id: "staff", label: "Staff", icon: UserCheck },
  { id: "services", label: "Services", icon: Scissors },
  { id: "branches", label: "Branches", icon: MapPin },
];

export default function Layout({ screen, setScreen, onLogout, children }) {
  return (
    <div className="aif">
      <div className="sidebar">
        <div className="sb-logo">
          <Logo />
        </div>
        <nav className="sb-nav">
          {NAV_ITEMS.map((item, i) => {
            if (item.sec) {
              return (
                <div key={i} className="sb-sec">
                  {item.sec}
                </div>
              );
            }
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                className={`ni ${screen === item.id ? "active" : ""}`}
                onClick={() => setScreen(item.id)}
              >
                {IconComponent ? <IconComponent size={15} /> : null}
                {item.label}
              </button>
            );
          })}
        </nav>
        <div className="sb-ft">
          <button className="ni" style={{ color: "var(--red)" }} onClick={onLogout}>
            <LogOut size={15} />
            Sign Out
          </button>
        </div>
      </div>
      <div className="layout">
        <div className="topbar">
          <div>
            <div style={{ fontWeight: 600, fontSize: 13 }}>Priya&apos;s Salon & Spa</div>
            <div style={{ fontSize: 10, color: "var(--ash)" }}>HQ · Hyderabad</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <button className="btn bgh bsm">
              <Bell size={15} />
            </button>
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                background: "linear-gradient(135deg,var(--gold),var(--gold2))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: 12,
                color: "var(--ink)",
              }}
            >
              P
            </div>
          </div>
        </div>
        <div className="pg">{children}</div>
      </div>
    </div>
  );
}
