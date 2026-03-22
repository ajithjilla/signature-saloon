import { Plus, MapPin, Clock, Users, BarChart2, Edit2, Calendar } from "lucide-react";
import PageHeader from "../ui/PageHeader";
import { R } from "../../utils/helpers";

export default function Branches() {
  const branches = [
    { id: 1, name: "HQ Hyderabad", address: "Banjara Hills, Hyderabad", hours: "10 AM – 9 PM", staff: 8, isHQ: true, revenue: 120000 },
    { id: 2, name: "Bangalore South", address: "Indira Nagar, Bangalore", hours: "9 AM – 8 PM", staff: 5, isHQ: false, revenue: 75000 },
  ];
  return (
    <div>
      <PageHeader
        title="Branches"
        sub="Manage salon locations"
        action={
          <button className="btn bg">
            <Plus size={14} /> Add Branch
          </button>
        }
      />
      <div className="fu1" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 16 }}>
        {branches.map((b, i) => (
          <div key={b.id} className={`card ch fu${i + 1}`}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <h2 className="ph" style={{ fontSize: 19 }}>
                {b.name}
              </h2>
              {b.isHQ && <span className="badge bg2">HQ</span>}
            </div>
            {[
              [MapPin, b.address],
              [Clock, b.hours],
              [Users, `${b.staff} staff`],
              [BarChart2, `${R(b.revenue)} / month`],
            ].map(([Icon, text]) => (
              <div key={text} style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 12, color: "var(--ash)", marginBottom: 8 }}>
                <Icon size={13} color="var(--smoke)" />
                {text}
              </div>
            ))}
            <div className="divider" />
            <div style={{ display: "flex", gap: 7 }}>
              <button className="btn bo bsm" style={{ flex: 1 }}>
                <Edit2 size={11} /> Edit
              </button>
              <button className="btn bgh bsm" style={{ flex: 1 }}>
                <Calendar size={11} /> Schedule
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
