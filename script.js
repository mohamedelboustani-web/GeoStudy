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

const quizQuestions = Object.fromEntries(Object.entries({"Géologie du Maroc":[["Quel domaine géologique se trouve au sud du Haut Atlas ?",["Le Rif","L’Anti-Atlas","La chaîne des Alpes"],1,"L’Anti-Atlas se situe au sud du Haut Atlas."],["Que permet l’étude des plis et des failles ?",["De reconstituer des déformations tectoniques","De mesurer la météo uniquement","De connaître automatiquement l’âge exact de toute roche"],0,"Les structures tectoniques renseignent sur les contraintes et l’histoire des roches."],["À quoi correspond une boutonnière géologique ?",["Un cratère volcanique récent","Une zone où l’érosion expose des terrains anciens","Une vallée toujours glaciaire"],1,"L’érosion peut mettre à l’affleurement un socle ancien entouré de terrains plus récents."],["Quel est l’âge général du cycle éburnéen ?",["Paléoprotérozoïque","Quaternaire","Jurassique"],0,"Le cycle éburnéen est associé à des événements paléoprotérozoïques."],["Le cycle panafricain est principalement associé à :",["Des événements néoprotérozoïques","La glaciation actuelle","La formation des Alpes au Cénozoïque"],0,"L’orogenèse panafricaine regroupe plusieurs événements tectono-métamorphiques néoprotérozoïques."],["Que sont les ophiolites ?",["Des fragments de lithosphère océanique","Des fossiles de plantes","Des dépôts éoliens uniquement"],0,"Les ophiolites regroupent des roches représentant des fragments de lithosphère océanique."],["Bou Azzer–El Graara est particulièrement connu pour :",["Ses unités ophiolitiques et sa métallogénie","Ses glaciers permanents","Ses récifs coralliens actuels"],0,"Le secteur est important pour l’étude des ophiolites et des minéralisations, notamment en cobalt."],["Quel processus peut placer des roches océaniques sur un continent ?",["L’obduction","La condensation atmosphérique","La compaction seule"],0,"L’obduction correspond au charriage de lithosphère océanique sur une marge continentale."],["La stratigraphie étudie principalement :",["La succession et les relations entre couches","La vitesse du vent","Les orbites des satellites"],0,"Elle analyse la succession, l’âge relatif et les relations des formations géologiques."],["Dans une série non renversée, le principe de superposition indique généralement que :",["La couche inférieure est plus ancienne","La couche supérieure est toujours plus ancienne","Toutes les couches ont le même âge"],0,"Dans une série non renversée, les couches inférieures se sont déposées avant les couches supérieures."],["Une structure qui en recoupe une autre est généralement :",["Plus récente que la structure recoupée","Toujours plus ancienne","Sans relation chronologique possible"],0,"Le principe de recoupement aide à établir une chronologie relative."],["Le Groupe de Ouarzazate est notamment associé à :",["Des formations volcano-sédimentaires édiacariennes","Des dépôts glaciaires quaternaires uniquement","Des sables de plage actuels"],0,"Les séries du Groupe de Ouarzazate enregistrent notamment du volcanisme et de la sédimentation édiacariens."],["L’orogenèse hercynienne est aussi appelée :",["Orogenèse varisque","Cycle éburnéen","Cycle alpin uniquement"],0,"Hercynien et varisque sont deux noms employés pour cette orogenèse paléozoïque."],["Une discordance peut indiquer :",["Une phase d’érosion ou de non-dépôt","Une absence certaine de toute histoire géologique","Un changement quotidien de température"],0,"Une discordance marque souvent une interruption de l’enregistrement sédimentaire et/ou une érosion."],["Pour interpréter une carte géologique, il faut d’abord :",["Décrire la légende, les unités et leurs contacts","Donner une conclusion sans observer la carte","Ignorer l’échelle et l’orientation"],0,"La description du document et de ses unités précède l’interprétation argumentée."]],"Télédétection":[["Que désigne la télédétection ?",["L’acquisition d’informations à distance","La mesure uniquement avec un ruban","La fabrication de roches"],0,"Elle permet d’obtenir des informations sans contact direct avec la surface étudiée."],["Sentinel-2 est une mission principalement destinée à :",["L’observation optique multispectrale de la Terre","La détection exclusive des séismes sous-marins","La mesure directe du noyau terrestre"],0,"Sentinel-2 fournit des images optiques multispectrales utiles pour surveiller les surfaces terrestres."],["Un pixel d’image représente généralement :",["Une cellule de l’image associée à une mesure","Un satellite complet","Toujours une roche individuelle"],0,"Chaque pixel contient une ou plusieurs valeurs numériques liées à une portion de la scène."],["La résolution spatiale indique principalement :",["La taille au sol représentée par un pixel","Le nombre de langues du logiciel","La température du satellite"],0,"Une résolution spatiale plus fine permet de distinguer des détails plus petits."],["La résolution spectrale concerne :",["Les bandes et leur sensibilité aux longueurs d’onde","La taille du fichier uniquement","La vitesse du vent au sol"],0,"Elle décrit les intervalles de longueurs d’onde et la capacité à distinguer des signatures spectrales."],["Une image multispectrale contient :",["Plusieurs bandes spectrales","Une seule valeur sans information spectrale","Uniquement des photographies nocturnes"],0,"Chaque bande enregistre l’énergie dans une partie déterminée du spectre."],["Le proche infrarouge est souvent utile pour étudier :",["La végétation","Le son des rivières","La profondeur du noyau terrestre"],0,"La végétation saine réfléchit fortement le proche infrarouge."],["L’indice NDVI utilise principalement :",["Le rouge et le proche infrarouge","Le bleu et le son","Les précipitations et la pression"],0,"Le NDVI compare la réflectance dans le rouge et le proche infrarouge pour caractériser la végétation."],["Avant de comparer deux images prises à des dates différentes, il est utile de vérifier :",["Leur correction, leur emprise et leurs conditions d’acquisition","Uniquement le nom du fichier","Seulement la couleur de l’écran"],0,"Les différences de géométrie, d’atmosphère, de saison ou de traitement peuvent fausser la comparaison."],["Une composition colorée consiste à :",["Affecter des bandes aux canaux rouge, vert et bleu","Transformer tous les pixels en coordonnées GPS","Supprimer les bandes spectrales"],0,"Le choix des bandes RGB influence les couleurs et les éléments visibles."],["La résolution temporelle correspond à :",["La fréquence de revisite ou de disponibilité des observations","La taille physique du satellite","La hauteur d’une montagne"],0,"Elle indique à quelle fréquence une zone peut être observée."],["Une signature spectrale décrit :",["La réponse d’un matériau selon les longueurs d’onde","La forme d’une courbe de niveau uniquement","Le poids d’un fichier"],0,"Les matériaux réfléchissent ou émettent différemment selon les longueurs d’onde."],["Les nuages dans une image optique peuvent :",["Masquer la surface terrestre","Améliorer toujours la visibilité du sol","Changer les coordonnées de tous les pixels automatiquement"],0,"Les nuages et leurs ombres limitent l’observation de la surface."],["La télédétection remplace-t-elle toutes les observations de terrain ?",["Non, elle est souvent complémentaire","Oui, dans tous les cas","Oui, elle fournit toujours la composition exacte des roches"],0,"Les vérifications de terrain aident à valider et interpréter les résultats satellitaires."],["Pour cartographier l’occupation du sol, on peut utiliser :",["Des images classées et des données de validation","Uniquement un thermomètre","Un tableau sans données géographiques"],0,"La classification d’images peut distinguer des classes, qui doivent être contrôlées par des données fiables."]],"Topographie":[["Quel est un objectif de la topographie ?",["Mesurer et représenter positions, distances et altitudes","Identifier uniquement des minéraux au microscope","Observer les étoiles uniquement"],0,"La topographie décrit la géométrie et le relief d’une zone."],["Quel instrument mesure des angles et des distances ?",["Une station totale","Un microscope optique","Un pluviomètre"],0,"La station totale combine mesure angulaire et mesure électronique de distance."],["À quoi sert un niveau topographique ?",["À déterminer des différences d’altitude","À mesurer la composition chimique d’une roche","À enregistrer les couleurs d’un satellite"],0,"Le nivellement permet de calculer les dénivelées entre des points."],["Le trépied sert principalement à :",["Installer et stabiliser un instrument","Mesurer directement la température du sol","Remplacer la mire"],0,"Le trépied fournit un support stable à l’instrument de mesure."],["Une mire de nivellement est utilisée avec :",["Un niveau","Un microscope électronique","Une boussole marine uniquement"],0,"La lecture sur mire permet de calculer les différences d’altitude."],["L’altitude d’un point est généralement référée à :",["Un datum vertical ou niveau de référence","La couleur du terrain","La longueur du carnet de terrain"],0,"Une altitude nécessite un référentiel vertical défini."],["Un azimut est généralement mesuré :",["Dans le plan horizontal à partir d’une direction de référence","Verticalement à partir du centre de la Terre uniquement","En kilogrammes"],0,"L’azimut exprime une direction horizontale selon une convention de référence."],["Combien de degrés contient un angle plat ?",["90°","180°","360°"],1,"Un angle plat mesure 180 degrés."],["Combien de degrés contient un tour complet ?",["90°","180°","360°"],2,"Un tour complet correspond à 360 degrés ou 2π radians."],["Un radian est défini par un angle qui intercepte un arc de longueur :",["Égale au rayon du cercle","Égale au diamètre dans tous les cas","Toujours nul"],0,"Un radian intercepte un arc dont la longueur est égale au rayon."],["Une courbe de niveau relie des points de :",["Même altitude","Même longitude uniquement","Même nature minéralogique obligatoirement"],0,"Chaque courbe de niveau représente une altitude constante."],["Une échelle 1:1 000 signifie que 1 cm sur le plan représente :",["10 m sur le terrain","1 m sur le terrain","100 m sur le terrain"],0,"À cette échelle, 1 cm représente 1 000 cm, soit 10 m."],["La fermeture d’un cheminement permet notamment de :",["Contrôler les erreurs et la cohérence des mesures","Changer l’échelle automatiquement","Identifier l’âge des roches"],0,"L’erreur de fermeture aide à évaluer la qualité d’un cheminement."],["Une pente peut être exprimée en pourcentage par :",["(dénivelée / distance horizontale) × 100","distance × altitude","altitude / température"],0,"La pente en pourcentage est le rapport entre dénivelée et distance horizontale, multiplié par 100."],["Avant de commencer un levé, il faut notamment :",["Vérifier l’installation, le centrage et le nivellement de l’instrument","Ignorer les unités","Déplacer l’instrument pendant chaque lecture"],0,"Une installation correcte limite les erreurs systématiques de mesure."]],"Géomatique":[["Que signifie SIG ?",["Système d’information géographique","Système interne géologique","Satellite d’imagerie gravimétrique"],0,"Un SIG permet de gérer, analyser et représenter des données géographiques."],["Quel logiciel libre permet de créer et analyser des cartes ?",["QGIS","Un lecteur audio","Un traitement de texte uniquement"],0,"QGIS est un logiciel SIG libre et open source."],["Un fichier Shapefile peut contenir :",["Des entités géographiques vectorielles","Uniquement une vidéo","Uniquement du texte sans géométrie"],0,"Le Shapefile stocke des géométries vectorielles et leurs attributs dans plusieurs fichiers associés."],["Les données vectorielles représentent généralement :",["Points, lignes et polygones","Uniquement des pixels d’image","Uniquement des sons"],0,"Les objets vectoriels sont représentés par des géométries ponctuelles, linéaires ou surfaciques."],["Les données raster sont organisées en :",["Cellules ou pixels","Triangles uniquement sans valeurs","Paragraphes de texte uniquement"],0,"Un raster est une grille de cellules qui contiennent des valeurs."],["Une couche de points peut représenter :",["Des puits, stations ou sites d’échantillonnage","Une surface continue obligatoirement","Une route avec sa largeur réelle obligatoirement"],0,"Les points servent à localiser des objets ou observations ponctuelles."],["Le système de coordonnées permet de :",["Situer les données dans un référentiel spatial","Déterminer automatiquement la composition chimique","Améliorer la résolution d’une photo"],0,"Le système de coordonnées définit comment les positions sont référencées."],["Que signifie reprojeter une couche ?",["Transformer ses coordonnées vers un autre système de référence","Changer son nom uniquement","Supprimer sa géométrie"],0,"La reprojection transforme les coordonnées d’un système vers un autre."],["La table attributaire contient :",["Des informations descriptives liées aux entités","Uniquement les couleurs de l’écran","Le code source du système d’exploitation"],0,"Chaque entité peut être associée à des champs descriptifs dans la table attributaire."],["Une jointure attributaire sert à :",["Associer des informations entre tables grâce à un champ commun","Déplacer une montagne sur la carte","Convertir un raster en son"],0,"La jointure relie des enregistrements à partir d’une clé commune."],["Un modèle numérique de terrain représente principalement :",["La topographie ou l’altitude d’une surface","La population uniquement","Les noms de rues sans coordonnées"],0,"Un MNT décrit les valeurs d’altitude d’une surface terrestre."],["L’outil tampon (buffer) crée :",["Une zone à distance donnée autour d’entités","Une nouvelle projection automatiquement","Une légende sans données"],0,"Le buffer construit une zone autour de points, lignes ou polygones à une distance définie."],["L’analyse d’intersection permet de :",["Identifier les zones communes entre des couches","Supprimer tous les attributs","Calculer le climat sans données"],0,"L’intersection extrait les portions spatiales communes entre les entrées."],["Une légende cartographique sert à :",["Expliquer la signification des symboles","Indiquer uniquement la taille du fichier","Remplacer l’échelle"],0,"La légende aide le lecteur à interpréter les couleurs et symboles de la carte."],["Avant de présenter une carte, il faut vérifier :",["Le titre, la légende, l’échelle, l’orientation et les sources","Uniquement la couleur de fond","Que les couches n’aient aucun nom"],0,"Ces éléments facilitent la lecture et documentent la carte produite."]]}).map(([course, items]) => [course, items.map(([question, options, answer, explanation]) => ({ question, options, answer, explanation }))]));

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
        <p class="quiz-intro">15 questions pour vérifier vos connaissances. Répondez à toutes les questions, puis consultez votre score et les explications.</p>
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
        <h4>Votre résultat : ${score} / ${questions.length} (${Math.round(score / questions.length * 100)} %)</h4>
        <p class="quiz-feedback">${score === questions.length ? "Excellent ! Toutes les réponses sont correctes." : score >= Math.ceil(questions.length * 0.7) ? "Très bien ! Relisez les explications pour consolider vos acquis." : "Continuez à vous entraîner : relisez les explications et réessayez."}</p>
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
