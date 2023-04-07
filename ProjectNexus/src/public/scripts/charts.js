//File name: charts.js
//Developed by: Alejandra Cabrera A01704463 and Azul Rosales A01706348
//Started on: 06-04-23

const ticket_status= document.getElementById('ticket_status');
const burnup_chart= document.getElementById('burnup_chart');

//Burnup Chart
new Chart(burnup_chart,{
    type:'line',
    data:{
        labels: ['0','1','2','3','4','5','6','7'],
        datasets:[
            {
            label:'Goal Points',
            data:[0,11,21,32,43,54,64,75],
            //tailwind red-400
            borderColor:'rgb(248, 113, 113)',
            backgroundColor:'rgb(248, 113, 113)'
            },
            {
            label:'Points Done',
            data:[0,4,12,15,33,38,58,75],
            //tailwind red-600
            borderColor:'rgb(220, 38, 38)',
            backgroundColor:'rgb(220, 38, 38)'
            },
            {
            label:'Scope Points',
            data:[67,67,67,67,67,72,75,75],
            //tailwind gray-700
            borderColor:'rgb(55,65,81)',
            backgroundColor:'rgb(55,65,81)'
            }
        ]
    },

    options: {
        responsive: true,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
            legend: {
                position: 'bottom',
                labels:{
                    padding: 30,
                    usePointStyle: true
                }     
            }
        },
    }
})

//Ticket Status Chart
  new Chart(ticket_status, {
    type: 'doughnut',
    data: {
      labels: ['Done', 'In Review', 'Closed', 'Backlog'],
      datasets: [{
        label: 'Ticket Percentage',
        data: [38.6, 22.5, 30.8, 8.1],
        backgroundColor: [
            //tailwind red-400
            'rgb(248, 113, 113)',
            //tailwind red-600
            'rgb(220, 38, 38)',
            //tailwind gray-200
            'rgb(229, 231, 235)',
            //tailwind gray-700
            'rgb(55,65,81)'

          ],
          hoverOffset: 4
      }]
    },
    
    options: {
        plugins: {
            legend: {
                position: 'right',
                labels:{
                    padding: 40,
                    usePointStyle: true
                }     
            }
        }
    }
  });
