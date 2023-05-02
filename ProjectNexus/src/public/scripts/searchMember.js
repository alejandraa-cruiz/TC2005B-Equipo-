//File name: searchMember.js
//Developed by: Alejandra Cabrera Ruiz A01704463 and Pablo Martinez Valdivia A01275676
//Date: Ended April 13th, 2023

function search(value) {
  const memberTable = document.getElementById('member-table');
  fetch('/members/search?memberid=' + value, {
    method: 'GET',
  }).then(res => res.json()).then(res => {
    console.log(res);
    memberTable.innerHTML = '';
    res.teamMembers.forEach(member => {
      if (member.team == 'FE') {
        memberTable.innerHTML +=
            `<tr class="h-20 border-b-2 border-white">
                    <td class="flex">
                        <span class= "max-w-[12rem] overflow-hidden break-words phone:max-w-[8rem]">
                            ${member.member_name}
                        </span>
                    </td>
                    <td>
                        <span class="p-2 bg-members-bg-green rounded-lg text-members-text-green">
                            Frontend
                        </span>
                    </td>
                </tr>`;
      } else {
        memberTable.innerHTML += `
                <tr class="h-20 border-b-2 border-white">
                    <td class="flex">
                        <span class= "max-w-[12rem] overflow-hidden break-words phone:max-w-[8rem]">
                        ${member.member_name}
                        </span>
                    </td>
                    <td>
                        <span class="p-2 bg-members-bg-yellow rounded-lg text-members-text-yellow">
                            Backend
                        </span>
                    </td>
                </tr>
                `;
      }

    });
  });
}