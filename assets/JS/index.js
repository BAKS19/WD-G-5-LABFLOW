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
const emailStep = document.getElementById("email-modal");

const verifyForm = document.getElementById("verifyForm");
const adminForm = document.getElementById("adminLoginForm");
const emailForm = document.getElementById("emailForm");

const idInput = document.getElementById("id_number");
const passwordInput = document.getElementById("password");
const emailInput = document.getElementById("email");

const idError = document.getElementById("idError");
const passError = document.getElementById("passError");
const emailError = document.getElementById("emailError");

const togglePassword = document.getElementById("togglePassword");
const switchAccount = document.getElementById("switchAccount");
const forgotPassword = document.getElementById("forgotPassword");
const backToLogin = document.getElementById("backToLogin");

let currentUser = "";

if (openBtn) openBtn.onclick = () => modal.classList.add("active");
if (overlay) overlay.onclick = closeModal;
if (closeBtn) closeBtn.onclick = closeModal;

function closeModal() {
    modal.classList.remove("active");
    resetAll();
}

function resetAll() {
    idStep.classList.remove("hidden");
    passStep.classList.add("hidden");
    emailStep.classList.add("hidden");

    idInput.value = "";
    passwordInput.value = "";
    emailInput.value = "";

    idError.textContent = "";
    passError.textContent = "";
    emailError.textContent = "";

    currentUser = "";
}

verifyForm.onsubmit = (e) => {
    e.preventDefault();

    const id = idInput.value.trim();
    idError.textContent = "";

    if (id === "") {
        idError.textContent = "Please enter your ID number.";
        return;
    }

    if (id === "1") {
        currentUser = "admin";
        roleLabel.textContent = "Admin User";
    }
    else if (id === "202403655") {
        currentUser = "student";
        roleLabel.textContent = "Mark John Ando";
    }
    else if (id === "1002") {
        currentUser = "teacher";
        roleLabel.textContent = "Jaydee Ballaho";
    }
    else {
        idError.textContent = "ID not verified.";
        return;
    }

    idStep.classList.add("hidden");
    passStep.classList.remove("hidden");
};


adminForm.onsubmit = (e) => {
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
};


togglePassword.onclick = () => {
    passwordInput.type =
        passwordInput.type === "password" ? "text" : "password";
};


switchAccount.onclick = (e) => {
    e.preventDefault();
    resetAll();
};


forgotPassword.onclick = (e) => {
    e.preventDefault();
    passStep.classList.add("hidden");
    emailStep.classList.remove("hidden");
};

backToLogin.onclick = (e) => {
    e.preventDefault();
    emailStep.classList.add("hidden");
    passStep.classList.remove("hidden");
};


emailForm.onsubmit = (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    emailError.textContent = "";

    if (email === "") {
        emailError.textContent = "Please enter your email.";
        return;
    }

    if (!email.includes("@")) {
        emailError.textContent = "Invalid email format.";
        return;
    }

    alert("Verification link sent to " + email);

    emailStep.classList.add("hidden");
    passStep.classList.remove("hidden");
};

function toggleLegalModal(show){
    document.getElementById('legalModal').classList.toggle('active', show);
}

function switchTab(tab){
    const terms2 = document.getElementById('terms2');
    const privacy2 = document.getElementById('privacy2');
    const indicator2 = document.getElementById('indicator2');

    const btnTerms = document.getElementById('btn-terms');
    const btnPrivacy = document.getElementById('btn-privacy');

    if(tab === 'terms2'){
        terms2.classList.remove('hidden');
        privacy2.classList.add('hidden');

        btnTerms.classList.add('active');
        btnTerms.classList.remove('inactive');

        btnPrivacy.classList.add('inactive');
        btnPrivacy.classList.remove('active');

        indicator.style.left = '6px';
    } else {
        terms2.classList.add('hidden');
        privacy2.classList.remove('hidden');

        btnPrivacy.classList.add('active');
        btnPrivacy.classList.remove('inactive');

        btnTerms.classList.add('inactive');
        btnTerms.classList.remove('active');

        indicator.style.left = 'calc(50% + 0px)';
    }
}