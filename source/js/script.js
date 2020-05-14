var navMainList = document.querySelector('.main-nav__list');
var navToggle = document.querySelector('.main-nav__toggle');
var navToggleCross = document.querySelector('.main-nav__toggle-cross');
var navToggleMenu = document.querySelector('.main-nav__toggle-menu');
var modalFailure = document.querySelector('.page-form__modal-failure');
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
    if (modalFailure.classList.contains("page-form__modal-failure--open")) {
    modalFailure.classList.remove("page-form__modal-failure--open")
  }
}
});

modalSuccesButton.addEventListener('click', function () {
  if (modalSuccesButton) {
    if (modalSucces.classList.contains("page-form__modal-succes--open")) {
      console.log ("111")
    modalSucces.classList.remove("page-form__modal-succes--open")
  }
}
});
