const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".tab-content");
const indicator = document.getElementById("indicator");

function switchTab(tabId) {

  contents.forEach(c => {
    c.classList.remove("active");
  });

  document.getElementById(tabId).classList.add("active");

  tabs.forEach(t => {
    t.classList.remove("active");
  });

  const activeTab = Array.from(tabs).find(t =>
    t.textContent.replace(/\s+/g, '-').toLowerCase().includes(tabId.split('-')[0])
  );

  if (activeTab) activeTab.classList.add("active");

  moveIndicator();
}

function moveIndicator() {
  const active = document.querySelector(".tab.active");
  if (!active) return;

  indicator.style.width = active.offsetWidth + "px";
  indicator.style.left = active.offsetLeft + "px";
}

window.addEventListener("load", () => {
  moveIndicator();
});

window.addEventListener("resize", moveIndicator);




const modal = document.getElementById("ctaModal");

const openBtn = document.getElementById("openBtn");
const overlay = document.getElementById("overlay");
const closeBtn = document.getElementById("closeBtn");

const idStep = document.getElementById("id-modal");
const passStep = document.getElementById("pass-modal");

const verifyForm = document.getElementById("verifyForm");
const adminForm = document.getElementById("adminLoginForm");

const idInput = document.getElementById("id_number");
const passwordInput = document.getElementById("password");

const idError = document.getElementById("idError");
const passError = document.getElementById("passError");

const togglePassword = document.getElementById("togglePassword");
const switchAccount = document.getElementById("switchAccount");

let currentUser = "";

if (openBtn) {
    openBtn.addEventListener("click", () => {
        modal.classList.add("active");
    });
}

function closeModal() {
    modal.classList.remove("active");
    resetAll();
}

function resetAll() {
    idStep.classList.remove("hidden");
    passStep.classList.add("hidden");

    idInput.value = "";
    passwordInput.value = "";
    idError.textContent = "";
    passError.textContent = "";

    currentUser = "";
}


if (overlay) overlay.addEventListener("click", closeModal);
if (closeBtn) closeBtn.addEventListener("click", closeModal);



verifyForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const id = idInput.value.trim();
    idError.textContent = "";

    if (id === "") {
        idError.textContent = "Please enter your ID number.";
        return;
    }

    resetAll();

    if (id === "1") {
        currentUser = "admin";
        document.getElementById("roleLabel").textContent = "Admin User";
        passStep.classList.remove("hidden");
        idStep.classList.add("hidden");
    }
    else if (id === "2024-03655") {
        currentUser = "student";
        document.getElementById("roleLabel").textContent = "Student User";
        passStep.classList.remove("hidden");
        idStep.classList.add("hidden");
    }
    else if (id === "1002") {
        currentUser = "teacher";
        document.getElementById("roleLabel").textContent = "Teacher User";
        passStep.classList.remove("hidden");
        idStep.classList.add("hidden");
    }
    else {
        idError.textContent = "ID not verified.";
    }
});

document.addEventListener("submit", function (e) {
    if (e.target.id !== "adminLoginForm") return;

    e.preventDefault();

    const password = passwordInput.value.trim();
    passError.textContent = "";

    if (password === "") {
        passError.textContent = "Please enter password.";
        return;
    }

    if (currentUser === "admin" && password === "admin123") {
        window.location.href = "pages/admin/dashboard.html";
    }
    else if (currentUser === "student" && password === "mark123") {
        window.location.href = "pages/student/studentDash.html";
    }
    else if (currentUser === "teacher" && password === "jaydee12345") {
        window.location.href = "pages/teacher/teacherDash.html";
    }
    else {
        passError.textContent = "Incorrect password.";
        passwordInput.value = "";
    }
});

if (togglePassword) {
    togglePassword.addEventListener("click", () => {
        passwordInput.type =
            passwordInput.type === "password" ? "text" : "password";
    });
}

if (switchAccount) {
    switchAccount.addEventListener("click", function (e) {
        e.preventDefault();
        resetAll();
    });
}