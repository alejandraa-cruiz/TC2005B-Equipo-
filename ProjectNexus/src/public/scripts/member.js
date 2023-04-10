const createMember = () => {
  const data = new FormData(document.getElementById("form"));
  fetch('/createMember/create',{
    method: 'POST',
    body: data,
  }).then(res=>res.json()).then(res => {
    let messages = res.e
     if (messages === 'Success!'){
         messagge.innerText='Success!';
         alertSucc.classList.remove('hidden');
         setTimeout(function () {alertSucc.classList.add('hidden')}, 3000);
     }
     else if (messages === 'Database failed ):'){
         messagge.innerText='Database failed ):';
         alertErr.classList.remove('hidden');
         setTimeout(function () {alertErr.classList.add('hidden')}, 3000);
     }})
};
