import { alertPostHandler } from './ajaxAlertHandler.js';

(() => {
    const navHideButton = document.getElementById('nav-hide-button');
    const navHideChevron = document.getElementById('nav-hide-chevron');
    const navBar = document.getElementById('navbar');
    const darkSeparator = document.getElementById('dark-separator'); 

    navHideButton.addEventListener('click', (ev) => {
        if(navHideButton.dataset.open === 'false'){
            darkSeparator.classList.remove('invisible');
            navBar.classList.remove('phone:left-[-15rem]');
            navHideChevron.classList.remove('rotate-180');
            navHideButton.classList.remove('phone:left-0');
            navHideButton.dataset.open = true;
        } else{
            darkSeparator.classList.add('invisible');
            navBar.classList.add('phone:left-[-15rem]');
            navHideChevron.classList.add('rotate-180');
            navHideButton.classList.add('phone:left-0');
            navHideButton.dataset.open = false;
        }
    });

    const projectDropdown = document.getElementById('nav-project-dropdown');
    const projects = document.getElementById('nav-projects');
    const projectChevron = document.getElementById('nav-project-chevron');
    
    projectDropdown.addEventListener('click', (ev) => {
        if(projectDropdown.dataset.open === 'true'){
            projects.classList.toggle('hidden');
            projectDropdown.dataset.open = false;
            projectChevron.classList.remove('rotate-90');
        } else {
            projects.classList.toggle('hidden');
            projectDropdown.dataset.open = true;
            projectChevron.classList.add('rotate-90');
        }
    });

    const fileLabel = document.getElementById('file-label');
    const csvInput = document.getElementById('csv-input');
    const matchFile = /[^\\]*$/g;
    csvInput.addEventListener('change', () => {
        fileLabel.innerText = csvInput.value.match(matchFile)[0];
    });

    const csvForm = document.getElementById("form-csv-upload");
    csvForm.addEventListener('submit', async (ev) => {
        ev.preventDefault();
        const data = new FormData(csvForm);
        await alertPostHandler('/dashboard/upload', data);
        csvForm.reset();
    })
})();


