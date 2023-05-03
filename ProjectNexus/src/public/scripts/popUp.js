//File name: popUp.js
// Authors: Karla Alejandra Padilla González A0170331, 
//          Daniel Gutiérrez Gómez A01068056 & José Martínez A01275676
// Date: 26/04/2023

export const confirmationPopUp = async (text) => {
  const template = document.querySelector('template#confirmation-pop-up');
  const content = template.content.cloneNode(true);
  const modal = content.querySelector('div');
  const container = modal.querySelector('div');
  const name = container.querySelector('p#confirmation-name');
  const deleteBtn = container.querySelector('div>#delete-button');
  const cancelBtn = container.querySelector('div>#cancel-delete-button');
  
  container.addEventListener('click', (ev) => {
    ev.stopPropagation();
  });

  name.innerText = text;
  document.body.appendChild(modal);

  return new Promise((resolve, reject) => {
    deleteBtn.addEventListener('click', resolve);
    cancelBtn.addEventListener('click', reject);
    modal.addEventListener('click', reject);
  })
  .finally(() => {
    modal.remove();
  });
  
}
