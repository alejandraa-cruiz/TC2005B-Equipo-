const fileLabel = document.getElementById('file-label');
const csvInput = document.getElementById('csv-input');
const form = document.getElementById("csv-upload");
const alertErr = document.getElementById("alert");
const alertSucc = document.getElementById("alertSucc");
const messagge = document.getElementById("message-error");
const messaggeSuccess = document.getElementById("message-success");
const matchFile = /[^\\]*$/g;
csvInput.addEventListener('change', () => {
    fileLabel.innerText = csvInput.value.match(matchFile)[0];
});


const navBar = document.getElementById('navbar');
const navHideButton = document.getElementById('nav-hide-button');
const darkSeparator = document.getElementById('dark-separator'); // Let's change this name
const contentWrapper = document.getElementById('content-wrapper');
contentWrapper.classList.remove('scale-90');

const toggleNavbar = (ev) => {
    if(ev.target.classList.contains('bx-chevron-right')) {
        ev.target.classList.replace('bx-chevron-right', 'bx-chevron-left');
    } else {
        ev.target.classList.replace('bx-chevron-left', 'bx-chevron-right');
    }
    darkSeparator.classList.toggle('invisible');
    contentWrapper.classList.toggle('scale-90');
    navBar.classList.toggle('phone:left-[-15rem]');
    navHideButton.classList.toggle('phone:left-0');
}

function uploadFile() {
    const data = new FormData();
    data.append('csv', csvInput.files[0]);
    fetch('dashboard/upload', {
        method: 'POST',
        body: data,
    }).then(res => res.json()).then(res => {
       let messages = res.e
        if (messages === 'No file selected'){
            messagge.innerText='No file selected';
            alertErr.classList.remove('hidden');
            setTimeout(function () {alertErr.classList.add('hidden')}, 3000);
        }
        else if (messages === 'File must be CSV'){
            messagge.innerText='File must be CSV';
            alertErr.classList.remove('hidden');
            setTimeout(function () {alertErr.classList.add('hidden')}, 3000);
        }
        else if (messages === 'Empty file'){
            messagge.innerText='Empty file';
            alertErr.classList.remove('hidden');
            setTimeout(function () {alertErr.classList.add('hidden')}, 3000);
        }
        else if (messages === 'Database connection failed'){
            messagge.innerText='Database connection failed';
            alertErr.classList.remove('hidden');
            setTimeout(function () {alertErr.classList.add('hidden')}, 3000);
        }
        else if (messages === 'Rows aren\'t the same lenght'){
            messagge.innerText='Rows aren\'t the same lenght';
            alertErr.classList.remove('hidden');
            setTimeout(function () {alertErr.classList.add('hidden')}, 3000);
        }
        else if (messages === 'Row headers don\'t match'){
            messagge.innerText='Row headers don\'t match';
            alertErr.classList.remove('hidden');
            setTimeout(function () {alertErr.classList.add('hidden')}, 3000);
        }
        else if (messages === 'Success'){
            messaggeSuccess.innerText='Data upload successfully';
            alertSucc.classList.remove('hidden');
            setTimeout(function () {alertSucc.classList.add('hidden')}, 3000);
        }
    });

}
