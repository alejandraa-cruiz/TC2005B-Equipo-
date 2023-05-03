const dropdown = document.getElementById('dropDown');

const dropDownButton = (event) => {
  dropdown.classList.toggle('hidden');
  getEpics();
};

function getEpics() {
  fetch(`/project/epics`, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  }).then(res => {
    return (res.json());
  }).then(data => {
    // if (data.Epics.length === 0) {
    //     const messaggeEpics = document.getElementById("message-error");
    //     messaggeEpics.innerText= "You don't have assigned epics";
    //     const alertErrEpics = document.getElementById("alert");
    //     alertErrEpics.classList.remove('hidden');
    //     setTimeout(function () {alertErrEpics.classList.add('hidden')}, 3000);
    // }

  });
}
    