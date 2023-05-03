import { createAlert } from "./ajaxAlertHandler.js"; 

(()=>{
  const modifyMemberForm = document.getElementById('modify-member-form');
  modifyMemberForm.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const data = new FormData(modifyMemberForm);
    fetch(window.location.pathname, { method: 'POST', body: data})
    .then(res => res.json())
    .then(payload => {
      createAlert(payload);
      if(!payload.error){
        setTimeout(() => {
          location.href = '/members';
        }, 3000);
      } else {
        modifyMemberForm.reset();
      }

    });

  });
  
})();


