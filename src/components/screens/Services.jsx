import { useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import PageHeader from "../ui/PageHeader";
import { SVCS } from "../../data";
import { R } from "../../utils/helpers";

export default function Services() {
  const [svcs, setSvcs] = useState(SVCS);
  const groups = [...new Set(svcs.map((s) => s.group))];
  return (
    <div>
      <PageHeader
        title="Services"
        sub="Manage service catalogue & pricing"
        action={
          <button className="btn bg">
            <Plus size={14} /> Add Group
          </button>
        }
      />
      {groups.map((g) => (
        <div key={g} className="fu1 card" style={{ marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h2 className="ph" style={{ fontSize: 18 }}>
              {g}
            </h2>
            <button className="btn bo bsm">
              <Plus size={12} /> Add Service
            </button>
          </div>
          <div className="tw">
            <table>
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Duration</th>
                  <th>Base Price</th>
                  <th>GST</th>
                  <th>Total Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {svcs
                  .filter((s) => s.group === g)
                  .map((s) => (
                    <tr key={s.id}>
                      <td style={{ fontWeight: 500 }}>{s.name}</td>
                      <td style={{ color: "var(--ash)" }}>{s.duration} min</td>
                      <td>{R(s.price)}</td>
                      <td>
                        <span className="badge bg2">{s.tax}%</span>
                      </td>
                      <td style={{ fontWeight: 700, color: "var(--gold)" }}>{R(Math.round(s.price * 1.18))}</td>
                      <td>
                        <div style={{ display: "flex", gap: 5 }}>
                          <button className="btn bgh bsm">
                            <Edit2 size={11} />
                          </button>
                          <button className="btn bd bsm" onClick={() => setSvcs((p) => p.filter((x) => x.id !== s.id))}>
                            <Trash2 size={11} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
