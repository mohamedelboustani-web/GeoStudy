const cards = document.querySelectorAll(".card");
const searchInput = document.querySelector("#course-search");
const searchStatus = document.querySelector("#search-status");
const details = document.querySelector("#course-details");
const title = document.querySelector("#course-title");
const description = document.querySelector("#course-description");
const closeButton = document.querySelector("#close-course");
const readButton = document.querySelector("#read-course");
const showQuizButton = document.querySelector("#show-quiz");
const courseContent = document.querySelector("#course-content");
const courseQuiz = document.querySelector("#course-quiz");

let selectedCourse = "";

const courses = {
    "Géologie du Maroc": {
        description: "Découvrez l'histoire géologique du Maroc.",
        lesson: `
            <h3>Introduction à la géologie du Maroc</h3>
            <p>Le Maroc possède une histoire géologique complexe. Il comprend plusieurs domaines géologiques, notamment le Rif, la Meseta, le Haut Atlas et l'Anti-Atlas.</p>
            <h4>Dans le cours complet</h4>
            <ul>
                <li>Les domaines géologiques du Maroc et les boutonnières de l'Anti-Atlas.</li>
                <li>Les cycles éburnéen et panafricain.</li>
                <li>Les massifs de Saghro, Bou Azzer–El Graara et Kerdous.</li>
                <li>Les ophiolites, la couverture paléozoïque et l'orogenèse hercynienne.</li>
            </ul>
            <p><a class="full-course-link" href="geologie-maroc.html">Ouvrir le cours complet de Géologie du Maroc →</a></p>
            <h4>Objectif du cours</h4>
            <p>Comprendre l'évolution des roches, les déformations tectoniques et les grandes étapes de l'histoire géologique du Maroc.</p>
        `
    },
    "Télédétection": {
        description: "Apprenez à interpréter les images satellitaires.",
        lesson: `
            <h3>Introduction à la télédétection</h3>
            <p>La télédétection permet d'obtenir des informations sur la surface terrestre à distance, notamment grâce aux satellites.</p>
            <h4>Exemple</h4>
            <p>Les images Sentinel-2 peuvent aider à étudier la végétation, les sols et certaines structures géologiques.</p>
        `
    },
    "Topographie": {
        description: "Découvrez les mesures et les calculs topographiques.",
        lesson: `
            <h3>Introduction à la topographie</h3>
            <p>La topographie permet de mesurer et de représenter les positions, les distances et les altitudes des points sur le terrain.</p>
            <h4>Applications</h4>
            <p>Les mesures topographiques sont utiles pour réaliser des plans et étudier le relief.</p>
        `
    },
    "Géomatique": {
        description: "Explorez la cartographie et les SIG.",
        lesson: `
            <h3>Introduction à la géomatique</h3>
            <p>La géomatique regroupe les méthodes et les outils permettant d'acquérir, de gérer et d'analyser des données géographiques.</p>
            <h4>Exemple</h4>
            <p>QGIS est un logiciel SIG qui permet de créer des cartes et d'analyser des données spatiales.</p>
        `
    }
};

const quizQuestions = {
    "Géologie du Maroc": [
        { question: "Quel domaine géologique se trouve au sud du Haut Atlas ?", options: ["Le Rif", "L’Anti-Atlas", "La chaîne alpine des Alpes"], answer: 1, explanation: "L’Anti-Atlas se situe au sud du Haut Atlas et expose notamment un socle précambrien." },
        { question: "Que permet l’étude des structures tectoniques ?", options: ["De comprendre les déformations et l’évolution géologique", "De mesurer uniquement la température de l’air", "De déterminer directement l’âge de chaque roche sans analyse"], answer: 0, explanation: "Les plis, failles et autres structures aident à reconstituer l’histoire tectonique." }
    ],
    "Télédétection": [
        { question: "Que désigne la télédétection ?", options: ["La mesure de terrain uniquement avec un ruban", "L’acquisition d’informations à distance, par exemple par satellite", "La fabrication de roches en laboratoire"], answer: 1, explanation: "La télédétection recueille des informations sans contact direct avec la surface étudiée." },
        { question: "À quoi peuvent servir les images Sentinel-2 ?", options: ["À observer la végétation et l’occupation du sol", "À remplacer toutes les mesures de terrain", "À enregistrer directement les séismes sous-marins"], answer: 0, explanation: "Sentinel-2 fournit des images multispectrales utiles pour suivre la surface terrestre." }
    ],
    "Topographie": [
        { question: "Quel est un objectif de la topographie ?", options: ["Représenter les positions et altitudes des points", "Identifier les espèces uniquement au microscope", "Mesurer la composition chimique du magma à distance"], answer: 0, explanation: "La topographie mesure et représente les positions, distances et altitudes." },
        { question: "Quel instrument est couramment utilisé pour mesurer des angles et des directions ?", options: ["Un microscope optique", "Une station totale", "Un thermomètre médical"], answer: 1, explanation: "Une station totale combine des mesures angulaires et de distance." }
    ],
    "Géomatique": [
        { question: "Que signifie SIG ?", options: ["Système d’information géographique", "Système interne géologique", "Satellite d’imagerie gravimétrique"], answer: 0, explanation: "Un SIG sert à gérer, analyser et représenter des données géographiques." },
        { question: "Quel logiciel libre est utilisé pour créer et analyser des cartes ?", options: ["QGIS", "Un traitement de texte uniquement", "Un lecteur audio"], answer: 0, explanation: "QGIS est un logiciel SIG libre et open source." }
    ]
};

function openCourse(card) {
    const heading = card.querySelector("h3");
    if (!heading) return;

    selectedCourse = heading.textContent.trim();
    const course = courses[selectedCourse];
    if (!course) return;

    title.textContent = selectedCourse;
    description.textContent = course.description;
    courseContent.hidden = true;
    courseContent.replaceChildren();
    courseQuiz.hidden = true;
    courseQuiz.replaceChildren();
    readButton.setAttribute("aria-pressed", "false");
    showQuizButton.setAttribute("aria-pressed", "false");
    details.hidden = false;
    details.scrollIntoView({ behavior: "smooth", block: "start" });
    closeButton.focus({ preventScroll: true });
}

function normalizeSearchText(value) {
    return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

searchInput.addEventListener("input", () => {
    const query = normalizeSearchText(searchInput.value);
    let visibleCount = 0;

    cards.forEach((card) => {
        const searchableText = normalizeSearchText(card.textContent);
        const matches = searchableText.includes(query);
        card.hidden = !matches;
        if (matches) visibleCount += 1;
    });

    searchStatus.textContent = query
        ? (visibleCount === 0
            ? "Aucune matière trouvée. Essayez un autre mot-clé."
            : `${visibleCount} matière(s) trouvée(s).`)
        : "";
});

cards.forEach((card) => {
    card.addEventListener("click", () => openCourse(card));
    card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openCourse(card);
        }
    });
});

readButton.addEventListener("click", () => {
    if (!selectedCourse || !courses[selectedCourse]) return;
    courseContent.innerHTML = courses[selectedCourse].lesson;
    courseContent.hidden = false;
    courseQuiz.hidden = true;
    readButton.setAttribute("aria-pressed", "true");
    showQuizButton.setAttribute("aria-pressed", "false");
    courseContent.scrollIntoView({ behavior: "smooth", block: "start" });
});

showQuizButton.addEventListener("click", () => {
    if (!selectedCourse || !quizQuestions[selectedCourse]) return;

    courseContent.hidden = true;
    readButton.setAttribute("aria-pressed", "false");
    showQuizButton.setAttribute("aria-pressed", "true");
    const questions = quizQuestions[selectedCourse];
    courseQuiz.innerHTML = `
        <h3>Quiz de révision — ${selectedCourse}</h3>
        <p class="quiz-intro">Répondez aux questions, puis vérifiez vos réponses pour voir votre score et les explications.</p>
        <form id="quiz-form">
            ${questions.map((question, index) => `
                <fieldset class="quiz-question">
                    <legend>${index + 1}. ${question.question}</legend>
                    ${question.options.map((option, optionIndex) => `
                        <label class="quiz-option">
                            <input type="radio" name="question-${index}" value="${optionIndex}">
                            <span>${option}</span>
                        </label>
                    `).join("")}
                </fieldset>
            `).join("")}
            <button id="check-quiz" type="button">Vérifier mes réponses</button>
        </form>
        <div id="quiz-result" class="quiz-result" aria-live="polite"></div>
    `;
    courseQuiz.hidden = false;
    courseQuiz.scrollIntoView({ behavior: "smooth", block: "start" });
});

courseQuiz.addEventListener("click", (event) => {
    if (event.target.id !== "check-quiz") return;

    const questions = quizQuestions[selectedCourse];
    const form = courseQuiz.querySelector("#quiz-form");
    const result = courseQuiz.querySelector("#quiz-result");
    let score = 0;
    let answered = 0;

    questions.forEach((question, index) => {
        const selected = form.querySelector(`input[name="question-${index}"]:checked`);
        if (selected) {
            answered += 1;
            if (Number(selected.value) === question.answer) score += 1;
        }
    });

    if (answered < questions.length) {
        result.textContent = `Vous avez répondu à ${answered} question(s) sur ${questions.length}. Répondez à toutes les questions avant de vérifier.`;
        result.className = "quiz-result";
        return;
    }

    result.innerHTML = `
        <h4>Votre résultat : ${score} / ${questions.length}</h4>
        <ol class="quiz-corrections">
            ${questions.map((question, index) => {
                const selected = Number(form.querySelector(`input[name="question-${index}"]:checked`).value);
                const correct = selected === question.answer;
                return `<li class="${correct ? "answer-correct" : "answer-incorrect"}">
                    <strong>${correct ? "Bonne réponse" : "À revoir"} :</strong>
                    ${question.options[question.answer]}<br>
                    <span>${question.explanation}</span>
                </li>`;
            }).join("")}
        </ol>
        <button id="retry-quiz" type="button">Recommencer le quiz</button>
    `;
    result.className = "quiz-result";
});

courseQuiz.addEventListener("click", (event) => {
    if (event.target.id === "retry-quiz") showQuizButton.click();
});

closeButton.addEventListener("click", () => {
    details.hidden = true;
    courseContent.hidden = true;
    courseQuiz.hidden = true;
    courseQuiz.replaceChildren();
    selectedCourse = "";
    const firstCard = document.querySelector(".card");
    if (firstCard) firstCard.focus({ preventScroll: true });
});
