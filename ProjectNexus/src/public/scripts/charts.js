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

// Estimate vs Progress Chart
new Chart(
document.getElementById('estimate-progress'),{
    type: 'bar',
    options: {
    scales: {
        x: {
        stacked: true
        },
        y: {
        stacked: true
        }
    },
    plugins: {
        legend: {
        display: true,
        position: 'bottom',
        labels:{
            padding: 40,
            usePointStyle: true
        } 
        }
    },
    responsive: true,
    aspectRatio: 1
    },
    
    data: {
    labels: ['Epic 1', 'Epic 2', 'Epic 3'],

    datasets: [{
        label: 'Progress',
        data: [12, 15, 10],
        backgroundColor: [
            //tailwind red-400
            'rgb(248, 113, 113)',
            //tailwind red-600
            'rgb(220, 38, 38)',
            //tailwind gray-700
            'rgb(55,65,81)'
        ]
    },{
        label: 'Estimate',
        data: [7, 8, 5],
        backgroundColor: //tailwind gray-200
        'rgb(229, 231, 235)',
        hoverBackgroundColor: "#C1C1C2"
    }]
    }
}
);

// Backend Points
new Chart(
document.getElementById('backend-points'),{
    type: 'bar',
    options: {
    indexAxis: 'y',
    scales: {
        x: {
        stacked: true
        },
        y: {
        stacked: true
        }
    },
    plugins: {
        legend: {
        display: true,
        position: 'bottom',
        labels:{
            usePointStyle: true
        } 
        }
    },
    responsive: true,
    aspectRatio: 3
    },
    
    data: {
    labels: [""],

    datasets: [{
        label: 'Epic 1',
        data: [7],
        backgroundColor: //tailwind red-400
        'rgb(248, 113, 113)'
        
    },{
        label: 'Epic 2',
        data: [12],
        backgroundColor: //tailwind red-600
        'rgb(220, 38, 38)'
        
    },{
        label:'Epic 3',
        data: [18],
        backgroundColor: //tailwind gray-300
        'rgb(209, 213, 219)'

    }]
    }
}
);

// Frontend Points
new Chart(
document.getElementById('frontend-points'),{
    type: 'bar',
    options: {
    indexAxis: 'y',
    scales: {
        x: {
        stacked: true
        },
        y: {
        stacked: true
        }
    },
    plugins: {
        legend: {
        display: true,
        position: 'bottom',
        labels:{
            usePointStyle: true
        } 
        }
    },
    responsive: true,
    aspectRatio: 3
    },
    
    data: {
    labels: [""],

    datasets: [{
        label: 'Epic 1',
        data: [7],
        backgroundColor: //tailwind red-400
        'rgb(248, 113, 113)'
    },{
        label: 'Epic 2',
        data: [12],
         backgroundColor://tailwind red-600
         'rgb(220, 38, 38)'
    },{
        label:'Epic 3',
        data: [8],
        backgroundColor: //tailwind gray-300
        'rgb(209, 213, 219)'
    }]
    }
}
);

// Team Weeks
new Chart(
document.getElementById('team-weeks'),{
    type: 'bar',
    options: {
    indexAxis: 'y',
    scales: {
        x: {
        stacked: true
        },
        y: {
        stacked: true
        }
    },
    plugins: {
        legend: {
        display: true,
        position: 'bottom',
        labels:{
            usePointStyle: true
        } 
        }
    },
    responsive: true,
    aspectRatio: 3
    },
    
    data: {
    labels: [""],

    datasets: [{
        label: 'Epic 1',
        data: [2],
        backgroundColor: //tailwind red-400
        'rgb(248, 113, 113)'
    },{
        label: 'Epic 2',
        data: [1.5],
        backgroundColor:  //tailwind red-600
        'rgb(220, 38, 38)'
    },{
        label:'Epic 3',
        data: [2.5],
        backgroundColor: //tailwind gray-300
        'rgb(209, 213, 219)'
    }]
    }
}
);