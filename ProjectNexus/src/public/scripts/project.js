import { createAlert } from "./ajaxAlertHandler.js";

(() => {
    const dropdownButton = document.getElementById('dropdown-button');
    const dropdown = document.getElementById('dropdown');

    dropdownButton.addEventListener('click', (ev) => {
        if(dropdown.dataset.open === 'false') {
            dropdown.classList.remove('hidden');
            dropdown.dataset.open = true;
        } else {
            dropdown.classList.add('hidden');
            dropdown.dataset.open = false;
        }
    });

    const projectForm = document.getElementById('project-form');
    let postRoute;
    if(window.location.pathname === '/project/'){
        postRoute = '/project/create';
    } else {
        postRoute = window.location.pathname;
    }

    projectForm.addEventListener('submit', async (ev) => {
        ev.preventDefault();
        const button = ev.target.querySelector('button');
        button.disabled = true;
        const data = new FormData(projectForm);
        fetch(postRoute, { method: 'POST', body : data })
        .then(res => res.json())
        .then(payload => {
            createAlert(payload);
            if(!payload.error){
                setTimeout(() => {
                    location.href = '/project/list';
                }, 500);
            } else {
                projectForm.reset();
            }
        });
    });
})();

