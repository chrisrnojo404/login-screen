const greeting = document.getElementById("greeting");
const form = document.getElementById("loginForm");
const formNote = document.getElementById("formNote");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const togglePasswordButton = document.getElementById("togglePassword");

const fieldState = {
  email: {
    input: emailInput,
    message: document.getElementById("emailMessage"),
    validator: (value) => /\S+@\S+\.\S+/.test(value.trim()),
    error: "Enter a valid work email address."
  },
  password: {
    input: passwordInput,
    message: document.getElementById("passwordMessage"),
    validator: (value) => value.trim().length >= 8,
    error: "Use at least 8 characters."
  }
};

function setGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) {
    greeting.textContent = "Good morning, let's get started.";
    return;
  }

  if (hour < 18) {
    greeting.textContent = "Good afternoon, your workspace is ready.";
    return;
  }

  greeting.textContent = "Good evening, welcome back.";
}

function updateFieldState(name) {
  const field = fieldState[name];
  const fieldWrapper = field.input.closest(".field");
  const value = field.input.value;

  fieldWrapper.classList.remove("is-valid", "is-invalid");
  field.message.textContent = "";

  if (!value) {
    return false;
  }

  if (field.validator(value)) {
    fieldWrapper.classList.add("is-valid");
    return true;
  }

  fieldWrapper.classList.add("is-invalid");
  field.message.textContent = field.error;
  return false;
}

function validateForm() {
  const isEmailValid = updateFieldState("email");
  const isPasswordValid = updateFieldState("password");
  return isEmailValid && isPasswordValid;
}

togglePasswordButton.addEventListener("click", () => {
  const nextType = passwordInput.type === "password" ? "text" : "password";
  const isVisible = nextType === "text";

  passwordInput.type = nextType;
  togglePasswordButton.textContent = isVisible ? "Hide" : "Show";
  togglePasswordButton.setAttribute("aria-pressed", String(isVisible));
  togglePasswordButton.setAttribute(
    "aria-label",
    isVisible ? "Hide password" : "Show password"
  );
});

Object.keys(fieldState).forEach((name) => {
  fieldState[name].input.addEventListener("input", () => updateFieldState(name));
  fieldState[name].input.addEventListener("blur", () => updateFieldState(name));
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!validateForm()) {
    formNote.textContent = "Please fix the highlighted fields and try again.";
    return;
  }

  formNote.textContent = "Looking good. This demo screen is ready to connect to auth.";
});

setGreeting();
