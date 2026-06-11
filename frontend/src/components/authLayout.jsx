import { useState } from "react";
import styles from "../styles/authComponentStyles.module.css";
import { SignupForm } from "./signUp";
import { LoginForm } from "./Login";

const ICONS = {
  user: "M12 12c2.7 0 4-1.3 4-4s-1.3-4-4-4-4 1.3-4 4 1.3 4 4 4zm0 2c-4 0-6 2-6 3v1h12v-1c0-1-2-3-6-3z",
  mail: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6",
  lock: "M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM7 11V7a5 5 0 0 1 10 0v4",
  eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  eyeOff:
    "M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24 M1 1l22 22",
  arrowRight: "M5 12h14M12 5l7 7-7 7",
  check: "M20 6L9 17l-5-5",
  at: "M21 12a9 9 0 1 1-9-9c4.97 0 9 4.03 9 9v1.5A2.5 2.5 0 0 1 16.5 15v0A2.5 2.5 0 0 1 14 12.5v-5 M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
};

export function Icon({ name, size = 14, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d={ICONS[name]} />
    </svg>
  );
}

// Pass down inputs as children
export function Field({ label, error, children }) {
  return (
    <div className={styles.field}>
      {label && <label>{label}</label>}
      {children}
      {error && <span className={styles.fieldError}>{error}</span>}
    </div>
  );
}

export function TextInput({
  icon,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  showToggle,
  onToggle,
  showPassword,
}) {
  return (
    <div className={styles.inputWrap}>
      <input
        type={showToggle ? (showPassword ? "text" : "password") : type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`${error ? "hasError" : ""} ${showToggle ? "hasEye" : ""}`}
        style={{ paddingLeft: icon ? "38px" : "14px" }}
      />
      {icon && (
        <span
          className={styles.inputIcon}
          style={{ pointerEvents: "none", display: "flex" }}
        >
          <Icon name={icon} size={14} />
        </span>
      )}
      {showToggle && (
        <button
          className={styles.eyeBtn}
          type="button"
          onClick={onToggle}
          tabIndex={-1}
        >
          <Icon name={showPassword ? "eyeOff" : "eye"} size={14} />
        </button>
      )}
    </div>
  );
}

function LeftPanel({ mode }) {
  return (
    <div className={styles.leftPanel}>
      <a href="#" className={styles.logo}>
        <span className={styles.dot}>DevConnect</span>
      </a>
      <div className={styles.panelContent}>
        <h2 className={styles.panelTitle}>
          {mode === "login" ? (
            <>
              Welcome
              <br />
              back to the
              <br />
              <span className={styles.accent}>community</span>
            </>
          ) : (
            <>
              Join the
              <br />
              dev
              <br />
              <span className={styles.accent}>community</span>
            </>
          )}
        </h2>
        <p className={styles.panelDesc}>
          {mode === "login"
            ? "Pick up where you left off. Your channels, your people, your conversations."
            : "Real-time messaging for developers. Find your stack, share your builds, connect with people who get it."}
        </p>

        {/* TODO - Implement Stats later to show */}
        {/* <div className="panel-stats">
          {[
            { icon: "👥", text: <><strong>2,400+</strong> developers joined</> },
            { icon: "💬", text: <><strong>12k</strong> messages today</> },
            { icon: "✨", text: <><strong>Free</strong> forever, no credit card</> },
          ].map((s, i) => (
            <div key={i} className="stat-row">
              <span className="icon">{s.icon}</span>
              <span>{s.text}</span>
            </div>
          ))}
        </div> */}
      </div>
      <div className={styles.panelFooter}>DevConnect - built by devs, for devs</div>
    </div>
  );
}

export default function AuthPages() {
  const [mode, setMode] = useState("login");

  return (
    <>
      <div className={styles.page}>
        <LeftPanel mode={mode} />
        <div className={styles.rightPanel}>
          {mode === "login" ? (
            <LoginForm onSwitch={() => setMode("signup")} />
          ) : (
            <SignupForm onSwitch={() => setMode("login")} />
          )}
        </div>
      </div>
    </>
  );
}
