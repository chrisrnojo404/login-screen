import { useEffect, useRef, useState } from "react";
import visionMediaLogo from "./assets/vision-media-logo.png";

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

      shell.style.setProperty("--pointer-x", `${x * 100}%`);
      shell.style.setProperty("--pointer-y", `${y * 100}%`);
      shell.style.setProperty("--pointer-shift-x", `${(x - 0.5) * 36}px`);
      shell.style.setProperty("--pointer-shift-y", `${(y - 0.5) * 36}px`);
      shell.style.setProperty("--avatar-shift-x", `${(x - 0.5) * 6}px`);
      shell.style.setProperty("--avatar-shift-y", `${(y - 0.5) * 5}px`);
      shell.style.setProperty("--eye-shift-x", `${(x - 0.5) * 2.4}px`);
      shell.style.setProperty("--eye-shift-y", `${(y - 0.5) * 1.8}px`);
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
        <div className="workspace-scene"></div>
        <div className="workspace-overlay"></div>
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
            <img
              className="form-logo"
              src={visionMediaLogo}
              alt="Vision Media logo"
            />

            <div className="form-heading form-heading--minimal">
              <h2>Sign in</h2>
              <p>{greeting}</p>
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
                  : (
                    <>
                      Developed by{" "}
                      <span className="footer-signoff">
                        <svg
                          aria-hidden="true"
                          className="footer-signoff__icon"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fill="currentColor"
                            d="M8 0C3.58 0 0 3.67 0 8.2c0 3.62 2.29 6.69 5.47 7.78.4.08.55-.18.55-.39 0-.19-.01-.82-.01-1.48-2.01.38-2.53-.5-2.69-.96-.09-.24-.48-.97-.82-1.16-.28-.16-.68-.55-.01-.56.63-.01 1.08.59 1.23.84.72 1.26 1.87.9 2.33.69.07-.53.28-.9.5-1.11-1.78-.21-3.64-.92-3.64-4.08 0-.9.31-1.64.82-2.22-.08-.21-.36-1.06.08-2.2 0 0 .67-.22 2.2.85A7.45 7.45 0 0 1 8 3.68c.68 0 1.37.09 2.01.27 1.53-1.07 2.2-.85 2.2-.85.44 1.14.16 1.99.08 2.2.51.58.82 1.31.82 2.22 0 3.17-1.87 3.87-3.65 4.08.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.47.55.39A8.23 8.23 0 0 0 16 8.2C16 3.67 12.42 0 8 0Z"
                          />
                        </svg>
                        <span>ChrisRNojo404</span>
                      </span>
                    </>
                  )}
              </p>
            </form>
          </div>
        </section>
      </section>
    </main>
  );
}
