const carousel = document.querySelector(".carousel");
const track = document.querySelector(".carousel-track");

const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");


// =========================================
// ARROW BUTTONS
// =========================================

function getCardWidth() {
  const card = track.querySelector(".category-card");

  if (!card) {
    return 0;
  }

  const gap = parseFloat(getComputedStyle(track).gap) || 0;

  return card.getBoundingClientRect().width + gap;
}


nextButton.addEventListener("click", () => {

  carousel.scrollBy({
    left: getCardWidth(),
    behavior: "smooth"
  });

});


prevButton.addEventListener("click", () => {

  carousel.scrollBy({
    left: -getCardWidth(),
    behavior: "smooth"
  });

});


// =========================================
// DRAG TO SCROLL
// =========================================

let isDragging = false;
let startX = 0;
let startScrollLeft = 0;


carousel.addEventListener("pointerdown", (event) => {

  // Only drag with the left mouse button
  if (event.pointerType === "mouse" && event.button !== 0) {
    return;
  }

  isDragging = true;

  startX = event.clientX;
  startScrollLeft = carousel.scrollLeft;

  carousel.classList.add("is-dragging");

});


carousel.addEventListener("pointermove", (event) => {

  if (!isDragging) {
    return;
  }

  const distance = event.clientX - startX;

  carousel.scrollLeft = startScrollLeft - distance;

});


carousel.addEventListener("pointerup", () => {

  isDragging = false;

  carousel.classList.remove("is-dragging");

});


carousel.addEventListener("pointercancel", () => {

  isDragging = false;

  carousel.classList.remove("is-dragging");

});


// =========================================
// TRACKPAD / SHIFT + WHEEL
// =========================================

carousel.addEventListener("wheel", (event) => {

  if (event.shiftKey) {

    event.preventDefault();

    carousel.scrollLeft += event.deltaY;

  }

});