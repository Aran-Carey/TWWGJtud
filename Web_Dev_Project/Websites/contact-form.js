// contact-form.js
// Uses HTML attributes + JavaScript to validate the form

const form = document.getElementById("contact-form");
const errorSummary = document.getElementById("error-summary");
const errorList = document.getElementById("error-list");
const successBox = document.getElementById("success");

// One place to store elements + labels
const fields = {
  firstName: {
    el: document.getElementById("firstName"),
    errorEl: document.getElementById("firstName-error"),
    label: "First Name",
  },
  lastName: {
    el: document.getElementById("lastName"),
    errorEl: document.getElementById("lastName-error"),
    label: "Last Name",
  },
  email: {
    el: document.getElementById("email"),
    errorEl: document.getElementById("email-error"),
    label: "Email Address",
  },
  reason: {
    el: document.getElementById("reason"),
    errorEl: document.getElementById("reason-error"),
    label: "Reason for Inquiry",
  },
  message: {
    el: document.getElementById("message"),
    errorEl: document.getElementById("message-error"),
    label: "Message",
  },
};

// This function is where JavaScript validates each field.
// First Name is explicitly validated here, satisfying the assignment.
function getError(key) {
  const value = fields[key].el.value.trim();

  if (key === "firstName" || key === "lastName") {
    if (!value) return "This field is required.";
    if (value.length < 2) return "Please enter at least 2 letters.";
    if (!/^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/.test(value)) {
      return "Use letters only; numbers and symbols are not allowed.";
    }
    return "";
  }

  if (key === "email") {
    if (!value) return "Email address is required.";
    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailPattern.test(value)) {
      return "Enter an email address in the format name@example.com.";
    }
    return "";
  }

  if (key === "reason") {
    if (!value) return "Please select a reason for your inquiry.";
    return "";
  }

  if (key === "message") {
    if (!value) return "Message is required.";
    if (value.length < 10) {
      return "Your message must be at least 10 characters long.";
    }
    return "";
  }

  return "";
}

function clearErrors() {
  errorList.innerHTML = "";
  errorSummary.hidden = true;
  successBox.hidden = true;

  Object.values(fields).forEach(({ el, errorEl }) => {
    el.classList.remove("error-field");
    el.removeAttribute("aria-invalid");
    errorEl.textContent = "";
  });
}

function showFieldError(key, message) {
  const { el, errorEl } = fields[key];
  el.classList.add("error-field"); // add dashed border via CSS (not just color)
  el.setAttribute("aria-invalid", "true");
  errorEl.innerHTML = '<span class="error-icon">⚠</span>' + message;
}

function addErrorToSummary(key, message) {
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.href = "#" + fields[key].el.id;
  a.textContent = message + " (Field: " + fields[key].label + ")";
  a.addEventListener("click", function (e) {
    e.preventDefault();
    fields[key].el.focus();
  });
  li.appendChild(a);
  errorList.appendChild(li);
}

if (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // stop normal submit so we can check first
    clearErrors();

    let hasErrors = false;

    // Loop over all fields and run our JS validation
    Object.keys(fields).forEach((key) => {
      const errorMsg = getError(key);
      if (errorMsg) {
        hasErrors = true;
        showFieldError(key, errorMsg);
        addErrorToSummary(key, errorMsg);
      }
    });

    if (hasErrors) {
      // Show accessible summary that does not rely on color only
      errorSummary.hidden = false;
      errorSummary.focus();
    } else {
      successBox.hidden = false;
      form.reset();
    }
  });
}
