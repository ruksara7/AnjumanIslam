document.addEventListener("DOMContentLoaded", () => {
    /* ELEMENTS - MATCH YOUR HTML */
    const navMenu = document.getElementById("navMenu");      // ← FIXED ID
    const mobileToggle = document.querySelector(".mobile-menu-btn"); // ← FIXED CLASS
    const dropdownHeaders = document.querySelectorAll(".dropdown > a");
    const MOBILE_BREAKPOINT = 768;  // ← FIXED BREAKPOINT

    const isMobile = () => window.innerWidth <= MOBILE_BREAKPOINT;

    /* MAIN MENU */
    function openMenu(){
        navMenu?.classList.add("active");
        document.body.style.overflow = 'hidden';
    }

    function closeMenu(){
        navMenu?.classList.remove("active");
        document.body.style.overflow = '';
        closeAllDropdowns();
    }

    mobileToggle?.addEventListener("click", (e)=>{
        e.stopPropagation();
        navMenu.classList.contains("active") ? closeMenu() : openMenu();
    });

    /* DROPDOWN - FIXED NAVIGATION */
    function closeAllDropdowns(){
        document.querySelectorAll(".dropdown").forEach(d => d.classList.remove("active"));
    }

    dropdownHeaders.forEach(header => {
        const dropdown = header.parentElement;  // .dropdown parent
        
        header.addEventListener("click", (e)=>{
            if(isMobile()){
                const alreadyOpen = dropdown.classList.contains("active");
                
                // 🔥 FIX #1: 2ND TAP NAVIGATES (CRITICAL)
                if(alreadyOpen){
                    return; // Let parent link navigate normally
                }
                
                e.preventDefault();
                e.stopPropagation();
                closeAllDropdowns();
                dropdown.classList.add("active");
            }
        });
    });

    /* CLICK OUTSIDE */
    document.addEventListener("click", (e)=>{
        if(!navMenu?.contains(e.target) && !mobileToggle?.contains(e.target)){
            closeMenu();
        }
    });

    /* SUBMENU LINKS CLOSE MENU */
    document.querySelectorAll(".dropdown-menu a").forEach(link=>{
        link.addEventListener("click", ()=>{
            if(isMobile()) setTimeout(closeMenu, 100);
        });
    });

    /* RESIZE */
    let resizeTimer;
    window.addEventListener("resize", ()=>{
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(()=>{
            if(!isMobile()) closeMenu();
        }, 250);
    });
});
