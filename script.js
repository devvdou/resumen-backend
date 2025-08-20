document.addEventListener('DOMContentLoaded', () => {

    // --- Botón de Copiar ---
    const allCopyButtons = document.querySelectorAll('.copy-btn');
    allCopyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const codeBlock = e.currentTarget.parentElement.querySelector('pre');
            const codeText = codeBlock.innerText;
            
            navigator.clipboard.writeText(codeText).then(() => {
                const originalIcon = button.innerHTML;
                button.innerHTML = '<i class="fas fa-check"></i>';
                button.style.color = 'var(--accent-green)';
                button.style.borderColor = 'var(--accent-green)';

                setTimeout(() => {
                    button.innerHTML = originalIcon;
                    button.style.color = 'var(--accent-blue)';
                    button.style.borderColor = 'var(--accent-blue)';
                }, 2000);
            }).catch(err => console.error('Failed to copy: ', err));
        });
    });

    // --- Animación de Secciones al Desplazar (Intersection Observer) ---
    const sections = document.querySelectorAll('.content-section');
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% de la sección debe ser visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Animar solo una vez
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // --- Resaltar Enlace Activo en la Navegación al Desplazar ---
    const navLinks = document.querySelectorAll('.nav-link');
    const allSections = document.querySelectorAll('header, .content-section');

    window.addEventListener('scroll', () => {
        let current = '';
        allSections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 100) { // 100 is offset
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
});