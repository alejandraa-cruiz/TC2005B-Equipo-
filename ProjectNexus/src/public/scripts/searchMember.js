function search(value){
    const tr = document.getElementById('tr');
    fetch('/members/search?memberid=' + value,{
        method: 'GET'
    })
    .then(res => res.json())
    .then(res => {
        
        //tr.innerHTML='';
        res.teamMembers.forEach(member => {
            if(member.team == "FE"){
                tr.innerHTML += 
                `<tr class="h-20 border-b-2 border-white">
                    <td class="flex">
                        <span class= "max-w-[12rem] overflow-hidden break-words phone:max-w-[8rem]">
                            "${member.member_name}"
                        </span>
                    </td>
                    <td>
                        <span class="p-2 bg-members-bg-green rounded-lg text-members-text-green">
                            Frontend
                        </span>
                    </td>
                </tr>`
            }
            else{ `
                <tr class="h-20 border-b-2 border-white">
                    <td class="flex">
                        <span class= "max-w-[12rem] overflow-hidden break-words phone:max-w-[8rem]">
                        "${member.member_name}"
                        </span>
                    </td>
                    <td>
                        <span class="p-2 bg-members-bg-yellow rounded-lg text-members-text-yellow">
                            Backend
                        </span>
                    </td>
                </tr>
                `}
       
            
        });
    })
}