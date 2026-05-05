import { useEffect, useRef, useState } from "react";

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
  const shellRef = useRef(null);
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

  useEffect(() => {
    const shell = shellRef.current;

    if (!shell) {
      return undefined;
    }

    let frameId = 0;

    function updatePointer(clientX, clientY) {
      const x = clientX / window.innerWidth;
      const y = clientY / window.innerHeight;
      const rotateX = (y - 0.5) * -10;
      const rotateY = (x - 0.5) * 10;

      shell.style.setProperty("--pointer-x", `${x * 100}%`);
      shell.style.setProperty("--pointer-y", `${y * 100}%`);
      shell.style.setProperty("--pointer-shift-x", `${(x - 0.5) * 36}px`);
      shell.style.setProperty("--pointer-shift-y", `${(y - 0.5) * 36}px`);
      shell.style.setProperty("--panel-rotate-x", `${rotateX}deg`);
      shell.style.setProperty("--panel-rotate-y", `${rotateY}deg`);
    }

    function handlePointerMove(event) {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }

      frameId = window.requestAnimationFrame(() => {
        updatePointer(event.clientX, event.clientY);
      });
    }

    function resetPointer() {
      updatePointer(window.innerWidth / 2, window.innerHeight / 2);
    }

    resetPointer();
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", resetPointer);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", resetPointer);
    };
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
    <main className="page-shell" ref={shellRef}>
      <section className="ambient-panel" aria-hidden="true">
        <div className="cursor-light"></div>
        <div className="aurora aurora-one"></div>
        <div className="aurora aurora-two"></div>
        <div className="radial-wave"></div>
        <div className="glow glow-one"></div>
        <div className="glow glow-two"></div>
        <div className="grid"></div>
        <div className="halo halo-one"></div>
        <div className="halo halo-two"></div>
      </section>

      <section className="login-layout" aria-label="Login experience">
        <section className="form-panel form-panel--minimal">
          <div className="form-panel__inner">
            <p className="eyebrow eyebrow--center">Northstar Access</p>

            <div className="member-badge member-badge--minimal" aria-label="Member profile preview">
              <div className="member-badge__avatar" aria-hidden="true">
                <span className="member-badge__pulse"></span>
                <span className="member-badge__orbit"></span>
                <span className="member-badge__ring"></span>
                <span className="member-badge__presence"></span>
                <span className="member-badge__initials">AN</span>
              </div>
              <div className="member-badge__copy">
                <strong>Avery North</strong>
                <span>{greeting}</span>
              </div>
            </div>

            <div className="form-heading form-heading--minimal">
              <h2>Sign in</h2>
              <p>Use your work email and password to enter the workspace.</p>
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

              <p className="form-note form-note--minimal" aria-live="polite">
                {submitted && canSubmit
                  ? "Looking good. This React screen is ready to connect to real authentication."
                  : "Protected by enterprise-grade authentication."}
              </p>
            </form>
          </div>
        </section>
      </section>
    </main>
  );
}
