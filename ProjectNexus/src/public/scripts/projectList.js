import { confirmationPopUp } from './popUp.js';
import { createAlert } from "./ajaxAlertHandler.js"; 

let projects = [];
let maxRows = 10;
let page = 1;
let totalProjects = 0;
let startRange = page;
let endRange = maxRows;

let members = [];

let query = '';

const rowRange = document.getElementById('row-range');
const pagination = document.getElementById('pagination');
const pagesList = pagination.querySelector('ul');
const paginationLi = document.querySelector('template#pagination-li');

/**
 * 
 * @param {Event} ev 
 */
 const expandDropdowns = (ev) => {
    let parentContainer = ev.target.parentElement;
    while(!(parentContainer.tagName === 'DIV')){
        parentContainer = parentContainer.parentElement;
    }

    const elements = parentContainer.querySelectorAll('div');
    const chevron = parentContainer.querySelector('a>span>i');

    if(parentContainer.dataset.open === 'true'){

        elements.forEach(element => {
            element.classList.add('phone:hidden');
        });
        chevron.classList.add('rotate-180');
        parentContainer.dataset.open = false;

    } else if(parentContainer.dataset.open === 'false'){

        elements.forEach(element => {
            element.classList.remove('phone:hidden');
        });
        chevron.classList.remove('rotate-180');
        parentContainer.dataset.open = true;
    }
}

/**
 * 
 * @param {Boolean} set 
 */
const memberDropdowns = (set) => {
    const dropDowns = document.querySelectorAll('[type=drop-down]');
    if(set){
        dropDowns.forEach(dropDown => {
            dropDown.addEventListener('click', expandDropdowns);
        });
    } else {
        dropDowns.forEach(dropDown => {
            dropDown.removeEventListener('click', expandDropdowns);
        });
    }
}

const resizeToPhone = (ev) => {
    if(window.innerWidth <= 800){
        memberDropdowns(true);
        window.removeEventListener('resize', resizeToPhone);
        window.addEventListener('resize', resizeToPc);
    }
}

const resizeToPc = (ev) => {
    if(window.innerWidth > 800){
        memberDropdowns(false);
        window.removeEventListener('resize', resizeToPc);
        window.addEventListener('resize', resizeToPhone);
    }
}

const actionDeleteButton = async (id, name, parent, proj) => {
    confirmationPopUp(name)
    .then((ev) => {
        fetch(`/project/delete/${id}`,{
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(payload => {
            createAlert(payload);
            if(!payload.error){
                parent.remove();
                const index = projects.indexOf(proj);
                projects.splice(index, 1);
            }
        })
    })
    .catch((ev) => {
        // The popup is closed and we do nothing
    })
}

const matchNames = (filter) => {
    const matchedNames = [];
    const matcher = new RegExp(`(^${filter}| ${filter})`, 'i');
    projects.forEach(project => {
        const name = project.project_name;
        if(matcher.test(name)){
            matchedNames.push(project);
        }
    });
    return matchedNames;
}

const updatePagination = () => {
    let total = totalProjects;
    let pages = Math.ceil(total/maxRows);
    startRange = ((page - 1) * maxRows) + 1;
    endRange = ((page * maxRows) <= total)? (page * maxRows) : total;
    page = (page > pages)? pages : page;
    
    rowRange.innerText = `${startRange}-${endRange} of ${total}`;

    pagesList.innerHTML = '';

    for(let i = 1; i <= pages; i++){
        const listItem = paginationLi.content.cloneNode(true);
        const pageButton = listItem.querySelector('a');
        pageButton.innerText = i;
        if(i === page){
            pageButton.classList.add('current-page');
            pageButton.classList.remove('pagination');
        }
        pageButton.addEventListener('click', (ev) => {
            page = i;
            updateUi();
        });
        pagesList.appendChild(listItem);
    }
}

const addMembers = (id, memb) => {
    const modalTemplate = document.querySelector('template#add-member');
    const listTemplate = document.querySelector('template#member-list-item');

    const addPopup = modalTemplate.content.cloneNode(true);
    const modal = addPopup.querySelector('div');
    const form = modal.querySelector('form');
    const list = form.querySelector('ul');
    const saveBtn = form.querySelector('div>button[type=submit]');
    const cancelBtn = form.querySelector('div>button[type=button]');

    if(members.length === memb.length) {
        list.innerText = 'There are no more members to asign to this project';
        saveBtn.remove();
    }
    members.forEach(member => {
        const assigned = memb.some(e => {
            return member.id_team_member === e.id_team_member;
        });
        if(!assigned){
            const listItem = listTemplate.content.cloneNode(true);
            const input = listItem.querySelector('input');
            const label = listItem.querySelector('label');
            
            const idMember = member.id_team_member;
            input.name = idMember;
            input.id = idMember;

            label.for = idMember;
            label.innerText = member.member_name;
            list.appendChild(listItem);
        }
    });

    document.body.appendChild(modal);

    modal.addEventListener('click', () => {modal.remove()});
    cancelBtn.addEventListener('click', () => {modal.remove()});
    form.addEventListener('click', ev => {ev.stopPropagation()});
    form.addEventListener('submit', (ev) => {
        ev.preventDefault();
        const data = new FormData(form);
        // Check if at least one checkbox is checked
        const checkboxes = form.querySelectorAll('input[type="checkbox"]');
        const checked = Array.from(checkboxes).some(checkbox => checkbox.checked);
        if (!checked) {
            // If no checkbox is checked, do nothing
            modal.remove();
        } else {
            fetch(`update/${id}`, {
                method: 'PATCH',
                body: data,
            })
            .then(res => res.json())
            .then(payload => {
                createAlert(payload);
            })
            .finally(() => {
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            });
        }
    });
}

const modifyPoints = (id, members) => {
    const modalTemplate = document.querySelector('template#agile-points');
    const listTemplate = document.querySelector('template#agile-points-list');
    
    const modifyPopup = modalTemplate.content.cloneNode(true);
    const modal = modifyPopup.querySelector('div');
    const container = modal.querySelector('div');
    const list = container.querySelector('ul');
    const saveBtn = container.querySelector('div>button[type=submit]');
    const cancelBtn = container.querySelector('div>button[type=button]');

    members.forEach(member => {
        const listItem = listTemplate.content.cloneNode(true);
        const nameTag = listItem.querySelector('span');
        const pointsTag = listItem.querySelector('label');
        const input = listItem.querySelector('input');
        const upBtn = listItem.querySelector('a[type=up-btn]');
        const downBtn = listItem.querySelector('a[type=down-btn]');

        nameTag.innerText = member.member_name;
        pointsTag.innerText = member.agile_points;
        input.name = member.id_team_member;
        input.value = member.agile_points;

        upBtn.addEventListener('click', (ev) => {
            pointsTag.innerText = Number(pointsTag.innerText) + 1;
            input.value = Number(input.value) + 1;
        });

        downBtn.addEventListener('click', (ev) => {
            pointsTag.innerText = Number(pointsTag.innerText) - 1;
            input.value = Number(input.value) - 1;
        });

        list.appendChild(listItem);
    });

    document.body.appendChild(modal);

    modal.addEventListener('click', () => {modal.remove()});
    cancelBtn.addEventListener('click', () => {modal.remove()});
    container.addEventListener('click', ev => {ev.stopPropagation()});
    saveBtn.addEventListener('click', (ev) => {
        const data = {
            project: id,
            dataList: [],
        }
        const forms = list.querySelectorAll('form');
        
        forms.forEach(form => {
            const fd = {};
            const formData = new FormData(form);
            formData.forEach((value, key) => {
                fd[key] = value;
            });
            data.dataList.push(fd);
        });

        fetch('/members/points', { 
            method: 'PATCH', 
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .then(payload => {
            createAlert(payload);
        })
        .finally(() => {
            setTimeout(() => {
                window.location.reload();
            }, 500);
        });
    });
}

const updateUi = () => {
    let currentProjects;
    if(query){
        currentProjects = matchNames(query);
    } else {
        currentProjects = projects;
    }
    totalProjects = currentProjects.length;
    
    updatePagination();

    const projectContainer = document.querySelector('#project-container');
    const template = document.querySelector('template#project-card');
    projectContainer.innerHTML = '';
    
    for(let i = startRange; i <= endRange; i++){
        const proj = currentProjects[i-1];
        const projectCard = template.content.cloneNode(true);
        const parent = projectCard.querySelector('div');
        const nameTag = parent.querySelector('a[type=drop-down]');
        const memberBtn = parent.querySelector('p>a');
        const memberCount = memberBtn.querySelector('span');
        
        const addBtn = parent.querySelector('a[type=add-members]');
        const modifyBtn = parent.querySelector('.modify-project>a');
        const deleteButton = parent.querySelector('[type=delete-button]');
        
        const id = proj.id_project;
        const name = proj.project_name;

        nameTag.prepend(name);

        memberCount.innerText = proj.members.length;

        memberBtn.addEventListener('click', (ev) => {
            modifyPoints(id, proj.members);
        });

        addBtn.addEventListener('click', (ev) => {
            addMembers(proj.id_project, proj.members);
        })
        modifyBtn.href = `/project/modify/${id}`;

        deleteButton.addEventListener('click', (ev) => {
            actionDeleteButton(id, name, parent, proj);
        });

        projectContainer.appendChild(projectCard);
    } 
}

(async () => {
    let response;
    response = await fetch('/project/all')
    .then(res => res.json());

    projects = response.projects;
    members = response.members;
    // window.addEventListener('resize', updatePagination);
    updateUi();

    if(window.innerWidth <= 800) {
        memberDropdowns(true);
        window.addEventListener('resize', resizeToPc);
    } else {
        memberDropdowns(false);
        window.addEventListener('resize', resizeToPhone);
    }

    const searchBar = document.getElementById('search-bar');
    searchBar.addEventListener('input', (ev) => {
        query = ev.target.value;
        page = 1;
        updateUi();
    });

    const maxRowSelect = document.getElementById('max-rows');
    maxRowSelect.addEventListener('input', (ev) => {
        maxRows = maxRowSelect.value;
        page = 1;
        updateUi();
    });
})();