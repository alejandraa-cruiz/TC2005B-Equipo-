// Authors: Karla Alejandra Padilla González A0170331 y Daniel Gutiérrez Gómez A01068056
// Date: 11/04/2023

const { response } = require("express");

const alertDelProject = document.getElementById("alert");
const alertSuccDelProjectErrors = document.getElementById("alertSucc");
const messaggeDelError = document.getElementById("message-error");
const messaggeSuccDel = document.getElementById("message-success");
function openPopup(index, event) {
    event.preventDefault();
    event.stopPropagation();
    if(index > 0){
        event.stopImmediatePropagation();
    }
    const popup = document.getElementById(`popup-${index}`);
    popup.classList.toggle("hidden");
    closeByEscape(index);
}

function closeByEscape(index){
    const popup = document.getElementById(`popup-${index}`);
    const computedStyle = window.getComputedStyle(popup);
    if(computedStyle.display !== 'none'){
        const handleKeyDown = function(event) {
            if (event.key === 'Escape'){
                event.stopImmediatePropagation();
                popup.classList.toggle('hidden');
                document.removeEventListener('keydown', handleKeyDown);
            }
        };
        document.addEventListener('keydown', handleKeyDown);
    }
function sendMembers(index){

    const form = document.getElementById(`update-member-form-${index}`);
    const data = new FormData(form);
  fetch(`update/${index}`,{
    method: 'PATCH',
    body: data,
  }).then(res=>res.json())
}

function getMembers (project_id) {
    let memberList = document.getElementById("dropDownMembers")
    fetch(`/project/list/members/${project_id}`,{
        method: `GET`
    })
    .then (res => res.json())
    .then (res => { 
        memberList.innerHTML = "";
        console.log(res.members);
        if (res.members.length == 0){memberList.innerHTML = `
            <p>No members to assign</p>
        `}
        res.members.forEach(member => {
            memberList.innerHTML += `
            
            <li onclick="event.stopPropagation()" class="text-[14px] hover:cursor-pointer p-2 hover:bg-slate-50 hover:border-gray-500 duration-500">
                <input type="checkbox" name="${member.id_team_member}" id="${member.id_team_member}"  >
                <label for="${member.id_team_member}">${member.member_name}</label>
            </li>
            `
            console.log(member)
        });
    })
}

function openPopupMember(index, project_id,event) {
    const popup = document.getElementById(`popupMember-${index}`);
    popup.classList.toggle("hidden");
    getMembers(project_id);
}

function closePopup(index, event) {
    event.preventDefault();
    const popup = document.getElementById(`popup-${index}`);
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
 function closePopupMember(index, event){
    event.preventDefault();
    const popup = document.getElementById(`popupMember-${index}`);
    popup.classList.toggle("hidden");
 }
