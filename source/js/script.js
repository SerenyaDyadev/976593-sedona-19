var navMainList = document.querySelector('.main-nav__list');
var navToggle = document.querySelector('.main-nav__toggle');
var navToggleCross = document.querySelector('.main-nav__toggle-cross');
var navToggleMenu = document.querySelector('.main-nav__toggle-menu');
var modalFilure = document.querySelector('.page-form__modal-failure');
var modalSucces = document.querySelector('.page-form__modal-succes');
var modalFailureButton = document.querySelector('.page-form__modal-failure-button')
var modalSuccesButton = document.querySelector('.page-form__modal-succes-button')

navToggle.classList.remove('main-nav__toggle--nojs');

navToggle.addEventListener('click', function() {
  if (navToggle) {
    if (navToggleCross.classList.contains('main-nav__toggle-cross--active')) {
      navToggleCross.classList.remove('main-nav__toggle-cross--active');
      navToggleMenu.classList.add('main-nav__toggle-menu--active');
      navMainList.classList.add('main-nav__list--closed');
    } else {
        navToggleCross.classList.add('main-nav__toggle-cross--active');
        navToggleMenu.classList.remove('main-nav__toggle-menu--active');
        navMainList.classList.remove('main-nav__list--closed');
      }
  }
});

modalFailureButton.addEventListener('click', function () {
  if (modalFailureButton) {
    modalFilure.classList.remove("page-form__modal-failure--open")
  }
});

modalSuccesButton.addEventListener('click', function () {
  if (modalSuccesButton) {
    modalSucces.classList.remove("page-form__modal-succes--open")
  }
});
