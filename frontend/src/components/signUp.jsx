import { Icon } from "./authLayout.jsx";
import { Field } from "./authLayout.jsx";
import { TextInput } from "./authLayout.jsx";
import { useState } from "react";
import styles from "../styles/authComponentStyles.module.css"

function SignupForm({ onSwitch }) {
  const [form, setForm] = useState({ name: "", username: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.username.trim()) errs.username = "Username is required";
    else if (!/^[a-z0-9_]{3,20}$/.test(form.username)) errs.username = "3-20 chars, lowercase, underscores only";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Enter a valid email";
    if (!form.password) errs.password = "Password is required";
    else if (form.password.length < 8) errs.password = "At least 8 characters";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSuccess(true);
  };

  // if (success) {
  //   return (
  //     <div className={styles.formCard}>
  //       <div style={{ textAlign: "center", padding: "40px 0" }}>
  //         <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", color: "#10B981" }}>
  //           <Icon name="check" size={24} />
  //         </div>
  //         <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, marginBottom: 8, letterSpacing: "-0.01em" }}>You're in</h2>
  //         <p style={{ fontSize: 14, color: "var(--text-dim)", fontWeight: 300, marginBottom: 24 }}>Account created. Redirecting you to echo.chat...</p>
  //         <div style={{ display: "inline-flex", gap: 6, alignItems: "center", fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-muted)" }}>
  //           <div className={styles.spinner} style={{ borderTopColor: "var(--amber)" }} /> loading your channels
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className={styles.formCard}>
      <div className={styles.formHeader}>
        <h1 className={styles.formTitle}>Create account</h1>
        <p className={styles.formSubtitle}>
          Already a dev?{" "}
          <a onClick={onSwitch}>Sign in instead</a>
        </p>
      </div>
      <form className={styles.formBody} onSubmit={handleSubmit}>
        <div className={styles.fieldRow}>
          <Field label="Full name" error={errors.name}>
            <TextInput icon="user" placeholder="Hemant Dahiya" value={form.name} onChange={set("name")} error={errors.name} />
          </Field>
          <Field label="Username" error={errors.username}>
            <TextInput icon="at" placeholder="hemant_codes" value={form.username} onChange={set("username")} error={errors.username} />
          </Field>
        </div>
        <Field label="Email" error={errors.email}>
          <TextInput icon="mail" type="email" placeholder="you@example.com" value={form.email} onChange={set("email")} error={errors.email} />
        </Field>
        <Field label="Password" error={errors.password}>
          <TextInput icon="lock" placeholder="At least 8 characters" value={form.password} onChange={set("password")} error={errors.password} showToggle onToggle={() => setShowPw((v) => !v)} showPassword={showPw} />
        </Field>
        <button className={styles.btnSubmit} type="submit" disabled={loading}>
          {loading ? (
            <><div className={styles.spinner} /> Creating account...</>
          ) : (
            <>Create account <Icon name="arrowRight" size={14} /></>
          )}
        </button>
        <p className={styles.terms}>
          By signing up, you agree to our{" "}
          <a>Terms of Service</a> and <a>Privacy Policy</a>
        </p>
      </form>
    </div>
  );
}

export {SignupForm};