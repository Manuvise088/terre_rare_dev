/* --- 1. SETUP INIZIALE --- */
document.addEventListener('DOMContentLoaded', () => {
    // AOS (Animazioni Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 900, offset: 50, once: true, easing: 'ease-out-cubic' });
    }
    // Vanilla Tilt (Effetto 3D carte)
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".element-card"), {
            max: 5, speed: 1000, glare: true, "max-glare": 0.1, scale: 1.01
        });
    }
});

/* --- 2. LOGICA MENU HAMBURGER (NUOVA) --- */
const menuToggleBtn = document.getElementById('menuToggleBtn');
const hiddenNav = document.getElementById('hidden-nav');

if (menuToggleBtn && hiddenNav) {
    menuToggleBtn.addEventListener('click', () => {
        // Toggle classe 'open' sul bottone (per trasformarlo in X)
        menuToggleBtn.classList.toggle('open');
        // Toggle classe 'active' sul menu (per farlo scorrere da destra a sinistra)
        hiddenNav.classList.toggle('active');
    });
}

/* --- 3. SFONDO INTERATTIVO (PARALLASSE MOUSE) --- */
document.addEventListener('mousemove', (e) => {
    const blobs = document.querySelectorAll('.blob');
    blobs.forEach((blob, index) => {
        const speed = (index + 1) * 25; 
        const x = (window.innerWidth / 2 - e.clientX) / speed;
        const y = (window.innerHeight / 2 - e.clientY) / speed;
        blob.style.transform = `translate(${x}px, ${y}px)`;
    });
});

/* --- 4. QUIZ LOGICA --- */
const quizData = [
    {
        question: "Quale elemento viene usato nelle banconote per l'anti-contraffazione?",
        answers: ["Europio", "Gadolinio", "Samario"],
        correct: 0,
        symbol: "Eu"
    },
    {
        question: "Quale elemento è fondamentale per la Risonanza Magnetica?",
        answers: ["Lutezio", "Gadolinio", "Tulio"],
        correct: 1,
        symbol: "Gd"
    },
    {
        question: "Quale è l'unico lantanide radioattivo?",
        answers: ["Prometio", "Itterbio", "Lutezio"],
        correct: 0,
        symbol: "Pm"
    }
];

let currentQ = 0;
let score = 0;

const qEl = document.getElementById('question');
const ansContainer = document.getElementById('answers-container');
const feedEl = document.getElementById('quiz-feedback');
const nxtBtn = document.getElementById('next-btn');

function loadQuiz() {
    if(!qEl) return;
    nxtBtn.disabled = true;
    feedEl.innerHTML = '';
    ansContainer.innerHTML = '';
    
    if(currentQ < quizData.length) {
        const d = quizData[currentQ];
        qEl.innerHTML = `<span style="color:#2997ff">${d.symbol}</span> &mdash; ${d.question}`;
        
        d.answers.forEach((ans, i) => {
            const btn = document.createElement('button');
            btn.innerText = ans;
            btn.classList.add('answer-btn');
            btn.onclick = () => checkAns(i, btn, d.correct);
            ansContainer.appendChild(btn);
        });
        nxtBtn.innerText = "Prosegui";
        nxtBtn.style.display = 'block';
    } else {
        qEl.innerHTML = "Quiz Completato!";
        ansContainer.innerHTML = `<div style="text-align:center; font-size:1.5rem; margin-top:20px;">Punteggio: ${score}/${quizData.length}</div>`;
        nxtBtn.style.display = 'none';
    }
}

function checkAns(idx, btn, correctIdx) {
    const allBtns = document.querySelectorAll('.answer-btn');
    allBtns.forEach(b => b.disabled = true);
    
    if(idx === correctIdx) {
        score++;
        btn.classList.add('correct');
        feedEl.innerHTML = '<span style="color:#32d74b">Risposta Esatta!</span>';
    } else {
        btn.classList.add('incorrect');
        allBtns[correctIdx].classList.add('correct');
        feedEl.innerHTML = '<span style="color:#ff453a">Sbagliato.</span>';
    }
    nxtBtn.disabled = false;
}

if(nxtBtn) {
    nxtBtn.addEventListener('click', () => {
        currentQ++;
        loadQuiz();
    });
    loadQuiz();
}
