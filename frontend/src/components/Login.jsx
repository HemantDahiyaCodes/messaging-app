import { Icon } from "./authLayout.jsx";
import { Field } from "./authLayout.jsx";
import { TextInput } from "./authLayout.jsx";
import { useState } from "react";
import styles from "../styles/authComponentStyles.module.css";

function LoginForm({ onSwitch }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (!form.username.trim()) errs.username = "Username is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Enter a valid email";
    if (!form.password) errs.password = "Password is required";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setApiError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setApiError("Invalid email or password. Please try again.");
  };

  return (
    <div className={styles.formCard}>
      <div className={styles.formHeader}>
        <h1 className={styles.formTitle}>Welcome back</h1>
        <p className={styles.formSubtitle}>
          New here? <a onClick={onSwitch}>Create an account</a>
        </p>
      </div>
      <form className={styles.formBody} onSubmit={handleSubmit}>
        {apiError && (
          <div className="alert alert-error">
            <Icon
              name="lock"
              size={14}
              style={{ flexShrink: 0, marginTop: 1 }}
            />
            {apiError}
          </div>
        )}
        <Field label="Username" error={errors.email}>
          <TextInput
            icon="mail"
            type="text"
            placeholder="your name"
            value={form.email}
            onChange={set("text")}
            error={errors.username}
          />
        </Field>
        <Field label="Password" error={errors.password}>
          <TextInput
            icon="lock"
            placeholder="Your password"
            value={form.password}
            onChange={set("password")}
            error={errors.password}
            showToggle
            onToggle={() => setShowPw((v) => !v)}
            showPassword={showPw}
          />
        </Field>
        <div style={{ textAlign: "right", marginTop: -8 }}>
          <a
            style={{
              fontSize: 12,
              color: "var(--text-muted)",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Forgot password?
          </a>
        </div>
        <button className={styles.btnSubmit} type="submit" disabled={loading}>
          {loading ? (
            <>
              <div className={styles.spinner} /> Signing in...
            </>
          ) : (
            <>
              Sign in <Icon name="arrowRight" size={14} />
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export { LoginForm };
