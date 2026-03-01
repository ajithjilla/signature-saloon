import { useState } from "react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { Calendar, Users, Clock, MapPin, Plus, Edit2, Trash2, Eye, EyeOff, LogOut, Check, Scissors, ChevronRight, Bell, Search, TrendingUp, BarChart2, Home, UserCheck, Package, Receipt, DollarSign, ShoppingCart, ArrowUpRight, ArrowDownRight, AlertTriangle, CreditCard, Wallet, RefreshCw, MinusCircle, PlusCircle, X, FileText, Printer, Filter } from "lucide-react";

// ── STYLES ──────────────────────────────────────────────────────
const injectCSS = () => {
  if (document.getElementById("moisalon-css")) return;
  const s = document.createElement("style");
  s.id = "moisalon-css";
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
    :root{--ink:#0d0d0f;--ink2:#1a1a1f;--ink3:#242429;--ink4:#2e2e35;--gold:#c9a84c;--gold2:#e8c97a;--smoke:#6b6b78;--ash:#9696a0;--white:#f0ede8;--green:#4caf82;--warn:#e0943a;--red:#e05a5a;--blue:#5b8dee;--r:10px;--rl:16px}
    *{box-sizing:border-box;margin:0;padding:0}
    body{background:var(--ink);color:var(--white);font-family:'DM Sans',sans-serif}
    ::-webkit-scrollbar{width:3px;height:3px}::-webkit-scrollbar-thumb{background:var(--gold);border-radius:3px}
    @keyframes fu{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
    @keyframes pg{0%,100%{box-shadow:0 0 0 0 rgba(201,168,76,.35)}50%{box-shadow:0 0 0 7px rgba(201,168,76,0)}}
    .fu{animation:fu .35s ease both}.fu1{animation:fu .35s .05s ease both}.fu2{animation:fu .35s .1s ease both}.fu3{animation:fu .35s .15s ease both}.fu4{animation:fu .35s .2s ease both}
    .card{background:var(--ink2);border:1px solid var(--ink4);border-radius:var(--rl);padding:20px}
    .ch{transition:border-color .2s,transform .2s,box-shadow .2s}.ch:hover{border-color:var(--gold);transform:translateY(-2px);box-shadow:0 0 24px rgba(201,168,76,.12)}
    .btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;padding:9px 16px;border-radius:var(--r);font-family:'DM Sans',sans-serif;font-weight:500;font-size:13px;cursor:pointer;border:none;transition:all .16s;white-space:nowrap}
    .bg{background:linear-gradient(135deg,var(--gold),var(--gold2));color:var(--ink);box-shadow:0 2px 10px rgba(201,168,76,.25)}.bg:hover{opacity:.9;transform:translateY(-1px)}
    .bo{background:transparent;border:1px solid var(--ink4);color:var(--ash)}.bo:hover{border-color:var(--gold);color:var(--gold)}
    .bgh{background:transparent;color:var(--ash)}.bgh:hover{color:var(--white);background:var(--ink3)}
    .bd{background:rgba(224,90,90,.12);color:var(--red);border:1px solid rgba(224,90,90,.2)}.bd:hover{background:rgba(224,90,90,.22)}
    .bsm{padding:5px 12px;font-size:12px}.blg{padding:13px 26px;font-size:15px}.bfw{width:100%}
    .inp{width:100%;padding:9px 13px;background:var(--ink3);border:1px solid var(--ink4);border-radius:var(--r);color:var(--white);font-family:'DM Sans',sans-serif;font-size:13px;outline:none;transition:border-color .2s}
    .inp::placeholder{color:var(--smoke)}.inp:focus{border-color:var(--gold)}
    select.inp option{background:var(--ink2)}textarea.inp{resize:vertical}
    .badge{display:inline-flex;align-items:center;padding:2px 8px;border-radius:20px;font-size:11px;font-weight:600}
    .bg2{background:rgba(201,168,76,.15);color:var(--gold2)}.gg{background:rgba(76,175,130,.15);color:var(--green)}.gw{background:rgba(224,148,58,.15);color:var(--warn)}.gr{background:rgba(224,90,90,.15);color:var(--red)}.gb{background:rgba(91,141,238,.15);color:var(--blue)}
    .sidebar{position:fixed;top:0;left:0;width:220px;height:100vh;background:var(--ink2);border-right:1px solid var(--ink4);display:flex;flex-direction:column;z-index:100;overflow:hidden}
    .sb-logo{padding:18px 18px 16px;border-bottom:1px solid var(--ink4);flex-shrink:0}
    .sb-nav{flex:1;padding:10px 8px;overflow-y:auto}
    .sb-sec{font-size:9px;letter-spacing:1.2px;text-transform:uppercase;color:var(--smoke);padding:14px 10px 5px;font-weight:600}
    .ni{display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:9px;cursor:pointer;color:var(--ash);font-size:13px;font-weight:500;transition:all .16s;border:none;background:none;width:100%;text-align:left;margin-bottom:1px}
    .ni:hover{color:var(--white);background:var(--ink3)}.ni.active{color:var(--gold);background:rgba(201,168,76,.1);border:1px solid rgba(201,168,76,.14)}
    .sb-ft{padding:10px 8px;border-top:1px solid var(--ink4);flex-shrink:0}
    .layout{margin-left:220px;min-height:100vh}
    .topbar{position:sticky;top:0;z-index:50;background:rgba(13,13,15,.88);backdrop-filter:blur(18px);border-bottom:1px solid var(--ink4);padding:12px 24px;display:flex;align-items:center;justify-content:space-between}
    .pg{padding:24px;max-width:1200px}
    .ph{font-family:'Cormorant Garamond',serif;font-weight:600}
    .stat{background:var(--ink2);border:1px solid var(--ink4);border-radius:var(--rl);padding:18px;position:relative;overflow:hidden}
    .stat::before{content:'';position:absolute;top:0;left:0;right:0;height:2px}
    .stat.gold::before{background:linear-gradient(90deg,var(--gold),var(--gold2))}.stat.green::before{background:var(--green)}.stat.warn::before{background:var(--warn)}.stat.red::before{background:var(--red)}.stat.blue::before{background:var(--blue)}
    .sl{font-size:10px;color:var(--ash);letter-spacing:.7px;text-transform:uppercase;margin-bottom:7px}.sv{font-family:'Cormorant Garamond',serif;font-size:28px;font-weight:600;line-height:1}.ssub{font-size:11px;color:var(--smoke);margin-top:5px}
    .tw{overflow-x:auto;border-radius:var(--rl);border:1px solid var(--ink4)}
    table{width:100%;border-collapse:collapse}thead{background:var(--ink3)}th{padding:11px 16px;text-align:left;font-size:10px;letter-spacing:.8px;text-transform:uppercase;color:var(--ash);font-weight:600;white-space:nowrap}td{padding:13px 16px;border-top:1px solid var(--ink4);font-size:13px}tbody tr{transition:background .12s}tbody tr:hover{background:var(--ink3)}
    .overlay{position:fixed;inset:0;background:rgba(0,0,0,.72);z-index:400;display:flex;align-items:center;justify-content:center;padding:20px;animation:fu .2s ease}
    .modal{background:var(--ink2);border:1px solid var(--ink4);border-radius:var(--rl);padding:28px;width:100%;max-width:500px;max-height:88vh;overflow-y:auto}
    .divider{height:1px;background:var(--ink4);margin:14px 0}
    .ts{padding:8px;border-radius:var(--r);border:1px solid var(--ink4);text-align:center;cursor:pointer;font-size:12px;font-weight:500;color:var(--ash);transition:all .13s;background:var(--ink3)}
    .ts:hover,.ts.sel{border-color:var(--gold);color:var(--gold);background:rgba(201,168,76,.08)}.ts.busy{opacity:.3;cursor:not-allowed}
    .cd{aspect-ratio:1;display:flex;align-items:center;justify-content:center;border-radius:7px;font-size:12px;cursor:pointer;transition:all .13s;color:var(--ash)}
    .cd:hover{background:var(--ink3);color:var(--white)}.cd.tod{background:var(--gold);color:var(--ink);font-weight:700}.cd.ha{color:var(--white);font-weight:600;position:relative}.cd.ha::after{content:'';position:absolute;bottom:2px;left:50%;transform:translateX(-50%);width:3px;height:3px;border-radius:50%;background:var(--gold)}
    .sb2{height:4px;border-radius:2px;background:var(--ink4);overflow:hidden}.sb2f{height:100%;border-radius:2px;transition:width .4s}
    .pt{padding:7px 16px;border-radius:30px;cursor:pointer;font-size:13px;font-weight:500;color:var(--ash);border:none;background:none;transition:all .16s}
    .pt.active{background:var(--ink3);color:var(--gold);border:1px solid rgba(201,168,76,.18)}
    .aif{background:rgba(13,13,15,.92);min-height:100vh}
  `;
  document.head.appendChild(s);
};

// ── DATA ────────────────────────────────────────────────────────
const APTS = [
  {id:1,time:"10:00",service:"Haircut",      customer:"Ananya Sharma",staff:"Priya", status:"confirmed",price:590},
  {id:2,time:"10:30",service:"Coloring",     customer:"Ravi Patel",   staff:"Anita", status:"confirmed",price:2360},
  {id:3,time:"12:00",service:"Hair Spa",     customer:"Kavya Singh",  staff:"Anita", status:"pending",  price:1180},
  {id:4,time:"14:30",service:"Haircut",      customer:"Meena Reddy",  staff:"Priya", status:"confirmed",price:590},
  {id:5,time:"16:00",service:"Bridal Makeup",customer:"Deepa Rao",    staff:"Priya", status:"confirmed",price:8260},
];
const SVCS = [
  {id:1,group:"Hair",  name:"Haircut",      duration:30, price:500, tax:18},
  {id:2,group:"Hair",  name:"Coloring",     duration:60, price:2000,tax:18},
  {id:3,group:"Hair",  name:"Hair Spa",     duration:45, price:1000,tax:18},
  {id:4,group:"Makeup",name:"Bridal Makeup",duration:120,price:7000,tax:18},
  {id:5,group:"Makeup",name:"Party Makeup", duration:60, price:2500,tax:18},
];
const STAFF = [
  {id:1,name:"Priya K.", role:"Master Stylist",branch:"HQ Hyderabad",   services:["Haircut","Coloring","Bridal Makeup"],rating:4.8,bookings:120,salary:35000},
  {id:2,name:"Anita R.", role:"Stylist",       branch:"HQ Hyderabad",   services:["Haircut","Coloring","Hair Spa"],     rating:4.6,bookings:80, salary:25000},
  {id:3,name:"Rachel M.",role:"Receptionist",  branch:"HQ Hyderabad",   services:[],                                   rating:4.9,bookings:0,  salary:18000},
  {id:4,name:"Sunita K.",role:"Stylist",       branch:"Bangalore South",services:["Haircut","Hair Spa"],               rating:4.5,bookings:60, salary:22000},
];
const CUSTS = [
  {id:1,name:"Ananya Sharma",phone:"9999111111",email:"ananya@email.com",lastVisit:"2 weeks ago",visits:12,totalSpent:8500},
  {id:2,name:"Ravi Patel",   phone:"9999222222",email:"ravi@email.com",  lastVisit:"1 week ago", visits:8, totalSpent:7200},
  {id:3,name:"Kavya Singh",  phone:"9999333333",email:"kavya@email.com", lastVisit:"3 days ago", visits:5, totalSpent:4800},
  {id:4,name:"Meena Reddy",  phone:"9999444444",email:"meena@email.com", lastVisit:"Yesterday",  visits:20,totalSpent:15600},
];
const initProds = [
  {id:1,name:"L'Oreal Shampoo",    category:"Shampoo",   brand:"L'Oreal",    costPrice:280,sellPrice:450, stock:24,minStock:5, unit:"bottle"},
  {id:2,name:"Schwarzkopf Color",  category:"Hair Color",brand:"Schwarzkopf",costPrice:320,sellPrice:580, stock:8, minStock:10,unit:"tube"},
  {id:3,name:"Wella Conditioner",  category:"Conditioner",brand:"Wella",     costPrice:220,sellPrice:380, stock:15,minStock:5, unit:"bottle"},
  {id:4,name:"Keratin Treatment",  category:"Treatment", brand:"TRESemmé",   costPrice:800,sellPrice:1200,stock:4, minStock:3, unit:"kit"},
  {id:5,name:"Hair Serum 100ml",   category:"Serum",     brand:"Pantene",    costPrice:180,sellPrice:320, stock:30,minStock:8, unit:"bottle"},
  {id:6,name:"Nail Polish Set",    category:"Nail",      brand:"OPI",        costPrice:350,sellPrice:650, stock:2, minStock:5, unit:"set"},
];
const initExpenses = [
  {id:1,category:"Rent",     name:"HQ Hyderabad Rent",  amount:45000,date:"2025-02-01",isRecurring:true, freq:"Monthly",notes:"Banjara Hills"},
  {id:2,category:"Rent",     name:"Bangalore Rent",     amount:32000,date:"2025-02-01",isRecurring:true, freq:"Monthly",notes:"Indira Nagar"},
  {id:3,category:"Salary",   name:"Priya K. Salary",    amount:35000,date:"2025-02-05",isRecurring:true, freq:"Monthly",notes:"Master Stylist"},
  {id:4,category:"Salary",   name:"Anita R. Salary",    amount:25000,date:"2025-02-05",isRecurring:true, freq:"Monthly",notes:"Stylist"},
  {id:5,category:"Salary",   name:"Rachel M. Salary",   amount:18000,date:"2025-02-05",isRecurring:true, freq:"Monthly",notes:"Receptionist"},
  {id:6,category:"Salary",   name:"Sunita K. Salary",   amount:22000,date:"2025-02-05",isRecurring:true, freq:"Monthly",notes:"Bangalore Stylist"},
  {id:7,category:"Utility",  name:"Electricity HQ",     amount:8500, date:"2025-02-08",isRecurring:true, freq:"Monthly",notes:"TSSPDCL"},
  {id:8,category:"Inventory",name:"Product Restock",    amount:15600,date:"2025-02-10",isRecurring:false,freq:null,     notes:"L'Oreal batch"},
  {id:9,category:"Marketing",name:"Instagram Ads",      amount:5000, date:"2025-02-12",isRecurring:true, freq:"Monthly",notes:"Bridal season"},
  {id:10,category:"Maintenance",name:"AC Servicing",    amount:3200, date:"2025-02-14",isRecurring:false,freq:null,     notes:"Annual maintenance"},
];
const initInvoices = [
  {id:1,invoiceNo:"INV-001",date:"2025-02-01",customer:"Ananya Sharma",items:[{type:"service",name:"Haircut",qty:1,unitPrice:500,tax:18},{type:"product",name:"L'Oreal Shampoo",qty:1,unitPrice:450,tax:18}],total:1121,paymentMethod:"UPI",status:"paid"},
  {id:2,invoiceNo:"INV-002",date:"2025-02-05",customer:"Ravi Patel",   items:[{type:"service",name:"Coloring",qty:1,unitPrice:2000,tax:18}],total:2360,paymentMethod:"Card",status:"paid"},
  {id:3,invoiceNo:"INV-003",date:"2025-02-10",customer:"Kavya Singh",  items:[{type:"service",name:"Hair Spa",qty:1,unitPrice:1000,tax:18}],total:1180,paymentMethod:"Cash",status:"unpaid"},
  {id:4,invoiceNo:"INV-004",date:"2025-02-12",customer:"Meena Reddy",  items:[{type:"service",name:"Bridal Makeup",qty:1,unitPrice:7000,tax:18}],total:8260,paymentMethod:"Cash",status:"paid"},
];
const initMoves = [
  {id:1,productId:1,productName:"L'Oreal Shampoo",    type:"purchase",    qty:12,unitCost:280,date:"2025-02-01",notes:"Monthly restock"},
  {id:2,productId:2,productName:"Schwarzkopf Color",  type:"sale",        qty:2, unitCost:320,date:"2025-02-05",notes:"Sold to Ravi Patel"},
  {id:3,productId:4,productName:"Keratin Treatment",  type:"internal_use",qty:1, unitCost:800,date:"2025-02-08",notes:"Used for Meena service"},
  {id:4,productId:3,productName:"Wella Conditioner",  type:"sale",        qty:3, unitCost:220,date:"2025-02-12",notes:"Counter sale"},
];
const mthData = [
  {month:"Sep",income:125000,expenses:148000},{month:"Oct",income:142000,expenses:152000},
  {month:"Nov",income:168000,expenses:155000},{month:"Dec",income:210000,expenses:162000},
  {month:"Jan",income:185000,expenses:158000},{month:"Feb",income:178000,expenses:161000},
];
const incPie  = [{name:"Services",value:142000,color:"#c9a84c"},{name:"Products",value:28500,color:"#4caf82"},{name:"Packages",value:7500,color:"#5b8dee"}];
const expPie  = [{name:"Salaries",value:100000,color:"#e05a5a"},{name:"Rent",value:77000,color:"#e0943a"},{name:"Inventory",value:15600,color:"#c9a84c"},{name:"Utilities",value:11000,color:"#5b8dee"},{name:"Marketing",value:5000,color:"#9b59b6"}];

// ── HELPERS ──────────────────────────────────────────────────────
const R = n => `₹${Number(n).toLocaleString("en-IN")}`;
const fd = d => new Date(d).toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"});
const Lbl = ({c}) => <div style={{fontSize:10,color:"var(--ash)",letterSpacing:".5px",textTransform:"uppercase",marginBottom:5,fontWeight:500}}>{c}</div>;
const Div = () => <div className="divider"/>;
const Logo = () => (
  <div style={{display:"flex",alignItems:"center",gap:9}}>
    <div style={{width:32,height:32,borderRadius:8,background:"linear-gradient(135deg,#c9a84c,#e8c97a)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
      <Scissors size={15} color="#0d0d0f"/>
    </div>
    <div>
      <div className="ph" style={{fontSize:16,color:"var(--white)",lineHeight:1}}>MoiSalon</div>
      <div style={{fontSize:8,color:"var(--ash)",letterSpacing:"1px",textTransform:"uppercase"}}>Management</div>
    </div>
  </div>
);
const SBadge = ({s}) => {
  const m={confirmed:"gg",pending:"gw",cancelled:"gr",paid:"gg",unpaid:"gw",partial:"gb"};
  return <span className={`badge ${m[s]||"bg2"}`}>{s}</span>;
};
const Tip = ({active,payload,label}) => {
  if(!active||!payload?.length) return null;
  return (
    <div style={{background:"var(--ink2)",border:"1px solid var(--ink4)",borderRadius:8,padding:"8px 12px",fontSize:12}}>
      <div style={{fontWeight:600,marginBottom:4,color:"var(--ash)"}}>{label}</div>
      {payload.map(p=><div key={p.name} style={{color:p.color}}>{p.name}: <b>{R(p.value)}</b></div>)}
    </div>
  );
};
const PH = ({title,sub,action}) => (
  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:22}} className="fu">
    <div>
      <h1 className="ph" style={{fontSize:28,marginBottom:2}}>{title}</h1>
      {sub&&<p style={{color:"var(--ash)",fontSize:12}}>{sub}</p>}
    </div>
    {action}
  </div>
);

// ── AUTH ─────────────────────────────────────────────────────────
const Login = ({onLogin,onSignup}) => {
  const [sp,setSp] = useState(false);
  return (
    <div style={{minHeight:"100vh",display:"grid",gridTemplateColumns:"1fr 1fr",background:"var(--ink)"}}>
      <div style={{background:"var(--ink2)",borderRight:"1px solid var(--ink4)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:50,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",width:500,height:500,top:-100,left:-100,borderRadius:"50%",background:"radial-gradient(circle,rgba(201,168,76,.07) 0%,transparent 70%)"}}/>
        <div style={{position:"relative",textAlign:"center"}}>
          <div style={{marginBottom:24}}><Logo/></div>
          <h1 className="ph" style={{fontSize:38,lineHeight:1.2,marginBottom:12}}>
            Your Salon,<br/>
            <span style={{background:"linear-gradient(135deg,var(--gold),var(--gold2))",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Elevated.</span>
          </h1>
          <p style={{color:"var(--smoke)",fontSize:13,lineHeight:1.8,maxWidth:280,margin:"0 auto 32px"}}>
            Appointments · Billing · Inventory · Finance — one system.
          </p>
          <div style={{display:"flex",gap:28,justifyContent:"center"}}>
            {[["500+","Salons"],["2M+","Bookings"],["4.9★","Rating"]].map(([v,l])=>(
              <div key={l}>
                <div className="ph" style={{fontSize:24,fontWeight:700,color:"var(--gold)"}}>{v}</div>
                <div style={{fontSize:10,color:"var(--smoke)",letterSpacing:".5px"}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:50}}>
        <div style={{width:"100%",maxWidth:400}} className="fu">
          <h2 className="ph" style={{fontSize:28,marginBottom:4}}>Welcome back</h2>
          <p style={{color:"var(--ash)",marginBottom:28,fontSize:13}}>Sign in to your dashboard</p>
          <div style={{marginBottom:13}}><Lbl c="Email or Phone"/><input className="inp" defaultValue="priya@salon.com"/></div>
          <div style={{marginBottom:24}}>
            <Lbl c="Password"/>
            <div style={{position:"relative"}}>
              <input className="inp" type={sp?"text":"password"} defaultValue="password123" style={{paddingRight:40}}/>
              <button onClick={()=>setSp(!sp)} style={{position:"absolute",right:11,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:"var(--smoke)"}}>{sp?<EyeOff size={14}/>:<Eye size={14}/>}</button>
            </div>
          </div>
          <button className="btn bg blg bfw" onClick={onLogin} style={{marginBottom:10}}>Sign In →</button>
          <button className="btn bo bfw" onClick={onSignup}>Create New Account</button>
          <div style={{marginTop:18,padding:10,background:"var(--ink3)",borderRadius:"var(--r)",border:"1px solid var(--ink4)",fontSize:11,color:"var(--smoke)"}}>💡 Demo mode — any credentials work</div>
        </div>
      </div>
    </div>
  );
};

const Signup = ({onDone,onBack}) => {
  const [step,setStep] = useState(0);
  const steps = ["Account","Business","Location","Confirm"];
  return (
    <div style={{minHeight:"100vh",background:"var(--ink)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div style={{width:"100%",maxWidth:520,background:"var(--ink2)",border:"1px solid var(--ink4)",borderRadius:"var(--rl)",padding:32}} className="fu">
        <div style={{marginBottom:24}}><Logo/></div>
        <div style={{display:"flex",alignItems:"center",marginBottom:28}}>
          {steps.map((s,i)=>(
            <div key={s} style={{display:"flex",alignItems:"center",flex:i<steps.length-1?1:0}}>
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
                <div style={{width:30,height:30,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,background:i<step?"var(--green)":i===step?"var(--gold)":"var(--ink4)",color:i===step?"var(--ink)":i<step?"#fff":"var(--smoke)",animation:i===step?"pg 1.5s infinite":undefined}}>
                  {i<step?<Check size={12}/>:i+1}
                </div>
                <span style={{fontSize:9,color:i===step?"var(--gold)":"var(--smoke)",whiteSpace:"nowrap"}}>{s}</span>
              </div>
              {i<steps.length-1&&<div style={{flex:1,height:1,background:i<step?"var(--green)":"var(--ink4)",margin:"0 5px",marginBottom:16,transition:"background .3s"}}/>}
            </div>
          ))}
        </div>
        {step===0&&<div className="fu"><h2 className="ph" style={{fontSize:22,marginBottom:16}}>Create account</h2><div style={{display:"flex",flexDirection:"column",gap:10}}><input className="inp" placeholder="Email" defaultValue="priya@salon.com"/><input className="inp" placeholder="Phone (+91)" defaultValue="+91 9999123456"/><input className="inp" type="password" placeholder="Password" defaultValue="password123"/></div></div>}
        {step===1&&<div className="fu"><h2 className="ph" style={{fontSize:22,marginBottom:16}}>Business details</h2><div style={{display:"flex",flexDirection:"column",gap:10}}><input className="inp" placeholder="Business name" defaultValue="Priya's Salon & Spa"/><select className="inp"><option>Salon</option><option>Clinic</option><option>Spa</option></select><textarea className="inp" rows={3} defaultValue="Premium salon with bridal specialist"/></div></div>}
        {step===2&&<div className="fu"><h2 className="ph" style={{fontSize:22,marginBottom:16}}>Location & hours</h2><div style={{display:"flex",flexDirection:"column",gap:10}}><input className="inp" defaultValue="Banjara Hills, Hyderabad"/><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9}}><input className="inp" defaultValue="Hyderabad"/><input className="inp" defaultValue="500034"/></div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9}}><div><Lbl c="Opening"/><input className="inp" type="time" defaultValue="10:00"/></div><div><Lbl c="Closing"/><input className="inp" type="time" defaultValue="21:00"/></div></div></div></div>}
        {step===3&&<div className="fu"><h2 className="ph" style={{fontSize:22,marginBottom:16}}>Review & confirm</h2><div style={{background:"var(--ink3)",borderRadius:"var(--r)",padding:16,marginBottom:16}}>{[["Business","Priya's Salon & Spa"],["Type","Salon"],["Location","Banjara Hills, Hyderabad"],["Hours","10:00 AM – 9:00 PM"]].map(([k,v])=><div key={k} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid var(--ink4)"}}><span style={{color:"var(--ash)",fontSize:12}}>{k}</span><span style={{fontWeight:500,fontSize:12}}>{v}</span></div>)}</div><label style={{display:"flex",alignItems:"center",gap:9,fontSize:13,cursor:"pointer"}}><input type="checkbox" defaultChecked style={{accentColor:"var(--gold)"}}/>I agree to Terms of Service</label></div>}
        <div style={{display:"flex",gap:9,marginTop:24}}>
          <button className="btn bgh" onClick={step===0?onBack:()=>setStep(step-1)}>{step===0?"Cancel":"Back"}</button>
          <div style={{flex:1}}/>
          {step<3?<button className="btn bg" onClick={()=>setStep(step+1)}>Continue <ChevronRight size={14}/></button>:<button className="btn bg" onClick={onDone}>Create Business ✓</button>}
        </div>
      </div>
    </div>
  );
};

// ── NAV ──────────────────────────────────────────────────────────
const NAV = [
  {sec:"Overview"},
  {id:"dashboard",label:"Dashboard",    icon:Home},
  {id:"finance",  label:"Finance & P&L",icon:TrendingUp},
  {sec:"Operations"},
  {id:"appointments",label:"Calendar",  icon:Calendar},
  {id:"booking",  label:"New Booking",  icon:Plus},
  {id:"billing",  label:"Billing / POS",icon:Receipt},
  {sec:"Management"},
  {id:"inventory",label:"Inventory",    icon:Package},
  {id:"expenses", label:"Expenses",     icon:DollarSign},
  {id:"customers",label:"Customers",    icon:Users},
  {id:"staff",    label:"Staff",        icon:UserCheck},
  {id:"services", label:"Services",     icon:Scissors},
  {id:"branches", label:"Branches",     icon:MapPin},
];

const Layout = ({screen,setScreen,onLogout,children}) => (
  <div className="aif">
    <div className="sidebar">
      <div className="sb-logo"><Logo/></div>
      <nav className="sb-nav">
        {NAV.map((item,i)=>{
          if(item.sec) return <div key={i} className="sb-sec">{item.sec}</div>;
          const Icon=item.icon;
          return <button key={item.id} className={`ni ${screen===item.id?"active":""}`} onClick={()=>setScreen(item.id)}><Icon size={15}/>{item.label}</button>;
        })}
      </nav>
      <div className="sb-ft"><button className="ni" style={{color:"var(--red)"}} onClick={onLogout}><LogOut size={15}/>Sign Out</button></div>
    </div>
    <div className="layout">
      <div className="topbar">
        <div><div style={{fontWeight:600,fontSize:13}}>Priya's Salon & Spa</div><div style={{fontSize:10,color:"var(--ash)"}}>HQ · Hyderabad</div></div>
        <div style={{display:"flex",alignItems:"center",gap:9}}>
          <button className="btn bgh bsm"><Bell size={15}/></button>
          <div style={{width:30,height:30,borderRadius:"50%",background:"linear-gradient(135deg,var(--gold),var(--gold2))",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:12,color:"var(--ink)"}}>P</div>
        </div>
      </div>
      <div className="pg">{children}</div>
    </div>
  </div>
);

// ── DASHBOARD ────────────────────────────────────────────────────
const Dashboard = ({setScreen,products}) => {
  const low = products.filter(p=>p.stock<=p.minStock);
  return (
    <div>
      <div className="fu" style={{marginBottom:20}}>
        <h1 className="ph" style={{fontSize:28,marginBottom:2}}>Good morning, Priya ✦</h1>
        <p style={{color:"var(--ash)",fontSize:12}}>February 2025 · Business at a glance</p>
      </div>
      <div className="fu1" style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:12,marginBottom:20}}>
        {[
          {l:"Today's Bookings",v:"15",a:"gold",s:"+3 vs yesterday"},
          {l:"Revenue Today",   v:R(12980),a:"green",s:"5 appointments"},
          {l:"Outstanding",     v:R(1180), a:"warn",s:"1 unpaid invoice"},
          {l:"Monthly Profit",  v:R(17000),a:"green",s:"9.5% margin"},
          {l:"Low Stock",       v:String(low.length),a:low.length?"red":"green",s:"Need restock"},
        ].map(({l,v,a,s})=>(
          <div key={l} className={`stat ${a}`}>
            <div className="sl">{l}</div>
            <div className="sv">{v}</div>
            <div className="ssub">{s}</div>
          </div>
        ))}
      </div>
      <div className="fu2" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:20}}>
        {[
          {l:"+ New Booking", s:"booking", g:"linear-gradient(135deg,#c9a84c,#e8c97a)"},
          {l:"Create Invoice",s:"billing", g:"linear-gradient(135deg,#4caf82,#6dd5a5)"},
          {l:"Add Expense",   s:"expenses",g:"linear-gradient(135deg,#e05a5a,#f08080)"},
          {l:"Update Stock",  s:"inventory",g:"linear-gradient(135deg,#5b8dee,#7fb3f5)"},
        ].map(({l,s,g})=>(
          <button key={l} onClick={()=>setScreen(s)} style={{background:"var(--ink2)",border:"1px solid var(--ink4)",borderRadius:"var(--rl)",padding:"16px 18px",cursor:"pointer",textAlign:"left",transition:"all .18s"}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--gold)";e.currentTarget.style.transform="translateY(-2px)"}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--ink4)";e.currentTarget.style.transform="none"}}>
            <div style={{width:34,height:34,borderRadius:8,background:g,marginBottom:9,display:"flex",alignItems:"center",justifyContent:"center"}}><Plus size={14} color="var(--ink)"/></div>
            <div style={{fontWeight:600,fontSize:13}}>{l}</div>
          </button>
        ))}
      </div>
      <div className="fu3" style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:18}}>
        <div className="card">
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
            <h2 className="ph" style={{fontSize:19}}>Today's Schedule</h2>
            <button className="btn bgh bsm" onClick={()=>setScreen("appointments")}>View all <ChevronRight size={12}/></button>
          </div>
          {APTS.map(a=>(
            <div key={a.id} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 13px",background:"var(--ink3)",border:"1px solid var(--ink4)",borderRadius:"var(--r)",marginBottom:7}}>
              <div style={{fontSize:12,fontWeight:700,color:"var(--gold)",minWidth:42}}>{a.time}</div>
              <div style={{flex:1}}>
                <div style={{fontWeight:500,fontSize:12}}>{a.service}</div>
                <div style={{fontSize:11,color:"var(--smoke)"}}>{a.customer} · {a.staff}</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontWeight:600,fontSize:12}}>{R(a.price)}</div>
                <SBadge s={a.status}/>
              </div>
            </div>
          ))}
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          {low.length>0&&(
            <div className="card" style={{borderColor:"rgba(224,90,90,.3)"}}>
              <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:12}}>
                <AlertTriangle size={14} color="var(--red)"/>
                <h3 className="ph" style={{fontSize:15,color:"var(--red)"}}>Low Stock Alert</h3>
              </div>
              {low.map(p=><div key={p.id} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:"1px solid var(--ink4)",fontSize:12}}><span>{p.name}</span><span className="badge gr">{p.stock} left</span></div>)}
              <button className="btn bo bsm bfw" style={{marginTop:10}} onClick={()=>setScreen("inventory")}>Manage Stock</button>
            </div>
          )}
          <div className="card">
            <h3 className="ph" style={{fontSize:17,marginBottom:12}}>Income Split</h3>
            <ResponsiveContainer width="100%" height={140}>
              <PieChart>
                <Pie data={incPie} cx="50%" cy="50%" innerRadius={35} outerRadius={60} dataKey="value" paddingAngle={2}>
                  {incPie.map((e,i)=><Cell key={i} fill={e.color}/>)}
                </Pie>
                <Tooltip contentStyle={{background:"var(--ink2)",border:"1px solid var(--ink4)",borderRadius:7,fontSize:11}} formatter={v=>R(v)}/>
                <Legend iconSize={7} wrapperStyle={{fontSize:10,color:"var(--ash)"}}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── FINANCE ──────────────────────────────────────────────────────
const Finance = () => (
  <div>
    <PH title="Finance & P&L" sub="Revenue, expenses & profitability"/>
    <div className="fu1" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:20}}>
      {[
        {l:"Total Income",  v:R(178000),a:"green",i:<ArrowUpRight size={14} color="var(--green)"/>},
        {l:"Total Expenses",v:R(161000),a:"red",  i:<ArrowDownRight size={14} color="var(--red)"/>},
        {l:"Net Profit",    v:R(17000), a:"gold",  i:<TrendingUp size={14} color="var(--gold)"/>},
        {l:"Outstanding",   v:R(1180),  a:"warn",  i:<Clock size={14} color="var(--warn)"/>},
      ].map(({l,v,a,i})=>(
        <div key={l} className={`stat ${a}`}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}><div className="sl">{l}</div>{i}</div>
          <div className="sv">{v}</div>
        </div>
      ))}
    </div>
    <div className="fu2 card" style={{marginBottom:18}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
        <h2 className="ph" style={{fontSize:19}}>Income vs Expenses (6 months)</h2>
        <button className="btn bo bsm"><FileText size={12}/> Export</button>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={mthData} margin={{top:4,right:4,bottom:4,left:4}}>
          <defs>
            <linearGradient id="gi" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#4caf82" stopOpacity={0.22}/><stop offset="95%" stopColor="#4caf82" stopOpacity={0}/></linearGradient>
            <linearGradient id="ge" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#e05a5a" stopOpacity={0.18}/><stop offset="95%" stopColor="#e05a5a" stopOpacity={0}/></linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--ink4)" vertical={false}/>
          <XAxis dataKey="month" tick={{fill:"var(--ash)",fontSize:11}} axisLine={false} tickLine={false}/>
          <YAxis tick={{fill:"var(--ash)",fontSize:10}} axisLine={false} tickLine={false} tickFormatter={v=>`₹${v/1000}k`}/>
          <Tooltip content={<Tip/>}/>
          <Area type="monotone" dataKey="income"   name="Income"   stroke="var(--green)" fill="url(#gi)" strokeWidth={2}/>
          <Area type="monotone" dataKey="expenses" name="Expenses" stroke="var(--red)"   fill="url(#ge)" strokeWidth={2}/>
        </AreaChart>
      </ResponsiveContainer>
    </div>
    <div className="fu3" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18}}>
      <div className="card">
        <h3 className="ph" style={{fontSize:17,marginBottom:14}}>Income Breakdown</h3>
        <ResponsiveContainer width="100%" height={160}>
          <PieChart><Pie data={incPie} cx="50%" cy="50%" outerRadius={65} dataKey="value" paddingAngle={2}>{incPie.map((e,i)=><Cell key={i} fill={e.color}/>)}</Pie><Tooltip formatter={v=>R(v)} contentStyle={{background:"var(--ink2)",border:"1px solid var(--ink4)",borderRadius:7,fontSize:11}}/></PieChart>
        </ResponsiveContainer>
        {incPie.map(e=><div key={e.name} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:"1px solid var(--ink4)",fontSize:12}}><div style={{display:"flex",alignItems:"center",gap:7}}><div style={{width:8,height:8,borderRadius:2,background:e.color}}/>{e.name}</div><span style={{fontWeight:600,color:"var(--gold)"}}>{R(e.value)}</span></div>)}
      </div>
      <div className="card">
        <h3 className="ph" style={{fontSize:17,marginBottom:14}}>Expense Breakdown</h3>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={expPie} layout="vertical" margin={{left:10,right:20}}>
            <XAxis type="number" hide/>
            <YAxis type="category" dataKey="name" tick={{fill:"var(--ash)",fontSize:10}} axisLine={false} tickLine={false} width={60}/>
            <Tooltip formatter={v=>R(v)} contentStyle={{background:"var(--ink2)",border:"1px solid var(--ink4)",borderRadius:7,fontSize:11}}/>
            <Bar dataKey="value" radius={[0,4,4,0]}>{expPie.map((e,i)=><Cell key={i} fill={e.color}/>)}</Bar>
          </BarChart>
        </ResponsiveContainer>
        {expPie.map(e=><div key={e.name} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:"1px solid var(--ink4)",fontSize:12}}><div style={{display:"flex",alignItems:"center",gap:7}}><div style={{width:8,height:8,borderRadius:2,background:e.color}}/>{e.name}</div><span style={{fontWeight:600,color:"var(--red)"}}>{R(e.value)}</span></div>)}
      </div>
    </div>
  </div>
);

// ── BILLING / POS ────────────────────────────────────────────────
const Billing = ({products,invoices,setInvoices}) => {
  const [tab,setT]     = useState("new");
  const [cust,setCust] = useState("");
  const [cart,setCart] = useState([]);
  const [pay,setPay]   = useState("UPI");
  const [sq,setSq]     = useState("");
  const [sf,setSf]     = useState("all");

  const add = (item,type) => setCart(p=>{
    const ex=p.find(i=>i.name===item.name&&i.type===type);
    if(ex) return p.map(i=>i.name===item.name&&i.type===type?{...i,qty:i.qty+1}:i);
    return [...p,{type,name:item.name,unitPrice:type==="service"?item.price:item.sellPrice,tax:18,qty:1}];
  });
  const rem  = (n,t) => setCart(p=>p.filter(i=>!(i.name===n&&i.type===t)));
  const upQ  = (n,t,q) => {if(q<1){rem(n,t);return;}setCart(p=>p.map(i=>i.name===n&&i.type===t?{...i,qty:q}:i));};
  const sub  = cart.reduce((s,i)=>s+i.unitPrice*i.qty,0);
  const tax  = cart.reduce((s,i)=>s+(i.unitPrice*i.qty*i.tax/100),0);
  const tot  = sub+tax;

  const create = () => {
    if(!cust||!cart.length){alert("Select customer and add items");return;}
    const inv={id:invoices.length+1,invoiceNo:`INV-${String(invoices.length+1).padStart(3,"0")}`,date:new Date().toISOString().split("T")[0],customer:cust,items:cart.map(i=>({...i})),total:tot,paymentMethod:pay,status:"paid"};
    setInvoices(p=>[inv,...p]);setCart([]);setCust("");
    alert(`✅ Invoice ${inv.invoiceNo} created for ${R(Math.round(tot))}!`);
  };

  const filtInv = invoices.filter(i=>{
    const q=sq.toLowerCase();
    return (i.customer.toLowerCase().includes(q)||i.invoiceNo.toLowerCase().includes(q))&&(sf==="all"||i.status===sf);
  });

  return (
    <div>
      <PH title="Billing & POS" sub="Create invoices, process payments"/>
      <div className="fu1" style={{display:"flex",gap:7,marginBottom:18}}>
        {[["new","+ New Invoice"],["history","Invoice History"]].map(([id,l])=><button key={id} className={`pt ${tab===id?"active":""}`} onClick={()=>setT(id)}>{l}</button>)}
      </div>
      {tab==="new"&&(
        <div className="fu2" style={{display:"grid",gridTemplateColumns:"1fr 360px",gap:18}}>
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            <div className="card" style={{padding:16}}>
              <Lbl c="Customer"/>
              <select className="inp" value={cust} onChange={e=>setCust(e.target.value)}>
                <option value="">Select customer…</option>
                <option>Walk-in Customer</option>
                {CUSTS.map(c=><option key={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className="card" style={{padding:16}}>
              <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:12}}><Scissors size={14} color="var(--gold)"/><h3 className="ph" style={{fontSize:16}}>Services</h3></div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                {SVCS.map(s=>(
                  <div key={s.id} onClick={()=>add(s,"service")} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",background:"var(--ink3)",border:"1px solid var(--ink4)",borderRadius:"var(--r)",cursor:"pointer",transition:"border-color .15s"}}
                    onMouseEnter={e=>e.currentTarget.style.borderColor="var(--gold)"}
                    onMouseLeave={e=>e.currentTarget.style.borderColor="var(--ink4)"}>
                    <div style={{flex:1}}><div style={{fontSize:12,fontWeight:500}}>{s.name}</div><div style={{fontSize:10,color:"var(--smoke)"}}>{s.duration}min</div></div>
                    <div style={{fontWeight:600,color:"var(--gold)",fontSize:12}}>{R(s.price)}</div>
                    <Plus size={13} color="var(--ash)"/>
                  </div>
                ))}
              </div>
            </div>
            <div className="card" style={{padding:16}}>
              <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:12}}><Package size={14} color="var(--blue)"/><h3 className="ph" style={{fontSize:16}}>Products</h3></div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                {products.filter(p=>p.stock>0).map(p=>(
                  <div key={p.id} onClick={()=>add(p,"product")} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",background:"var(--ink3)",border:"1px solid var(--ink4)",borderRadius:"var(--r)",cursor:"pointer",transition:"border-color .15s"}}
                    onMouseEnter={e=>e.currentTarget.style.borderColor="var(--gold)"}
                    onMouseLeave={e=>e.currentTarget.style.borderColor="var(--ink4)"}>
                    <div style={{flex:1}}><div style={{fontSize:12,fontWeight:500}}>{p.name}</div><div style={{fontSize:10,color:"var(--smoke)"}}>Stock: {p.stock}</div></div>
                    <div style={{fontWeight:600,color:"var(--blue)",fontSize:12}}>{R(p.sellPrice)}</div>
                    <Plus size={13} color="var(--ash)"/>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{position:"sticky",top:70}}>
            <div className="card">
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16}}><ShoppingCart size={15} color="var(--gold)"/><h3 className="ph" style={{fontSize:17}}>Invoice</h3></div>
              {cart.length===0?(
                <div style={{textAlign:"center",padding:"28px 0",color:"var(--smoke)",fontSize:12}}><ShoppingCart size={28} style={{marginBottom:7,opacity:.25}}/><br/>Add services or products</div>
              ):(
                <div style={{display:"flex",flexDirection:"column",gap:7,marginBottom:14}}>
                  {cart.map(item=>(
                    <div key={item.name+item.type} style={{padding:"9px 11px",background:"var(--ink3)",borderRadius:"var(--r)",border:"1px solid var(--ink4)"}}>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                        <div><div style={{fontSize:12,fontWeight:500}}>{item.name}</div><span className={`badge ${item.type==="service"?"bg2":"gb"}`} style={{fontSize:9}}>{item.type}</span></div>
                        <button onClick={()=>rem(item.name,item.type)} style={{background:"none",border:"none",cursor:"pointer",color:"var(--smoke)"}}><X size={12}/></button>
                      </div>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                        <div style={{display:"flex",alignItems:"center",gap:7}}>
                          <button onClick={()=>upQ(item.name,item.type,item.qty-1)} style={{background:"var(--ink4)",border:"none",cursor:"pointer",borderRadius:4,width:20,height:20,display:"flex",alignItems:"center",justifyContent:"center",color:"var(--white)"}}><MinusCircle size={10}/></button>
                          <span style={{fontSize:12,fontWeight:600,minWidth:14,textAlign:"center"}}>{item.qty}</span>
                          <button onClick={()=>upQ(item.name,item.type,item.qty+1)} style={{background:"var(--ink4)",border:"none",cursor:"pointer",borderRadius:4,width:20,height:20,display:"flex",alignItems:"center",justifyContent:"center",color:"var(--white)"}}><PlusCircle size={10}/></button>
                        </div>
                        <span style={{fontWeight:600,fontSize:12,color:"var(--gold)"}}>{R(item.unitPrice*item.qty)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <Div/>
              <div style={{fontSize:12,display:"flex",flexDirection:"column",gap:5,marginBottom:13}}>
                <div style={{display:"flex",justifyContent:"space-between",color:"var(--ash)"}}><span>Subtotal</span><span>{R(sub)}</span></div>
                <div style={{display:"flex",justifyContent:"space-between",color:"var(--ash)"}}><span>GST 18%</span><span>{R(Math.round(tax))}</span></div>
                <Div/>
                <div style={{display:"flex",justifyContent:"space-between",fontWeight:700,fontSize:15}}>
                  <span>Total</span>
                  <span className="ph" style={{fontSize:22,color:"var(--gold)"}}>{R(Math.round(tot))}</span>
                </div>
              </div>
              <div style={{marginBottom:13}}>
                <Lbl c="Payment Method"/>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6}}>
                  {[["UPI",<Wallet size={11}/>],["Cash",<DollarSign size={11}/>],["Card",<CreditCard size={11}/>]].map(([m,ic])=>(
                    <button key={m} className={`btn ${pay===m?"bg":"bo"} bsm`} onClick={()=>setPay(m)}>{ic}{m}</button>
                  ))}
                </div>
              </div>
              <button className="btn bg blg bfw" onClick={create} disabled={!cart.length||!cust} style={{opacity:(!cart.length||!cust)?.5:1}}>
                <Receipt size={15}/> Generate Invoice
              </button>
            </div>
          </div>
        </div>
      )}
      {tab==="history"&&(
        <div className="fu2">
          <div style={{display:"flex",gap:9,marginBottom:14}}>
            <div style={{flex:1,position:"relative"}}>
              <Search size={13} style={{position:"absolute",left:11,top:"50%",transform:"translateY(-50%)",color:"var(--smoke)"}}/>
              <input className="inp" placeholder="Search invoice or customer…" value={sq} onChange={e=>setSq(e.target.value)} style={{paddingLeft:32}}/>
            </div>
            <select className="inp" style={{width:130}} value={sf} onChange={e=>setSf(e.target.value)}>
              <option value="all">All Status</option><option value="paid">Paid</option><option value="unpaid">Unpaid</option>
            </select>
          </div>
          <div className="card" style={{padding:0}}>
            <div className="tw">
              <table>
                <thead><tr><th>Invoice</th><th>Date</th><th>Customer</th><th>Items</th><th>Total</th><th>Payment</th><th>Status</th><th></th></tr></thead>
                <tbody>
                  {filtInv.map(inv=>(
                    <tr key={inv.id}>
                      <td style={{fontWeight:600,color:"var(--gold)"}}>{inv.invoiceNo}</td>
                      <td style={{color:"var(--ash)",fontSize:12}}>{fd(inv.date)}</td>
                      <td style={{fontWeight:500}}>{inv.customer}</td>
                      <td style={{fontSize:12,color:"var(--ash)"}}>{inv.items.length} item{inv.items.length>1?"s":""}</td>
                      <td style={{fontWeight:700}}>{R(Math.round(inv.total))}</td>
                      <td><span className="badge gb">{inv.paymentMethod}</span></td>
                      <td><SBadge s={inv.status}/></td>
                      <td><button className="btn bgh bsm"><Printer size={12}/></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ── INVENTORY ────────────────────────────────────────────────────
const Inventory = ({products,setProducts,movements,setMovements}) => {
  const [tab,setT]   = useState("products");
  const [showAdd,setSA] = useState(false);
  const [stockMod,setSM] = useState(null);
  const [sf,setSF]   = useState({type:"purchase",qty:"",cost:"",notes:""});
  const [sq,setSq]   = useState("");
  const [np,setNP]   = useState({name:"",category:"",brand:"",costPrice:"",sellPrice:"",stock:"",minStock:"",unit:"bottle"});

  const totalVal  = products.reduce((s,p)=>s+p.costPrice*p.stock,0);
  const totalRet  = products.reduce((s,p)=>s+p.sellPrice*p.stock,0);
  const lowItems  = products.filter(p=>p.stock<=p.minStock);

  const doStock = () => {
    if(!sf.qty) return;
    const qty=Number(sf.qty),delta=sf.type==="purchase"?qty:-qty;
    setProducts(p=>p.map(x=>x.id===stockMod.id?{...x,stock:Math.max(0,x.stock+delta)}:x));
    setMovements(p=>[{id:p.length+1,productId:stockMod.id,productName:stockMod.name,type:sf.type,qty,unitCost:Number(sf.cost)||stockMod.costPrice,date:new Date().toISOString().split("T")[0],notes:sf.notes},...p]);
    setSM(null);setSF({type:"purchase",qty:"",cost:"",notes:""});
  };
  const doAdd = () => {
    if(!np.name||!np.sellPrice) return;
    setProducts(p=>[...p,{id:p.length+1,...np,costPrice:Number(np.costPrice),sellPrice:Number(np.sellPrice),stock:Number(np.stock)||0,minStock:Number(np.minStock)||5}]);
    setSA(false);setNP({name:"",category:"",brand:"",costPrice:"",sellPrice:"",stock:"",minStock:"",unit:"bottle"});
  };

  const filt = products.filter(p=>p.name.toLowerCase().includes(sq.toLowerCase())||p.category.toLowerCase().includes(sq.toLowerCase()));
  const tc={purchase:"var(--green)",sale:"var(--blue)",internal_use:"var(--warn)",adjustment:"var(--ash)"};
  const tl={purchase:"Purchase",sale:"Sale",internal_use:"Internal Use",adjustment:"Adjust"};

  return (
    <div>
      <PH title="Inventory" sub="Products, stock movements & valuation" action={<button className="btn bg" onClick={()=>setSA(true)}><Plus size={14}/> Add Product</button>}/>
      <div className="fu1" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:18}}>
        {[
          {l:"Total Products",v:String(products.length),a:"gold",s:"active SKUs"},
          {l:"Stock Value",   v:R(totalVal),            a:"blue",s:"at cost price"},
          {l:"Retail Value",  v:R(totalRet),            a:"green",s:"potential revenue"},
          {l:"Low Stock",     v:String(lowItems.length),a:"red",s:"need reorder"},
        ].map(({l,v,a,s})=><div key={l} className={`stat ${a}`}><div className="sl">{l}</div><div className="sv">{v}</div><div className="ssub">{s}</div></div>)}
      </div>
      <div className="fu2" style={{display:"flex",gap:7,marginBottom:16}}>
        {[["products","Products"],["movements","Stock Movements"]].map(([id,l])=><button key={id} className={`pt ${tab===id?"active":""}`} onClick={()=>setT(id)}>{l}</button>)}
      </div>
      {tab==="products"&&(
        <>
          <div style={{marginBottom:12}}>
            <div style={{position:"relative"}}><Search size={13} style={{position:"absolute",left:11,top:"50%",transform:"translateY(-50%)",color:"var(--smoke)"}}/><input className="inp" placeholder="Search products…" value={sq} onChange={e=>setSq(e.target.value)} style={{paddingLeft:32}}/></div>
          </div>
          <div className="card" style={{padding:0}}>
            <div className="tw">
              <table>
                <thead><tr><th>Product</th><th>Category</th><th>Cost</th><th>Sell</th><th>Stock</th><th>Level</th><th>Value</th><th></th></tr></thead>
                <tbody>
                  {filt.map(p=>{
                    const pct=Math.min(100,(p.stock/Math.max(p.minStock*2,1))*100);
                    const low=p.stock<=p.minStock;
                    return (
                      <tr key={p.id}>
                        <td><div style={{fontWeight:500,fontSize:13}}>{p.name}</div><div style={{fontSize:10,color:"var(--smoke)"}}>{p.brand}</div></td>
                        <td><span className="badge bg2">{p.category}</span></td>
                        <td style={{color:"var(--ash)",fontSize:12}}>{R(p.costPrice)}</td>
                        <td style={{fontWeight:600,fontSize:12}}>{R(p.sellPrice)}</td>
                        <td><div style={{display:"flex",alignItems:"center",gap:6}}><span style={{fontWeight:700,color:low?"var(--red)":"var(--white)",fontSize:13}}>{p.stock}</span><span style={{fontSize:10,color:"var(--smoke)"}}>{p.unit}{p.stock!==1?"s":""}</span>{low&&<AlertTriangle size={11} color="var(--red)"/>}</div></td>
                        <td style={{width:100}}>
                          <div className="sb2"><div className="sb2f" style={{width:`${pct}%`,background:pct<30?"var(--red)":pct<60?"var(--warn)":"var(--green)"}}/></div>
                          <div style={{fontSize:9,color:"var(--smoke)",marginTop:2}}>Min:{p.minStock}</div>
                        </td>
                        <td style={{fontWeight:600,color:"var(--gold)",fontSize:12}}>{R(p.costPrice*p.stock)}</td>
                        <td><button className="btn bgh bsm" onClick={()=>setSM(p)}>Update</button></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
      {tab==="movements"&&(
        <div className="card" style={{padding:0}}>
          <div className="tw">
            <table>
              <thead><tr><th>Date</th><th>Product</th><th>Type</th><th>Qty</th><th>Unit Cost</th><th>Total Value</th><th>Notes</th></tr></thead>
              <tbody>
                {movements.map(m=>(
                  <tr key={m.id}>
                    <td style={{color:"var(--ash)",fontSize:11}}>{fd(m.date)}</td>
                    <td style={{fontWeight:500,fontSize:13}}>{m.productName}</td>
                    <td><span className="badge" style={{background:`${tc[m.type]}22`,color:tc[m.type],fontSize:10}}>{m.type==="purchase"?"+":"-"} {tl[m.type]}</span></td>
                    <td style={{fontWeight:700}}>{m.type==="purchase"?"+":"-"}{m.qty}</td>
                    <td style={{color:"var(--ash)",fontSize:12}}>{R(m.unitCost)}</td>
                    <td style={{fontWeight:600,color:m.type==="purchase"?"var(--red)":"var(--green)",fontSize:12}}>{m.type==="purchase"?"-":"+"}{R(m.qty*m.unitCost)}</td>
                    <td style={{color:"var(--smoke)",fontSize:11}}>{m.notes||"—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {stockMod&&(
        <div className="overlay" onClick={()=>setSM(null)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <h2 className="ph" style={{fontSize:20,marginBottom:3}}>Update Stock</h2>
            <p style={{color:"var(--ash)",fontSize:12,marginBottom:18}}>{stockMod.name} · Current: <b style={{color:"var(--white)"}}>{stockMod.stock} {stockMod.unit}s</b></p>
            <div style={{marginBottom:13}}>
              <Lbl c="Movement Type"/>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7}}>
                {[["purchase","📦 Purchase","Adds stock"],["sale","🛒 Sale","Reduces stock"],["internal_use","✂️ Internal Use","Used in service"],["adjustment","🔄 Adjustment","Manual fix"]].map(([id,l,s])=>(
                  <button key={id} className={`btn ${sf.type===id?"bg":"bo"}`} style={{justifyContent:"flex-start",flexDirection:"column",alignItems:"flex-start",padding:"10px 12px",gap:2}} onClick={()=>setSF(f=>({...f,type:id}))}>
                    <span style={{fontSize:12}}>{l}</span>
                    <span style={{fontSize:10,opacity:.7,fontWeight:400}}>{s}</span>
                  </button>
                ))}
              </div>
            </div>
            <div style={{marginBottom:11}}><Lbl c={`Quantity (${stockMod.unit}s)`}/><input className="inp" type="number" min="1" placeholder="Enter quantity" value={sf.qty} onChange={e=>setSF(f=>({...f,qty:e.target.value}))}/></div>
            {sf.type==="purchase"&&<div style={{marginBottom:11}}><Lbl c="Cost per unit (₹)"/><input className="inp" type="number" placeholder={`Default: ${stockMod.costPrice}`} value={sf.cost} onChange={e=>setSF(f=>({...f,cost:e.target.value}))}/></div>}
            <div style={{marginBottom:18}}><Lbl c="Notes"/><input className="inp" placeholder="Reference or reason…" value={sf.notes} onChange={e=>setSF(f=>({...f,notes:e.target.value}))}/></div>
            <div style={{display:"flex",gap:9}}>
              <button className="btn bgh bfw" onClick={()=>setSM(null)}>Cancel</button>
              <button className="btn bg bfw" onClick={doStock}>Confirm Update</button>
            </div>
          </div>
        </div>
      )}
      {showAdd&&(
        <div className="overlay" onClick={()=>setSA(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <h2 className="ph" style={{fontSize:20,marginBottom:18}}>Add New Product</h2>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
              <div style={{gridColumn:"1/-1"}}><Lbl c="Product Name"/><input className="inp" placeholder="L'Oreal Shampoo 200ml" value={np.name} onChange={e=>setNP(p=>({...p,name:e.target.value}))}/></div>
              <div><Lbl c="Category"/><input className="inp" placeholder="Shampoo" value={np.category} onChange={e=>setNP(p=>({...p,category:e.target.value}))}/></div>
              <div><Lbl c="Brand"/><input className="inp" placeholder="L'Oreal" value={np.brand} onChange={e=>setNP(p=>({...p,brand:e.target.value}))}/></div>
              <div><Lbl c="Cost Price (₹)"/><input className="inp" type="number" placeholder="280" value={np.costPrice} onChange={e=>setNP(p=>({...p,costPrice:e.target.value}))}/></div>
              <div><Lbl c="Sell Price (₹)"/><input className="inp" type="number" placeholder="450" value={np.sellPrice} onChange={e=>setNP(p=>({...p,sellPrice:e.target.value}))}/></div>
              <div><Lbl c="Initial Stock"/><input className="inp" type="number" placeholder="0" value={np.stock} onChange={e=>setNP(p=>({...p,stock:e.target.value}))}/></div>
              <div><Lbl c="Min Stock Alert"/><input className="inp" type="number" placeholder="5" value={np.minStock} onChange={e=>setNP(p=>({...p,minStock:e.target.value}))}/></div>
              <div style={{gridColumn:"1/-1"}}><Lbl c="Unit"/><select className="inp" value={np.unit} onChange={e=>setNP(p=>({...p,unit:e.target.value}))}><option>bottle</option><option>tube</option><option>kit</option><option>set</option><option>piece</option><option>box</option></select></div>
            </div>
            <div style={{display:"flex",gap:9}}>
              <button className="btn bgh bfw" onClick={()=>setSA(false)}>Cancel</button>
              <button className="btn bg bfw" onClick={doAdd}>Add Product</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ── EXPENSES ──────────────────────────────────────────────────────
const Expenses = ({expenses,setExpenses}) => {
  const [showAdd,setSA] = useState(false);
  const [form,setF]     = useState({category:"Rent",name:"",amount:"",date:new Date().toISOString().split("T")[0],isRecurring:false,freq:"Monthly",notes:""});
  const cats = ["Rent","Salary","Utility","Inventory","Marketing","Maintenance","Other"];
  const cc   = {Rent:"var(--red)",Salary:"var(--warn)",Utility:"var(--blue)",Inventory:"var(--gold)",Marketing:"#9b59b6",Maintenance:"var(--ash)",Other:"var(--smoke)"};
  const total = expenses.reduce((s,e)=>s+e.amount,0);
  const rec   = expenses.filter(e=>e.isRecurring).reduce((s,e)=>s+e.amount,0);

  const catTot = cats.map(c=>({name:c,total:expenses.filter(e=>e.category===c).reduce((s,e)=>s+e.amount,0),color:cc[c]})).filter(c=>c.total>0);

  const doAdd = () => {
    if(!form.name||!form.amount) return;
    setExpenses(p=>[...p,{id:p.length+1,...form,amount:Number(form.amount)}]);
    setSA(false);setF({category:"Rent",name:"",amount:"",date:new Date().toISOString().split("T")[0],isRecurring:false,freq:"Monthly",notes:""});
  };

  return (
    <div>
      <PH title="Expenses" sub="Rent, salaries, utilities & all outgoings" action={<button className="btn bg" onClick={()=>setSA(true)}><Plus size={14}/> Add Expense</button>}/>
      <div className="fu1" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:18}}>
        {[
          {l:"Total Expenses",v:R(total),a:"red",s:"This month"},
          {l:"Recurring",     v:R(rec),  a:"warn",s:`${expenses.filter(e=>e.isRecurring).length} items`},
          {l:"One-time",      v:R(total-rec),a:"gold",s:`${expenses.filter(e=>!e.isRecurring).length} items`},
          {l:"Categories",    v:String(catTot.length),a:"blue",s:"expense types"},
        ].map(({l,v,a,s})=><div key={l} className={`stat ${a}`}><div className="sl">{l}</div><div className="sv">{v}</div><div className="ssub">{s}</div></div>)}
      </div>
      <div className="fu2" style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:18,marginBottom:18}}>
        <div className="card">
          <h3 className="ph" style={{fontSize:17,marginBottom:14}}>Monthly Expense Trend</h3>
          <ResponsiveContainer width="100%" height={170}>
            <BarChart data={mthData} margin={{left:0,right:0}}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--ink4)" vertical={false}/>
              <XAxis dataKey="month" tick={{fill:"var(--ash)",fontSize:10}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fill:"var(--ash)",fontSize:10}} axisLine={false} tickLine={false} tickFormatter={v=>`₹${v/1000}k`}/>
              <Tooltip content={<Tip/>}/>
              <Bar dataKey="expenses" name="Expenses" fill="var(--red)" radius={[4,4,0,0]} fillOpacity={0.8}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <h3 className="ph" style={{fontSize:17,marginBottom:12}}>By Category</h3>
          {catTot.sort((a,b)=>b.total-a.total).map(c=>(
            <div key={c.name} style={{marginBottom:10}}>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:3}}>
                <div style={{display:"flex",alignItems:"center",gap:6}}><div style={{width:7,height:7,borderRadius:2,background:c.color}}/>{c.name}</div>
                <span style={{fontWeight:600,color:c.color}}>{R(c.total)}</span>
              </div>
              <div className="sb2"><div className="sb2f" style={{width:`${(c.total/total)*100}%`,background:c.color}}/></div>
            </div>
          ))}
        </div>
      </div>
      <div className="fu3 card" style={{padding:0}}>
        <div className="tw">
          <table>
            <thead><tr><th>Category</th><th>Name</th><th>Amount</th><th>Date</th><th>Type</th><th>Notes</th><th></th></tr></thead>
            <tbody>
              {expenses.map(e=>(
                <tr key={e.id}>
                  <td><span className="badge" style={{background:`${cc[e.category]}22`,color:cc[e.category]}}>{e.category}</span></td>
                  <td style={{fontWeight:500,fontSize:13}}>{e.name}</td>
                  <td style={{fontWeight:700,color:"var(--red)"}}>{R(e.amount)}</td>
                  <td style={{color:"var(--ash)",fontSize:11}}>{fd(e.date)}</td>
                  <td>{e.isRecurring?<span className="badge gw"><RefreshCw size={8}/> {e.freq}</span>:<span className="badge bg2">One-time</span>}</td>
                  <td style={{color:"var(--smoke)",fontSize:11,maxWidth:150,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{e.notes||"—"}</td>
                  <td><button className="btn bd bsm" onClick={()=>setExpenses(p=>p.filter(x=>x.id!==e.id))}><Trash2 size={11}/></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showAdd&&(
        <div className="overlay" onClick={()=>setSA(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <h2 className="ph" style={{fontSize:20,marginBottom:18}}>Add Expense</h2>
            <div style={{display:"flex",flexDirection:"column",gap:11,marginBottom:18}}>
              <div><Lbl c="Category"/><select className="inp" value={form.category} onChange={e=>setF(f=>({...f,category:e.target.value}))}>{cats.map(c=><option key={c}>{c}</option>)}</select></div>
              <div><Lbl c="Expense Name"/><input className="inp" placeholder="e.g. HQ Rent" value={form.name} onChange={e=>setF(f=>({...f,name:e.target.value}))}/></div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9}}>
                <div><Lbl c="Amount (₹)"/><input className="inp" type="number" placeholder="45000" value={form.amount} onChange={e=>setF(f=>({...f,amount:e.target.value}))}/></div>
                <div><Lbl c="Date"/><input className="inp" type="date" value={form.date} onChange={e=>setF(f=>({...f,date:e.target.value}))}/></div>
              </div>
              <label style={{display:"flex",alignItems:"center",gap:9,cursor:"pointer",fontSize:13}}>
                <input type="checkbox" checked={form.isRecurring} onChange={e=>setF(f=>({...f,isRecurring:e.target.checked}))} style={{accentColor:"var(--gold)",width:14,height:14}}/>
                Recurring expense
              </label>
              {form.isRecurring&&<div><Lbl c="Frequency"/><select className="inp" value={form.freq} onChange={e=>setF(f=>({...f,freq:e.target.value}))}><option>Monthly</option><option>Weekly</option><option>Yearly</option><option>Quarterly</option></select></div>}
              <div><Lbl c="Notes"/><input className="inp" placeholder="Reference…" value={form.notes} onChange={e=>setF(f=>({...f,notes:e.target.value}))}/></div>
            </div>
            <div style={{display:"flex",gap:9}}>
              <button className="btn bgh bfw" onClick={()=>setSA(false)}>Cancel</button>
              <button className="btn bg bfw" onClick={doAdd}>Add Expense</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ── SERVICES ──────────────────────────────────────────────────────
const Services = () => {
  const [svcs,setSvcs] = useState(SVCS);
  const groups = [...new Set(svcs.map(s=>s.group))];
  return (
    <div>
      <PH title="Services" sub="Manage service catalogue & pricing" action={<button className="btn bg"><Plus size={14}/> Add Group</button>}/>
      {groups.map(g=>(
        <div key={g} className="fu1 card" style={{marginBottom:14}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
            <h2 className="ph" style={{fontSize:18}}>{g}</h2>
            <button className="btn bo bsm"><Plus size={12}/> Add Service</button>
          </div>
          <div className="tw">
            <table>
              <thead><tr><th>Service</th><th>Duration</th><th>Base Price</th><th>GST</th><th>Total Price</th><th></th></tr></thead>
              <tbody>
                {svcs.filter(s=>s.group===g).map(s=>(
                  <tr key={s.id}>
                    <td style={{fontWeight:500}}>{s.name}</td>
                    <td style={{color:"var(--ash)"}}>{s.duration} min</td>
                    <td>{R(s.price)}</td>
                    <td><span className="badge bg2">{s.tax}%</span></td>
                    <td style={{fontWeight:700,color:"var(--gold)"}}>{R(Math.round(s.price*1.18))}</td>
                    <td><div style={{display:"flex",gap:5}}><button className="btn bgh bsm"><Edit2 size={11}/></button><button className="btn bd bsm" onClick={()=>setSvcs(p=>p.filter(x=>x.id!==s.id))}><Trash2 size={11}/></button></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

// ── STAFF ─────────────────────────────────────────────────────────
const Staff = () => (
  <div>
    <PH title="Staff" sub="Team members & performance" action={<button className="btn bg"><Plus size={14}/> Add Member</button>}/>
    <div className="fu1" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:16}}>
      {STAFF.map((s,i)=>(
        <div key={s.id} className={`card ch fu${i+1}`}>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
            <div style={{width:44,height:44,borderRadius:"50%",background:"linear-gradient(135deg,var(--gold),var(--gold2))",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontWeight:700,color:"var(--ink)",flexShrink:0}}>{s.name[0]}</div>
            <div style={{flex:1}}><div style={{fontWeight:600,fontSize:14}}>{s.name}</div><div style={{fontSize:11,color:"var(--ash)"}}>{s.role} · {s.branch}</div></div>
            <span style={{color:"var(--gold)",fontWeight:600,fontSize:12}}>★{s.rating}</span>
          </div>
          {s.services.length>0&&<div style={{marginBottom:12}}><div style={{fontSize:9,color:"var(--smoke)",letterSpacing:".5px",marginBottom:6,textTransform:"uppercase"}}>Services</div><div style={{display:"flex",flexWrap:"wrap",gap:4}}>{s.services.map(sv=><span key={sv} className="badge bg2" style={{fontSize:10}}>{sv}</span>)}</div></div>}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9,padding:11,background:"var(--ink3)",borderRadius:"var(--r)",marginBottom:12}}>
            <div><div style={{fontSize:9,color:"var(--smoke)",marginBottom:2}}>Bookings</div><div style={{fontWeight:700,fontSize:15}}>{s.bookings||"—"}</div></div>
            <div><div style={{fontSize:9,color:"var(--smoke)",marginBottom:2}}>Salary</div><div style={{fontWeight:700,fontSize:15,color:"var(--warn)"}}>{R(s.salary)}</div></div>
          </div>
          <div style={{display:"flex",gap:7}}><button className="btn bo bsm" style={{flex:1}}>Profile</button><button className="btn bgh bsm"><Edit2 size={12}/></button></div>
        </div>
      ))}
    </div>
  </div>
);

// ── CUSTOMERS ─────────────────────────────────────────────────────
const Customers = ({setScreen}) => {
  const [q,setQ] = useState("");
  const fil = CUSTS.filter(c=>c.name.toLowerCase().includes(q.toLowerCase())||c.phone.includes(q));
  return (
    <div>
      <PH title="Customers" sub={`${CUSTS.length} registered clients`} action={<button className="btn bg"><Plus size={14}/> Add Customer</button>}/>
      <div className="fu1" style={{marginBottom:14}}>
        <div style={{position:"relative"}}><Search size={13} style={{position:"absolute",left:11,top:"50%",transform:"translateY(-50%)",color:"var(--smoke)"}}/><input className="inp" placeholder="Search by name or phone…" value={q} onChange={e=>setQ(e.target.value)} style={{paddingLeft:32}}/></div>
      </div>
      <div className="fu2 card" style={{padding:0}}>
        <div className="tw">
          <table>
            <thead><tr><th>Customer</th><th>Phone</th><th>Email</th><th>Visits</th><th>Last Visit</th><th>Lifetime Spend</th><th></th></tr></thead>
            <tbody>
              {fil.map(c=>(
                <tr key={c.id}>
                  <td><div style={{display:"flex",alignItems:"center",gap:10}}><div style={{width:32,height:32,borderRadius:"50%",background:"var(--ink4)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:12,color:"var(--gold)",flexShrink:0}}>{c.name[0]}</div><span style={{fontWeight:500,fontSize:13}}>{c.name}</span></div></td>
                  <td style={{color:"var(--ash)",fontSize:12}}>{c.phone}</td>
                  <td style={{color:"var(--smoke)",fontSize:11}}>{c.email}</td>
                  <td style={{fontWeight:600}}>{c.visits}</td>
                  <td style={{color:"var(--ash)",fontSize:12}}>{c.lastVisit}</td>
                  <td style={{fontWeight:700,color:"var(--gold)"}}>{R(c.totalSpent)}</td>
                  <td><button className="btn bg bsm" onClick={()=>setScreen("booking")}>Book</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ── BRANCHES ──────────────────────────────────────────────────────
const Branches = () => {
  const branches = [
    {id:1,name:"HQ Hyderabad",   address:"Banjara Hills, Hyderabad", hours:"10 AM – 9 PM",staff:8, isHQ:true, revenue:120000},
    {id:2,name:"Bangalore South",address:"Indira Nagar, Bangalore",  hours:"9 AM – 8 PM", staff:5, isHQ:false,revenue:75000},
  ];
  return (
    <div>
      <PH title="Branches" sub="Manage salon locations" action={<button className="btn bg"><Plus size={14}/> Add Branch</button>}/>
      <div className="fu1" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:16}}>
        {branches.map((b,i)=>(
          <div key={b.id} className={`card ch fu${i+1}`}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
              <h2 className="ph" style={{fontSize:19}}>{b.name}</h2>
              {b.isHQ&&<span className="badge bg2">HQ</span>}
            </div>
            {[[MapPin,b.address],[Clock,b.hours],[Users,`${b.staff} staff`],[BarChart2,`${R(b.revenue)} / month`]].map(([Icon,text])=>(
              <div key={text} style={{display:"flex",alignItems:"center",gap:9,fontSize:12,color:"var(--ash)",marginBottom:8}}>
                <Icon size={13} color="var(--smoke)"/>{text}
              </div>
            ))}
            <div style={{height:1,background:"var(--ink4)",margin:"14px 0"}}/>
            <div style={{display:"flex",gap:7}}><button className="btn bo bsm" style={{flex:1}}><Edit2 size={11}/> Edit</button><button className="btn bgh bsm" style={{flex:1}}><Calendar size={11}/> Schedule</button></div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── BOOKING ───────────────────────────────────────────────────────
const Booking = ({setScreen}) => {
  const [step,setStep] = useState(0);
  const [sel,setSel]   = useState({customer:null,service:null,staff:null,time:null});
  const steps = [{l:"Customer",i:Users},{l:"Service",i:Scissors},{l:"Staff",i:UserCheck},{l:"Time",i:Calendar},{l:"Confirm",i:Check}];
  const times = ["10:00","10:30","11:00","11:30","12:00","14:00","14:30","15:00","15:30","16:00"];
  const busy  = ["10:30","11:30"];
  return (
    <div>
      <PH title="New Appointment" sub={`Step ${step+1} of ${steps.length}`}/>
      <div className="fu1 card" style={{marginBottom:18}}>
        <div style={{display:"flex",alignItems:"center"}}>
          {steps.map(({l,i:Icon},i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",flex:i<steps.length-1?1:0}}>
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                <div style={{width:36,height:36,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",background:i<step?"var(--green)":i===step?"var(--gold)":"var(--ink4)",transition:"all .3s"}}>
                  {i<step?<Check size={14} color="#fff"/>:<Icon size={14} color={i===step?"var(--ink)":"var(--smoke)"}/>}
                </div>
                <span style={{fontSize:9,color:i===step?"var(--gold)":"var(--smoke)",whiteSpace:"nowrap"}}>{l}</span>
              </div>
              {i<steps.length-1&&<div style={{flex:1,height:1,background:i<step?"var(--green)":"var(--ink4)",margin:"0 5px",marginBottom:16,transition:"background .3s"}}/>}
            </div>
          ))}
        </div>
      </div>
      <div className="fu2 card">
        {step===0&&<div><h2 className="ph" style={{fontSize:20,marginBottom:14}}>Select Customer</h2>{CUSTS.map(c=><div key={c.id} onClick={()=>{setSel(s=>({...s,customer:c}));setStep(1)}} style={{padding:"11px 14px",background:"var(--ink3)",border:`1px solid ${sel.customer?.id===c.id?"var(--gold)":"var(--ink4)"}`,borderRadius:"var(--r)",cursor:"pointer",marginBottom:7,display:"flex",justifyContent:"space-between"}}><div><div style={{fontWeight:500,fontSize:13}}>{c.name}</div><div style={{fontSize:11,color:"var(--smoke)"}}>{c.phone} · {c.lastVisit}</div></div>{sel.customer?.id===c.id&&<Check size={14} color="var(--gold)"/>}</div>)}</div>}
        {step===1&&<div><h2 className="ph" style={{fontSize:20,marginBottom:14}}>Select Service</h2><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9}}>{SVCS.map(s=><div key={s.id} onClick={()=>{setSel(p=>({...p,service:s}));setStep(2)}} style={{padding:13,background:"var(--ink3)",border:`1px solid ${sel.service?.id===s.id?"var(--gold)":"var(--ink4)"}`,borderRadius:"var(--r)",cursor:"pointer"}}><div style={{fontWeight:500,marginBottom:3,fontSize:13}}>{s.name}</div><div style={{fontSize:11,color:"var(--smoke)",marginBottom:5}}>⏱ {s.duration}min</div><div style={{fontWeight:700,color:"var(--gold)",fontSize:13}}>{R(s.price)}</div></div>)}</div></div>}
        {step===2&&<div><h2 className="ph" style={{fontSize:20,marginBottom:14}}>Select Staff</h2>{STAFF.filter(s=>s.services.length>0).map(s=><div key={s.id} onClick={()=>{setSel(p=>({...p,staff:s}));setStep(3)}} style={{padding:"11px 14px",background:"var(--ink3)",border:`1px solid ${sel.staff?.id===s.id?"var(--gold)":"var(--ink4)"}`,borderRadius:"var(--r)",cursor:"pointer",marginBottom:7,display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{display:"flex",gap:11,alignItems:"center"}}><div style={{width:36,height:36,borderRadius:"50%",background:"linear-gradient(135deg,var(--gold),var(--gold2))",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,color:"var(--ink)",fontSize:14}}>{s.name[0]}</div><div><div style={{fontWeight:500,fontSize:13}}>{s.name}</div><div style={{fontSize:11,color:"var(--smoke)"}}>{s.role}</div></div></div><span style={{color:"var(--gold)",fontWeight:600,fontSize:12}}>★{s.rating}</span></div>)}</div>}
        {step===3&&<div><h2 className="ph" style={{fontSize:20,marginBottom:14}}>Date & Time</h2><input className="inp" type="date" defaultValue="2025-02-10" style={{marginBottom:14}}/><div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:7}}>{times.map(t=><div key={t} className={`ts ${busy.includes(t)?"busy":""} ${sel.time===t?"sel":""}`} onClick={()=>{if(!busy.includes(t)){setSel(p=>({...p,time:t}));setStep(4)}}}>{t}</div>)}</div></div>}
        {step===4&&<div><h2 className="ph" style={{fontSize:20,marginBottom:14}}>Confirm</h2><div style={{background:"var(--ink3)",borderRadius:"var(--r)",padding:18,marginBottom:14}}>{[["Customer",sel.customer?.name||"Walk-in"],["Service",sel.service?`${sel.service.name} (${sel.service.duration}min)`:"Haircut"],["Staff",sel.staff?.name||"Priya K."],["Time",`Feb 10 at ${sel.time||"10:00"} AM`]].map(([k,v])=><div key={k} style={{display:"flex",justifyContent:"space-between",padding:"9px 0",borderBottom:"1px solid var(--ink4)"}}><span style={{color:"var(--ash)",fontSize:12}}>{k}</span><span style={{fontWeight:500,fontSize:12}}>{v}</span></div>)}<div style={{display:"flex",justifyContent:"space-between",padding:"12px 0 0"}}><span style={{fontWeight:600,fontSize:14}}>Total (incl. GST)</span><span className="ph" style={{fontSize:22,color:"var(--gold)"}}>{R(sel.service?Math.round(sel.service.price*1.18):590)}</span></div></div><label style={{display:"flex",alignItems:"center",gap:9,fontSize:12,color:"var(--ash)",cursor:"pointer",marginBottom:16}}><input type="checkbox" defaultChecked style={{accentColor:"var(--gold)"}}/>Send SMS confirmation</label><button className="btn bg blg bfw" onClick={()=>{alert("✅ Appointment booked! Ref #BOOK-2025-12345");setScreen("dashboard")}}><Check size={15}/> Confirm Appointment</button></div>}
        <div style={{display:"flex",gap:9,marginTop:20,paddingTop:16,borderTop:"1px solid var(--ink4)"}}>
          {step>0&&<button className="btn bo" onClick={()=>setStep(step-1)}>Back</button>}
          <button className="btn bgh" onClick={()=>setScreen("dashboard")} style={{marginLeft:"auto"}}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

// ── CALENDAR ─────────────────────────────────────────────────────
const CalendarScreen = ({setScreen}) => {
  const [sel,setSel] = useState(10);
  const hapt = [5,10,15,18,20,25,28];
  return (
    <div>
      <PH title="Calendar" sub="Manage daily schedule" action={<button className="btn bg" onClick={()=>setScreen("booking")}><Plus size={14}/> New Booking</button>}/>
      <div className="fu1" style={{display:"grid",gridTemplateColumns:"240px 1fr",gap:18}}>
        <div className="card">
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
            <h3 className="ph" style={{fontSize:16}}>February 2025</h3>
            <div style={{display:"flex",gap:2}}><button className="btn bgh bsm">‹</button><button className="btn bgh bsm">›</button></div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:2,textAlign:"center"}}>
            {["S","M","T","W","T","F","S"].map((d,i)=><div key={i} style={{fontSize:9,color:"var(--smoke)",padding:"4px 0"}}>{d}</div>)}
            {[...Array(6)].map((_,i)=><div key={`p${i}`}/>)}
            {[...Array(28)].map((_,i)=>{const d=i+1;return <div key={d} className={`cd ${d===sel?"tod":""} ${hapt.includes(d)&&d!==sel?"ha":""}`} onClick={()=>setSel(d)}>{d}</div>;})}
          </div>
        </div>
        <div className="card">
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
            <h3 className="ph" style={{fontSize:18}}>Feb {sel} Schedule</h3>
            <span className="badge bg2">{APTS.length} appointments</span>
          </div>
          {APTS.map(a=>(
            <div key={a.id} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 14px",background:"var(--ink3)",border:"1px solid var(--ink4)",borderRadius:"var(--r)",marginBottom:8,transition:"border-color .15s"}}
              onMouseEnter={e=>e.currentTarget.style.borderColor="var(--gold)"}
              onMouseLeave={e=>e.currentTarget.style.borderColor="var(--ink4)"}>
              <div style={{textAlign:"center",minWidth:42}}><div style={{fontWeight:700,fontSize:12,color:"var(--gold)"}}>{a.time}</div><div style={{fontSize:9,color:"var(--smoke)"}}>AM</div></div>
              <div style={{width:3,height:32,borderRadius:2,background:a.status==="confirmed"?"var(--green)":"var(--warn)",flexShrink:0}}/>
              <div style={{flex:1}}><div style={{fontWeight:500,fontSize:13}}>{a.service}</div><div style={{fontSize:11,color:"var(--smoke)"}}>{a.customer} · {a.staff}</div></div>
              <div style={{textAlign:"right"}}><div style={{fontWeight:700,fontSize:12}}>{R(a.price)}</div><SBadge s={a.status}/></div>
              <button className="btn bgh bsm"><Eye size={12}/></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── ROOT ─────────────────────────────────────────────────────────
export default function App() {
  injectCSS();
  const [auth,setAuth]     = useState("login");
  const [screen,setScreen] = useState("dashboard");
  const [products,setProds]   = useState(initProds);
  const [movements,setMoves]  = useState(initMoves);
  const [expenses,setExp]     = useState(initExpenses);
  const [invoices,setInv]     = useState(initInvoices);

  if(auth==="login")  return <Login  onLogin={()=>setAuth("app")} onSignup={()=>setAuth("signup")}/>;
  if(auth==="signup") return <Signup onDone={()=>setAuth("app")}  onBack={()=>setAuth("login")}/>;

  const screens = {
    dashboard:    <Dashboard   setScreen={setScreen} products={products}/>,
    finance:      <Finance/>,
    appointments: <CalendarScreen setScreen={setScreen}/>,
    booking:      <Booking     setScreen={setScreen}/>,
    billing:      <Billing     products={products} invoices={invoices} setInvoices={setInv}/>,
    inventory:    <Inventory   products={products} setProducts={setProds} movements={movements} setMovements={setMoves}/>,
    expenses:     <Expenses    expenses={expenses} setExpenses={setExp}/>,
    customers:    <Customers   setScreen={setScreen}/>,
    staff:        <Staff/>,
    services:     <Services/>,
    branches:     <Branches/>,
  };

  return (
    <Layout screen={screen} setScreen={setScreen} onLogout={()=>setAuth("login")}>
      {screens[screen]||screens.dashboard}
    </Layout>
  );
}