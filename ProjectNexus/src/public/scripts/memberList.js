//File name: memberList.js, renamed from: searchMember.js
//Developed by: Alejandra Cabrera Ruiz A01704463 and Pablo Martinez Valdivia A01275676
//Date: Ended April 26th, 2023

import { confirmationPopUp } from './popUp.js';
import { createAlert } from "./ajaxAlertHandler.js"; 

let teamMembers = [];
let maxRows = 10;
let page = 1;
let totalMembers = 0;
let startRange = page;
let endRange = maxRows;

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

const actionDeleteButton = async (id, name, parent, member) => {
    confirmationPopUp(name)
    .then((ev) => {
        fetch(`/members/delete/${id}`,{
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(payload => {
            createAlert(payload);
            if(!payload.error){
                parent.remove();
                const index = teamMembers.indexOf(member);
                teamMembers.splice(index, 1);
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
    teamMembers.forEach(member => {
        const name = member.member_name;
        if(matcher.test(name)){
            matchedNames.push(member);
        }
    });
    return matchedNames;
}

const updatePagination = () => {
    let total = totalMembers;
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

const updateUi = () => {
    let members;
    if(query){
        members = matchNames(query);
    } else {
        members = teamMembers;
    }
    totalMembers = members.length;
    
    updatePagination();

    const memberContainer = document.querySelector('#member-container');
    const template = document.querySelector('template#member-card');
    memberContainer.innerHTML = '';
    
    for(let i = startRange; i <= endRange; i++){
        const member = members[i-1];
        const memberCard = template.content.cloneNode(true);
        const parent = memberCard.querySelector('div');
        const nameTag = parent.querySelector('a');
        const memberTeam = parent.querySelector('p>.member-team');
        const modifyBtn = parent.querySelector('.modify-member>a');
        const deleteButton = parent.querySelector('[type=delete-button]');

        const id = member.id_team_member;
        const name = member.member_name;

        nameTag.prepend(member.member_name);

        if(member.team === 'FE'){
            memberTeam.classList.add('member-frontend');
            memberTeam.innerText = 'Frontend';
        } else {
            memberTeam.classList.add('member-backend');
            memberTeam.innerText = 'Backend';
        }

        modifyBtn.href = `/members/modify/${id}`;

        deleteButton.addEventListener('click', (ev) => {
            actionDeleteButton(id, name, parent, member);
        });

        memberContainer.appendChild(memberCard);
    } 
}

(async () => {
    let response;
    response = await fetch('/members/search')
    .then(res => res.json());

    teamMembers = response.teamMembers;

    window.addEventListener('resize', updatePagination);
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
