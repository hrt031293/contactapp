function signin(){
    var email=document.getElementById("email").value;
    var password=document.getElementById("pass").value;
   if(email=="" && password==""){
       alert("Fields are empty");
       return false;
   }
    //console.log("details",email,password);
    axios.post('/signin',{email:email,password:password})
    .then((doc)=>{
    //     if(doc.data.status)
    //     {
            
    //      var userob= localStorage.getItem('userObject');
    //     console.log("userob",userob)

    //       if(userob=='' || userob==null){
    //         window.location="/";
    //         return false;
    //       } 
    //    }

    console.log('ssdsdsdsdsd')
        if(doc.data.status)
        {
           console.log(doc)
            username=doc.data.data.name;
            useremail=doc.data.data.email;
            var userObject = {username, useremail};
            console.log(typeof doc.data.data)
    localStorage.setItem('userObject',JSON.stringify(userObject));
            alert(doc.data.message);
          window.location="/contac";
        }
        else{
            alert(doc.data.message);
        }
    },(e)=>{
        alert(doc.data.message);
    });
    
    }