function openPopup(index) {
    const popup = document.getElementById(`popup-${index}`);
    popup.classList.toggle("hidden");
}

function openPopupAddMember(index) {
    const popup = document.getElementById(`popupAddMember-${index}`);
    popup.classList.toggle("hidden");
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
        console.log(data);
    })
    .catch(error => {console.log(error)});
}