const tbody = document.getElementById("cases");
const rows = () => document.querySelectorAll("#cases tr");

let selected = null;
let editMode = false;

// ELEMENTS
const modal = document.getElementById("formModal");
const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");
const addBtn = document.getElementById("addBtn");
const deleteBtn = document.getElementById("deleteBtn");

// INPUTS
const inputUser = document.getElementById("inputUser");
const inputItem = document.getElementById("inputItem");
const inputDamage = document.getElementById("inputDamage");

// CLICK ROW
function bindRows(){
    rows().forEach(row => {
        row.onclick = () => {
            selected = row;

            document.getElementById("user").textContent = row.cells[0].textContent;
            document.getElementById("item").textContent = row.cells[1].textContent;
            document.getElementById("damage").textContent = row.cells[2].textContent;
        };

        // DOUBLE CLICK = EDIT
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

// ADD BUTTON
addBtn.onclick = () => {
    editMode = false;

    inputUser.value = "";
    inputItem.value = "";
    inputDamage.value = "";

    modal.classList.remove("hidden");
};

// SAVE (ADD or EDIT)
saveBtn.onclick = () => {
    const user = inputUser.value;
    const item = inputItem.value;
    const damage = inputDamage.value;

    if(editMode && selected){
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

// DELETE
deleteBtn.onclick = () => {
    if(!selected){
        alert("Select a case first");
        return;
    }

    selected.remove();
    selected = null;

    updateCounts();
};

// CANCEL
cancelBtn.onclick = () => {
    modal.classList.add("hidden");
};

// STATUS CHANGE (same as before)
document.getElementById("approveBtn").onclick = () => changeStatus("approved");
document.getElementById("rejectBtn").onclick = () => changeStatus("rejected");

function changeStatus(status){
    if(!selected){
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

// FILTER (same)
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

// COUNTERS
function updateCounts(){
    let p=0,a=0,r=0;

    rows().forEach(row=>{
        if(row.dataset.status==="unresolved") p++;
        if(row.dataset.status==="approved") a++;
        if(row.dataset.status==="rejected") r++;
    });

    document.getElementById("pending").textContent = p;
    document.getElementById("approved").textContent = a;
    document.getElementById("rejected").textContent = r;
}

// INIT
bindRows();
updateCounts();