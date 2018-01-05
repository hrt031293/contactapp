$(document).ready(function(){
    var retrievedObject = localStorage.getItem('userObject');
    var user=JSON.parse(retrievedObject);
console.log(user);
document.getElementById('uname').innerText=user.username;
document.getElementById('uemail').innerText=user.useremail;
})
