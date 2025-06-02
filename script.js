document.addEventListener('DOMContentLoaded', function() {
    // Navegación móvil
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li');

    hamburger.addEventListener('click', () => {
        // Toggle para la navegación
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Animación para los elementos de la navegación
        navLinksItems.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });

    // Cerrar menú al hacer clic en un enlace
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            
            navLinksItems.forEach(link => {
                link.style.animation = '';
            });
        });
    });

    // Botón CTA en la sección hero
    const ctaButton = document.querySelector('.cta-button');
    ctaButton.addEventListener('click', () => {
        document.querySelector('#propuestas').scrollIntoView({ behavior: 'smooth' });
    });

    const qnsButton = document.querySelector('.qns-button');
    qnsButton.addEventListener('click', () => {
        document.querySelector('#qns').scrollIntoView({ behavior: 'smooth' });
    });
    
    const presidenteButton = document.querySelector('.presidente-button');
    presidenteButton.addEventListener('click', () => {
        document.querySelector('#presidente').scrollIntoView({ behavior: 'smooth' });
    });

    // Botón de biografía
    const bioButton = document.querySelector('.bio-button');
    bioButton.addEventListener('click', () => {
        // Aquí podrías mostrar un modal con la biografía completa
        alert('Biografía completa de Carlos Santiago Lemus Barrón:\n\nCarlos Santiago nació el 14 de agosto de 2010 en la vibrante ciudad de Tijuana, Baja California. Desde una edad temprana, la vida lo llevó a Tepic, Nayarit, donde comenzó a construir su historia. A los tres años, se adaptó a su nuevo hogar y, poco después, inició su trayectoria en el CIO, una institución que ha sido clave en su desarrollo académico y personal desde el primer grado de primaria. A lo largo de los años, Carlos ha demostrado una fuerte conexión con su escuela, observando con atención sus fortalezas y las áreas que pueden mejorar. Su compromiso con el bienestar de su comunidad escolar lo ha impulsado a dar un paso más allá: ahora, aspira a convertirse en presidente escolar. Su objetivo es claro: fortalecer el CIO y hacer de su entorno un espacio aún más enriquecedor para todos sus compañeros. Con ideas frescas y una determinación firme, Carlos Santiago se perfila como un joven líder con visión de cambio, convencido de que con esfuerzo y dedicación, cualquier mejora es posible. Su historia es apenas el comienzo de un camino lleno de aprendizajes, crecimiento y compromiso con su comunidad.');
    });

    // Formulario de contacto
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener los valores del formulario
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Aquí normalmente enviarías los datos a un servidor
        // Por ahora, solo mostraremos un mensaje de confirmación
        alert(`¡Gracias ${name} por tu mensaje! Te contactaremos pronto en ${email}.`);
        
        // Limpiar el formulario
        contactForm.reset();
    });

    // Animación al hacer scroll
    const animateOnScroll = () => {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('visible');
            }
        });
    };

    // Agregar clase para animación CSS
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('scroll-animation');
    });

    // Listener para el scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Llamar a la función una vez para animar los elementos visibles al cargar
    animateOnScroll();

    // Añadir estilos dinámicos para la animación
    const style = document.createElement('style');
    style.innerHTML = `
        .scroll-animation {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .scroll-animation.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        @keyframes navLinkFade {
            from {
                opacity: 0;
                transform: translateX(50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    `;
    document.head.appendChild(style);
});