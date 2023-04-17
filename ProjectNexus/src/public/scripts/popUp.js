// Authors: Karla Alejandra Padilla González A0170331 y Daniel Gutiérrez Gómez A01068056
// Date: 11/04/2023

const alertDelProject = document.getElementById("alert");
const alertSuccDelProjectErrors = document.getElementById("alertSucc");
const messaggeDelError = document.getElementById("message-error");
const messaggeSuccDel = document.getElementById("message-success");

function openPopup(index) {
    const popup = document.getElementById(`popup-${index}`);
    popup.classList.toggle("hidden");
}

function openPopupAddMember(element) {
    console.log(element.childNodes);
    element.childNodes[3].classList.toggle("hidden");
    element.childNodes[5].classList.toggle("hidden");
    
}

function deleteProject(project_name){
    fetch(`/project/delete/${project_name}`,{
        method: 'DELETE'
    })
    .then(res => {
        if(!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
    })
    .then(data => {
        let messages = data.e;
        if (messages === 'Success, project was erased') {
            messaggeSuccDel.innerText = 'Success, project was erased';
            alertSuccDelProjectErrors.classList.remove('hidden');
            setTimeout(function () {
                alertSuccDelProjectErrors.classList.add('hidden');
            }, 5000);
        }
        else{
            messaggeDelError.innerText = 'Database conncetion failed';
            alertDelProject.classList.remove('hidden');
            setTimeout(function () {
                alertDelProject.classList.add('hidden');
            }, 5000);
        }
        console.log(data);
    })
    .catch(error => {console.log(error)});
}