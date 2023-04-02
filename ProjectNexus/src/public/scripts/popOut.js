const popOut = document.getElementById('popOut');
popOut.addEventListener('click', () => {
    popOut.parentNode.remove();
});