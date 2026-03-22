import { useState } from "react";

import Login from "./components/auth/Login";
import Signup from "./components/screens/Signup";
import Layout from "./components/layout/Layout";
import Dashboard from "./components/screens/Dashboard";
import Finance from "./components/screens/Finance";
import CalendarScreen from "./components/screens/CalendarScreen";
import Booking from "./components/screens/Booking";
import Billing from "./components/screens/Billing";
import Inventory from "./components/screens/Inventory";
import Expenses from "./components/screens/Expenses";
import Customers from "./components/screens/Customers";
import Staff from "./components/screens/Staff";
import Services from "./components/screens/Services";
import Branches from "./components/screens/Branches";

import {
  initProds,
  initMoves,
  initExpenses,
  initInvoices,
} from "./data";

export default function App() {
  const [auth, setAuth] = useState("login");
  const [screen, setScreen] = useState("dashboard");
  const [products, setProds] = useState(initProds);
  const [movements, setMoves] = useState(initMoves);
  const [expenses, setExp] = useState(initExpenses);
  const [invoices, setInv] = useState(initInvoices);

  if (auth === "login") {
    return (
      <Login
        onLogin={() => setAuth("app")}
        onSignup={() => setAuth("signup")}
      />
    );
  }

  if (auth === "signup") {
    return (
      <Signup
        onDone={() => setAuth("app")}
        onBack={() => setAuth("login")}
      />
    );
  }

  const screens = {
    dashboard: (
      <Dashboard setScreen={setScreen} products={products} />
    ),
    finance: <Finance />,
    appointments: (
      <CalendarScreen setScreen={setScreen} />
    ),
    booking: <Booking setScreen={setScreen} />,
    billing: (
      <Billing
        products={products}
        invoices={invoices}
        setInvoices={setInv}
      />
    ),
    inventory: (
      <Inventory
        products={products}
        setProducts={setProds}
        movements={movements}
        setMovements={setMoves}
      />
    ),
    expenses: (
      <Expenses expenses={expenses} setExpenses={setExp} />
    ),
    customers: <Customers setScreen={setScreen} />,
    staff: <Staff />,
    services: <Services />,
    branches: <Branches />,
  };

  return (
    <Layout screen={screen} setScreen={setScreen} onLogout={() => setAuth("login")}>
      {screens[screen] ?? screens.dashboard}
    </Layout>
  );
}
