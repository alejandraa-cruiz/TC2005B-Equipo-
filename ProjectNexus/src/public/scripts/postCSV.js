const input = document.getElementById('csv-input');
const uploadCSV = () => {
  const data = new FormData();
  data.append('csv', input.files[0]);
  
  fetch('/dashboard/upload',{
    method: 'POST',
    body: data,
  }).then(res=>res.json()).then(console.log);
}