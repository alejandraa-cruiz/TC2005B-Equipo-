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
                containerList += `<div id="containerList">
                                            <div class="flex flex-wrap w-full appearance-none items-center select-none mb-5 mt-5" id="project-list">
                                                <div class="w-3/12 h-[3rem] content-center">
                                                    <div class="flex flex-row justify-start w-full mx-auto items-center text-center pl-12">
                                                        <p class="text-center font-medium text-[1.250rem]">
                                                            Project Title
                                                        </p>
                                                    </div>
                                                </div>
                                                <div class="w-3/12 h-[3rem]">
                                                    <div class="flex flex-row justify-center w-full mx-auto items-center">
                                                        <div class="">
                                                            <p class="justify-self-center text-center break-words font-medium text-[1.250rem]">
                                                                Team Members
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="w-3/12 h-[3rem] items-center text-center">
                                                    <div class="flex flex-row justify-center w-full mx-auto items-center content-center justify-self-center">
                                                        <div class="text-center">
                                                            <p class="justify-self-center text-center break-words font-medium text-[1.250rem]">
                                                                Add member
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="w-3/12 h-[3rem] items-center text-center">
                                                    <div class="flex flex-row justify-center w-full mx-auto items-center content-center justify-self-center">
                                                        <div class="text-center">
                                                            <p class="justify-self-center text-center break-words font-medium text-[1.250rem]">
                                                                Delete project
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="flex flex-wrap w-full appearance-none items-center select-none">
                                                <div class="w-3/12 h-[3rem] content-center justify-start">
                                                    <div class="flex flex-row justify-start w-full mx-auto items-center text-center pl-12">
                                                        <p class="text-center">
                                                            ${data.projects[0].project_name}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div class="w-3/12 h-[3rem]">
                                                    <div class="flex flex-row justify-center w-full mx-auto items-center">
                                                        <div class="flex flex-row justify-center w-full mx-auto items-center">
                                                            <div class=" w-3/12 bg-members rounded-lg break-words text-teal-800 p-[0.180rem]">
                                                                <p class="justify-self-center text-center break-words select-text">
                                                                ${data.projects[0].count_team_members} Members
                                                                </p>
                                                            </div>
                                                            <div class="break-words hover:bg-members rounded-lg p-[0.20rem] hover:cursor-pointer text-teal-800 duration-200">
                                                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user-edit" width="24" height="24"
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
                                            </div>
                                            <div class="w-3/12 h-[3rem] content-center text-center mx-auto items-center pl-5 justify-center">
                                                <div class="flex flex-row content-center mx-auto items-center w-full justify-center">
                                                    <div class= "break-words hover:bg-members rounded-lg p-[0.20rem] hover:cursor-pointer text-teal-800 duration-200">
                                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user-plus justify-self-center" width="24" height="24"
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
                                            <div class="w-3/12 h-[3rem] content-center text-center mx-auto items-center pl-5 justify-center">
                                                <div class="flex flex-row content-center mx-auto items-center w-full justify-center">
                                                    <div class= "break-words hover:bg-red-500 rounded-lg p-[0.20rem] hover:cursor-pointer  text-zinc-900 duration-200">
                                                        <svg id="delete-popup" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-trash"
                                                            viewBox="0 0 16 16">
                                                        <path
                                                            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                        <path fill-rule="evenodd"
                                                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="w-full h-1 bg-slate-50 mt-[2.325rem] mb-[2.325rem]"></div>`;
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