// DATA
const bookings = [
    {
        booking_id: 5,
        Item_Name: "Liquid Chromatography-Mass Spectrometry",
        purpose: "for the research",
        SupervisorName: "Jaydee Ballaho",
        date: "Apr 03, 2026",
        time: "01:55 PM",
        status: "Claimed"
    },
    {
        booking_id: 4,
        Item_Name: "Next-Generation DNA Sequencer",
        purpose: "DNA analysis",
        SupervisorName: "Jaydee Ballaho",
        date: "Apr 03, 2026",
        time: "01:00 PM",
        status: "Claimed"
    }
];

// ELEMENTS
const table = document.getElementById("table");
const search = document.getElementById("search");
const sort = document.getElementById("sort");
const filters = document.getElementById("filters");

const dItem = document.getElementById("dItem");
const dPurpose = document.getElementById("dPurpose");
const dSupervisor = document.getElementById("dSupervisor");
const dStatus = document.getElementById("dStatus");

let activeStatus = "All";

// STATUS BUTTONS
const statuses = ["All","Pending","Approved","Prepared","Denied","Claimed","Completed","Cancelled"];

statuses.forEach(status => {
    const btn = document.createElement("button");
    btn.textContent = status;

    btn.onclick = () => {
        activeStatus = status;

        document.querySelectorAll(".filters button").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        render();
    };

    filters.appendChild(btn);
});

// RENDER TABLE
function render(){
    table.innerHTML = "";

    let list = bookings.filter(b => {
        const text = search.value.toLowerCase();

        return (
            (b.Item_Name.toLowerCase().includes(text) ||
             b.purpose.toLowerCase().includes(text)) &&
            (activeStatus === "All" || b.status === activeStatus)
        );
    });

    list.sort((a,b)=>{
        return sort.value === "asc"
            ? a.booking_id - b.booking_id
            : b.booking_id - a.booking_id;
    });

    list.forEach(b => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td><b>${b.Item_Name}</b><br><small>${b.purpose}</small></td>
            <td>${b.SupervisorName}</td>
            <td>${b.date}<br>${b.time}</td>
            <td><span class="status">${b.status}</span></td>
        `;

        tr.onclick = () => showDetails(b);

        table.appendChild(tr);
    });
}

// SHOW DETAILS
function showDetails(b){
    document.getElementById("details").classList.add("active");
    document.getElementById("empty").style.display = "none";

    dItem.textContent = b.Item_Name;
    dPurpose.textContent = b.purpose;
    dSupervisor.textContent = b.SupervisorName;
    dStatus.textContent = b.status;
}

// CLEAR DETAILS
document.getElementById("closeBtn").onclick = () => {
    document.getElementById("details").classList.remove("active");
    document.getElementById("empty").style.display = "block";
};

// EVENTS
search.oninput = render;
sort.onchange = render;

// INIT
render();