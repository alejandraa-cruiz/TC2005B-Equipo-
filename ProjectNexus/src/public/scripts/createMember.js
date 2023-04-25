import { alertPostHandler } from "./ajaxAlertHandler.js"; 

(()=>{
    const createMemberForm = document.getElementById('create-member-form');
    createMemberForm.addEventListener('submit', async (ev) => {
        ev.preventDefault();
        const data = new FormData(createMemberForm);
        await alertPostHandler('/members/create', data, (error) => {
            if(!error){
                setTimeout(() => {
                    location.href = '/members';
                }, 1000);
            } else{
                createMemberForm.reset();
            }
        });
    });
})();