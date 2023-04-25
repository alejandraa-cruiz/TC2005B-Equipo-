import { alertPostHandler } from "./ajaxAlertHandler.js"; 

(()=>{
    const modifyMemberForm = document.getElementById('modify-member-form');
    modifyMemberForm.addEventListener('submit', async (ev) => {
        ev.preventDefault();
        const data = new FormData(modifyMemberForm);
        await alertPostHandler(window.location.pathname, data, (error) => {
            if(!error){
                setTimeout(() => {
                    location.href = '/members';
                }, 1000);
            } else{
                modifyMemberForm.reset();
            }
        });
    });
})();


