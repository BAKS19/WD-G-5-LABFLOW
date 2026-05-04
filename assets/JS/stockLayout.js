const itemList = document.getElementById("item-list");
const searchInput = document.getElementById("search");
const categoryFilter = document.getElementById("categoryFilter");

let selectedType = "all";

// DATA
const items = [
    { name: "Beaker", shelf: "Shelf A", type: "Non-Consumable", category: "Glassware" },
    { name: "Ethanol", shelf: "Shelf B", type: "Consumable", category: "Chemicals" },
    { name: "Microscope", shelf: "Shelf C", type: "Non-Consumable", category: "Equipment" },
    { name: "Gloves", shelf: "Shelf D", type: "Consumable", category: "Safety" },
    { name: "Petri Dish", shelf: "Shelf E", type: "Consumable", category: "Biologicals" }
];

// CLICK SHELF
document.querySelectorAll(".shelf-box").forEach(box => {
    box.onclick = () => showShelf(box.dataset.id);
});

// SHOW ITEMS LIST
function renderItems() {
    const search = searchInput.value.toLowerCase();
    const category = categoryFilter.value;

    itemList.innerHTML = "";

    items.forEach(i => {
        if (
            i.name.toLowerCase().includes(search) &&
            (selectedType === "all" || i.type === selectedType) &&
            (category === "all" || i.category === category)
        ) {
            const div = document.createElement("div");
            div.className = "item";
            div.textContent = i.name;

            div.onclick = () => showShelf(i.shelf);

            itemList.appendChild(div);
        }
    });
}

// SHOW SHELF DETAILS
function showShelf(id) {

    document.querySelectorAll(".shelf-box").forEach(box => {
        box.classList.toggle("active", box.dataset.id === id);
    });

    const shelfItems = items
        .filter(i => i.shelf === id)
        .map(i => `• ${i.name}`)
        .join("<br>");

    document.getElementById("info-box").innerHTML =
        `<b>${id}</b><br>${shelfItems || "No items"}`;
}

// FILTER TYPE
document.querySelectorAll("[data-type]").forEach(btn => {
    btn.onclick = () => {
        selectedType = btn.dataset.type;

        document.querySelectorAll("[data-type]").forEach(b => b.classList.remove("filter-active"));
        btn.classList.add("filter-active");

        renderItems();
    };
});

// EVENTS
searchInput.oninput = renderItems;
categoryFilter.onchange = renderItems;

// INIT
renderItems();