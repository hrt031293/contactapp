function Submit(){
    var name=document.getElementById("name").value;
    var email=document.getElementById("email").value;
    var password=document.getElementById("pass").value;
    var repassword=document.getElementById("repass").value;
    console.log(email);
    console.log(name)
axios.post('/user',{name:name,email:email,password:password,repassword:repassword})
.then((response)=>{
    console.log("response",response);
    if(response.data.status==true){
        window.location='/';
    }
   if (response.data.status==false && response.data.user==true){
       alert(response.data.message) 
       window.location='/signup';
    }
    if (response.data.status==false){
        alert(response.data.message) 
        window.location='/signup';
     }
})
}