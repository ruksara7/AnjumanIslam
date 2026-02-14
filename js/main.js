document.addEventListener('DOMContentLoaded',()=>{
    // Mobile menu
    document.querySelector('.mobile-menu-toggle')?.addEventListener('click',()=>{
        document.getElementById('nav-menu').classList.toggle('active');
    });
    
    // Font resize
    document.querySelectorAll('.font-resize').forEach(btn=>{
        btn.addEventListener('click',()=>{
            const size=btn.dataset.size;
            document.body.style.fontSize=size==='small'?'14px':size==='large'?'18px':'16px';
        });
    });
    
    // Counters
    const counters=document.querySelectorAll('.stat-number[data-target]');
    const observer=new IntersectionObserver(entries=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                const target=parseInt(entry.target.dataset.target);
                let current=0;
                const increment=target/100;
                const update=()=>{
                    if(current<target){
                        current+=increment;
                        entry.target.textContent=Math.floor(current);
                        requestAnimationFrame(update);
                    }
                };
                update();
            }
        });
    });
    counters.forEach(c=>observer.observe(c));
    
    // Print
    document.querySelector('.print-btn')?.addEventListener('click',()=>window.print());
});
