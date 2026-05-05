import { useEffect, useState } from "react";

const activityFeed = [
  { label: "SSO Relay", value: "Healthy", detail: "2.1s median handshake" },
  { label: "Threat Scan", value: "Active", detail: "Monitoring 14 regions" },
  { label: "Team Access", value: "128 seats", detail: "11 pending invites" }
];

const highlights = [
  "Adaptive layout tuned for desktop, tablet, and mobile.",
  "Clear interaction states with lightweight validation feedback.",
  "A React component base that is ready for real authentication wiring."
];

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) {
    return "Good morning, let's get your team online.";
  }

  if (hour < 18) {
    return "Good afternoon, your workspace is standing by.";
  }

  return "Good evening, welcome back to the command deck.";
}

function validateEmail(value) {
  return /\S+@\S+\.\S+/.test(value.trim());
}

function validatePassword(value) {
  return value.trim().length >= 8;
}

export default function App() {
  const [greeting, setGreeting] = useState(getGreeting);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [formState, setFormState] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    const timer = window.setInterval(() => {
      setGreeting(getGreeting());
    }, 60000);

    return () => window.clearInterval(timer);
  }, []);

  const emailIsValid = validateEmail(formState.email);
  const passwordIsValid = validatePassword(formState.password);
  const showEmailError = submitted && !emailIsValid;
  const showPasswordError = submitted && !passwordIsValid;
  const canSubmit = emailIsValid && passwordIsValid;

  function handleChange(event) {
    const { name, value } = event.target;

    setFormState((current) => ({
      ...current,
      [name]: value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);

    if (!canSubmit) {
      return;
    }
  }

  return (
    <main className="page-shell">
      <section className="ambient-panel" aria-hidden="true">
        <div className="glow glow-one"></div>
        <div className="glow glow-two"></div>
        <div className="grid"></div>
        <div className="halo halo-one"></div>
        <div className="halo halo-two"></div>
      </section>

      <section className="login-layout" aria-label="Login experience">
        <aside className="brand-panel">
          <div className="brand-copy">
            <p className="eyebrow">Northstar Access</p>
            <h1>Turn login into a launch moment.</h1>
            <p className="intro">
              This React version gives the screen a stronger sense of product:
              more structured motion, clearer component boundaries, and a better
              foundation for real auth flows.
            </p>
          </div>

          <div className="status-card">
            <div>
              <p className="status-label">Live greeting</p>
              <p className="status-copy">{greeting}</p>
            </div>
            <div className="orbit-indicator" aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          <div className="activity-grid" aria-label="Platform status">
            {activityFeed.map((item) => (
              <article className="activity-card" key={item.label}>
                <p>{item.label}</p>
                <strong>{item.value}</strong>
                <span>{item.detail}</span>
              </article>
            ))}
          </div>

          <div className="feature-list">
            {highlights.map((item, index) => (
              <article key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{item}</p>
              </article>
            ))}
          </div>
        </aside>

        <section className="form-panel">
          <div className="form-panel__inner">
            <div className="form-heading">
              <p className="badge">Member Login</p>
              <h2>Sign in to continue</h2>
              <p>
                Use your work email and password to enter the workspace.
              </p>
            </div>

            <div className="trust-row" aria-label="Security highlights">
              <span>Device aware</span>
              <span>Biometric ready</span>
              <span>Role based</span>
            </div>

            <form className="login-form" onSubmit={handleSubmit} noValidate>
              <label className={`field ${showEmailError ? "is-invalid" : ""}`}>
                <span>Email</span>
                <input
                  name="email"
                  type="email"
                  placeholder="you@company.com"
                  autoComplete="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <small className="field-message">
                  {showEmailError ? "Enter a valid work email address." : " "}
                </small>
              </label>

              <label className={`field ${showPasswordError ? "is-invalid" : ""}`}>
                <span>Password</span>
                <div className="password-field">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    value={formState.password}
                    onChange={handleChange}
                  />
                  <button
                    className="toggle-password"
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    aria-pressed={showPassword}
                    onClick={() => setShowPassword((current) => !current)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <small className="field-message">
                  {showPasswordError ? "Use at least 8 characters." : " "}
                </small>
              </label>

              <div className="form-row">
                <label className="remember-me">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe((current) => !current)}
                  />
                  <span>Keep me signed in</span>
                </label>
                <a href="/" className="text-link">
                  Forgot password?
                </a>
              </div>

              <button className="submit-button" type="submit">
                Enter workspace
              </button>

              <p className="form-note" aria-live="polite">
                {submitted && canSubmit
                  ? "Looking good. This React screen is ready to connect to real authentication."
                  : "Protected by enterprise-grade authentication and adaptive access rules."}
              </p>
            </form>
          </div>
        </section>
      </section>
    </main>
  );
}
