const { default: Swal } = require("sweetalert2");

const alertErr = ()=>{
  Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: 'Something went wrong!',
  footer: '<a href="">Why do I have this issue?</a>'
})}