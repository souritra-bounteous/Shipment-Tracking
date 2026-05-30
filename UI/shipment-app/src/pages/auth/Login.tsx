import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import { ErrorState } from "../../components/ui/Page";
import { useLogin, useRegister } from "../../hooks/useAuth";
import { useAuthStore } from "../../store/authStore";
import type { Role } from "../../types";

export default function Login() {
  const navigate = useNavigate();
  const role = useAuthStore((s) => s.role);
  const token = useAuthStore((s) => s.token);
  const login = useLogin();
  const registerUser = useRegister();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "CUSTOMER" as Role,
  });

  useEffect(() => {
    if (token && role) navigate(`/${role.toLowerCase()}`, { replace: true });
  }, [navigate, role, token]);

  const update = (field: keyof typeof form, value: string) =>
    setForm((current) => ({ ...current, [field]: value }));

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 p-4">
      <div className="mx-auto grid min-h-screen max-w-6xl items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="text-white">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-blue-200">Shipment Tracking Platform</p>
          <h1 className="mt-4 max-w-2xl text-4xl font-black tracking-tight md:text-6xl">
            Role-aware logistics workspace for customers, drivers, and admins.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-slate-300">
            Book shipments, update driver workflows, track live delivery events, and manage operations from one SaaS interface.
          </p>
          <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-3">
            {["Customer UI", "Driver App", "Admin Control"].map((item) => (
              <div key={item} className="rounded-2xl bg-white/10 p-4 text-sm font-bold ring-1 ring-white/15">
                {item}
              </div>
            ))}
          </div>
        </section>

        <Card className="p-6">
          <div className="mb-6 flex rounded-2xl bg-slate-100 p-1">
            {(["login", "register"] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setMode(item)}
                className={[
                  "flex-1 rounded-xl px-4 py-2 text-sm font-bold capitalize transition",
                  mode === item ? "bg-white text-slate-900 shadow-sm" : "text-slate-500",
                ].join(" ")}
              >
                {item}
              </button>
            ))}
          </div>

          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              if (mode === "login") {
                login.mutate({ email: form.email, password: form.password });
              } else {
                registerUser.mutate(form);
              }
            }}
          >
            {mode === "register" && (
              <>
                <Input label="Name" value={form.name} onChange={(event) => update("name", event.target.value)} required />
                <Input label="Phone" value={form.phone} onChange={(event) => update("phone", event.target.value)} />
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-slate-700">Role</span>
                  <select
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm"
                    value={form.role}
                    onChange={(event) => update("role", event.target.value)}
                  >
                    <option value="CUSTOMER">Customer</option>
                    <option value="DRIVER">Driver</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </label>
              </>
            )}
            <Input label="Email" type="email" value={form.email} onChange={(event) => update("email", event.target.value)} required />
            <Input
              label="Password"
              type="password"
              value={form.password}
              onChange={(event) => update("password", event.target.value)}
              required
            />
            <Button fullWidth disabled={login.isPending || registerUser.isPending}>
              {mode === "login" ? "Login" : "Create Account"}
            </Button>
          </form>

          {login.isError && <div className="mt-4"><ErrorState message={login.error.message} /></div>}
          {registerUser.isError && <div className="mt-4"><ErrorState message={registerUser.error.message} /></div>}
          {registerUser.isSuccess && (
            <div className="mt-4 rounded-2xl bg-green-50 p-4 text-sm font-semibold text-green-700">
              Registration successful. Switch to login to continue.
            </div>
          )}
        </Card>
      </div>
    </main>
  );
}