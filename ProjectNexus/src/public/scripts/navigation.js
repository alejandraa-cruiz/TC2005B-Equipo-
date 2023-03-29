const fileLabel = document.getElementById('file-label');
const csvInput = document.getElementById('csv-input');
const matchFile = /[^\\]*$/g;
csvInput.addEventListener('change', () => {
    fileLabel.innerText = csvInput.value.match(matchFile)[0];
});


const navBar = document.getElementById('navbar');
const navHideButton = document.getElementById('nav-hide-button');
const darkSeparator = document.getElementById('dark-separator'); // Let's change this name
const contentWrapper = document.getElementById('content-wrapper');
contentWrapper.classList.remove('scale-90');

const toggleNavbar = (ev) => {
    if(ev.target.classList.contains('bx-chevron-right')) {
        ev.target.classList.replace('bx-chevron-right', 'bx-chevron-left');
    } else {
        ev.target.classList.replace('bx-chevron-left', 'bx-chevron-right');
    }
    darkSeparator.classList.toggle('invisible');
    contentWrapper.classList.toggle('scale-90');
    navBar.classList.toggle('phone:left-[-15rem]');
    navHideButton.classList.toggle('phone:left-0');
}
