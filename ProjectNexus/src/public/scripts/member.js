const createMember = () => {
  const form = document.getElementById('form');
  const data = new FormData(form);
  fetch('/members/create',{
    method: 'POST',
    body: data,
  }).then(res=>res.json()).then(res => {
    let messages = res.e
    switch (messages) {
      case 'Success!':
        messagge.innerText='Success!';
        alertSucc.classList.remove('hidden');
        setTimeout(function () {alertSucc.classList.add('hidden')}, 3000);
        break;

      case 'Entries can\'t be empty':
        messagge.innerText='Entries can\'t be empty';
        alertErr.classList.remove('hidden');
        setTimeout(function () {alertErr.classList.add('hidden')}, 3000);
        break;

      case 'Database failed':
        messagge.innerText='Database failed';
        alertErr.classList.remove('hidden');
        setTimeout(function () {alertErr.classList.add('hidden')}, 3000);
        break;

      case 'You must select an area':
        messagge.innerText='You must select an area';
        alertErr.classList.remove('hidden');
        setTimeout(function () {alertErr.classList.add('hidden')}, 3000);
        break;

      case 'Invalid email':
        messagge.innerText='Invalid email';
        alertErr.classList.remove('hidden');
        setTimeout(function () {alertErr.classList.add('hidden')}, 3000);
        break;
        
      case 'There is a member with the same email':
          messagge.innerText='There is a member with the same email';
        alertErr.classList.remove('hidden');
        setTimeout(function () {alertErr.classList.add('hidden')}, 3000);
        break;
    }
     form.reset();
    });
};
