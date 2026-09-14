/* =========================
   SELECT ELEMENTS
========================= */

const galleryItems =
    document.querySelectorAll(".gallery-item");

const lightbox =
    document.querySelector("#lightbox");

const lightboxImage =
    document.querySelector("#lightboxImage");

const lightboxTitle =
    document.querySelector("#lightboxTitle");

const lightboxCategory =
    document.querySelector("#lightboxCategory");

const imageCounter =
    document.querySelector("#imageCounter");

const closeBtn =
    document.querySelector("#closeBtn");

const prevBtn =
    document.querySelector("#prevBtn");

const nextBtn =
    document.querySelector("#nextBtn");

const filterButtons =
    document.querySelectorAll(".filter-btn");

const searchInput =
    document.querySelector("#searchInput");


/* =========================
   VARIABLES
========================= */

let visibleItems =
    [...galleryItems];

let currentIndex = 0;

let selectedCategory = "all";


/* =========================
   SHOW IMAGE
========================= */

function showImage(index) {

    const item =
        visibleItems[index];

    const image =
        item.querySelector("img");

    const title =
        item.querySelector("h3");

    const category =
        item.querySelector("p");


    /* Change lightbox image */

    lightboxImage.src =
        image.src;


    /* Change alt text */

    lightboxImage.alt =
        image.alt;


    /* Change title */

    lightboxTitle.textContent =
        title.textContent;


    /* Change category */

    lightboxCategory.textContent =
        category.textContent;


    /* Change counter */

    imageCounter.textContent =
        `${index + 1} / ${visibleItems.length}`;
}


/* =========================
   OPEN LIGHTBOX
========================= */

galleryItems.forEach((item) => {

    item.addEventListener("click", () => {

        currentIndex =
            visibleItems.indexOf(item);

        showImage(currentIndex);

        lightbox.classList.add("active");

    });

});


/* =========================
   CLOSE LIGHTBOX
========================= */

closeBtn.addEventListener("click", () => {

    lightbox.classList.remove("active");

});


/* =========================
   NEXT IMAGE
========================= */

nextBtn.addEventListener("click", () => {

    currentIndex++;


    /* If we reach the end */

    if (
        currentIndex >=
        visibleItems.length
    ) {

        currentIndex = 0;

    }


    showImage(currentIndex);

});


/* =========================
   PREVIOUS IMAGE
========================= */

prevBtn.addEventListener("click", () => {

    currentIndex--;


    /* If we go before first image */

    if (currentIndex < 0) {

        currentIndex =
            visibleItems.length - 1;

    }


    showImage(currentIndex);

});


/* =========================
   CLICK OUTSIDE LIGHTBOX
========================= */

lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {

        lightbox.classList.remove("active");

    }

});


/* =========================
   KEYBOARD NAVIGATION
========================= */

document.addEventListener("keydown", (event) => {


    /* Escape */

    if (event.key === "Escape") {

        lightbox.classList.remove("active");

    }


    /* Don't navigate if lightbox
       is closed */

    if (
        !lightbox.classList.contains("active")
    ) {

        return;

    }


    /* Right arrow */

    if (event.key === "ArrowRight") {

        currentIndex++;


        if (
            currentIndex >=
            visibleItems.length
        ) {

            currentIndex = 0;

        }


        showImage(currentIndex);

    }


    /* Left arrow */

    if (event.key === "ArrowLeft") {

        currentIndex--;


        if (currentIndex < 0) {

            currentIndex =
                visibleItems.length - 1;

        }


        showImage(currentIndex);

    }

});


/* =========================
   FILTER GALLERY
========================= */

function filterGallery() {

    const searchText =
        searchInput.value
        .toLowerCase()
        .trim();


    /* Find matching images */

    visibleItems =
        [...galleryItems].filter((item) => {


            const itemCategory =
                item.dataset.category;


            const title =
                item
                .querySelector("h3")
                .textContent
                .toLowerCase();


            /* Category check */

            const categoryMatch =
                selectedCategory === "all" ||
                selectedCategory === itemCategory;


            /* Search check */

            const searchMatch =
                title.includes(searchText);


            /* Both must be true */

            return (
                categoryMatch &&
                searchMatch
            );

        });


    /* Show / hide cards */

    galleryItems.forEach((item) => {

        if (
            visibleItems.includes(item)
        ) {

            item.style.display = "block";

        } else {

            item.style.display = "none";

        }

    });


    /* Reset lightbox index */

    currentIndex = 0;

}


/* =========================
   CATEGORY BUTTONS
========================= */

filterButtons.forEach((button) => {

    button.addEventListener("click", () => {


        /* Get category */

        selectedCategory =
            button.dataset.category;


        /* Remove active
           from all buttons */

        filterButtons.forEach((btn) => {

            btn.classList.remove("active");

        });


        /* Add active to clicked */

        button.classList.add("active");


        /* Apply filter */

        filterGallery();

    });

});


/* =========================
   SEARCH
========================= */

searchInput.addEventListener("input", () => {

    filterGallery();

});