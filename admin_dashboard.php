<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LabFlow - Admin Dashboard</title>
    <style>
        /* ==========================================
           GLOBAL & LAYOUT VARIABLES
           ========================================== */
        :root {
            --sidebar-width: 288px;
            --sidebar-collapsed-width: 96px;
            --orange: #f97316;
            --orange-light: #fff7ed;
            --gray-light: #f3f4f6;
            --gray-text: #6b7280;
            --gray-dark: #1f2937;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        body {
            min-height: 100vh;
            display: flex;
            background-color: #f8fafc;
            overflow-x: hidden;
        }

        .main-wrapper {
            flex: 1;
            display: flex;
            flex-direction: column;
            min-width: 0; /* Prevents flex children from overflowing */
        }

        .dashboard-content {
            flex: 1;
            padding: 32px;
            overflow-y: auto;
        }

        /* ==========================================
           1. SIDEBAR STYLES
           ========================================== */
        .sidebar {
            width: var(--sidebar-width);
            height: 100vh;
            position: sticky;
            top: 0;
            background: white;
            border-right: 1px solid #e5e7eb;
            box-shadow: 4px 0 10px rgba(0,0,0,0.03);
            display: flex;
            flex-direction: column;
            transition: width 0.3s ease;
            z-index: 50;
        }

        body.sidebar-collapsed .sidebar {
            width: var(--sidebar-collapsed-width);
        }

        .sidebar-header {
            display: flex;
            align-items: center;
            padding: 24px;
            gap: 16px;
        }

        .sidebar-logo {
            width: 40px;
            height: 40px;
            border-radius: 8px;
            background: var(--gray-light); /* Fallback if no image */
            object-fit: cover;
        }

        body.sidebar-collapsed .sidebar-header {
            justify-content: center;
            padding: 24px 0;
        }

        .sidebar-brand {
            font-size: 24px;
            font-weight: 800;
            color: var(--gray-dark);
        }

        body.sidebar-collapsed .sidebar-brand {
            display: none;
        }

        .sidebar-nav {
            flex: 1;
            overflow-y: auto;
            padding: 0 16px;
        }

        .sidebar-nav::-webkit-scrollbar { width: 4px; }
        .sidebar-nav::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }

        .nav-list {
            list-style: none;
        }

        .nav-item {
            margin-bottom: 8px;
        }

        .nav-link {
            display: flex;
            align-items: center;
            padding: 12px 16px;
            text-decoration: none;
            color: var(--gray-text);
            border-radius: 12px;
            transition: all 0.2s ease;
            gap: 16px;
            position: relative;
        }

        .nav-link svg {
            width: 24px;
            height: 24px;
            stroke: currentColor;
            fill: none;
            stroke-width: 2;
            flex-shrink: 0;
        }

        body.sidebar-collapsed .nav-link {
            justify-content: center;
            padding: 12px 0;
        }

        body.sidebar-collapsed .nav-text {
            display: none;
        }

        .nav-link:hover {
            background-color: var(--orange-light);
            color: var(--orange);
        }

        .nav-link.active {
            background-color: var(--orange);
            color: white;
            box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
        }

        .nav-badge {
            background: #ef4444;
            color: white;
            font-size: 12px;
            font-weight: bold;
            padding: 2px 8px;
            border-radius: 99px;
            margin-left: auto;
            animation: pulseBadge 2s infinite;
        }

        body.sidebar-collapsed .nav-badge {
            position: absolute;
            top: 4px;
            right: 24px;
            padding: 2px 6px;
            font-size: 10px;
        }

        @keyframes pulseBadge {
            0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
            70% { box-shadow: 0 0 0 6px rgba(239, 68, 68, 0); }
            100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }

        .accordion-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            padding: 12px 16px;
            background: none;
            border: none;
            color: var(--gray-text);
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            cursor: pointer;
            margin-top: 16px;
        }

        body.sidebar-collapsed .accordion-title,
        body.sidebar-collapsed .chevron {
            display: none;
        }

        .chevron {
            width: 16px;
            height: 16px;
            transition: transform 0.3s ease;
        }

        .nav-accordion.open .chevron {
            transform: rotate(180deg);
        }

        .accordion-body {
            list-style: none;
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
        }

        .accordion-body .nav-link {
            padding-left: 48px;
        }

        body.sidebar-collapsed .accordion-body .nav-link {
            padding-left: 0;
        }

        .sidebar-footer {
            padding: 16px;
            border-top: 1px solid #e5e7eb;
            position: relative;
        }

        .profile-widget {
            display: flex;
            align-items: center;
            width: 100%;
            background: none;
            border: none;
            padding: 8px;
            border-radius: 12px;
            cursor: pointer;
            transition: background 0.2s;
            gap: 12px;
        }

        .profile-widget:hover {
            background: var(--gray-light);
        }

        body.sidebar-collapsed .profile-widget {
            justify-content: center;
        }

        .profile-avatar {
            width: 40px;
            height: 40px;
            border-radius: 10px;
            object-fit: cover;
            background: #cbd5e1;
        }

        .profile-info {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            text-align: left;
        }

        body.sidebar-collapsed .profile-info {
            display: none;
        }

        .profile-name {
            font-weight: 600;
            color: var(--gray-dark);
            font-size: 14px;
        }

        .profile-role {
            font-size: 10px;
            font-weight: 700;
            color: var(--gray-text);
            text-transform: uppercase;
        }

        .profile-dropdown {
            position: absolute;
            bottom: 80px;
            left: 16px;
            right: 16px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            border: 1px solid #e5e7eb;
            display: flex;
            flex-direction: column;
            padding: 8px;
            opacity: 0;
            visibility: hidden;
            transform: translateY(10px);
            transition: all 0.2s ease;
        }

        body.sidebar-collapsed .profile-dropdown {
            left: 100%;
            margin-left: 8px;
            bottom: 16px;
            width: 150px;
        }

        .profile-dropdown.show {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }

        .profile-dropdown a {
            padding: 10px 12px;
            text-decoration: none;
            color: var(--gray-dark);
            font-size: 14px;
            font-weight: 500;
            border-radius: 8px;
        }

        .profile-dropdown a:hover {
            background: var(--gray-light);
        }

        /* ==========================================
           2. GLASS HEADER STYLES
           ========================================== */
        .glass-header {
            position: sticky;
            top: 0;
            z-index: 40;
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border-bottom: 1px solid #e5e7eb;
            padding: 16px 32px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 80px;
        }

        .header-left {
            display: flex;
            align-items: center;
            gap: 24px;
        }

        .hamburger-btn {
            width: 40px;
            height: 40px;
            border-radius: 10px;
            border: 1px solid #e5e7eb;
            background: #f9fafb;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s ease;
            color: #6b7280;
        }

        .hamburger-btn svg {
            width: 20px;
            height: 20px;
            stroke: currentColor;
            fill: none;
            stroke-width: 2;
        }

        .hamburger-btn:hover {
            background: #f97316;
            border-color: #f97316;
            color: white;
        }

        .breadcrumbs-container {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }

        .breadcrumbs {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
        }

        .breadcrumbs a {
            text-decoration: none;
            color: #6b7280;
            font-weight: 500;
            transition: color 0.2s;
        }

        .breadcrumbs a:hover {
            color: #f97316;
        }

        .breadcrumbs svg {
            width: 14px;
            height: 14px;
            stroke: #9ca3af;
            fill: none;
            stroke-width: 2;
        }

        .current-page {
            color: #1f2937;
            font-weight: 700;
        }

        .header-subtitle {
            font-size: 10px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            color: #9ca3af;
        }

        .header-right {
            display: flex;
            align-items: center;
            gap: 24px;
        }

        .action-icons {
            display: flex;
            align-items: center;
            gap: 16px;
        }

        .icon-link {
            position: relative;
            color: #6b7280;
            transition: color 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            text-decoration: none;
        }

        .icon-link:hover {
            color: #f97316;
            background: #fff7ed;
        }

        .icon-link svg {
            width: 22px;
            height: 22px;
            stroke: currentColor;
            fill: none;
            stroke-width: 2;
        }

        .cart-badge {
            position: absolute;
            top: 2px;
            right: 2px;
            background: #ef4444;
            color: white;
            font-size: 10px;
            font-weight: 700;
            width: 18px;
            height: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            border: 2px solid white;
            animation: pulseBadge 2s infinite;
        }

        .profile-display {
            display: flex;
            align-items: center;
            gap: 16px;
            border-left: 1px solid #e5e7eb;
            padding-left: 24px;
        }

        .header-profile-text {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
        }

        .header-profile-name {
            font-size: 14px;
            font-weight: 600;
            color: #1f2937;
        }

        .header-profile-role {
            font-size: 11px;
            font-weight: 600;
            color: #6b7280;
            text-transform: uppercase;
        }

        .header-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: 2px solid #f97316;
            box-shadow: 0 4px 10px rgba(249, 115, 22, 0.2);
            object-fit: cover;
            background: #cbd5e1;
        }

        /* ==========================================
           3. FOOTER & MODAL STYLES
           ========================================== */
        .dark-footer {
            background-color: #020617;
            color: #cbd5e1;
            padding: 64px 32px 32px;
            border-top: 1px solid #1e293b;
            margin-top: auto;
        }

        .footer-top {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 48px;
            max-width: 1200px;
            margin: 0 auto 64px;
        }

        @media (max-width: 1024px) { .footer-top { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px) { .footer-top { grid-template-columns: 1fr; } }

        .footer-brand { display: flex; flex-direction: column; gap: 16px; }
        .footer-logo-container { display: flex; align-items: center; gap: 12px; }
        .footer-logo { width: 40px; height: 40px; filter: grayscale(100%); transition: filter 0.3s; }
        .footer-logo-container:hover .footer-logo { filter: grayscale(0%); }
        
        .footer-brand-name { font-size: 24px; font-weight: 800; color: white; }
        .footer-desc { font-size: 14px; line-height: 1.6; color: #94a3b8; }
        
        .footer-links h4, .footer-contact h4 { color: white; font-size: 16px; font-weight: 700; margin-bottom: 24px; }
        .footer-links ul { list-style: none; display: flex; flex-direction: column; gap: 12px; }
        .footer-links a { text-decoration: none; color: #cbd5e1; font-size: 14px; transition: color 0.2s; }
        .footer-links a:hover { color: #f97316; }

        .footer-map { width: 100%; height: 120px; border-radius: 12px; overflow: hidden; margin-bottom: 16px; }
        .footer-map iframe { width: 100%; height: 100%; border: none; }
        .footer-contact-info { display: flex; flex-direction: column; gap: 8px; font-size: 13px; color: #94a3b8; }

        .footer-bottom {
            max-width: 1200px;
            margin: 0 auto;
            border-top: 1px solid #1e293b;
            padding-top: 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .footer-copyright { font-size: 13px; color: #64748b; }
        .footer-badge { background: #1e293b; padding: 6px 12px; border-radius: 99px; font-size: 11px; color: #94a3b8; font-weight: 600; }

        /* Logout Modal */
        .logout-overlay {
            position: fixed;
            inset: 0;
            z-index: 200;
            background: rgba(15, 23, 42, 0.6);
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }

        .logout-overlay.show {
            opacity: 1;
            visibility: visible;
        }

        .logout-modal {
            background: white;
            border-radius: 16px;
            padding: 32px;
            width: 100%;
            max-width: 400px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            transform: translateY(20px);
            transition: transform 0.3s ease;
            text-align: center;
        }

        .logout-overlay.show .logout-modal { transform: translateY(0); }

        .modal-icon-container {
            width: 64px;
            height: 64px;
            background: #fee2e2;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
        }

        .modal-icon-container svg { width: 32px; height: 32px; stroke: #ef4444; fill: none; stroke-width: 2; }
        .modal-title { font-size: 20px; font-weight: 700; color: #1f2937; margin-bottom: 8px; }
        .modal-desc { font-size: 14px; color: #6b7280; margin-bottom: 24px; }
        .modal-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        
        .btn-cancel {
            padding: 12px; border-radius: 10px; border: none; background: #f3f4f6;
            color: #4b5563; font-weight: 600; cursor: pointer; transition: background 0.2s;
        }
        .btn-cancel:hover { background: #e5e7eb; }
        
        .btn-confirm {
            padding: 12px; border-radius: 10px; border: none; background: #ef4444;
            color: white; font-weight: 600; cursor: pointer; box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3); transition: all 0.2s;
        }
        .btn-confirm:hover { background: #dc2626; transform: translateY(-2px); box-shadow: 0 6px 16px rgba(239, 68, 68, 0.4); }
    </style>
</head>
<body>

    <!-- SIDEBAR -->
    <aside class="sidebar" id="sidebar">
        <div class="sidebar-header">
            <img src="assets/images/logo.png" alt="LabFlow" class="sidebar-logo">
            <span class="sidebar-brand">LabFlow</span>
        </div>

        <nav class="sidebar-nav">
            <ul class="nav-list">
                <li class="nav-item">
                    <a href="#" class="nav-link active">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
                        <span class="nav-text">Dashboard</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
                        <span class="nav-text">Notifications</span>
                        <span class="nav-badge">3</span>
                    </a>
                </li>
                <li class="nav-accordion">
                    <button class="accordion-header">
                        <span class="accordion-title">Laboratory Hub</span>
                        <svg class="chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
                    </button>
                    <ul class="accordion-body">
                        <li><a href="#" class="nav-link"><span class="nav-text">Equipment</span></a></li>
                        <li><a href="#" class="nav-link"><span class="nav-text">My History</span></a></li>
                    </ul>
                </li>
            </ul>
        </nav>

        <div class="sidebar-footer">
            <button class="profile-widget" id="profileWidgetBtn">
                <img src="assets/images/avatar.jpg" alt="User" class="profile-avatar">
                <div class="profile-info">
                    <span class="profile-name">John Doe</span>
                    <span class="profile-role">ADMIN</span>
                </div>
            </button>
            <div class="profile-dropdown" id="profileDropdown">
                <a href="#">Open Profile</a>
                <a href="#" onclick="openLogoutModal(); return false;">Log Out</a>
            </div>
        </div>
    </aside>

    <!-- MAIN CONTENT WRAPPER -->
    <div class="main-wrapper">
        
        <!-- HEADER -->
        <header class="glass-header">
            <div class="header-left">
                <button class="hamburger-btn" id="hamburgerBtn">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
                </button>
                <div class="breadcrumbs-container">
                    <nav class="breadcrumbs">
                        <a href="#">Home</a>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
                        <a href="#">Laboratory</a>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
                        <span class="current-page">Admin Dashboard</span>
                    </nav>
                    <div class="header-subtitle">CSM LABORATORY</div>
                </div>
            </div>
            <div class="header-right">
                <div class="action-icons">
                    <a href="#" class="icon-link">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
                    </a>
                    <a href="#" class="icon-link">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
                        <span class="cart-badge" id="cartBadge">0</span>
                    </a>
                </div>
                <div class="profile-display">
                    <div class="header-profile-text">
                        <span class="header-profile-name">John Doe</span>
                        <span class="header-profile-role">Admin</span>
                    </div>
                    <img src="assets/images/avatar.jpg" alt="Avatar" class="header-avatar">
                </div>
            </div>
        </header>

        <!-- MAIN CONTENT AREA -->
        <main class="dashboard-content">
            <h1 style="color: #1f2937; margin-bottom: 12px;">Welcome to the Dashboard</h1>
            <p style="color: #6b7280; font-size: 15px;">Your primary overview and content modules will render here.</p>
            <!-- Put your dynamic dashboard widgets, tables, or charts here -->
        </main>

        <!-- FOOTER -->
        <footer class="dark-footer">
            <div class="footer-top">
                <div class="footer-brand">
                    <div class="footer-logo-container">
                        <img src="assets/images/logo.png" alt="LabFlow" class="footer-logo">
                        <span class="footer-brand-name">LabFlow</span>
                    </div>
                    <p class="footer-desc">
                        The modern, digital laboratory management and apparatus borrowing system designed for the College of Science and Mathematics.
                    </p>
                </div>
                
                <div class="footer-links">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Features</a></li>
                        <li><a href="#">How it Works</a></li>
                    </ul>
                </div>
                
                <div class="footer-links">
                    <h4>Resources</h4>
                    <ul>
                        <li><a href="#">Help Center</a></li>
                        <li><a href="#">Terms of Service</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Contact Support</a></li>
                    </ul>
                </div>
                
                <div class="footer-contact">
                    <h4>Location</h4>
                    <div class="footer-map">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.8932646274435!2d122.06214531477281!3d6.903332995011986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x325041dd49826f1b%3A0xc478a5e01b4c90d6!2sWestern%20Mindanao%20State%20University!5e0!3m2!1sen!2sph!4v1680190342935!5m2!1sen!2sph" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                    <div class="footer-contact-info">
                        <span>Normal Road, Baliwasan, Zamboanga City</span>
                        <span>support@wmsu.edu.ph</span>
                    </div>
                </div>
            </div>
            
            <div class="footer-bottom">
                <div class="footer-copyright">
                    &copy; 2026 Western Mindanao State University. All rights reserved.
                </div>
                <div class="footer-badge">
                    System by WD-G-5
                </div>
            </div>
        </footer>

    </div>

    <!-- GLOBAL MODALS -->
    <div class="logout-overlay" id="logoutOverlay">
        <div class="logout-modal">
            <div class="modal-icon-container">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
            </div>
            <h2 class="modal-title">Confirm Sign Out</h2>
            <p class="modal-desc">Are you sure you want to sign out of your account? You will need to log in again to access the dashboard.</p>
            
            <div class="modal-actions">
                <button class="btn-cancel" onclick="closeLogoutModal()">Cancel</button>
                <button class="btn-confirm" onclick="window.location.href='logout.php'">Confirm</button>
            </div>
        </div>
    </div>

    <!-- SCRIPTS -->
    <script>
        // Modal Control Functions
        function openLogoutModal() {
            const overlay = document.getElementById('logoutOverlay');
            if (overlay) overlay.classList.add('show');
        }

        function closeLogoutModal() {
            const overlay = document.getElementById('logoutOverlay');
            if (overlay) overlay.classList.remove('show');
        }

        document.addEventListener('DOMContentLoaded', () => {
            
            // --- Sidebar Accordion Logic ---
            const accordions = document.querySelectorAll('.nav-accordion');
            accordions.forEach(acc => {
                const header = acc.querySelector('.accordion-header');
                const body = acc.querySelector('.accordion-body');
                
                header.addEventListener('click', () => {
                    acc.classList.toggle('open');
                    if (acc.classList.contains('open')) {
                        body.style.maxHeight = body.scrollHeight + 'px';
                    } else {
                        body.style.maxHeight = '0';
                    }
                });
            });

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

            // --- Hamburger Toggle Logic ---
            const hamburgerBtn = document.getElementById('hamburgerBtn');
            if (hamburgerBtn) {
                hamburgerBtn.addEventListener('click', () => {
                    document.body.classList.toggle('sidebar-collapsed');
                });
            }

            // --- Cart Badge Storage Logic ---
            const cartBadge = document.getElementById('cartBadge');
            function updateCartBadge() {
                const count = parseInt(localStorage.getItem('cartCount') || '0', 10);
                if (cartBadge) {
                    cartBadge.textContent = count;
                    cartBadge.style.display = count > 0 ? 'flex' : 'none';
                }
            }
            
            updateCartBadge();
            window.addEventListener('storage', (e) => {
                if (e.key === 'cartCount') updateCartBadge();
            });
            window.addEventListener('cartUpdated', updateCartBadge);

            // --- Close Modal when clicking outside ---
            const overlay = document.getElementById('logoutOverlay');
            if (overlay) {
                overlay.addEventListener('click', (e) => {
                    if (e.target === overlay) {
                        closeLogoutModal();
                    }
                });
            }
        });
    </script>
</body>
</html>