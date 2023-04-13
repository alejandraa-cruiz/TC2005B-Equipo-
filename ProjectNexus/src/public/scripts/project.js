const modifyProject = () => {
    const projectForm = document.getElementById('project-form');
    const data = new FormData(projectForm);

    fetch(window.location.pathname,{
        method: 'POST',
        body: data,
    }).then(res=>res.json()).then(res => {
        let messages = res.e
        switch (messages) {
            case 'Success!':
                messagge.innerText = 'Success!';
                alertSucc.classList.remove('hidden');
                setTimeout(function () {
                    alertSucc.classList.add('hidden')
                }, 3000);
                break;
            case 'Invalid time range':
                messagge.innerText = 'Invalid time range';
                alertErr.classList.remove('hidden');
                setTimeout(function () {
                    alertErr.classList.add('hidden')
                }, 3000);
                break;
        }
        projectForm.reset();
        setTimeout(()=>{
            location.href = '/project/list'
        }, 1000);
    })
};
