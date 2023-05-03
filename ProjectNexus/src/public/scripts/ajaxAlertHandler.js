export const createAlert = (payload) => {
  let msg = payload.msg;
  msg = msg? msg: '';
  const alert = document.createElement('div');
  alert.classList.add('z-30');
  alert.innerHTML = `<strong class="font-bold"></strong>
                      <span></span>`;
  if(payload.error){
    alert.classList.add('alert-error');
    alert.querySelector('strong').innerText = 'Error!';
    alert.querySelector('span').innerText = msg;
  } else {
    alert.classList.add('alert-success');
    alert.querySelector('strong').innerText = 'Success!';
    alert.querySelector('span').innerText = msg;
  }

  document.body.appendChild(alert);

  setTimeout(() => {
    alert.remove();
  }, 3000);
  
}
