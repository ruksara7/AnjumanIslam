document.addEventListener("DOMContentLoaded", () => {

    /* ===============================
       ELEMENTS
    =============================== */
    const navMenu      = document.getElementById("nav-menu");
    const mobileToggle = document.querySelector(".mobile-menu-toggle");
    const dropdownHeaders = document.querySelectorAll(".nav-section-header");

    /* ===============================
       MOBILE MAIN MENU
    =============================== */
    function openMenu(){
        navMenu?.classList.add("active");
        document.body.classList.add("no-scroll");
    }

    function closeMenu(){
        navMenu?.classList.remove("active");
        document.body.classList.remove("no-scroll");
        closeAllDropdowns();
    }

    mobileToggle?.addEventListener("click", (e)=>{
        e.stopPropagation();
        navMenu.classList.contains("active") ? closeMenu() : openMenu();
    });

    /* ===============================
       DROPDOWN HANDLING
    =============================== */
    function closeAllDropdowns(){
        document.querySelectorAll(".dropdown").forEach(d => d.classList.remove("active"));
        document.querySelectorAll(".nav-section-header").forEach(h => h.classList.remove("active"));
        document.querySelectorAll(".dropdown-icon").forEach(i => i.style.transform="rotate(0deg)");
    }

    dropdownHeaders.forEach(header => {
        header.addEventListener("click", (e)=>{
            e.preventDefault();
            e.stopPropagation();

            const section  = header.closest(".nav-section");
            const dropdown = section?.querySelector(".dropdown");
            const icon     = header.querySelector(".dropdown-icon");

            if(!dropdown) return;

            const alreadyOpen = dropdown.classList.contains("active");

            closeAllDropdowns();

            if(!alreadyOpen){
                dropdown.classList.add("active");
                header.classList.add("active");
                if(icon) icon.style.transform = "rotate(180deg)";
            }
        });
    });

    /* ===============================
       CLICK OUTSIDE (REAL MOBILE FIX)
    =============================== */
    document.addEventListener("click", (e)=>{
        if(!e.target.closest("#nav-menu") && !e.target.closest(".mobile-menu-toggle")){
            closeMenu();
        }
    });

    /* ===============================
       CLOSE AFTER CLICKING LINK
    =============================== */
    document.querySelectorAll("#nav-menu a").forEach(link=>{
        link.addEventListener("click", ()=> closeMenu());
    });

    /* ===============================
       SAFE RESIZE (ROTATE PHONE FIX)
    =============================== */
    window.addEventListener("resize", ()=>{
        if(window.innerWidth >= 992){
            closeMenu();
        }
    });

});
