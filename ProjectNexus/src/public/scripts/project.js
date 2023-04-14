
const alertProject = document.getElementById("alert");
const alertSuccProjectErrors = document.getElementById("alertSucc");
const messaggeProjectErrors = document.getElementById("message-error");
const messaggeSuccessProjectErrors = document.getElementById("message-success");


function handleSubmitProject (){
    const projectForm = document.getElementById("form-postproject");
    const data = new FormData(projectForm);
    fetch(`/project/create`,{
        method: "POST",
        body : data
    })
    .then(res => {
        return(res.json());
    })
    .then(res => {
        let messages = res.e;

        if (messages === 'Success'){
            messaggeSuccessProjectErrors.innerText = 'Success';
            alertSuccProjectErrors.classList.remove("hidden");
            setTimeout(function () {alertSuccProjectErrors.classList.add('hidden')}, 3000);
        }
        else if (messages === 'Project already exists'){
            messaggeProjectErrors.innerText = 'Project already exists';
            alertProject .classList.remove("hidden");
            setTimeout(function () {alertProject.classList.add('hidden')}, 3000);
        }
        else if (messages === 'Invalid time range'){
            messaggeProjectErrors.innerText = 'Invalid time range';
            alertProject.classList.remove("hidden");
            setTimeout(function () {alertProject.classList.add('hidden')}, 3000);
        }
        else if (messages === 'Database conection failed'){
            messaggeProjectErrors.innerText = 'Database conection failed';
            alertProject.classList.remove("hidden");
            setTimeout(function () {alertProject.classList.add('hidden')}, 3000);
        }
        projectForm.reset();
    })
}