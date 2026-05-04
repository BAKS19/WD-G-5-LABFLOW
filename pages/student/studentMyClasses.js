const classList = document.getElementById("classList");

const dName = document.getElementById("dName");
const dTeacher = document.getElementById("dTeacher");
const dSemester = document.getElementById("dSemester");
const dSection = document.getElementById("dSection");
const dActivities = document.getElementById("dActivities");
const statusBox = document.getElementById("statusBox");
const deadlinesBox = document.getElementById("deadlines");

const modal = document.getElementById("activityModal");
const modalList = document.getElementById("activityListItems");
const modalTitle = document.getElementById("modalTitle");

let selectedClass = null;

// DATA
const classes = [
    {
        Class_Name: 'Organic Molecule Lab - Fri 10-1pm',
        TeacherName: 'Sir Najeeb Abdulla',
        Semester: '2026-1',
        Section: 'A',
        ClearanceStatus: 'Cleared',
        activities: ['Titration Lab Report', 'Safety Quiz', 'Molecular Modeling', 'Final Practical Exam'],
        upcoming_deadlines: [{ Title: 'Final Lab Report', Deadline: 'May 12' }]
    },
    {
        Class_Name: 'Organic Molecule Lec - Tue/Fri 7-8:30amZ',
        TeacherName: 'Maam Sarah Sapalo',
        Semester: '2026-1',
        Section: 'A',
        ClearanceStatus: 'Pending',
        activities: ['Chapter 1 Quiz', 'Synthesis Paper', 'Reaction Mechanism Homework', 'Midterm Project', 'Case Study', 'Lecture Summary'],
        upcoming_deadlines: [{ Title: 'Reaction Mechanism Test', Deadline: 'May 05' }]
    },
    {
        Class_Name: 'Systematics Lab - Mon/Thu 7-10am',
        TeacherName: 'Maam Merlinda Elizalde',
        Semester: '2026-1',
        Section: 'A',
        ClearanceStatus: 'Cleared',
        activities: ['Specimen Collection', 'Taxonomy Chart', 'Field Report'],
        upcoming_deadlines: []
    },
    {
        Class_Name: 'Systematics Lec - Mon/Thu 11:30-1pm',
        TeacherName: 'Maam Llara Siglos',
        Semester: '2026-1',
        Section: 'A',
        ClearanceStatus: 'Cleared',
        activities: ['Nomenclature Drill', 'Phylogenetic Tree Activity', 'Reading Reflection', 'Midterm Exam', 'Group Research', 'Concept Map', 'Attendance Quiz', 'Final Synthesis'],
        upcoming_deadlines: [{ Title: 'Final Research Paper', Deadline: 'May 15' }]
    },
    {
        Class_Name: 'Biostatistics Lab - Sat 10-1pm',
        TeacherName: 'Sir Reymond Paragas',
        Semester: '2026-1',
        Section: 'A',
        ClearanceStatus: 'Pending',
        activities: ['Data Entry Exercise', 'SPSS Lab', 'Correlation Analysis', 'ANOVA Homework', 'Final Dataset'],
        upcoming_deadlines: [{ Title: 'SPSS Project', Deadline: 'May 08' }]
    },
    {
        Class_Name: 'Biostatistics Lec - Wed 7:30-9:30am',
        TeacherName: 'Maam Angelyn Sanchez',
        Semester: '2026-1',
        Section: 'A',
        ClearanceStatus: 'Cleared',
        activities: ['Problem Set 1', 'Problem Set 2', 'Probability Quiz', 'Regression Analysis Worksheet', 'Final Exam'],
        upcoming_deadlines: []
    }
];
// RENDER CLASSES
function renderClasses(){
    classList.innerHTML = "";

    classes.forEach(c => {
        const div = document.createElement("div");
        div.className = "class-btn";
        div.innerHTML = `<b>${c.Class_Name}</b><br><small>${c.TeacherName}</small>`;

        div.onclick = () => selectClass(c);

        classList.appendChild(div);
    });
}

// SELECT CLASS
function selectClass(c){
    selectedClass = c;

    document.getElementById("details").classList.add("active");
    document.getElementById("emptyState").style.display = "none";

    dName.textContent = c.Class_Name;
    dTeacher.textContent = c.TeacherName;
    dSemester.textContent = c.Semester;
    dSection.textContent = c.Section;
    dActivities.textContent = c.activities.length;

    statusBox.innerHTML =
        c.ClearanceStatus === "Cleared"
        ? `<div class="green"><b>Cleared</b></div>`
        : `<div class="yellow"><b>Pending Clearance</b></div>`;

    deadlinesBox.innerHTML = "";

    if(c.upcoming_deadlines.length === 0){
        deadlinesBox.innerHTML = "<small>No deadlines</small>";
    } else {
        c.upcoming_deadlines.forEach(d => {
            const div = document.createElement("div");
            div.className = "deadline";
            div.innerHTML = `<b>${d.Title}</b><br>${d.Deadline}`;
            deadlinesBox.appendChild(div);
        });
    }
}

// MODAL
document.getElementById("openModalBtn").onclick = () => {
    if(!selectedClass) return;

    modal.style.display = "block";
    modalTitle.textContent = selectedClass.Class_Name;

    modalList.innerHTML = "";

    selectedClass.activities.forEach(a => {
        const li = document.createElement("li");
        li.textContent = a;
        modalList.appendChild(li);
    });
};

document.getElementById("closeModalBtn").onclick = () => {
    modal.style.display = "none";
};

// INIT
renderClasses();