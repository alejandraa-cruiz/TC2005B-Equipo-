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
        .then(data =>{
            console.log(data);
        })
}

const formSearchProject = document.getElementById('form-search-projects');
const projectSearchBar = document.getElementById('project-search');
formSearchProject.addEventListener("submit", handleSubmit);