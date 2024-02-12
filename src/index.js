import './index.scss';

document.addEventListener('DOMContentLoaded', function () {
  if (location.pathname === '/form.html') {
    import('./asserts/form');
  }

  if (location.pathname === '/') {
    import('./asserts/modal');
  }
});
