// ELEMENTS (grouped cleaner)
const el = {
    table: document.getElementById("table"),
    details: document.getElementById("details"),
    empty: document.getElementById("emptyState"),
    item: document.getElementById("dItem"),
    notes: document.getElementById("dNotes"),
    settlement: document.getElementById("dSettlement"),
    resolver: document.getElementById("dResolver"),
    closeBtn: document.getElementById("closeBtn")
};

// DATA (unchanged)
const liabilities = [
    {
        Item_Name: "Caliper",
        damage_type: "Broken",
        qty_damaged: "1",
        status: "Resolved",
        notes: "Dropped during measurement",
        logged_at: "Mar 21, 2026",
        settlement_mode: "replacement",
        ResolverName: "Admin User",
        session_id: "121"
    },
    {
        Item_Name: "Beaker (250ml)",
        damage_type: "Cracked",
        qty_damaged: "2",
        status: "Pending",
        notes: "Hairline cracks",
        logged_at: "Mar 25, 2026",
        settlement_mode: "payment",
        ResolverName: "—",
        session_id: "122"
    }
];

// RENDER TABLE
function render() {
    el.table.innerHTML = liabilities.map(item => `
        <tr>
            <td><b>${item.Item_Name}</b><br><small>Slip #${item.session_id}</small></td>
            <td><b>${item.damage_type}</b><br><small>Qty: ${item.qty_damaged}</small></td>
            <td>${item.logged_at}</td>
            <td>
                <span class="status ${item.status === "Resolved" ? "green" : "yellow"}">
                    ${item.status}
                </span>
            </td>
        </tr>
    `).join("");

    // attach click after render (simpler than inline)
    [...el.table.querySelectorAll("tr")].forEach((row, i) => {
        row.onclick = () => showDetails(liabilities[i], row);
    });
}

// SHOW DETAILS (shorter)
function showDetails(item, row) {
    document.querySelectorAll("#table tr").forEach(r => r.classList.remove("active"));
    row.classList.add("active");

    el.details.classList.add("active");
    el.empty.style.display = "none";

    el.item.textContent = item.Item_Name;
    el.notes.textContent = item.notes;
    el.settlement.textContent = item.settlement_mode;
    el.resolver.textContent = item.ResolverName;
}

// CLOSE DETAILS
el.closeBtn.onclick = () => {
    el.details.classList.remove("active");
    el.empty.style.display = "flex";
};

// INIT
render();