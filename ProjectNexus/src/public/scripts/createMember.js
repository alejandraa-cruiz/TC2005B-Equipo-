import { createAlert } from "./ajaxAlertHandler.js"; 

(()=>{
    const createMemberForm = document.getElementById('create-member-form');
    createMemberForm.addEventListener('submit', async (ev) => {
        ev.preventDefault();
        const data = new FormData(createMemberForm);
        fetch('/members/create', { method: 'POST', body: data})
        .then(res => res.json())
        .then(payload => {
            createAlert(payload);
            if(!payload.error){
                setTimeout(() => {
                    location.href = '/members';
                }, 500);
            } else {
                createMemberForm.reset();
            }
        });
    });
})();
