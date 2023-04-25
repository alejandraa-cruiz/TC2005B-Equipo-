/**
 * 
 * @param {String} url 
 * @param {Object} body 
 * @param {Function} callback
 */
export const alertPostHandler = async (url, body, callback = undefined) => {
    const alert = document.createElement('div');
    alert.innerHTML = `<strong class="font-bold"></strong>
                       <span></span>`;

    const payload = await fetch(url, { method: 'POST', body: body })
                            .then(res => res.json());
    let msg = payload.msg;
    msg = msg? msg: '';

    if(payload.error){
        alert.classList.add('alert-error');
        alert.querySelector('strong').innerText = 'Error!';
        alert.querySelector('span').innerText = msg;
    } else {
        alert.classList.add('alert-success');
        alert.querySelector('strong').innerText = 'Success!';
        alert.querySelector('span').innerText = msg;
    }

    document.body.appendChild(alert);

    if(callback){
        callback(payload.error);
    }

    setTimeout(() => {
        alert.remove();
    }, 3000);
}