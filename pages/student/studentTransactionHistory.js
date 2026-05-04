// ELEMENTS
const el = {
    table: document.getElementById("table"),
    search: document.getElementById("search"),
    tabs: document.getElementById("tabs"),
    empty: document.getElementById("empty"),
    receipt: document.getElementById("receipt"),
    title: document.getElementById("r-title"),
    date: document.getElementById("r-date"),
    status: document.getElementById("r-status"),
    remarks: document.getElementById("r-remarks"),
    items: document.getElementById("r-items")
};

// DATA
const slips = [
    {
        title: "Independent Research",
        date: "Apr 19, 2026",
        status: "Approved",
        remarks: "For chemical testing",
        items: [{ name: "Beaker", qty: 1 }, { name: "Thermometer", qty: 3 }]
    },
    {
        title: "DNA Experiment",
        date: "Apr 06, 2026",
        status: "Issued",
        remarks: "Genetic sequencing",
        items: [{ name: "DNA Sequencer", qty: 1 }]
    },
    {
        title: "Physics Lab",
        date: "Apr 10, 2026",
        status: "Returned",
        remarks: "Completed activity",
        items: [{ name: "Caliper", qty: 2 }]
    },
    {
        title: "Chemistry Lab",
        date: "Apr 15, 2026",
        status: "Pending",
        remarks: "Awaiting approval",
        items: [{ name: "Test Tubes", qty: 5 }]
    }
];

const statuses = ["All","Pending","Approved","Issued","Returned"];
let active = "All";

// CREATE TABS
statuses.forEach(s => {
    const btn = document.createElement("div");
    btn.className = "tab";
    btn.textContent = s;

    btn.onclick = () => {
        active = s;
        document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
        btn.classList.add("active");
        render();
    };

    if (s === "All") btn.classList.add("active");
    el.tabs.appendChild(btn);
});

// RENDER TABLE
function render(){
    const term = el.search.value.toLowerCase();

    const list = slips.filter(s =>
        (s.title.toLowerCase().includes(term) || s.remarks.toLowerCase().includes(term)) &&
        (active === "All" || s.status === active)
    );

    el.table.innerHTML = list.map(s => `
        <tr>
            <td>${s.title}</td>
            <td>${s.date}</td>
            <td style="text-align:center;">
                <span class="status ${s.status}">${s.status}</span>
            </td>
        </tr>
    `).join("");

    [...el.table.querySelectorAll("tr")].forEach((row,i)=>{
        row.onclick = () => show(list[i]);
    });
}

// SHOW DETAILS
function show(s){
    el.empty.style.display = "none";
    el.receipt.style.display = "block";

    el.title.textContent = s.title;
    el.date.textContent = "Date: " + s.date;
    el.status.textContent = "Status: " + s.status;
    el.remarks.textContent = "Remarks: " + s.remarks;

    el.items.innerHTML = s.items.map(i =>
        `<div class="item">${i.name} - Qty: ${i.qty}</div>`
    ).join("");
}

// EVENTS
el.search.oninput = render;

// INIT
render();