let divContainer = document.getElementById('containerList');
let popupOpenSearch = false;
function searchProject(value, startIndex, endIndex){
    // const popUpDeleteByIndex = document.getElementById('popup-${index}')
    fetch(`/project/list/search?projectName=${value}&startIndex=${startIndex}&endIndex=${endIndex}`,{
        method: `GET`
    })
    .then( res => res.json())
    .then( res =>{
            divContainer.innerHTML = '';
            if(res.Projects.length > 0){
                res.Projects.forEach((project, index) => {
                    if(project.project_name !== null){
                        if (project.count_team_members > 0) {
                            divContainer.innerHTML += `
                        <div class="flex flex-row w-full appearance-none select-none mb-[1.5rem] mt-[1.5rem] text-center">
                            <div class="w-1/5 flex flex-row justify-center">
                                <div class="flex flex-row justify-center w-2/3 items-center text-center phone:pl-0 laptop:pl-12">
                                    <p id="project_name" class="text-center select-text phone:text-[0.60rem] tablet:text-[0.65rem] laptop:text-[1.2rem] desktop:text-[1rem]">
                                        ${project.project_name}
                                    </p>
                                </div>
                            </div>
                            <div class="w-1/5 flex flex-row justify-center">
                                <div class="flex flex-row justify-center laptop:w-3/5 desktop:3/5 tablet:w-10/12 items-center">
                                    <div class="desktop:w-8/12 laptop:w-8/12 w-full bg-members-bg-green rounded-lg break-words text-teal-800 tablet:p-[0.125rem] p-[0.150rem]">
                                        <p class="justify-self-center text-center break-words select-text phone:text-[0.60rem] tablet:text-[0.65rem] laptop:text-[1.250rem] desktop:text-[1rem]">
                                            ${project.count_team_members} Members
                                        </p>
                                    </div>
                                    <div class="break-words hover:bg-members-bg-green rounded-lg p-[0.150rem] hover:cursor-pointer text-teal-800 duration-200">
                                        <svg class="phone:w-[1.1rem] phone:h-[1.1rem] tablet:w-[1rem] tablet:h-[1rem] laptop:w-[1.6rem] laptop:h-[1.6rem] desktop:w-[1.55rem] desktop:h-[1.55rem] icon icon-tabler icon-tabler-user-edit" xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                                            stroke-linejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                            <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
                                            <path d="M6 21v-2a4 4 0 0 1 4 -4h3.5"></path>
                                            <path d="M18.42 15.61a2.1 2.1 0 0 1 2.97 2.97l-3.39 3.42h-3v-3l3.42 -3.39z"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div class="w-1/5 flex flex-row justify-center content-center">
                                <div class="flex flex-row w-full justify-center content-center items-center">
                                    <div class= "hover:bg-members-bg-green rounded-lg p-[0.20rem] hover:cursor-pointer text-teal-800 duration-200">
                                        <button onclick="openPopupMemberSearchBar('${index}', '${project.id_project}', '${project.project_name}', event)">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user-plus phone:w-[1.1rem] phone:h-[1.1rem] tablet:w-[1rem] tablet:h-[1rem] justify-self-center laptop:w-[1.6rem] laptop:h-[1.6rem] desktop:w-[1.55rem] desktop:h-[1.55rem]" 
                                            viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                                            stroke-linejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                            <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
                                            <path d="M16 19h6"></path>
                                            <path d="M19 16v6"></path>
                                            <path d="M6 21v-2a4 4 0 0 1 4 -4h4"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="w-1/5 flex flex-row justify-center content-center items-center">
                                <div class= "flex flex-row justify-center break-words hover:bg-slate-500 rounded-lg p-[0.20rem] hover:cursor-pointer  text-zinc-900 duration-200">
                                    <button onclick="location.href='/project/modify/${project.id_project}'">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-pencil-square phone:w-[1.1rem] phone:h-[1.1rem] tablet:w-[1rem] tablet:h-[1rem] laptop:w-[1.6rem] laptop:h-[1.6rem] desktop:w-[1.55rem] desktop:h-[1.55rem]"
                                            viewBox="0 0 16 16">
                                            <path
                                                d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fill-rule="evenodd"
                                                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div class="w-1/5 flex flex-row justify-center content-center items-center">
                                <div class= "flex flex-row justify-center break-words hover:bg-red-500 rounded-lg p-[0.20rem] hover:cursor-pointer  text-zinc-900 duration-200">
                                    <button onclick="openPopupSearchProject('${index}', '${project.project_name}', '${project.id_project}', event)">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-trash phone:w-[1.1rem] phone:h-[1.1rem] tablet:w-[1rem] tablet:h-[1rem] laptop:w-[1.6rem] laptop:h-[1.6rem] desktop:w-[1.55rem] desktop:h-[1.55rem]"
                                        viewBox="0 0 16 16">
                                        <path
                                        d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                        <path fill-rule="evenodd"
                                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="h-1 bg-slate-50"></div>
                        <script> defer src="/scripts/popUp.js"></script>`;
                        } else {
                            divContainer.innerHTML += `
                            <div class="flex flex-row w-full appearance-none select-none mb-[1.5rem] mt-[1.5rem]">
                                <div class="w-1/5 flex flex-row justify-center">
                                    <div class="flex flex-row justify-center w-2/3 items-center text-center phone:pl-0 laptop:pl-12">
                                        <p id="project_name" class="text-center select-text phone:text-[0.60rem] tablet:text-[0.65rem] laptop:text-[1.2rem] desktop:text-[1rem]">
                                            ${project.project_name}
                                        </p>
                                    </div>
                                </div>
                                <div class="w-1/5 flex flex-row justify-center">
                                    <div class="flex flex-row justify-center laptop:w-3/5 desktop:3/5 tablet:w-10/12 items-center">
                                        <div class="desktop:w-8/12 laptop:w-8/12 w-full bg-members-bg-red text-zinc-200 rounded-lg break-words tablet:p-[0.125rem] p-[0.150rem]">
                                            <p class="justify-self-center text-center break-words select-text phone:text-[0.60rem] tablet:text-[0.65rem] laptop:text-[1.250rem] desktop:text-[1rem]">
                                                ${project.count_team_members} Members
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="w-1/5 flex flex-row justify-center content-center">
                                    <div class="flex flex-row w-full justify-center content-center items-center">
                                        <div class= "hover:bg-members-bg-green rounded-lg p-[0.20rem] hover:cursor-pointer text-teal-800 duration-200">
                                            <button onclick="openPopupMemberSearchBar('${index}', '${project.id_project}', '${project.project_name}', event)">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user-plus phone:w-[1.1rem] phone:h-[1.1rem] tablet:w-[1rem] tablet:h-[1rem] justify-self-center laptop:w-[1.6rem] laptop:h-[1.6rem] desktop:w-[1.55rem] desktop:h-[1.55rem]" 
                                                viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                                                stroke-linejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
                                                <path d="M16 19h6"></path>
                                                <path d="M19 16v6"></path>
                                                <path d="M6 21v-2a4 4 0 0 1 4 -4h4"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="w-1/5 flex flex-row justify-center content-center items-center">
                                    <div class= "flex flex-row justify-center break-words hover:bg-slate-500 rounded-lg p-[0.20rem] hover:cursor-pointer  text-zinc-900 duration-200">
                                        <button onclick="location.href='/project/modify/${project.id_project}'">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-pencil-square phone:w-[1.1rem] phone:h-[1.1rem] tablet:w-[1rem] tablet:h-[1rem] laptop:w-[1.6rem] laptop:h-[1.6rem] desktop:w-[1.55rem] desktop:h-[1.55rem]"
                                                viewBox="0 0 16 16">
                                                <path
                                                    d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                <path fill-rule="evenodd"
                                                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div class="w-1/5 flex flex-row justify-center content-center items-center">
                                    <div class= "flex flex-row justify-center break-words hover:bg-red-500 rounded-lg p-[0.20rem] hover:cursor-pointer  text-zinc-900 duration-200">
                                        <button onclick="openPopupSearchProject('${index}', '${project.project_name}', '${project.id_project}', event)">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-trash phone:w-[1.1rem] phone:h-[1.1rem] tablet:w-[1rem] tablet:h-[1rem] laptop:w-[1.6rem] laptop:h-[1.6rem] desktop:w-[1.55rem] desktop:h-[1.55rem]"
                                            viewBox="0 0 16 16">
                                            <path
                                            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                            <path fill-rule="evenodd"
                                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="h-1 bg-slate-50"></div>
                            <script> defer src="/scripts/popUp.js"></script>`;
                        }
                    } else {
                        divContainer.innerHTML += `
                            <div class="flex flex-row justify-center p-10">
                                <div class="text-center">
                                    No Projects Were Found
                                </div>
                            </div>`
                    }
                })
            } else{
                divContainer.innerHTML += `
                <div class="text-center"> No projects were found</div>`
            }
    })
}
function openPopupSearchProject(index, project_name, project_id, event) {
    event.preventDefault();
    if(popupOpenSearch){
        return
    }
    popupOpenSearch = true;
    divContainer.innerHTML += `
                        <div id="popup-search-${index}" class="popup-cancel-delete absolute text-center mx-auto w-full top-[5%] mb-7 items-center
                                let:h-1/2 tablet:w-full tablet:items-center
                                phone:absolute phone:w-full phone:mx-auto phone:items-center phone:h-auto">
                            <div class="flex flex-wrap justify-center w-full items-center
                                tablet:w-full tablet:justify-center tablet:items-center
                                phone:w-full phone:justify-center phone:items-center">
                                <div class=" flex flex-wrap justify-center break-words
                                    desktop:w-1/2
                                    laptop:w-1/2
                                    tablet:w-1/2
                                    phone:justify-center phone:items-center phone:w-1/2">
                                    <form>
                                        <div class="flex flex-col bg-zinc-50 rounded-xl justify-center text-center
                                                desktop:break-words desktop:space-x-5 desktop:p-10 desktop:space-y-4 shadow-lg
                                                laptop:w-8/12 laptop:break-words laptop:space-x-5 laptop:p-5 laptop:space-y-4
                                                tablet:p-6 tablet:text-[0.8rem] tablet:space-y-3 tablet:space-x-3
                                                phone:p-5 phone:text-[0.7rem] phone:space-y-3 phone:space-x-3">
                                                <div class="text-lg font-semibold">
                                                    <p>${project_name}</p>
                                                </div>
                                                <div>
                                                    <p>
                                                        Are you sure you want to delete this project?
                                                    </p>
                                                </div>
                                                <div class="space-x-3">
                                                    <button onclick="deleteProject('${project_id}', event)"
                                                    class="shadow-md bg-mainBg text-red-500 rounded-lg p-2 hover:bg-red-500 hover:text-zinc-100 duration-200">
                                                            Delete
                                                    </button>
                                                    <button id="cancel-project-button"
                                                    onclick="closePopupSearch('${index}', event)"
                                                    class="shadow-md bg-mainBg text-slate-500 rounded-lg p-2  hover:bg-gray-400 hover:text-zinc-100  duration-200">
                                                        Cancel
                                                    </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>`;
    closeByEscapeSearch();
}

function openPopupMemberSearchBar(index, id_project, project_name, event){
    event.preventDefault();
    if (popupOpenSearch) {
        return
    }
    popupOpenSearch = true;
    divContainer.innerHTML += `
       <div id="popupMember-search-${index}" class="popup-cancel-delete absolute content-center text-center items-center top-[5%] mx-auto w-full mb-7 
                tablet:h-1/2 tablet:w-full tablet:items-center
                phone:absolute phone:w-full phone:mx-auto phone:items-center phone:h-auto">
            <div class="flex flex-row justify-center w-full relative">
                <form id="update-member-form-${id_project}">
                    <div class="relative bg-zinc-50 rounded-lg break-words space-x-5 p-10 space-y-4 shadow-lg">
                        <div class="static w-full">
                            <div class=" mb-3">
                                <ul id="dropDownMembers-${index}" class="text-left overflow-y-auto overflow-x-clip custom-scrollbar max-h-[5.0rem] p-5 hover:opacity-90" >
                                </ul>
                            </div>
                            <div class="flex gap-4 justify-center">
                                <button id="save-member-button" onclick="sendMembers('${id_project}')"
                                    class="shadow-md bg-mainBg text-green-500 rounded-lg p-2  hover:bg-gray-400 hover:text-zinc-100  duration-200">
                                    Save
                                </button>
                                    <button id="cancel-project-button" onclick="closePopupSearch('${index}', event)"
                                    class="shadow-md bg-mainBg text-red-500 rounded-lg p-2  hover:bg-gray-400 hover:text-zinc-100  duration-200">
                                        Cancel
                                    </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>`;
    getMembers(id_project, index);
    closeByEscapeSearch();
} 

function closeByEscapeSearch(){
    const popup = document.getElementsByClassName('popup-cancel-delete');
    if(popup[0] != null){
        const handleKeyDown = function (event) {
            if (event.key === 'Escape' && popupOpenSearch) {
                popup[0].remove();
                document.removeEventListener('keydown', handleKeyDown);
                popupOpenSearch = false;
            }
        };
        document.addEventListener('keydown', handleKeyDown);
    }
}

function closePopupSearch(index, event){
    event.preventDefault();
    const popup = document.getElementsByClassName('popup-cancel-delete');
    popup[0].remove();
    popupOpenSearch = false;
}