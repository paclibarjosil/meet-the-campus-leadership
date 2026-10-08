/* =====================================================
   CAMPUS LEADERSHIP JAVASCRIPT
===================================================== */


/* =====================================================
   ELEMENTS
===================================================== */

const menuToggle =
    document.getElementById("menuToggle");

const mainNav =
    document.getElementById("mainNav");

const navLinks =
    document.querySelectorAll(".nav-link");


const facultySearch =
    document.getElementById("facultySearch");

const clearSearch =
    document.getElementById("clearSearch");

const facultyGrid =
    document.getElementById("facultyGrid");

const searchResult =
    document.getElementById("searchResult");

const noResults =
    document.getElementById("noResults");


const modal =
    document.getElementById("leaderModal");

const modalOverlay =
    document.querySelector(".modal-overlay");

const closeModalButton =
    document.getElementById("closeModal");

const modalCloseButton =
    document.getElementById("modalCloseButton");


const modalName =
    document.getElementById("modalName");

const modalPosition =
    document.getElementById("modalPosition");

const modalDescription =
    document.getElementById("modalDescription");

const modalLevel =
    document.getElementById("modalLevel");

const modalInitials =
    document.getElementById("modalInitials");


const backToTop =
    document.getElementById("backToTop");

const yearElement =
    document.getElementById("year");


/* =====================================================
   MOBILE MENU
===================================================== */

menuToggle.addEventListener("click", () => {

    mainNav.classList.toggle("open");

    const opened =
        mainNav.classList.contains("open");

    menuToggle.textContent =
        opened ? "×" : "☰";

});


navLinks.forEach(link => {

    link.addEventListener("click", () => {

        mainNav.classList.remove("open");

        menuToggle.textContent = "☰";

    });

});


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );


function updateNavigation() {

    const position =
        window.scrollY + 160;

    let current = "home";

    sections.forEach(section => {

        const top =
            section.offsetTop;

        const height =
            section.offsetHeight;

        if (
            position >= top &&
            position < top + height
        ) {

            current =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        const href =
            link.getAttribute("href");

        if (href === `#${current}`) {

            link.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    updateNavigation
);


/* =====================================================
   FACULTY SEARCH
===================================================== */

const facultyCards =
    Array.from(
        document.querySelectorAll(
            ".faculty-card"
        )
    );


function searchFaculty() {

    const keyword =
        facultySearch.value
            .trim()
            .toLowerCase();


    let count = 0;


    facultyCards.forEach(card => {

        const name =
            card.dataset.name
                .toLowerCase();

        const position =
            card.dataset.position
                .toLowerCase();

        const description =
            card.dataset.description
                .toLowerCase();


        const found =
            keyword === "" ||
            name.includes(keyword) ||
            position.includes(keyword) ||
            description.includes(keyword);


        if (found) {

            card.style.display = "";

            count++;

        } else {

            card.style.display = "none";

        }

    });


    if (keyword !== "") {

        clearSearch.style.display =
            "block";

        searchResult.textContent =
            `${count} ${
                count === 1
                    ? "result"
                    : "results"
            } found`;

    } else {

        clearSearch.style.display =
            "none";

        searchResult.textContent = "";

    }


    if (count === 0) {

        noResults.style.display =
            "block";

        facultyGrid.style.display =
            "none";

    } else {

        noResults.style.display =
            "none";

        facultyGrid.style.display =
            "grid";

    }

}


facultySearch.addEventListener(
    "input",
    searchFaculty
);


/* =====================================================
   CLEAR SEARCH
===================================================== */

clearSearch.addEventListener(
    "click",
    () => {

        facultySearch.value = "";

        searchFaculty();

        facultySearch.focus();

    }
);


/* =====================================================
   MODAL
===================================================== */

function createInitials(name) {

    const words =
        name
            .replace(
                /^(Dr\.|Instr\.)\s*/i,
                ""
            )
            .split(" ")
            .filter(Boolean);


    if (words.length === 0) {

        return "CL";

    }


    if (words.length === 1) {

        return words[0]
            .substring(0,2)
            .toUpperCase();

    }


    return (
        words[0][0] +
        words[words.length - 1][0]
    ).toUpperCase();

}


function openModal(card) {

    if (!card) {
        return;
    }


    const name =
        card.dataset.name || "";

    const position =
        card.dataset.position || "";

    const description =
        card.dataset.description || "";

    const level =
        card.dataset.level || "";


    modalName.textContent =
        name;

    modalPosition.textContent =
        position;

    modalDescription.textContent =
        description;

    modalLevel.textContent =
        level;

    modalInitials.textContent =
        createInitials(name);


    modal.classList.add("open");

    modal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";

}


function closeModal() {

    modal.classList.remove("open");

    modal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        "";

}


closeModalButton.addEventListener(
    "click",
    closeModal
);


modalCloseButton.addEventListener(
    "click",
    closeModal
);


modalOverlay.addEventListener(
    "click",
    closeModal
);


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            modal.classList.contains("open")
        ) {

            closeModal();

        }

    }
);


/* =====================================================
   BACK TO TOP
===================================================== */

window.addEventListener(
    "scroll",
    () => {

        if (window.scrollY > 500) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    }
);


backToTop.addEventListener(
    "click",
    () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


/* =====================================================
   YEAR
===================================================== */

yearElement.textContent =
    new Date().getFullYear();


/* =====================================================
   CARD ANIMATION
===================================================== */

const cards =
    document.querySelectorAll(
        ".leader-card"
    );


const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.style.opacity =
                        "1";

                    entry.target.style.transform =
                        "translateY(0)";

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.08
        }
    );


cards.forEach((card, index) => {

    card.style.opacity = "0";

    card.style.transform =
        "translateY(20px)";

    card.style.transition =
        `opacity .5s ease ${index * .05}s,
         transform .5s ease ${index * .05}s,
         box-shadow .3s ease`;

    observer.observe(card);

});


/* =====================================================
   INITIALIZE
===================================================== */

updateNavigation();

searchFaculty();