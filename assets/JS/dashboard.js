//siebar controls

const bottom = document.querySelector(".sidebar-bottom");
const arrow = document.querySelector(".user-arrow");

function toggleAdminMenu() {
    if (!bottom) return;
    bottom.classList.toggle("open");
    if (arrow) {
        arrow.style.transform = bottom.classList.contains("open")
            ? "rotate(180deg)"
            : "rotate(0deg)";
    }
}

function toggleSidebar() {
    document.body.classList.toggle("sidebar-collapsed");
}

function setError(id, msg) {
    const el = document.getElementById(id);
    if (el) el.innerText = msg;
}

function clearErrors() {
    document.querySelectorAll(".error-msg")
        .forEach(e => e.innerText = "");
}

document.querySelectorAll(".group-btn").forEach(btn => {
    btn.onclick = () => {
        const el = document.getElementById(btn.dataset.group);
        const isOpen = el.style.display === "block";

        document.querySelectorAll(".group-content").forEach(c => c.style.display = "none");
        document.querySelectorAll(".group-btn").forEach(b => b.classList.remove("open"));

        if (!isOpen) {
            el.style.display = "block";
            btn.classList.add("open");
        }
    };
});


//chart system

function setActiveGroup(type) {
    document.querySelectorAll(".analytics-card").forEach(c => {
        c.classList.toggle("active-group", c.classList.contains(type));
    });
}

const charts = {};
function make(id, type, labels, data) {
    return new Chart(document.getElementById(id), {
        type,
        data: {
            labels,
            datasets: [{
                data,
                backgroundColor: "#f97316"
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
}

charts.stockMain = make("stockMain", "doughnut", ["Glassware", "Chemicals", "Apparatus", "Others"], [45, 25, 20, 10]);
charts.stockSide = make("stockSide", "bar", ["Beaker", "Flask", "Test Tube", "Microscope"], [3, 5, 2, 4]);
charts.usersMain = make("usersMain", "radar", ["Grade 11", "Grade 12", "Teachers"], [120, 180, 40]);
charts.usersSide = make("usersSide", "pie", ["Active", "Inactive"], [260, 90]);
charts.borrowMain = make("borrowMain", "line", ["Mon", "Tue", "Wed", "Thu", "Fri"], [12, 19, 8, 15, 22]);
charts.borrowSide = make("borrowSide", "bar", ["Pending", "Approved", "Returned"], [6, 14, 40]);
charts.damageMain = make("damageMain", "pie", ["Broken", "Missing", "For Repair"], [3, 1, 4]);
charts.damageSide = make("damageSide", "bar", ["Case 1", "Case 2", "Case 3"], [1, 2, 1]);

document.querySelectorAll(".kpi-card").forEach(card => {
    card.onclick = () => {
        document.querySelectorAll(".kpi-card").forEach(c => c.classList.remove("active"));
        card.classList.add("active");
        setActiveGroup(card.dataset.type);
    };
});


function logout() {
    window.location.href = "../../index.html";
}


document.addEventListener("DOMContentLoaded", () => {

    //masterlist

    const students = [
        {
            name: "mark john ando", id: "31840928", college: "CSM",
            program: "BS Chemistry", year: "3 Year",
            sy: "2023-2024", email: "andomark922@gmail.com",
            status: "Pending Auth"
        },
        {
            name: "mark john d ando", id: "1024321", college: "CSM",
            program: "BS Chemistry", year: "2 Year",
            sy: "2024-2025", email: "andomark922@gmail.com",
            status: "Pending Auth"
        }
    ];

    const programs = {
        CSM: ["BS Chemistry", "BS Biology"],
        CCS: ["BS Computer Science", "BS IT", "ACT AD", "ACT NT"]
    };


    const collegeSelect = document.getElementById("college");
    const programSelect = document.getElementById("program");
    const tableBody = document.getElementById("tableBody");
    const searchInput = document.getElementById("search");
    const perPageSelect = document.getElementById("perPage");
    const recordCount = document.getElementById("recordCount");
    const regCollege = document.getElementById("collegeS");
    const regProgram = document.getElementById("programS");

    Object.keys(programs).forEach(c => {
        collegeSelect.innerHTML += `<option value="${c}">${c}</option>`;

        regCollege.innerHTML += `<option value="${c}">${c}</option>`;
    });

    collegeSelect.addEventListener("change", () => {
        const c = collegeSelect.value;

        programSelect.innerHTML = `<option value="">All Programs</option>`;

        if (c) {
            programSelect.disabled = false;
            programs[c].forEach(p => {
                programSelect.innerHTML += `<option value="${p}">${p}</option>`;
            });
        } else {
            programSelect.disabled = true;
        }

        renderMasterlist();
    });

    regCollege.addEventListener("change", () => {
        const c = regCollege.value;

        regProgram.innerHTML = `<option value="">Select Program</option>`;

        if (c) {
            regProgram.disabled = false;
            programs[c].forEach(p => {
                regProgram.innerHTML += `<option value="${p}">${p}</option>`;
            });
        } else {
            regProgram.disabled = true;
        }
    });

    searchInput.addEventListener("input", renderMasterlist);
    programSelect.addEventListener("change", renderMasterlist);
    perPageSelect.addEventListener("change", renderMasterlist);

    function renderMasterlist() {
        const filtered = students.filter(s =>
            (s.name.toLowerCase().includes(searchInput.value.toLowerCase()) ||
                s.id.includes(searchInput.value)) &&
            (!collegeSelect.value || s.college === collegeSelect.value) &&
            (!programSelect.value || s.program === programSelect.value)
        );

        recordCount.innerText = filtered.length + " Records Found";
        tableBody.innerHTML = "";

        filtered.slice(0, parseInt(perPageSelect.value)).forEach(s => {
            tableBody.innerHTML += `
            <tr>
                <td><div style="font-weight:900">${s.name}</div><div class="id">${s.id}</div></td>
                <td><div style="font-weight:700">${s.college}</div><div style="font-size:12px;color:#64748b">${s.program}</div></td>
                <td><div style="font-weight:700">${s.year}</div><div style="font-size:12px;color:#64748b">${s.sy}</div></td>
                <td style="color:#475569">${s.email}</td>
                <td style="text-align:center"><span class="status">${s.status}</span></td>
            </tr>`;
        });
    }


    renderMasterlist();


    //register items
    const steps3 = {
        1: document.getElementById('st1'),
        2: document.getElementById('st2'),
        3: document.getElementById('st3'),
        4: document.getElementById('st4'),
    };

    const btnNon = document.getElementById('btnNon');
    const btnCon = document.getElementById('btnCon');
    const consumableFields = document.getElementById('consumableFields');
    const nonConsumableFields = document.getElementById('nonConsumableFields');
    const isScalable = document.getElementById('isScalable');
    const variantSection = document.getElementById('variantSection');
    const variants = document.getElementById('variants');
    const codesBox = document.getElementById('codesBox');
    const imgInput = document.getElementById('imgInput');
    const previewImg = document.getElementById('previewImg');

    const itemName = document.getElementById('itemName');
    const itemDesc = document.getElementById('itemDesc');
    const qty = document.getElementById('qty');
    const price = document.getElementById('price');
    const location = document.getElementById('location');

    const pName = document.getElementById('pName');
    const pDesc = document.getElementById('pDesc');
    const pQty = document.getElementById('pQty');
    const pPrice = document.getElementById('pPrice');
    const pLoc = document.getElementById('pLoc');

    let registerItemStep = 1;
    let itemType = null;


    function showRegisterStep(n) {

        document.querySelectorAll('#registerItemPage .step3')
            .forEach(s => s.classList.remove('active'));

        for (let i = 1; i <= 4; i++) {
            document.getElementById('s' + i).classList.remove('active');
        }

        document.getElementById('st' + n).classList.add('active');
        document.getElementById('s' + n).classList.add('active');

        registerItemStep = n;
    }

    window.nextStep = function () {
        if (registerItemStep < 4) {
            showRegisterStep(registerItemStep + 1);
        }
    };

    window.prevStep = function () {
        if (registerItemStep > 1) {
            showRegisterStep(registerItemStep - 1);
        }
    };

    function toggleType() {
        btnNon.classList.remove('active');
        btnCon.classList.remove('active');

        if (itemType === 'non') {
            btnNon.classList.add('active');
            nonConsumableFields.classList.remove('hidden');
            consumableFields.classList.add('hidden');
        } else {
            btnCon.classList.add('active');
            consumableFields.classList.remove('hidden');
            nonConsumableFields.classList.add('hidden');
        }
    }

    btnNon.onclick = () => { itemType = 'non'; toggleType(); };
    btnCon.onclick = () => { itemType = 'con'; toggleType(); };


    isScalable.onchange = () => {
        variantSection.classList.toggle('hidden', !isScalable.checked);
    };

    window.addVariant = function () {
        const div = document.createElement('div');
        div.className = 'variant-row';
        div.innerHTML = `
        <input placeholder="Size">
        <input placeholder="Unit">
        <input placeholder="Qty">
        <input placeholder="Price">
    `;
        variants.appendChild(div);
    };


    window.generateCodes = function () {
        codesBox.innerHTML = '';
        for (let i = 0; i < 10; i++) {
            const c = 'CODE-' + Math.random().toString(36).substring(2, 8).toUpperCase();
            codesBox.innerHTML += `<div>${c}</div>`;
        }
    };


    imgInput.onchange = e => {
        const reader = new FileReader();
        reader.onload = () => {
            previewImg.style.backgroundImage = `url(${reader.result})`;
        };
        reader.readAsDataURL(e.target.files[0]);
    };


    function livePreview() {
        pName.innerText = itemName.value || 'Item Name';
        pDesc.innerText = itemDesc.value || 'Description';
        pQty.innerText = qty.value || '0';
        pPrice.innerText = price.value || '0';
        pLoc.innerText = location.value || 'N/A';
    }

    document.querySelectorAll('#registerItemPage input, #registerItemPage textarea')
        .forEach(el => el.addEventListener('input', livePreview));

    showRegisterStep(1);

    //page switching
    const pages = {
        analytics: document.getElementById("analyticsPage"),
        masterlist: document.getElementById("masterListPage"),
        enrollment: document.getElementById("enrollmentPage"),
        inventory: document.getElementById("inventoryPage"),
        stockRoom: document.getElementById("stockRoomPage"),
        postLab: document.getElementById("postLabPage"),
        SBooking: document.getElementById("superBookingPage"),
        handOver: document.getElementById("handoverPage"),
        settleReview: document.getElementById("settlementReviewPage"),
        classRegistry: document.getElementById("classRegistryPage"),
        userMnmt: document.getElementById("userMnmtPage"),
        clearHub: document.getElementById("clearanceHubPage"),
        liability: document.getElementById("liabilityPage"),
        histTransaction: document.getElementById("historyTransactionPage"),
        booking: document.getElementById("bookingPage"),
        registerItem: document.getElementById("registerItemPage"),
        viewActivity: document.getElementById("viewActivityPage")
    };

    const navItems = document.querySelectorAll("[data-page]");

    window.showPage = function(page) {
        Object.values(pages).forEach(p => p.classList.add("hidden"));
        pages[page].classList.remove("hidden");

        navItems.forEach(i => i.classList.remove("active"));
        document.querySelector(`[data-page="${page}"]`)?.classList.add("active");


        if (page === "classRegistry") {
            renderClasses();
        } else if (page === "handOver") {
            renderTerminal();
        }

        const topbarTitle = document.getElementById('topbarTitle');

        const nav = document.querySelector(`[data-page="${page}"]`);
        if (page === "analytics") {
            topbarTitle.textContent = "Admin Dashboard";
        } else if (nav) {
            const clone = nav.cloneNode(true);
            clone.querySelectorAll('.badge').forEach(b => b.remove());
            topbarTitle.textContent = clone.textContent.trim();
        }
    }
    navItems.forEach(item => {
        item.onclick = () => showPage(item.dataset.page);
    });

    window.RegisterStudent = () => showPage("enrollment");
    window.BackToMasterList = () => showPage("masterlist");

    showPage("analytics");



    //enrollment registry
    let currentStep = 1;

    const steps = {
        1: document.getElementById("step1"),
        2: document.getElementById("step2"),
        3: document.getElementById("step3"),
    };

    const nextBtn = document.getElementById("next");
    const prevBtn = document.getElementById("prev");
    const submitBtn = document.getElementById("submit");

    function updateStepper(n) {
        document.getElementById("stepper1").classList.remove("active");
        document.getElementById("stepper2").classList.remove("active");
        document.getElementById("stepper3").classList.remove("active");

        document.getElementById("stepper" + n).classList.add("active");
    }

    function showStep(n) {
        Object.values(steps).forEach(s => s.classList.add("hidden"));
        steps[n].classList.remove("hidden");

        prevBtn.classList.toggle("hidden", n === 1);
        nextBtn.classList.toggle("hidden", n === 3);
        submitBtn.classList.toggle("hidden", n !== 3);

        currentStep = n;

        updateStepper(n);

        if (n === 3) fillReview();
    }

    function resetEnrollmentForm() {

        document.getElementById("first").value = "";
        document.getElementById("middle").value = "";
        document.getElementById("last").value = "";
        document.getElementById("idnum").value = "";
        document.getElementById("email").value = "";

        document.getElementById("collegeS").value = "";
        document.getElementById("programS").innerHTML = `<option value="">Select Program</option>`;
        document.getElementById("programS").disabled = true;
        document.getElementById("yearLevel").value = "";
        document.getElementById("schoolYear").value = "";

        clearErrors();
    }

    function fillReview() {
        const reviewBox = document.getElementById("reviewBox");

        reviewBox.innerHTML = `
        <b>Name:</b> ${value("first")} ${value("middle")} ${value("last")}<br>
        <b>ID:</b> ${value("idnum")}<br>
        <b>Email:</b> ${value("email")}<br>
        <b>College:</b> ${value("collegeS")}<br>
        <b>Program:</b> ${value("programS")}<br>
        <b>Year:</b> ${value("yearLevel")}<br>
        <b>School Year:</b> ${value("schoolYear")}`;
    }


    function validateStep1() {

        clearErrors();

        var first = document.getElementById("first").value.trim();
        var middle = document.getElementById("middle").value.trim();
        var last = document.getElementById("last").value.trim();
        var idnum = document.getElementById("idnum").value.trim();
        var email = document.getElementById("email").value.trim();

        var ok = true;

        if (first === "") {
            setError("errFirst", "First name is required");
            ok = false;
        }

        if (last === "") {
            setError("errLast", "Last name is required");
            ok = false;
        }

        if (idnum === "") {
            setError("errId", "ID is required");
            ok = false;
        }

        if (email === "") {
            setError("errEmail", "Email is required");
            ok = false;
        } else if (!email.includes("@")) {
            setError("errEmail", "Enter valid Email");
            ok = false;
        }

        return ok;
    }

    function validateStep2() {

        clearErrors();

        var collegeV = document.getElementById("collegeS").value.trim();
        var programV = document.getElementById("programS").value.trim();
        var year = document.getElementById("yearLevel").value.trim();
        var sy = document.getElementById("schoolYear").value.trim();

        var valid = true;

        if (collegeV === "") {
            setError("errCollege", "College is required");
            valid = false;
        }

        if (programV === "") {
            setError("errProgram", "Program is required");
            valid = false;
        }

        if (year === "") {
            setError("errYear", "Year level is required");
            valid = false;
        }

        if (sy === "") {
            setError("errSY", "School year is required");
            valid = false;
        }

        return valid;
    }

    nextBtn.onclick = () => {

        if (currentStep === 1) {
            if (!validateStep1()) return;
        }

        if (currentStep === 2) {
            if (!validateStep2()) return;
        }

        showStep(currentStep + 1);
    };
    prevBtn.onclick = () => showStep(currentStep - 1);
    submitBtn.onclick = () => {
        alert("Student Enrolled Successfully!");
        resetEnrollmentForm();
        showStep(1);
    };

    showStep(1);

    //stockroom layout

    const SHELVES = [
        { name: "Shelf A", x: 552, y: 447, w: 287, h: 49 },
        { name: "Shelf B-1", x: 231, y: 411, w: 311, h: 85 },
        { name: "Shelf E", x: 848, y: 16, w: 98, h: 356 },
        { name: "Center Shelf - D", x: 507, y: 261, w: 254, h: 56 },
        { name: "Center Shelf - B", x: 201, y: 262, w: 276, h: 54 },
        { name: "Center Shelf - A", x: 198, y: 146, w: 276, h: 54 },
        { name: "Shelf D - 2", x: 459, y: 15, w: 304, h: 64 },
        { name: "Shelf D - 1", x: 127, y: 15, w: 322, h: 64 },
        { name: "Shelf C", x: 12, y: 45, w: 93, h: 315 },
        { name: "Shelf B-2", x: 12, y: 411, w: 213, h: 85 },
        { name: "Center Shelf - C", x: 511, y: 145, w: 254, h: 56 }
    ];

    const ITEMS = [
        { name: "Absorbent Sheets", shelf: "Shelf C", category: "Glassware" },
        { name: "Acetone", shelf: "Shelf D - 2", category: "Chemicals" },
        { name: "Agar Powder", shelf: "Shelf A", category: "Chemicals" },
        { name: "Analytical Balance", shelf: "Shelf B-1", category: "Equipment" },
        { name: "Beaker 500ml", shelf: "Center Shelf - A", category: "Glassware" },
        { name: "Bunsen Burner", shelf: "Center Shelf - B", category: "Equipment" },
        { name: "Clamp Stand", shelf: "Center Shelf - D", category: "Equipment" },
        { name: "Flask 250ml", shelf: "Shelf E", category: "Glassware" },
        { name: "Funnel", shelf: "Shelf D - 1", category: "Glassware" },
        { name: "Glass Rod", shelf: "Shelf B-2", category: "Glassware" }
    ];


    let activeShelf = null;
    let activeCategory = "All";

    const list = document.getElementById("itemList");
    const search = document.getElementById("searchApparatus");
    const sideTitle = document.getElementById("sideTitle");
    const categoryFilter = document.getElementById("categoryFilter");
    const group = document.getElementById("shelves");


    function getFilteredItems() {
        const s = search.value.toLowerCase();

        return ITEMS.filter(i => {
            return (
                i.name.toLowerCase().includes(s) &&
                (activeShelf ? i.shelf === activeShelf : true) &&
                (activeCategory === "All" ? true : i.category === activeCategory)
            );
        });
    }


    function renderStockItems() {
        const arr = getFilteredItems();

        list.innerHTML = "";

        arr.forEach(i => {
            const div = document.createElement("div");
            div.className = "item";
            div.innerHTML = `<strong>${i.name}</strong><br><small>${i.shelf} • ${i.category}</small>`;
            div.onclick = () => showShelfItems(i.shelf);
            list.appendChild(div);
        });
    }


    SHELVES.forEach(s => {
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", s.x);
        rect.setAttribute("y", s.y);
        rect.setAttribute("width", s.w);
        rect.setAttribute("height", s.h);
        rect.setAttribute("class", "shelf");
        rect.dataset.name = s.name;

        rect.onclick = () => showShelfItems(s.name);

        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", s.x + 10);
        text.setAttribute("y", s.y + 20);
        text.setAttribute("class", "shelf-label");
        text.textContent = s.name;

        group.appendChild(rect);
        group.appendChild(text);
    });


    function showShelfItems(name) {

        if (activeShelf === name) {
            activeShelf = null;
        } else {
            activeShelf = name;
        }

        document.querySelectorAll(".shelf").forEach(s => {
            s.classList.toggle("active", s.dataset.name === activeShelf);
        });

        sideTitle.textContent = activeShelf ? activeShelf.toUpperCase() : "ALL ITEMS";

        renderStockItems();
    }


    search.addEventListener("input", renderStockItems);

    categoryFilter.addEventListener("change", (e) => {
        activeCategory = e.target.value;
        renderStockItems();
    });


    renderStockItems();
});

//class registry

let classes = [
    {
        sem: "1st Sem",
        title: "Chemistry 1",
        section: "STEM-A",
        students: [],
        logs: []
    },
    {
        sem: "2nd Sem",
        title: "Physics",
        section: "BSCE-B",
        students: [],
        logs: []
    }
];

let deleteIndex = null;
let activeClass = null;

function renderClasses() {
    const g = document.getElementById("grid");
    g.innerHTML = `<div class="create-card" onclick="openClass()">+ Create Class</div>`;

    classes.forEach((c, i) => {
        g.innerHTML += `
<div class="card1">
<div class="tag">${c.sem}</div>
<div class="title-card">${c.title}</div>
<div class="sub">${c.section}</div>

<button class="card-btn add" onclick="openStudent(${i})">Add Students</button>
<button class="card-btn view" onclick="viewActivities(${i})">View Activities</button>
<button class="card-btn delete" onclick="askDelete(${i})">Delete</button>
</div>`;
    });
}

function filter() {
    let q = document.getElementById("classSearch").value.toLowerCase();
    document.querySelectorAll(".card1").forEach(c => {
        c.style.display = c.innerText.toLowerCase().includes(q) ? "block" : "none";
    });
}

function openClass() { document.getElementById("classModal").classList.add("show") }
function closeClass() { document.getElementById("classModal").classList.remove("show") }

function loadPrograms() {
    let college = document.querySelector("#classModal #college").value;
    let program = document.querySelector("#classModal #program");

    let data = {
        CSM: ["BS Chemistry", "BS Biology"],
        CCS: ["BS Computer Science", "BS IT", "ACT AD", "ACT NT"]
    };

    program.innerHTML = `<option disabled selected>Select Program</option>`;
    if (data[college]) {
        data[college].forEach(p => {
            program.innerHTML += `<option>${p}</option>`;
        });
    }
}

function addClass(e) {
    e.preventDefault();
    classes.push({
        sem: document.getElementById("semester").value,
        title: document.getElementById("subject").value,
        section: document.getElementById("section").value
    });
    closeClass();
    renderClasses();
}

function openUser() { document.getElementById("userModal").classList.add("show") }
function closeUser() { document.getElementById("userModal").classList.remove("show") }

function askDelete(i) {
    deleteIndex = i;
    document.getElementById("deleteModal").classList.add("show");
}
function closeDelete() {
    document.getElementById("deleteModal").classList.remove("show");
}
function confirmDelete() {
    classes.splice(deleteIndex, 1);
    closeDelete();
    renderClasses();
}

function openStudent(i) {
    activeClass = i;
    document.getElementById("classTitle").innerText = classes[i].title;
    document.getElementById("studentModal").classList.add("show");
}
function closeStudent() {
    document.getElementById("studentModal").classList.remove("show");
}
function enroll(e) {
    e.preventDefault();

    clearErrors();

    const id = document.getElementById("studId").value.trim();
    const first = document.getElementById("studFirst").value.trim();
    const middle = document.getElementById("studMiddle").value.trim();
    const last = document.getElementById("studLast").value.trim();

    let ok = true;

    if (id === "") {
        setError("errStudId", "Student ID is required");
        ok = false;
    }

    if (first === "") {
        setError("errStudFirst", "First name is required");
        ok = false;
    }

    if (last === "") {
        setError("errStudLast", "Last name is required");
        ok = false;
    }

    if (!ok) return;

    document.getElementById("studId").value = "";
    document.getElementById("studFirst").value = "";
    document.getElementById("studMiddle").value = "";
    document.getElementById("studLast").value = "";

    classes[activeClass].students.push({
        id,
        name: `${first} ${last}`
    });

    classes[activeClass].logs.unshift({
        action: "Student Enrolled",
        time: new Date().toLocaleString(),
        desc: `${first} ${last} (${id}) enrolled to class.`
    });

    closeStudent();
}

//class activity

function viewActivities(i) {

    activeClass = i;

    showPage("viewActivity"); 

    const c = classes[i];

    document.getElementById("activityTitle").innerText =
        `${c.title} — ${c.section}`;

    renderActivityLogs();
}

function renderActivityLogs() {

    const box = document.getElementById("activityLogs");
    const logs = classes[activeClass].logs;

    if (!logs.length) {
        box.innerHTML = "No activity yet.";
        return;
    }

    box.innerHTML = logs.map(l => `
        <div class="log">
            <b>${l.action}</b><br>
            <small>${l.time}</small>
            <div>${l.desc}</div>
        </div>
    `).join("");
}

function openClearance() {
    showPage("clearHub");
    renderClearance();
}

function renderClearance() {

    const box = document.getElementById("clearanceContent");
    const c = classes[activeClass];

    if (!c.students.length) {
        box.innerHTML = "No students enrolled.";
        return;
    }

    box.innerHTML = c.students.map(s => `
        <div class="log">
            ${s.name} (${s.id})
            <button onclick="clearStudent('${s.id}')">Mark Cleared</button>
        </div>
    `).join("");
}

function clearStudent(id) {

    classes[activeClass].logs.unshift({
        action: "Clearance Approved",
        time: new Date().toLocaleString(),
        desc: `Student ${id} cleared in Clearance Hub.`
    });

    alert("Student Cleared!");
}


function openPostLab() {
    showPage("postLab");
    postLabLog();
}

function postLabLog() {

    classes[activeClass].logs.unshift({
        action: "Post Lab Activity",
        time: new Date().toLocaleString(),
        desc: "A new post lab activity was created."
    });

}


//user management

let users = [

    {
        id: "1",
        name: "Admin User",
        email: "admin@school.edu",
        role: "Admin",
        verified: true,

        logs: [
            {
                action: "System Access",
                role: "Admin",
                timestamp: "May 7, 2026 10:42 AM",
                description: "Logged into the administrator dashboard."
            }
        ]
    },

    {
        id: "1002",
        name: "Jaydee Ballaho",
        email: "ae202403655@wmsu.edu.ph",
        role: "Teacher",
        verified: true,
        logs: []
    },

    {
        id: "2020",
        name: "Neithan B. Gula",
        email: "andomark922@gmail.com",
        role: "Teacher",
        verified: false,
        logs: []
    }

];


function renderUsers() {

    const table = document.getElementById("userTable");

    table.innerHTML = "";

    users.forEach(user => {

        table.innerHTML += `

        <tr onclick="openLogs('${user.id}')">

            <td>
                <div class="user-names">${user.name}</div>

                <div class="user-id">${user.id}</div>
            </td>

            <td>
                <div class="user-email">${user.email}</div>
            </td>

            <td style="text-align:center">

                <span class="badge2 ${user.verified ? 'blue' : 'gray'}">
                    ${user.verified ? 'Verified' : 'Pending Auth'}
                </span>

            </td>

            <td onclick="event.stopPropagation()">

                <div class="role-wrap">

                    <select class="role-select" id="role-${user.id}">
                        <option ${user.role === "Teacher" ? "selected" : ""}>Teacher</option>
                        <option ${user.role === "LabTech" ? "selected" : ""}>LabTech</option>
                        <option ${user.role === "Admin" ? "selected" : ""}>Admin</option>
                    </select>

                    <button class="update-btn"
                        onclick="updateRole('${user.id}')">
                        Update
                    </button>

                </div>

            </td>

        </tr>

        `;
    });

}


function openAddModal() {

    document.getElementById("overlay").classList.add("show");
    document.getElementById("addModal").classList.add("show");

}

function openLogs(id) {

    const user = users.find(u => u.id === id);

    document.getElementById("overlay").classList.add("show");
    document.getElementById("logModal").classList.add("show");

    document.getElementById("logUserName").innerText =
        user.name + " - System Logs";

    document.getElementById("logUserID").innerText =
        user.id;

    const container = document.getElementById("logsContainer");

    if (!user.logs.length) {

        container.innerHTML = `
            <div class="empty">
                No logs found for this school year.
            </div>
        `;

        return;
    }

    container.innerHTML = user.logs.map(log => `

        <div class="log">

            <div class="log-icon">📄</div>

            <div class="log-content">

                <div class="log-top">

                    <div class="log-title">

                        <h4>${log.action}</h4>

                        <span class="log-role">
                            ${log.role}
                        </span>

                    </div>

                    <span class="log-time">
                        ${log.timestamp}
                    </span>

                </div>

                <div class="log-desc">
                    ${log.description}
                </div>

            </div>

        </div>

    `).join("");

}

function closeAllModals() {

    document.getElementById("overlay").classList.remove("show");

    document.querySelectorAll(".modal")
        .forEach(m => m.classList.remove("show"));

}


function updateRole(id) {

    const user = users.find(u => u.id === id);

    const newRole =
        document.getElementById(`role-${id}`).value;

    user.role = newRole;

    user.logs.unshift({

        action: "Role Updated",

        role: newRole,

        timestamp: new Date().toLocaleString(),

        description: `Role changed to ${newRole}.`

    });

    renderUsers();

}


function addUser(e) {
    e.preventDefault();

    clearErrors();

    const id = document.getElementById("userId").value.trim();
    const first = document.getElementById("first").value.trim();
    const middle = document.getElementById("middle").value.trim(); // optional
    const last = document.getElementById("last").value.trim();
    const email = document.getElementById("email").value.trim();
    const role = document.getElementById("role").value;

    let ok = true;

    if (id === "") {
        setError("errId", "ID is required");
        ok = false;
    }

    if (first === "") {
        setError("errFirst", "First name is required");
        ok = false;
    }

    if (last === "") {
        setError("errLast", "Last name is required");
        ok = false;
    }

    if (email === "") {
        setError("errEmail", "Email is required");
        ok = false;
    } else if (!email.includes("@")) {
        setError("errEmail", "Enter valid Email");
        ok = false;
    }

    if (!ok) return;

    users.unshift({
        id,
        name: `${first} ${middle} ${last}`,
        email,
        role,
        verified: true,
        logs: [{
            action: "Account Created",
            role,
            timestamp: new Date().toLocaleString(),
            description: "User account was created."
        }]
    });

    renderUsers();
    closeAllModals();
}

function value(id) {
    return document.getElementById(id).value.trim();
}


renderUsers();




const tbody = document.getElementById("cases");
const rows = () => document.querySelectorAll("#cases tr");

let selected = null;
let editMode = false;

const modal = document.getElementById("formModal");
const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");
const addBtn = document.getElementById("addBtn");
const deleteBtn = document.getElementById("deleteBtn");

const inputUser = document.getElementById("inputUser");
const inputItem = document.getElementById("inputItem");
const inputDamage = document.getElementById("inputDamage");

function bindRows() {
    rows().forEach(row => {
        row.onclick = () => {
            selected = row;

            document.getElementById("user").textContent = row.cells[0].textContent;
            document.getElementById("item").textContent = row.cells[1].textContent;
            document.getElementById("damage").textContent = row.cells[2].textContent;
        };

        row.ondblclick = () => {
            selected = row;
            editMode = true;

            inputUser.value = row.cells[0].textContent;
            inputItem.value = row.cells[1].textContent;
            inputDamage.value = row.cells[2].textContent;

            modal.classList.remove("hidden");
        };
    });
}

addBtn.onclick = () => {
    editMode = false;

    inputUser.value = "";
    inputItem.value = "";
    inputDamage.value = "";

    modal.classList.remove("hidden");
};

saveBtn.onclick = () => {
    const user = inputUser.value;
    const item = inputItem.value;
    const damage = inputDamage.value;

    if (editMode && selected) {
        selected.cells[0].textContent = user;
        selected.cells[1].textContent = item;
        selected.cells[2].textContent = damage;
    } else {
        const row = document.createElement("tr");
        row.dataset.status = "unresolved";

        row.innerHTML = `
            <td>${user}</td>
            <td>${item}</td>
            <td>${damage}</td>
            <td><span class="badge unresolved">Pending</span></td>
        `;

        tbody.appendChild(row);
    }

    modal.classList.add("hidden");
    bindRows();
    updateCounts();
};

deleteBtn.onclick = () => {
    if (!selected) {
        alert("Select a case first");
        return;
    }

    selected.remove();
    selected = null;

    updateCounts();
};

cancelBtn.onclick = () => {
    modal.classList.add("hidden");
};

document.getElementById("approveBtn").onclick = () => changeStatus("approved");
document.getElementById("rejectBtn").onclick = () => changeStatus("rejected");

function changeStatus(status) {
    if (!selected) {
        alert("Select a case first");
        return;
    }

    const badge = selected.querySelector(".badge");

    badge.className = "badge " + status;
    badge.textContent = status;

    selected.dataset.status = status;

    document.getElementById("statusText").textContent = "Updated to " + status;

    updateCounts();
}

document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.dataset.filter;

        rows().forEach(row => {
            row.style.display =
                filter === "all" || row.dataset.status === filter
                    ? ""
                    : "none";
        });
    };
});

function updateCounts() {
    let p = 0, a = 0, r = 0;

    rows().forEach(row => {
        if (row.dataset.status === "unresolved") p++;
        if (row.dataset.status === "approved") a++;
        if (row.dataset.status === "rejected") r++;
    });

    document.getElementById("pending").textContent = p;
    document.getElementById("approved").textContent = a;
    document.getElementById("rejected").textContent = r;
}

bindRows();
updateCounts();



//inventory hub

let items = [
    { id: 1, Iname: "Beaker", Icategory: "Glassware", Iavailable: 15, Itotal: 20, unit: "pcs", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Beaker_100ml.jpg/200px-Beaker_100ml.jpg" }
];

const container = document.getElementById("itemContainer");
const dropTitle = document.getElementById("dzTitle");
const dropDesc = document.getElementById("dzDesc");

function renderInventory(list) {
    container.innerHTML = "";

    list.forEach(item => {
        const card = document.createElement("div");
        card.className = "item-card2";
        card.draggable = true;

        card.innerHTML = `
            <img src="${item.img}" width="80"><br>
            <b>${item.Iname}</b><br>
            ${item.Icategory}<br>
            ${item.Iavailable}/${item.Itotal}
        `;

        card.onclick = () => showDetails(item);

        card.ondragstart = e => {
            e.dataTransfer.setData("id", item.id);
        };

        container.appendChild(card);
    });
}

function addItem() {
    const name = document.getElementById("Iname").value;
    const category = document.getElementById("Icategory").value;
    const available = document.getElementById("Iavailable").value;
    const total = document.getElementById("Itotal").value;
    const image = document.getElementById("Iimage").value;

    if (!name || !category) return alert("Fill required fields");

    const newItem = {
        id: Date.now(),
        name,
        category,
        available: Number(available),
        total: Number(total),
        unit: "pcs",
        img: image || "https://via.placeholder.com/100"
    };

    items.push(newItem);
    renderInventory(items);

    document.getElementById("Iname").value = "";
    document.getElementById("Icategory").value = "";
    document.getElementById("Iavailable").value = "";
    document.getElementById("Itotal").value = "";
    document.getElementById("Iimage").value = "";
}

function showDetails(item) {
    dropTitle.textContent = item.Iname;
    dropDesc.textContent = `${item.Icategory} • ${item.Iavailable}/${item.Itotal}`;
}

const dropZone = document.getElementById("dropZone");

dropZone.ondragover = e => e.preventDefault();

dropZone.ondrop = e => {
    const id = e.dataTransfer.getData("id");
    const item = items.find(i => i.id == id);
    if (item) showDetails(item);
};

document.getElementById("searchInput").addEventListener("input", e => {
    const val = e.target.value.toLowerCase();

    const filtered = items.filter(i =>
        i.Iname.toLowerCase().includes(val) ||
        i.Icategory.toLowerCase().includes(val)
    );

    renderInventory(filtered);
});

renderInventory(items);


//transaction history
function showReceipt(row) {
    document.getElementById("hist-empty").style.display = "none";
    document.getElementById("receipt").style.display = "block";

    document.getElementById("r-name").innerText = row.dataset.name;
    document.getElementById("r-slip").innerText = row.dataset.slip;

    const items = row.dataset.items.split(",");
    document.getElementById("r-items").innerHTML =
        "<b>Items:</b>" +
        items.map(i => `<div class='item'>${i}</div>`).join("");
}

function setTab(el, type) {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    el.classList.add("active");
}

function filterTable() {
    const val = document.getElementById("searchInput").value.toLowerCase();
    const rows = document.querySelectorAll("#slipTable tbody tr");

    rows.forEach(r => {
        const name = r.dataset.name.toLowerCase();
        const slip = r.dataset.slip.toLowerCase();

        r.style.display =
            name.includes(val) || slip.includes(val)
                ? ""
                : "none";
    });
}


//handover terminal
const data = [];
for (let i = 1; i <= 4; i++) {
    data.push({
        student: "Student " + i,
        class: "General",
        title: "Independent Research",
        status: ["Pending", "Approved", "Issued", "Returned"][i % 4],
        date: new Date(2026, 0, i),
        items: ["Beaker", "Acetone"]
    });
}

const perPage = 8;
let currentPage = 1;
let currentStatus = "All";

const terminalRows = document.getElementById("rows");
const pageInfo = document.getElementById("pageInfo");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const searchBox = document.getElementById("searchBox");
const sortSelect = document.getElementById("sortSelect");
const emptyHand = document.getElementById("hand-empty");
const receiptHand = document.getElementById("hand-receipt");

function processedData() {
    let f = data.filter(d => {
        const matchStatus = currentStatus === "All" || d.status === currentStatus;
        const matchSearch = d.student.toLowerCase().includes(searchBox.value.toLowerCase()) ||
            d.title.toLowerCase().includes(searchBox.value.toLowerCase());
        return matchStatus && matchSearch;
    });

    f.sort((a, b) => {
        return sortSelect.value === "desc" ? b.date - a.date : a.date - b.date;
    });
    return f;
}

function renderTerminal() {
    const f = processedData();
    const totalPages = Math.ceil(f.length / perPage) || 1;
    currentPage = Math.max(1, Math.min(currentPage, totalPages));

    terminalRows.innerHTML = "";
    const start = (currentPage - 1) * perPage;
    f.slice(start, start + perPage).forEach(d => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
<td><b>${d.student}</b><br><span class="small2">${d.class}</span></td>
<td><b>${d.title}</b><br><span class="small2">"No reason provided."</span></td>
<td>${d.items.length} item(s)</td>
<td style="text-align:center">
  <span class="status4">${d.status}</span>
</td>`;
        tr.onclick = () => showReceiptTerminal(d);
        terminalRows.appendChild(tr);
    });

    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
}

function showReceiptTerminal(d) {
    emptyHand.style.display = "none";
    receiptHand.style.display = "block";
    receiptHand.innerHTML = `
<h3>${d.student}</h3>
<div class="small2">${d.class}</div><br>
<b>Activity:</b> ${d.title}<br><br>
<b>Items Requested:</b>
${d.items.map(i => `<div class="item2">${i}</div>`).join("")}
<br><b>Status:</b> ${d.status}
`;
}

prevBtn.onclick = () => { currentPage--; renderTerminal(); }
nextBtn.onclick = () => { currentPage++; renderTerminal(); }
searchBox.oninput = () => { currentPage = 1; renderTerminal(); }
sortSelect.onchange = () => { currentPage = 1; renderTerminal(); }

const tabNames = ["All", "Pending", "Approved", "Issued", "Returned"];
const tabs = document.getElementById("tabs2");

tabNames.forEach(name => {
    const t = document.createElement("div");
    t.className = "tab2" + (name === "All" ? " active" : "");
    t.textContent = name;
    t.onclick = () => {
        document.querySelectorAll(".tab2").forEach(x => x.classList.remove("active"));
        t.classList.add("active");
        currentStatus = name;
        currentPage = 1;
        renderTerminal();
    };
    tabs.appendChild(t);
});

renderTerminal();



//view activities
const activities = [
    {
        id: 101,
        title: "Titration Experiment",
        type: "Group Activity",
        desc: "Perform acid-base titration to determine concentration.",
        deadline: "May 14, 2026"
    },
    {
        id: 102,
        title: "Cell Mitosis Observation",
        type: "Individual Activity",
        desc: "Observe onion root tip under microscope.",
        deadline: "May 18, 2026"
    },
    {
        id: 103,
        title: "Newtonian Physics Problem Set",
        type: "Individual Activity",
        desc: "Solve kinematics and dynamics problems.",
        deadline: "May 21, 2026"
    },
    {
        id: 104,
        title: "Organic Synthesis",
        type: "Group Activity",
        desc: "Synthesize aspirin and compute yield.",
        deadline: "May 25, 2026"
    }
];

// render table
const table = document.getElementById("activityTable");

activities.forEach(a => {
    const row = `
        <tr>
            <td><b>${a.title}</b><br><small>${a.type}</small></td>
            <td>${a.desc}</td>
            <td>${a.deadline}</td>
            <td>
                <button class="action-btn view" onclick="viewActivity(${a.id})">View Hub</button>
                <button class="action-btn edit">Edit</button>
            </td>
        </tr>
    `;
    table.innerHTML += row;
});

function renderActivityTable() {
    const table = document.getElementById("activityTable");

    table.innerHTML = "";

    activities.forEach(a => {
        table.innerHTML += `
            <tr>
                <td><b>${a.title}</b><br><small>${a.type}</small></td>
                <td>${a.desc}</td>
                <td>${a.deadline}</td>
                <td>
                    <button class="action-btn view" onclick="viewActivity(${a.id})">View Hub</button>
                    <button class="action-btn edit">Edit</button>
                </td>
            </tr>
        `;
    });
}


function viewActivityHub(i) {
    activeClass = i;

    const c = classes[i];

    showPage("viewActivity");

    const title = document.querySelector("#viewActivityPage h1 span");
    const header = document.querySelector("#viewActivityPage h1");

    if (header) {
        header.innerHTML = `${c.title} <span>Activities</span>`;
    }

    renderActivityTable();
}
function backToList() {
    document.getElementById("detailView").classList.add("hidden");
    document.getElementById("listView").classList.remove("hidden");
}
