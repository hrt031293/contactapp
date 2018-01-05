function logout(){

    axios.get('/logoff').then(function(response){
         console.log(response)
       
        if(response.data.status==true){
            username="";
            useremail="";
            var userObject = {username, useremail};
            localStorage.removeItem('userObject');
            console.log( localStorage.getItem('userObject'))
            alert(response.data.message);
            window.location='/';
       }
        
   }).catch(function(error){
       console.log(error)
   })
}