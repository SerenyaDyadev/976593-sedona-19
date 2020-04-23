var navMainList = document.querySelector('.main-nav__list');
var navToggle = document.querySelector('.main-nav__toggle');
var navToggleCross = document.querySelector('.main-nav__toggle-cross');
var navToggleMenu = document.querySelector('.main-nav__toggle-menu');

navToggle.classList.remove('main-nav__toggle--nojs');

navToggle.addEventListener('click', function() {
  if (navToggleCross.classList.contains('main-nav__toggle-cross--active')) {
    navToggleCross.classList.remove('main-nav__toggle-cross--active');
    navToggleMenu.classList.add('main-nav__toggle-menu--active');
    navMainList.classList.add('main-nav__list--closed');
  } else {
      navToggleCross.classList.add('main-nav__toggle-cross--active');
      navToggleMenu.classList.remove('main-nav__toggle-menu--active');
      navMainList.classList.remove('main-nav__list--closed');
    }
});

