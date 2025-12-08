/* --- 1. CONFIGURAZIONE LIBRERIE GRAFICHE (WOW EFFECT) --- */

// Inizializza le animazioni allo scroll (AOS)
document.addEventListener('DOMContentLoaded', () => {
    // Inizializza AOS se caricato
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,  // Durata animazione in millisecondi
            offset: 100,    // Distanza dal bordo per attivare
            once: true      // Anima solo la prima volta
        });
    }

    // Inizializza effetto 3D sulle carte (Vanilla Tilt)
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".element-card"), {
            max: 10,        // Inclinazione massima
            speed: 400,     // Velocità risposta
            glare: true,    // Effetto riflesso
            "max-glare": 0.2,
            scale: 1.02     // Leggero zoom
        });
    }
});


/* --- 2. MENU MOBILE --- */
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenuBtn = document.getElementById('closeMenuBtn');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.add('open');
        mobileMenu.setAttribute('aria-hidden', 'false');
    });
}

if (closeMenuBtn && mobileMenu) {
    closeMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        mobileMenu.setAttribute('aria-hidden', 'true');
    });
}


/* --- 3. LOGICA QUIZ INTERATTIVO --- */
const quizData = [
    {
        question: "Quale elemento è essenziale per il colore **rosso brillante** negli schermi?",
        symbol: "Eu",
        correctAnswerIndex: 0,
        answers: ["Europio", "Gadolinio", "Samario"]
    },
    {
        question: "Quale elemento è usato come mezzo di **contrasto per la Risonanza Magnetica**?",
        symbol: "Gd",
        correctAnswerIndex: 1,
        answers: ["Lutezio", "Gadolinio", "Tulio"]
    },
    {
        question: "Quale elemento crea magneti che resistono a **temperature oltre 300°C**?",
        symbol: "Sm",
        correctAnswerIndex: 2,
        answers: ["Prometio", "Europio", "Samario"]
    },
    {
        question: "Quale lantanide è l'unico **radioattivo e artificiale**?",
        symbol: "Pm",
        correctAnswerIndex: 0,
        answers: ["Prometio", "Itterbio", "Lutezio"]
    },
    {
        question: "Quale elemento è usato nei laser e **fibre ottiche** per internet veloce?",
        symbol: "Yb",
        correctAnswerIndex: 1,
        answers: ["Tulio", "Itterbio", "Gadolinio"]
    }
];

let currentQuizIndex = 0;
let score = 0;
let answered = false;

// Elementi DOM del Quiz
const questionElement = document.getElementById('question');
const answersContainer = document.getElementById('answers-container');
const feedbackElement = document.getElementById('quiz-feedback');
const nextBtn = document.getElementById('next-btn');
const answerButtons = document.querySelectorAll('.answer-btn');

function loadQuiz() {
    if (!questionElement) return; // Evita errori se la pagina non ha il quiz

    answered = false;
    nextBtn.disabled = true;
    feedbackElement.textContent = '';
    
    // Reset pulsanti
    answerButtons.forEach(btn => {
        btn.classList.remove('correct', 'incorrect');
        btn.disabled = false;
        btn.style.opacity = "1";
    });

    if (currentQuizIndex < quizData.length) {
        const currentQuiz = quizData[currentQuizIndex];
        
        // Domanda con simbolo
        questionElement.innerHTML = `<span style="color:var(--colore-primario); margin-right:10px;">(${currentQuiz.symbol})</span> ${currentQuiz.question}`;

        // Carica risposte
        currentQuiz.answers.forEach((answer, index) => {
            if(answerButtons[index]) {
                answerButtons[index].textContent = answer;
                answerButtons[index].dataset.answerIndex = index;
            }
        });
    } else {
        // Fine Quiz
        questionElement.innerHTML = `<span style="color:var(--colore-successo)">Quiz Completato!</span><br>Punteggio: ${score} su ${quizData.length}`;
        answersContainer.innerHTML = `<p style="text-align:center; font-size:1.1em;">Grazie per aver partecipato!</p>`;
        nextBtn.style.display = 'none';
        feedbackElement.style.display = 'none';
    }
}

function checkAnswer(selectedIndex) {
    if (answered) return;
    
    answered = true;
    const currentQuiz = quizData[currentQuizIndex];
    
    answerButtons.forEach(btn => btn.disabled = true);

    if (selectedIndex === currentQuiz.correctAnswerIndex) {
        score++;
        feedbackElement.innerHTML = `<span style="color:var(--colore-successo)"><i class="fa-solid fa-check"></i> Esatto!</span>`;
        answerButtons[selectedIndex].classList.add('correct');
    } else {
        feedbackElement.innerHTML = `<span style="color:#e74c3c"><i class="fa-solid fa-xmark"></i> Errato.</span> Era: <b>${currentQuiz.answers[currentQuiz.correctAnswerIndex]}</b>`;
        answerButtons[selectedIndex].classList.add('incorrect');
        answerButtons[currentQuiz.correctAnswerIndex].classList.add('correct'); 
    }
    
    nextBtn.disabled = false;
}

// Event Listeners Quiz
if (answersContainer) {
    answersContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('answer-btn')) {
            const selectedIndex = parseInt(event.target.dataset.answerIndex);
            checkAnswer(selectedIndex);
        }
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        currentQuizIndex++;
        loadQuiz();
    });
}

// Avvio
loadQuiz();
console.log("Sistema Terre Rare caricato: Menu OK, Quiz OK, Effetti OK.");
