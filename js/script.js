// bg-animation-effect
function bgAnimationItems() {
  const rows = 7,
    cols = 10;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const div = document.createElement("div");
      div.className = "col-$(j+1)";
      document.querySelector(".bg-animation-effect").appendChild(div);
    }
  }
}
bgAnimationItems();

// toggle navbar
const navToggler = document.querySelector(".nav-toggler");
navToggler.addEventListener("click", toggleNavbar);

function toggleNavbar() {
  navToggler.classList.toggle("active");
  document.querySelector(".nav").classList.toggle("open");
  toggleOverlayEffect();
  toggleBodyScrolling();
}

// toggle overlay effect
function toggleOverlayEffect() {
  document.querySelector(".overlay-effect").classList.toggle("active");
}
// toggle body scrolling
function toggleBodyScrolling() {
  document.body.classList.toggle("hide-scrolling");
}

// hide & show section

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("link-item") && e.target.hash !== "") {
    const hash = e.target.hash;
    if (e.target.classList.contains("nav-item")) {
      activeSection(hash);
      toggleNavbar();
    } else {
      toggleBodyScrolling();
      document.querySelector(".nav-toggler").classList.add("toggle-hide");
      setTimeout(() => {
        activeSection(hash);
        toggleBodyScrolling();
        document.querySelector(".nav-toggler").classList.remove("toggle-hide");
      }, 950);
    }
  }
});

function activeSection(sectionId) {
  document.querySelector("section.active").classList.remove("active");
  document.querySelector(sectionId).classList.add("active");
}

//  filter portfolio items
const filterBtnContainer = document.querySelector(".portfolio-filter");
let portfolioItemIndex;
filterBtnContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("portfolio-filter-btn") && !e.target.classList.contains("active")) {
    filterBtnContainer.querySelector(".active").classList.remove("active");
    e.target.classList.add("active");
    toggleBodyScrolling();
    document.querySelector(".filter-status").classList.add("active");
    document.querySelector(".filter-status p").innerHTML = "Mencari <span></span>Portfolio";
    setTimeout(() => {
      filterItems(e.target);
    }, 400);
    setTimeout(() => {
      document.querySelector(".filter-status").classList.remove("active");
      toggleBodyScrolling();
    }, 800);
  }
});

function filterItems(filterBtn) {
  const selectedCategory = filterBtn.getAttribute("data-filter");
  document.querySelectorAll(".portfolio-item").forEach((item) => {
    const category = item.getAttribute("data-category").split(",");
    if (category.indexOf(selectedCategory) !== -1 || selectedCategory === "all") {
      item.classList.add("show");
    } else {
      item.classList.remove("show");
    }
  });
  portfolioItems = document.querySelectorAll(".portfolio-item.show");
}
// filter active category portfolio items
filterItems(document.querySelector(".portfolio-filter-btn.active"));

// portfolio item details popup

document.addEventListener("click", (e) => {
  if (e.target.closest(".portfolio-item")) {
    const currentItem = e.target.closest(".portfolio-item");
    portfolioItemIndex = Array.from(portfolioItems).indexOf(currentItem);
    togglePopup();
    portfolioItemDetails();
  }
});

function togglePopup() {
  document.querySelector(".portfolio-popup").classList.toggle("open");
  toggleBodyScrolling();
}
document.querySelector(".pp-close-btn").addEventListener("click", togglePopup);

function portfolioItemDetails() {
  document.querySelector(".pp-thumbnail img").src = portfolioItems[portfolioItemIndex].querySelector("img").src;

  document.querySelector(".pp-header h3").innerHTML = portfolioItems[portfolioItemIndex].querySelector(".portfolio-item-title").innerHTML;

  document.querySelector(".pp-body").innerHTML = portfolioItems[portfolioItemIndex].querySelector(".portfolio-item-details").innerHTML;
}

// toggle contact form
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("toggle-contact-form-btn")) {
    document.querySelector(".contact-form").classList.toggle("open");
    toggleBodyScrolling();
  }
});
