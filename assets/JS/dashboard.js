function toggleSidebar() {
    document.body.classList.toggle("sidebar-collapsed");
}

document.querySelectorAll(".group-btn").forEach(btn => {
    btn.onclick = () => {
        const id = btn.dataset.group;
        const el = document.getElementById(id);
        const isOpen = el.style.display === "block";

        document.querySelectorAll(".group-content").forEach(c => c.style.display = "none");
        document.querySelectorAll(".group-btn").forEach(b => b.classList.remove("open"));

        if (!isOpen) {
            el.style.display = "block";
            btn.classList.add("open");
        }
    };
});

function setActiveGroup(type) {
    document.querySelectorAll(".card").forEach(c => {
        c.classList.remove("active-group");
        if (c.classList.contains(type)) {
            c.classList.add("active-group");
        }
    });
}

const charts = {};

function make(id, type, labels, data) {
    return new Chart(document.getElementById(id), {
        type,
        data: { labels, datasets: [{ data, backgroundColor: "#f97316" }] },
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

setActiveGroup("stock");