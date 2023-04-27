// Authors: Karla Alejandra Padilla González A0170331 y Daniel Gutiérrez Gómez A01068056
// Date: 11/04/2023


const alertDelProject = document.getElementById("alert");
const alertSuccDelProjectErrors = document.getElementById("alertSucc");
const messaggeDelError = document.getElementById("message-error");
const messaggeSuccDel = document.getElementById("message-success");

let popupOpen = false;
let handleKeyDown;
function openPopup(index, event) {
    event.preventDefault();
    if(popupOpen){
        return;
    }
    popupOpen = true;
    const popup = document.getElementById(`popup-${index}`);
    popup.classList.toggle("hidden");
    closeByEscape(index);
}
function closePopup(index, event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    const popup = document.getElementById(`popup-${index}`);
    popup.classList.toggle("hidden");
    popupOpen = false;
    document.removeEventListener('keydown', handleKeyDown);
}
function closeByEscape(index) {
    const popup = document.getElementById(`popup-${index}`);
    const computedStyle = window.getComputedStyle(popup);
    if (computedStyle.display !== 'none' && popupOpen) {
        handleKeyDown = function (event) {
            if (event.key === 'Escape') {
                console.log("Escape: ");
                event.stopImmediatePropagation();
                popup.classList.toggle('hidden');
                document.removeEventListener('keydown', handleKeyDown);
                popupOpen = false;
            }
        };
        document.addEventListener('keydown', handleKeyDown);
    }
}
function closeByEscapeMember(index) {
    const popupMember = document.getElementById(`popupMember-${index}`);
    const computedStyleMember = window.getComputedStyle(popupMember);
    if (computedStyleMember.display !== 'none' && popupOpen) {
        handleKeyDown = function (event) {
            if (event.key === 'Escape') {
                event.stopImmediatePropagation();
                popupMember.classList.toggle('hidden');
                document.removeEventListener('keydown', handleKeyDown);
                popupOpen = false;
            }
        };
        document.addEventListener('keydown', handleKeyDown);
    }
}
function sendMembers(index){

    const form = document.getElementById(`update-member-form-${index}`);
    const data = new FormData(form);
    fetch(`update/${index}`,{
        method: 'PATCH',
        body: data,
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
    })
    .then(data=> {
        let messages = data.e;
        if (messages === 'Success!'){
            window.location.assign('/project/list');
        }
    })
}

function getMembers (project_id, index) {
    let memberList = document.getElementById(`dropDownMembers-${index}`);
    fetch(`/project/list/members/${project_id}`,{
        method: `GET`
    })
    .then (res => res.json())
    .then (res => { 
        memberList.innerHTML = '';
        if (res.members.length == 0){memberList.innerHTML = `
            <p>No members to assign</p>
        `} else{
            res.members.forEach(member => {
                memberList.innerHTML += `
                    <li onclick="event.stopPropagation()" class=" p-2 text-[14px] hover:text-zinc-950 hover:cursor-pointer hover:bg-gray-400 hover:border-gray-500 hover:rounded-md duration-500">
                        <input type="checkbox" name="${member.id_team_member}" id="${member.id_team_member}"  >
                        <label for="${member.id_team_member}">${member.member_name}</label>
                    </li>
                `
            });
        }
    })
}

function openPopupMember(index, project_id, event) {
    event.preventDefault();
    if (popupOpen) {
        return;
    }
    popupOpen = true;
    const popup = document.getElementById(`popupMember-${index}`);
    popup.classList.toggle("hidden");
    getMembers(project_id, index);
    closeByEscapeMember(index);
}

function deleteProject(project_name, event){
    event.stopImmediatePropagation();
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
            setTimeout(()=> {
                location.href = '/project/list';
            }, 1000)
        }
        else{
            messaggeDelError.innerText = 'Database conncetion failed';
            alertDelProject.classList.remove('hidden');
            setTimeout(function () {
                alertDelProject.classList.add('hidden');
            }, 5000);
        }
    })
    .catch(error => {console.log(error)});
}

function deleteMember (id) {
    fetch(`/members/delete/${id}`,{
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
            setTimeout(() => {
                location.href = '/members';
            }, 1000)
        }
        else{
            messaggeDelError.innerText = 'Database conncetion failed';
            alertDelProject.classList.remove('hidden');
            setTimeout(function () {
                alertDelProject.classList.add('hidden');
            }, 5000);
        }
        window.location.pathname;
    })
    .catch(error => {console.log(error)});
}

function closePopupMember(index, event){
    event.preventDefault();
    const popup = document.getElementById(`popupMember-${index}`);
    popup.classList.toggle("hidden");
    document.removeEventListener('keydown', handleKeyDown);
    popupOpen = false;
}

function getMembersModify (project_id, index) {
    let memberModifyElement = document.getElementById(`dropDownMembersModify-${index}`);
    fetch(`/project/list/members/modify/${project_id}`,{
        method: `GET`
    })
    .then (res => res.json())
    .then (res => { 
        console.log(res.members);
        if (res.members.length == 0){memberModifyElement.innerHTML = `
            <p>No members to assign</p>
        `} else{
            res.members.forEach(member => {
                memberModifyElement.innerHTML += `
                    <li onclick="event.stopPropagation()" class=" p-2 text-[14px] hover:text-zinc-950 hover:cursor-pointer hover:bg-gray-400 hover:border-gray-500 hover:rounded-md duration-500">
                        <div class="flex flex-row">
                            <div> 
                                <p> ${member.member_name}</p>
                            </div>
                        </div>
                    </li>
                `
            });
        }
    })
}
function popUpModify(index, project_id, event){
    event.preventDefault();
    if (popupOpen) {
        return;
    }
    popupOpen = true;
    const popup = document.getElementById(`popUpModify-${index}`);
    popup.classList.toggle("hidden");
    getMembersModify(project_id);
    closeByEscapeMemberModify(index);
}

function closeByEscapeMemberModify(index) {
    const popupMemberModify = document.getElementById(`popUpModify-${index}`);
    const computedStyleMember = window.getComputedStyle(popupMemberModify);
    if (computedStyleMember.display !== 'none' && popupOpen) {
        handleKeyDown = function (event) {
            if (event.key === 'Escape') {
                event.stopImmediatePropagation();
                popupMemberModify.classList.toggle('hidden');
                document.removeEventListener('keydown', handleKeyDown);
                popupOpen = false;
            }
        };
        document.addEventListener('keydown', handleKeyDown);
    }
}

function closePopupMemberModify(index, event){
    event.preventDefault();
    event.stopImmediatePropagation();
    const popup = document.getElementById(`popUpModify-${index}`);
    popup.classList.toggle("hidden");
    popupOpen = false;
    document.removeEventListener('keydown', handleKeyDown);
}





