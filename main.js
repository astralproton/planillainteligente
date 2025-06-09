// Estado global de la aplicación
const AppState = {
    currentQuizQuestion: 0,
    quizScore: 0,
    quizQuestions: [
        {
            question: "¿Cuál es una de nuestras propuestas culturales principales?",
            options: [
                "Feria de las culturas extranjeras",
                "Competencia de videojuegos",
                "Clases de cocina",
                "Torneos de ajedrez"
            ],
            correct: 0
        },
        {
            question: "¿Quién es nuestro candidato a presidente?",
            options: [
                "Alexa García",
                "Carlos Santiago Lemus Barrón",
                "Ariana Rivera",
                "Iker Sandoval"
            ],
            correct: 1
        },
        {
            question: "¿Cuántas propuestas deportivas principales tenemos?",
            options: ["2", "3", "4", "5"],
            correct: 1
        },
        {
            question: "¿Qué tipo de eventos organizaremos?",
            options: [
                "Solo deportivos",
                "Solo culturales",
                "Culturales, deportivos, artísticos y sociales",
                "Solo académicos"
            ],
            correct: 2
        },
        {
            question: "¿Cuál es nuestro lema principal?",
            options: [
                "Vota por el cambio",
                "Piensa big, vota por pig",
                "Juntos somos más",
                "El futuro es nuestro"
            ],
            correct: 1
        },
        {
            question: "¿Qué incluye nuestra propuesta de talleres artísticos?",
            options: [
                "Solo pintura",
                "Arte en chaquira, escultura, pintura y dibujo",
                "Solo música",
                "Solo teatro"
            ],
            correct: 1
        },
        {
            question: "¿Cuál es una de nuestras propuestas sociales?",
            options: [
                "Más tareas",
                "Menos recreos",
                "Podcast semanales informativos",
                "Clases los sábados"
            ],
            correct: 2
        },
        {
            question: "¿Qué queremos crear para mantener informados a los estudiantes?",
            options: [
                "Un periódico mural",
                "Solo WhatsApp",
                "Solo Instagram",
                "Solo Facebook"
            ],
            correct: 0
        },
        {
            question: "¿Cuál es nuestro objetivo principal?",
            options: [
                "Ganar las elecciones",
                "Ser populares",
                "Transformar el CIO con ideas frescas y compromiso ejemplar",
                "Tener más seguidores"
            ],
            correct: 2
        },
        {
            question: "¿Qué tipo de conferencias organizaremos?",
            options: ["Solo deportivas", "Solo académicas", "Sobre distintos temas para motivar y educar", "Solo culturales"],
            correct: 2
        }
    ],
    achievements: [],
    galleryImages: [
        {
            src: "PIGLOGO.png",
            category: "PIG",
            title: "Logotipo de PlanillaInteligente"
        },
        {
            src: "PIGYIPI.jpg",
            category: "PIG",
            title: "PIG Yipee!"
        },
        {
            src: "PigCall.jpg",
            category: "PIG",
            title: "¡Oye! PIG te esta llamando."
        },
        {
            src: "PigMuerto.jpg",
            category: "PIG",
            title: "Se me murio el cochi :("
        }
    ],
    isAccessibilityMode: false
};

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Mostrar loading screen
    showLoadingScreen();
    
    // Inicializar componentes después de un breve delay
    setTimeout(() => {
        hideLoadingScreen();
        initializeNavigation();
        initializeAnimations();
        initializeGallery();
        initializeQuiz();
        initializeProposalFilters();
        
        // Mostrar notificación de bienvenida
        showNotification("¡Bienvenido a PlanillaInteligente! 🎉", "success");
    }, 3000);
}

// Loading Screen
function showLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.display = 'flex';
    }
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
}

// Sistema de notificaciones
function showNotification(message, type = 'success') {
    const container = document.getElementById('notifications-container');
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icon = type === 'success' ? 'fas fa-check-circle' : 
                 type === 'error' ? 'fas fa-exclamation-circle' : 
                 'fas fa-info-circle';
    
    notification.innerHTML = `
        <i class="${icon}"></i>
        <span>${message}</span>
    `;
    
    container.appendChild(notification);
    
    // Auto-remove después de 5 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => {
            if (container.contains(notification)) {
                container.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Navegación
function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links .nav-link');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Cerrar menú al hacer clic en enlaces
        navLinksItems.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
    
    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Animaciones al hacer scroll
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observar todos los elementos que necesitan animación
    document.querySelectorAll('section, .member-card, .proposal-card').forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
    
    // Parallax effect para shapes
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.shape');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
        });
    });
}

// Funciones de utilidad para navegación
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Filtros de propuestas
function initializeProposalFilters() {
    const filterButtons = document.querySelectorAll('.proposal-filters .filter-btn');
    const proposalCategories = document.querySelectorAll('.proposal-category');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remover clase active de todos los botones
            filterButtons.forEach(b => b.classList.remove('active'));
            // Agregar clase active al botón clickeado
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-category');
            
            proposalCategories.forEach(category => {
                if (filter === 'all' || category.getAttribute('data-category') === filter) {
                    category.style.display = 'block';
                    category.style.animation = 'fadeInUp 0.6s ease forwards';
                } else {
                    category.style.display = 'none';
                }
            });
        });
    });
}

// Galería
function initializeGallery() {
    loadGalleryImages();
    setupGalleryFilters();
}

function loadGalleryImages(category = 'all') {
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;
    
    const filteredImages = category === 'all' ? 
        AppState.galleryImages : 
        AppState.galleryImages.filter(img => img.category === category);
    
    galleryGrid.innerHTML = '';
    
    filteredImages.forEach((image, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item card-hover-effect';
        galleryItem.style.animationDelay = `${index * 0.1}s`;
        
        galleryItem.innerHTML = `
            <img src="${image.src}" alt="${image.title}" loading="lazy">
            <div class="gallery-overlay">
                <i class="fas fa-search-plus"></i>
            </div>
        `;
        
        galleryItem.addEventListener('click', () => openImageModal(image));
        galleryGrid.appendChild(galleryItem);
    });
}

function setupGalleryFilters() {
    const filterButtons = document.querySelectorAll('.gallery-filters .filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remover clase active de todos los botones
            filterButtons.forEach(b => b.classList.remove('active'));
            // Agregar clase active al botón clickeado
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            loadGalleryImages(filter);
        });
    });
}

function loadMoreImages() {
    const additionalImages = [
        {
            src: "PIGLOGO2.png",
            category: "PIG",
            title: "No hay más PIGs"
        }
    ];
    
    AppState.galleryImages.push(...additionalImages);
    loadGalleryImages();
    showNotification("Nuevas fotos cargadas", "success");
}

function openImageModal(image) {
    const modalContent = `
        <div class="modal-header">
            <h3>${image.title}</h3>
            <button class="modal-close" onclick="closeModal()">&times;</button>
        </div>
        <div class="modal-body">
            <img src="${image.src}" alt="${image.title}" style="width: 100%; height: auto; border-radius: 10px;">
            <p style="margin-top: 1rem; color: #6c757d;">Categoría: ${image.category}</p>
        </div>
    `;
    
    openModal(modalContent);
}

// Quiz
function initializeQuiz() {
    displayQuizQuestion();
}

function displayQuizQuestion() {
    const quizContent = document.getElementById('quizContent');
    const currentQuestionEl = document.getElementById('currentQuestion');
    const totalQuestionsEl = document.getElementById('totalQuestions');
    const progressEl = document.getElementById('quizProgress');
    
    if (!quizContent) return;
    
    const question = AppState.quizQuestions[AppState.currentQuizQuestion];
    const progress = ((AppState.currentQuizQuestion + 1) / AppState.quizQuestions.length) * 100;
    
    if (currentQuestionEl) currentQuestionEl.textContent = AppState.currentQuizQuestion + 1;
    if (totalQuestionsEl) totalQuestionsEl.textContent = AppState.quizQuestions.length;
    if (progressEl) progressEl.style.width = `${progress}%`;
    
    quizContent.innerHTML = `
        <div class="quiz-question fade-in-up">
            <h3>${question.question}</h3>
            <div class="quiz-options">
                ${question.options.map((option, index) => `
                    <div class="quiz-option" onclick="selectQuizOption(${index})">
                        ${option}
                    </div>
                `).join('')}
            </div>
            <div class="quiz-navigation">
                <button class="quiz-btn secondary" onclick="previousQuestion()" ${AppState.currentQuizQuestion === 0 ? 'disabled' : ''}>
                    <i class="fas fa-arrow-left"></i> Anterior
                </button>
                <button class="quiz-btn primary" id="nextBtn" onclick="nextQuestion()" disabled>
                    Siguiente <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
    `;
}

function selectQuizOption(optionIndex) {
    const options = document.querySelectorAll('.quiz-option');
    const question = AppState.quizQuestions[AppState.currentQuizQuestion];
    
    // Remover selecciones previas
    options.forEach(option => {
        option.classList.remove('selected', 'correct', 'incorrect');
    });
    
    // Marcar opción seleccionada
    options[optionIndex].classList.add('selected');
    
    // Mostrar respuesta correcta después de un delay
    setTimeout(() => {
        options[question.correct].classList.add('correct');
        if (optionIndex !== question.correct) {
            options[optionIndex].classList.add('incorrect');
        } else {
            AppState.quizScore += 10;
            updateQuizScore();
            checkAchievements();
        }
        
        // Habilitar botón siguiente
        document.getElementById('nextBtn').disabled = false;
    }, 500);
}

function nextQuestion() {
    if (AppState.currentQuizQuestion < AppState.quizQuestions.length - 1) {
        AppState.currentQuizQuestion++;
        displayQuizQuestion();
    } else {
        showQuizResults();
    }
}

function previousQuestion() {
    if (AppState.currentQuizQuestion > 0) {
        AppState.currentQuizQuestion--;
        displayQuizQuestion();
    }
}

function updateQuizScore() {
    const scoreEl = document.getElementById('score');
    if (scoreEl) {
        scoreEl.textContent = AppState.quizScore;
    }
}

function showQuizResults() {
    const quizContent = document.getElementById('quizContent');
    const percentage = (AppState.quizScore / (AppState.quizQuestions.length * 10)) * 100;
    
    let message = "";
    if (percentage >= 90) {
        message = "¡Excelente! Conoces perfectamente nuestras propuestas.";
    } else if (percentage >= 70) {
        message = "¡Muy bien! Tienes un buen conocimiento de nuestra campaña.";
    } else if (percentage >= 50) {
        message = "No está mal, pero podrías conocer mejor nuestras propuestas.";
    } else {
        message = "Te recomendamos revisar nuestras propuestas más detalladamente.";
    }
    
    quizContent.innerHTML = `
        <div class="quiz-results">
            <h3>¡Quiz Completado!</h3>
            <div class="final-score">${AppState.quizScore}/${AppState.quizQuestions.length * 10}</div>
            <div class="score-message">${message}</div>
            <div class="quiz-navigation">
                <button class="quiz-btn primary" onclick="restartQuiz()">
                    <i class="fas fa-redo"></i> Reiniciar Quiz
                </button>
                <button class="quiz-btn secondary" onclick="scrollToSection('propuestas')">
                    <i class="fas fa-lightbulb"></i> Ver Propuestas
                </button>
            </div>
        </div>
    `;
    
    showNotification(`Quiz completado: ${AppState.quizScore} puntos`, "success");
}

function restartQuiz() {
    AppState.currentQuizQuestion = 0;
    AppState.quizScore = 0;
    updateQuizScore();
    displayQuizQuestion();
}

function checkAchievements() {
    const achievementsEl = document.getElementById('achievements');
    if (!achievementsEl) return;
    
    const newAchievements = [];
    
    if (AppState.quizScore >= 50 && !AppState.achievements.includes('first_half')) {
        newAchievements.push({ id: 'first_half', text: '¡Primera mitad completada!', icon: 'fas fa-star' });
        AppState.achievements.push('first_half');
    }
    
    if (AppState.quizScore >= 100 && !AppState.achievements.includes('perfect_score')) {
        newAchievements.push({ id: 'perfect_score', text: '¡Puntuación perfecta!', icon: 'fas fa-trophy' });
        AppState.achievements.push('perfect_score');
    }
    
    newAchievements.forEach(achievement => {
        const achievementEl = document.createElement('div');
        achievementEl.className = 'achievement';
        achievementEl.innerHTML = `
            <i class="${achievement.icon}"></i>
            <span>${achievement.text}</span>
        `;
        achievementsEl.appendChild(achievementEl);
    });
}

// Modales
function openModal(content) {
    const modalOverlay = document.getElementById('modalOverlay');
    const modalContent = document.getElementById('modalContent');
    
    if (modalOverlay && modalContent) {
        modalContent.innerHTML = content;
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modalOverlay = document.getElementById('modalOverlay');
    
    if (modalOverlay) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Funciones de modales específicos
function openVotingModal() {
    const modalContent = `
        <div class="modal-header">
            <h3>¡Vota por PlanillaInteligente!</h3>
            <button class="modal-close" onclick="closeModal()">&times;</button>
        </div>
        <div class="modal-body">
            <div style="text-align: center; padding: 2rem;">
                <div style="font-size: 4rem; margin-bottom: 1rem;">🗳️</div>
                <h4>Las elecciones son el 12 de junio de 2025</h4>
                <p>¡Vota por el cambio que el CIO necesita!</p>
                <p>Piensa big, vota por PIG.</p>
                <div style="margin: 2rem 0;">
                </div>
                <center>
                <button class="cta-button primary" onclick="closeModal()">
                    <i class="fas fa-check"></i> ¡Entendido!
                </button>
                </center>
            </div>
        </div>
    `;
    
    openModal(modalContent);
}

function openVideoModal() {
    const modalContent = `
        <div class="modal-header">
            <h3>Video de Presentación</h3>
            <button class="modal-close" onclick="closeModal()">&times;</button>
        </div>
        <div class="modal-body">
            <div style="text-align: center; padding: 2rem;">
                <div style="font-size: 4rem; margin-bottom: 1rem;">🎥</div>
                <h4>Video de Presentación de la Campaña</h4>
                <p>Próximamente estará disponible nuestro video oficial de presentación donde conocerás más sobre nuestras propuestas y equipo.</p>
                <button class="cta-button primary" onclick="closeModal()">
                    <i class="fas fa-bell"></i> Notificarme cuando esté listo
                </button>
            </div>
        </div>
    `;
    
    openModal(modalContent);
    showNotification("Te notificaremos cuando el video esté disponible", "success");
}

function openProfileModal() {
    const modalContent = `
        <div class="modal-header">
            <h3>Perfil Completo - Carlos Santiago</h3>
            <button class="modal-close" onclick="closeModal()">&times;</button>
        </div>
        <div class="modal-body">
            <div style="display: flex; gap: 2rem; align-items: start;">
                <img src="perf/Santiago1.jpg" style="width: 200px; height: 250px; object-fit: cover; border-radius: 10px;">
                <div>
                    <h4>Carlos Santiago Lemus Barrón</h4>
                    <p><strong>Edad:</strong> 15 años</p>
                    <p><strong>Grado:</strong> 3° de Secundaria</p>
                    <p><strong>Promedio:</strong> 9.7</p>
                    <p><strong>Experiencia:</strong> 9 años</p>
                    <h5>Logros Destacados:</h5>
                    <ul>
                        <li>Fue a las olimpiadas matematicas 2 veces</li>
                        <li>Pertenecio a la Escolta</li>
                        <li>Jugo una carrera de 400m</li>
                        <li>Tiene un rendimiento academico excelente</li>
                        <li>Es un muy buen comediante</li>
                        <li>Es un pro player de Fortnite</li>
                    </ul>
                </div>
            </div>
        </div>
    `;
    
    openModal(modalContent);
}

function openBioModal() {
    const modalContent = `
        <div class="modal-header">
            <h3>Biografía Completa</h3>
            <button class="modal-close" onclick="closeModal()">&times;</button>
        </div>
        <div class="modal-body">
            <h4>Carlos Santiago Lemus Barrón</h4>
            <p>Carlos Santiago nació el 14 de agosto de 2010 en la vibrante ciudad de Tijuana, Baja California. Desde una edad temprana, la vida lo llevó a Tepic, Nayarit, donde comenzó a construir su historia.</p>
            
            <p>A los tres años, se adaptó a su nuevo hogar y, poco después, inició su trayectoria en el CIO, una institución que ha sido clave en su desarrollo académico y personal desde el primer grado de primaria.</p>
            
            <p>A lo largo de los años, Carlos ha demostrado una fuerte conexión con su escuela, observando con atención sus fortalezas y las áreas que pueden mejorar. Su compromiso con el bienestar de su comunidad escolar lo ha impulsado a dar un paso más allá: ahora, aspira a convertirse en presidente escolar.</p>
            
            <p>Su objetivo es claro: fortalecer el CIO y hacer de su entorno un espacio aún más enriquecedor para todos sus compañeros. Con ideas frescas y una determinación firme, Carlos Santiago se perfila como un joven líder con visión de cambio, convencido de que con esfuerzo y dedicación, cualquier mejora es posible.</p>
            
            <p>Su historia es apenas el comienzo de un camino lleno de aprendizajes, crecimiento y compromiso con su comunidad.</p>
        </div>
    `;
    
    openModal(modalContent);
}

function openInterviewModal() {
    const modalContent = `
        <div class="modal-header">
            <h3>Entrevista Exclusiva</h3>
            <button class="modal-close" onclick="closeModal()">&times;</button>
        </div>
        <div class="modal-body">
            <div style="text-align: center; padding: 2rem;">
                <div style="font-size: 4rem; margin-bottom: 1rem;">🎤</div>
                <h4>Entrevista Exclusiva con Carlos Santiago</h4>
                <p>Próximamente estará disponible una entrevista exclusiva donde Carlos Santiago responde las preguntas más importantes sobre su campaña y visión para el CIO.</p>
                <div style="margin: 2rem 0;">
                    <strong>Temas a tratar:</strong><br>
                    • Sus propuestas principales<br>
                    • Visión para el futuro del CIO<br>
                    • Planes de implementación<br>
                    • Preguntas de los estudiantes
                </div>
                <button class="cta-button primary" onclick="closeModal()">
                    <i class="fas fa-bell"></i> Notificarme cuando esté lista
                </button>
            </div>
        </div>
    `;
    
    openModal(modalContent);
    showNotification("Te notificaremos cuando la entrevista esté disponible", "success");
}

// Accesibilidad
function toggleAccessibility() {
    AppState.isAccessibilityMode = !AppState.isAccessibilityMode;
    
    if (AppState.isAccessibilityMode) {
        document.body.classList.add('high-contrast');
        showNotification("Modo de alto contraste activado", "success");
    } else {
        document.body.classList.remove('high-contrast');
        showNotification("Modo de alto contraste desactivado", "success");
    }
}

// Formulario de contacto
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const apellido = document.getElementById('apellido').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            showNotification(`¡Gracias ${name} ${apellido} por tu mensaje! Te contactaremos pronto en ${email}.`, "success");
            contactForm.reset();
        });
    }
});

// Event listeners para cerrar modal al hacer clic fuera
document.addEventListener('click', function(e) {
    const modalOverlay = document.getElementById('modalOverlay');
    if (e.target === modalOverlay) {
        closeModal();
    }
});

// Event listener para tecla Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Efectos de parallax suave
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    const parallaxElements = document.querySelectorAll('.parallax');
    parallaxElements.forEach(element => {
        element.style.transform = `translateY(${rate}px)`;
    });
});

// Inicializar tooltips y efectos adicionales
document.addEventListener('DOMContentLoaded', function() {
    // Agregar efectos hover a las tarjetas
    document.querySelectorAll('.member-card, .proposal-card').forEach(card => {
        card.classList.add('card-hover-effect');
    });
    
    // Inicializar animaciones de entrada
    setTimeout(() => {
        document.querySelectorAll('.hero-content > *').forEach((element, index) => {
            element.style.animationDelay = `${index * 0.2}s`;
            element.classList.add('fade-in-up');
        });
    }, 3500);
});

// Función para manejar errores de carga de imágenes
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        e.target.src = 'PIGLOGO.png';
    }
}, true);

console.log("🎉 PlanillaInteligente - Sistema cargado exitosamente!");
console.log("💡 Funcionalidades disponibles:");
console.log("   - Sección de propuestas unificada con filtros");
console.log("   - Quiz gamificado con sistema de logros");
console.log("   - Galería de fotos con filtros");
console.log("   - Sistema de modales interactivos");
console.log("   - Animaciones y efectos visuales");
console.log("   - Sistema de notificaciones");
console.log("   - Modo de accesibilidad");
console.log("🚀 ¡Piensa big, vota por PIG!");