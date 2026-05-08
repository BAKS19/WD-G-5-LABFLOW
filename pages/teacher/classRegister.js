// 1. Initial Class Data
let classes = [
    { id: 1, name: "General Chemistry 1", code: "STEM-12A", sem: "1st Semester" },
    { id: 2, name: "Physics for Engineers", code: "BSCE-1B", sem: "1st Semester" },
    { id: 3, name: "Organic Chemistry Lab", code: "BSCHEM-2A", sem: "2nd Semester" }
];

/**
 * 2. Display Classes on Screen
 * Clears the grid and rebuilds the class cards from the 'classes' array.
 */
function renderDashboard() {
    const grid = document.getElementById('classGrid');
    
    // Remove existing class cards, but keep the first "Create" button
    document.querySelectorAll('.class-card').forEach(card => card.remove());

    classes.forEach(cls => {
        const cardHTML = `
            <div class="class-card" data-name="${cls.name}">
                <span class="badge-sem">${cls.sem}</span>
                <h3>${cls.name}</h3>
                <p class="class-code">${cls.code}</p>
                <div class="action-stack">
                    <button onclick="enrollStudent('${cls.name}')" class="btn-add-stu">
                        <span>Add Students</span>
                        <svg width="16" height="16" fill="none" stroke="#f97316" stroke-width="2" viewBox="0 0 24 24"><path d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
                    </button>
                    <a href="#" class="btn-view">
                        <span>View Activities</span>
                        <svg width="16" height="16" fill="none" stroke="#cbd5e1" stroke-width="2" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2"/></svg>
                    </a>
                    <a href="#" class="btn-view">
                        <span>View Enrollment</span>
                        <svg width="16" height="16" fill="none" stroke="#cbd5e1" stroke-width="2" viewBox="0 0 24 24"><path d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                    </a>
                </div>
            </div>`;
        grid.insertAdjacentHTML('beforeend', cardHTML);
    });
}

/**
 * 3. Create a New Class
 * Grabs values from the modal inputs, adds them to our list, and refreshes the UI.
 */
function addNewClass() {
    const nameInput = document.getElementById('inpName');
    const codeInput = document.getElementById('inpCode');
    const semInput = document.getElementById('inpSem');

    // Validation: Don't add if fields are empty
    if (!nameInput.value || !codeInput.value) {
        alert("Please enter both a Class Name and a Section Code!");
        return;
    }

    // Add new class object to our data array
    classes.push({
        id: Date.now(),
        name: nameInput.value,
        code: codeInput.value,
        sem: semInput.value
    });

    // Refresh display, close modal, and clear inputs
    renderDashboard();
    toggleModal('classModal');
    nameInput.value = "";
    codeInput.value = "";
}

/**
 * 4. Search Filter
 * Hides/Shows cards instantly as the user types in the search bar.
 */
function filterClasses() {
    const searchText = document.getElementById('classSearch').value.toLowerCase();
    const cards = document.querySelectorAll('.class-card');

    cards.forEach(card => {
        const className = card.getAttribute('data-name').toLowerCase();
        card.style.display = className.includes(searchText) ? 'block' : 'none';
    });
}

/**
 * 5. Utility Functions
 */
function toggleModal(id) {
    const modal = document.getElementById(id);
    modal.style.display = (modal.style.display === 'none' || modal.style.display === '') ? 'flex' : 'none';
}

function enrollStudent(className) {
    const student = prompt(`Enter student name to enroll in ${className}:`);
    if (student) {
        alert(`${student} has been successfully added to the registry for ${className}!`);
    }
}

// Initial Run: Load the dashboard when the script loads
renderDashboard();