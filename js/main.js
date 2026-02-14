document.addEventListener('DOMContentLoaded', () => {
    // Mobile dropdown menus for all sections
    document.querySelectorAll('.nav-section-header').forEach(header => {
        header.addEventListener('click', (e) => {
            e.preventDefault();
            const dropdown = header.nextElementSibling;
            const icon = header.querySelector('.dropdown-icon');
            
            // Toggle active state
            dropdown.classList.toggle('active');
            header.classList.toggle('active');
            
            // Rotate icon
            if (icon) {
                icon.style.transform = dropdown.classList.contains('active') 
                    ? 'rotate(180deg)' : 'rotate(0deg)';
            }
        });
    });

    // Single mobile menu toggle (for main nav if exists)
    document.querySelector('.mobile-menu-toggle')?.addEventListener('click', () => {
        document.getElementById('nav-menu')?.classList.toggle('active');
    });

    // Font resize
    document.querySelectorAll('.font-resize').forEach(btn => {
        btn.addEventListener('click', () => {
            const size = btn.dataset.size;
            document.body.style.fontSize = size === 'small' ? '14px' : 
                                         size === 'large' ? '18px' : '16px';
        });
    });

    // Counter animation (with mobile optimization)
    const counters = document.querySelectorAll('.stat-number[data-target]');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px' // Trigger earlier on mobile
    };
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                let current = 0;
                const increment = target / 100;
                const duration = 2000; // 2 seconds
                const startTime = performance.now();

                const update = (currentTime) => {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    current = target * progress;
                    
                    entry.target.textContent = Math.floor(current).toLocaleString();
                    
                    if (progress < 1) {
                        requestAnimationFrame(update);
                    }
                };
                requestAnimationFrame(update);
                observer.unobserve(entry.target); // Run once
            }
        });
    }, observerOptions);

    counters.forEach(c => observer.observe(c));

    // Print functionality
    document.querySelector('.print-btn')?.addEventListener('click', () => window.print());

    // Close mobile menus on window resize (desktop view)
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            document.querySelectorAll('.nav-section-header, .dropdown').forEach(el => {
                el.classList.remove('active');
            });
            document.getElementById('nav-menu')?.classList.remove('active');
        }
    });

    // Close dropdowns when clicking outside (mobile)
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-section')) {
            document.querySelectorAll('.nav-section-header, .dropdown').forEach(el => {
                el.classList.remove('active');
            });
        }
    });
});
