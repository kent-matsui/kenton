/*******************************************************************/
/* Slide */
/*******************************************************************/

export default function() {
  const mySwiper = new Swiper('.swiper-container', {
    autoplay: 4800,
    loop: true,
    speed: 640,
    nextButton: '.swiper-next',
    prevButton: '.swiper-prev',
  })
}