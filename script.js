
const cards = document.querySelectorAll(".card");
const details = document.querySelector("#course-details");
const title = document.querySelector("#course-title");
const description = document.querySelector("#course-description");
const closeButton = document.querySelector("#close-course");
const readButton = document.querySelector("#read-course");
const courseContent = document.querySelector("#course-content");

let selectedCourse = "";

const courses = {
    "Géologie du Maroc": {
        description: "Découvrez l'histoire géologique du Maroc.",
        lesson: `
            <h3>Introduction à la géologie du Maroc</h3>
            <p>
                Le Maroc possède une histoire géologique complexe.
                Il comprend plusieurs domaines géologiques, notamment
                le Rif, la Meseta, le Haut Atlas et l'Anti-Atlas.
            </p>
            <h4>Objectif du cours</h4>
            <p>
                Comprendre l'évolution des roches, les déformations
                tectoniques et les grandes étapes de l'histoire
                géologique du Maroc.
            </p>
        `
    },

    "Télédétection": {
        description: "Apprenez à interpréter les images satellitaires.",
        lesson: `
            <h3>Introduction à la télédétection</h3>
            <p>
                La télédétection permet d'obtenir des informations
                sur la surface terrestre à distance, notamment
                grâce aux satellites.
            </p>
            <h4>Exemple</h4>
            <p>
                Les images Sentinel-2 peuvent aider à étudier
                la végétation, les sols et certaines structures
                géologiques.
            </p>
        `
    },

    "Topographie": {
        description: "Découvrez les mesures et les calculs topographiques.",
        lesson: `
            <h3>Introduction à la topographie</h3>
            <p>
                La topographie permet de mesurer et de représenter
                les positions, les distances et les altitudes
                des points sur le terrain.
            </p>
            <h4>Applications</h4>
            <p>
                Les mesures topographiques sont utiles pour
                réaliser des plans et étudier le relief.
            </p>
        `
    },

    "Géomatique": {
        description: "Explorez la cartographie et les SIG.",
        lesson: `
            <h3>Introduction à la géomatique</h3>
            <p>
                La géomatique regroupe les méthodes et les outils
                permettant d'acquérir, de gérer et d'analyser
                des données géographiques.
            </p>
            <h4>Exemple</h4>
            <p>
                QGIS est un logiciel SIG qui permet de créer
                des cartes et d'analyser des données spatiales.
            </p>
        `
    }
};

cards.forEach(function(card) {
    card.addEventListener("click", function() {
        selectedCourse = card.querySelector("h3").textContent;

        title.textContent = selectedCourse;
        description.textContent =
            courses[selectedCourse].description;

        courseContent.hidden = true;
        courseContent.innerHTML = "";
        details.hidden = false;

        details.scrollIntoView({ behavior: "smooth" });
    });
});

readButton.addEventListener("click", function() {
    if (selectedCourse === "") return;

    courseContent.innerHTML =
        courses[selectedCourse].lesson;

    courseContent.hidden = false;
    courseContent.scrollIntoView({ behavior: "smooth" });
});

closeButton.addEventListener("click", function() {
    details.hidden = true;
    courseContent.hidden = true;
});
