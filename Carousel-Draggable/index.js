const carousel = document.querySelector('.carousel');
const firstImage = carousel.querySelectorAll('.slide')[0];
const arrowIcons = document.querySelectorAll('.wrapper i');

let isDragStart = false,
  isDragging = false,
  prevPageX,
  prevScrollLeft,
  positionDiff;

const showHideIcons = () => {
  let scrollWidth = carousel.scrollWidth - carousel.clientWidth;
  arrowIcons[0].style.display = carousel.scrollLeft === 0 ? 'none' : 'inline-block';
  arrowIcons[1].style.display = carousel.scrollLeft === scrollWidth ? 'none' : 'inline-block';
};

arrowIcons.forEach((icon) => {
  icon.addEventListener('click', () => {
    let firstImageWidth = firstImage.clientWidth + 15;
    carousel.scrollLeft += icon.id === 'prev' ? -firstImageWidth : firstImageWidth;
    setTimeout(() => showHideIcons(), 60);
  });
});

const autoSlide = () => {
  if (carousel.scrollWidth === carousel.scrollWidth - carousel.clientWidth) return;

  positionDiff = Math.abs(positionDiff);
  let firstImageWidth = firstImage.clientWidth + 15;
  let valDifference = firstImageWidth - positionDiff;

  if (carousel.scrollLeft > prevScrollLeft) {
    return (carousel.scrollLeft +=
      positionDiff > firstImageWidth / 3 ? valDifference : -positionDiff);
  }

  carousel.scrollLeft -= positionDiff > firstImageWidth / 3 ? valDifference : -positionDiff;
};

const dragStart = (event) => {
  isDragStart = true;
  prevPageX = event.pageX || event.touches[0].pageX;
  prevScrollLeft = carousel.scrollLeft;
};

const dragging = (event) => {
  //   console.log(event.pageX);

  if (!isDragStart) return;

  event.preventDefault();
  isDragging = true;
  carousel.classList.add('dragging');

  positionDiff = (event.pageX || event.touches[0].pageX) - prevPageX;
  carousel.scrollLeft = prevScrollLeft - positionDiff;
  showHideIcons();
};

const dragStop = () => {
  isDragStart = false;
  carousel.classList.remove('dragging');

  if (!isDragging) return;
  isDragging = false;
  autoSlide();
};

carousel.addEventListener('mousedown', dragStart);
carousel.addEventListener('touchstart', dragStart);

carousel.addEventListener('mousemove', dragging);
carousel.addEventListener('touchmove', dragging);

carousel.addEventListener('mouseup', dragStop);
carousel.addEventListener('mouseleave', dragStop);
carousel.addEventListener('touchend', dragStop);
