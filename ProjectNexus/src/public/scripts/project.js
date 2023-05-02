const alertProject = document.getElementById('alert');
const alertSuccProjectErrors = document.getElementById('alertSucc');
const messaggeProjectErrors = document.getElementById('message-error');
const messaggeSuccessProjectErrors = document.getElementById('message-success');

const modifyProject = () => {
  const projectForm = document.getElementById('project-form');
  const data = new FormData(projectForm);

  fetch(window.location.pathname, {
    method: 'POST',
    body: data,
  }).then(res => res.json()).then(res => {
    let messages = res.e;
    switch (messages) {
      case 'Success!':
        messagge.innerText = 'Success!';
        alertSucc.classList.remove('hidden');
        setTimeout(function() {
          alertSucc.classList.add('hidden');
        }, 3000);
        break;
      case 'Invalid time range':
        messagge.innerText = 'Invalid time range';
        alertErr.classList.remove('hidden');
        setTimeout(function() {
          alertErr.classList.add('hidden');
        }, 3000);
        break;
    }
    setTimeout(() => {
      location.href = '/project/list';
    }, 1000);
  });
};

function handleSubmitProject() {
  const projectForm = document.getElementById('form-postproject');
  const data = new FormData(projectForm);
  fetch(`/project/create`, {
    method: 'POST',
    body: data,
  }).then(res => {
    return (res.json());
  }).then(res => {
    let messages = res.e;

    if (messages === 'Success') {
      messaggeSuccessProjectErrors.innerText = 'Success';
      alertSuccProjectErrors.classList.remove('hidden');
      setTimeout(function() {alertSuccProjectErrors.classList.add('hidden');},
          3000);
      setTimeout(() => {
        location.href = '/project/list';
      }, 1000);
    } else if (messages === 'Project already exists') {
      messaggeProjectErrors.innerText = 'Project already exists';
      alertProject.classList.remove('hidden');
      setTimeout(function() {alertProject.classList.add('hidden');}, 3000);
    } else if (messages === 'Invalid time range') {
      messaggeProjectErrors.innerText = 'Invalid time range';
      alertProject.classList.remove('hidden');
      setTimeout(function() {alertProject.classList.add('hidden');}, 3000);
    } else if (messages === 'Database conection failed') {
      messaggeProjectErrors.innerText = 'Database conection failed';
      alertProject.classList.remove('hidden');
      setTimeout(function() {alertProject.classList.add('hidden');}, 3000);
    }
  });
}

