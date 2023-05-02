function getProjects(index, event){
    event.preventDefault();
    fetch(`/project/list/pagination/${index}`)
    .then(res => res.json())
    .then(data => {
        let container = document.getElementById("containerList");
        
        container.innerHTML = "";
        data.sliceProjects.forEach((project, index) => {
            if(project.count_team_members > 0){
                container.innerHTML += `<div class="flex flex-row w-full appearance-none select-none mb-[1.5rem] mt-[1.5rem]">
                <div class="w-1/5 flex flex-row justify-center">
                    <div class="flex flex-row justify-center w-2/3 items-center text-center laptop:pl-12 phone:pl-0">
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
            } else{
                container.innerHTML += `<div class="flex flex-row w-full appearance-none select-none mb-[1.5rem] mt-[1.5rem]">
                <div class="w-1/5 flex flex-row justify-center">
                    <div class="flex flex-row justify-center w-2/3 items-center text-center laptop:pl-12 phone:pl-0">
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
        });
    })
    .catch(error => console.log(error));
}