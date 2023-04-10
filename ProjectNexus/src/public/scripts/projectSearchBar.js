const formSearchProject = document.getElementById('form-search-projects');
const projectSearchBar = document.getElementById('project-search');
formSearchProject.addEventListener("submit", handleSubmit);
const mainContent = document.getElementById('main-content');
const contentWrapperMain = document.getElementById('content-wrapper');
const firstWrapper = document.getElementById('first-wrapper');
function handleSubmit(event) {
    event.preventDefault();
    const query = projectSearchBar.value;
    fetch("/project/list/" + query, {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    })
        .then(res => {
            return res.json();
        })
        .then(data => {
            let containerList = "";
            console.log(data.projects[0].project_name);
            if (data.projects[0].project_name != null) {
                containerList += `<div id="containerList" class="relative" >
                                            <div class="flex flex-wrap w-full appearance-none items-center select-none mb-5 mt-5" id="project-list">
                                                <div class="w-1/5 h-[3rem] content-center">
                                                    <div class="flex flex-row justify-center w-full mx-auto items-center text-center phone:pl-2 laptop:pl-12 desktop:pl-12">
                                                        <p class="text-center font-medium phone:text-[0.9rem] tablet:text-[1rem] laptop:text-[1.250rem] desktop:text-[1.250rem]">
                                                            Project Title
                                                        </p>
                                                    </div>
                                                </div>
                                                <div class="w-1/5 h-[3rem]">
                                                    <div class="flex flex-row justify-center w-full mx-auto items-center">
                                                        <div class="">
                                                            <p class="justify-self-center text-center break-words font-medium phone:text-[0.9rem] laptop:text-[1.250rem] desktop:text-[1.250rem]">
                                                                Team Members
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="w-1/5 h-[3rem] items-center text-center">
                                                    <div class="flex flex-row justify-center w-full mx-auto items-center content-center justify-self-center">
                                                        <div class="text-center">
                                                            <p class="justify-self-center text-center break-words font-medium phone:text-[0.9rem] laptop:text-[1.250rem] desktop:text-[1.250rem]">
                                                                Add member
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="w-1/5 h-[3rem] items-center text-center">
                                                    <div class="flex flex-row justify-center w-full mx-auto items-center content-center justify-self-center">
                                                        <div class="text-center">
                                                            <p class="justify-self-center text-center break-words font-medium phone:text-[0.9rem] laptop:text-[1.250rem] desktop:text-[1.250rem]">
                                                                Modify project
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="w-1/5 h-[3rem] items-center text-center">
                                                    <div class="flex flex-row justify-center w-full mx-auto items-center content-center justify-self-center">
                                                        <div class="text-center">
                                                            <p class="justify-self-center text-center break-words font-medium phone:text-[0.9rem] laptop:text-[1.250rem] desktop:text-[1.250rem]">
                                                                Delete project
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="flex flex-row w-full appearance-none select-none mb-[1.5rem] mt-[1.5rem]">
                                                <div class="w-1/5 flex flex-row justify-center">
                                                    <div class="flex flex-row justify-center w-2/3 items-center text-center laptop:pl-12 phone:pl-0">
                                                        <p id="project_name" class="text-center select-text phone:text-[0.60rem] tablet:text-[0.65rem] laptop:text-[1.2rem] desktop:text-[1rem]">
                                                            ${data.projects[0].project_name}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div class="w-1/5 flex flex-row justify-center">
                                                    <div class="flex flex-row justify-center laptop:w-3/5 desktop:3/5 tablet:w-10/12 items-center">
                                                        <div class="w-full bg-members rounded-lg break-words text-teal-800 tablet:p-[0.125rem] p-[0.150rem]">
                                                            <p class="justify-self-center text-center break-words select-text phone:text-[0.60rem] tablet:text-[0.65rem] laptop:text-[1.250rem] desktop:text-[1rem]">
                                                                ${data.projects[0].count_team_members} Members
                                                            </p>
                                                        </div>
                                                        <div class="break-words hover:bg-members rounded-lg p-[0.150rem] hover:cursor-pointer text-teal-800 duration-200">
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
                                                        <div class= "hover:bg-members rounded-lg p-[0.20rem] hover:cursor-pointer text-teal-800 duration-200">
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user-plus phone:w-[1.1rem] phone:h-[1.1rem] tablet:w-[1rem] tablet:h-[1rem] justify-self-center laptop:w-[1.6rem] laptop:h-[1.6rem] desktop:w-[1.55rem] desktop:h-[1.55rem]" 
                                                            viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                                                            stroke-linejoin="round">
                                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                            <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
                                                            <path d="M16 19h6"></path>
                                                            <path d="M19 16v6"></path>
                                                            <path d="M6 21v-2a4 4 0 0 1 4 -4h4"></path>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="w-1/5 flex flex-row justify-center content-center items-center">
                                                    <div class= "flex flex-row justify-center break-words hover:bg-slate-500 rounded-lg p-[0.20rem] hover:cursor-pointer  text-zinc-900 duration-200">
                                                        <button>
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
                                                        <button onclick="openPopup('<%=index%>')">
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
                                            <div class="h-1 bg-slate-50"></div>`;
                containerList += `</div>`;
            }
            else {
                containerList += `<p class="text-center font-semibold text-[1.250rem]">No Projects were found</p>`;
            }
            document.getElementById("containerList").innerHTML = containerList;
        })
        .catch(error => {
            console.log(error);
        })
}