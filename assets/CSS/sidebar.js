// When loading components dynamically, this logic needs to be run
// after the HTML has successfully been injected into the DOM.

function initializeSidebar() {
    // --- Persist Collapsed State ---
    if (localStorage.getItem('sidebarState') === 'collapsed') {
        document.body.classList.add('sidebar-collapsed');
    }

    // --- Accordion Logic ---
    const accordions = document.querySelectorAll('.nav-accordion');
    const activeGroup = localStorage.getItem('sidebarOpenGroup') || '';

    accordions.forEach(acc => {
        const header = acc.querySelector('.accordion-header');
        const body = acc.querySelector('.accordion-body');
        const groupId = acc.getAttribute('data-group');
        
        // Initialize open state based on Local Storage
        if (groupId === activeGroup) {
            acc.classList.add('open');
            body.style.maxHeight = body.scrollHeight + 'px';
        }

        header.addEventListener('click', () => {
            const isOpen = acc.classList.contains('open');
            
                otherAcc.classList.remove('open');
                otherAcc.querySelector('.accordion-body').style.maxHeight = '0';
            });

            if (!isOpen) {
                acc.classList.add('open');
                body.style.maxHeight = body.scrollHeight + 'px';
                localStorage.setItem('sidebarOpenGroup', groupId);
            } else {
                localStorage.setItem('sidebarOpenGroup', '');
            }
        });
    };

    // --- Profile Dropdown Logic ---
    const profileBtn = document.getElementById('profileWidgetBtn');
    const profileDropdown = document.getElementById('profileDropdown');

    if (profileBtn && profileDropdown) {
        profileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            profileDropdown.classList.toggle('show');
        });

        document.addEventListener('click', (e) => {
            if (!profileDropdown.contains(e.target) && !profileBtn.contains(e.target)) {
                profileDropdown.classList.remove('show');
            }
        });
    }