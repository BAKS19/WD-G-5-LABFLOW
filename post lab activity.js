/**
 * --- GLOBAL DATA & INITIALIZATION ---
 */
const labItems = [
    { name: "Absorbent Sheets", img: "https://via.placeholder.com/80?text=Sheets" },
    { name: "Acetone", img: "https://via.placeholder.com/80?text=Acetone" },
    { name: "Analytical Balance", img: "https://via.placeholder.com/80?text=Balance" },
    { name: "Beaker", img: "https://via.placeholder.com/80?text=Beaker" },
    { name: "Caliper", img: "https://via.placeholder.com/80?text=Caliper" },
    { name: "Erlenmeyer Flask", img: "https://via.placeholder.com/80?text=Flask" },
    { name: "Sodium Chloride", img: "https://via.placeholder.com/80?text=NaCl" },
    { name: "Thermometer", img: "https://via.placeholder.com/80?text=Temp" }
];

// Run setup when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    renderItems();
});

/**
 * --- NAVIGATION LOGIC ---
 */
function showStep(stepNumber) {
    // Hide all steps
    document.getElementById('step1').style.display = 'none';
    document.getElementById('step2').style.display = 'none';
    document.getElementById('step3').style.display = 'none';
    
    // Show selected step
    document.getElementById('step' + stepNumber).style.display = 'block';

    // Update Stepper UI indicator
    document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
    const currentIndicator = document.getElementById('stepIndicator' + stepNumber);
    if(currentIndicator) {
        currentIndicator.classList.add('active');
    }
}

/**
 * --- STEP 1: RESOURCES & PREVIEW ---
 */
const titleInput = document.getElementById('titleInput');
const descInput = document.getElementById('descInput');
const dateInput = document.getElementById('dateInput');

const previewTitle = document.getElementById('previewTitle');
const previewDesc = document.getElementById('previewDesc');
const previewDate = document.getElementById('previewDate');

// Live update Activity Title
titleInput.addEventListener('input', (e) => {
    previewTitle.innerText = e.target.value || "Activity Title";
});

// Live update Description
descInput.addEventListener('input', (e) => {
    previewDesc.innerText = e.target.value || "Description will appear here.";
});

// Live update Date
dateInput.addEventListener('change', (e) => {
    if (e.target.value) {
        const date = new Date(e.target.value);
        previewDate.innerText = date.toLocaleString();
    } else {
        previewDate.innerText = "Not set";
    }
});

/**
 * --- STEP 2: LOGISTICS & EQUIPMENT SEARCH ---
 */
const grid = document.getElementById('equipmentGrid');
const searchInput = document.getElementById('equipmentSearch');

function renderItems(filterText = "") {
    if (!grid) return;
    grid.innerHTML = ""; // Clear current grid
    
    const filtered = labItems.filter(item => 
        item.name.toLowerCase().includes(filterText.toLowerCase())
    );

    filtered.forEach(item => {
        const card = document.createElement('div');
        card.className = 'item-card';
        card.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <span>${item.name}</span>
        `;
        
        // Toggle selection logic
        card.onclick = () => card.classList.toggle('selected');
        
        grid.appendChild(card);
    });
}

// Live Search Listener
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        renderItems(e.target.value);
    });
}

/**
 * --- STEP 3: SETTINGS & MODES ---
 */
function setMode(mode) {
    const indBtn = document.getElementById('modeIndividual');
    const grpBtn = document.getElementById('modeGroup');
    const groupSettings = document.getElementById('groupSettings');
    const previewLabel = document.querySelector('.label-small'); 

    if (mode === 'group') {
        indBtn.classList.remove('active');
        grpBtn.classList.add('active');
        groupSettings.style.display = 'block';
        if(previewLabel) previewLabel.innerText = "GROUP";
    } else {
        grpBtn.classList.remove('active');
        indBtn.classList.add('active');
        groupSettings.style.display = 'none';
        if(previewLabel) previewLabel.innerText = "INDIVIDUAL";
    }
}