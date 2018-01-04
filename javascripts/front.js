

//var axios = require('axios');

function add(){
    var email=document.getElementById("email").value;
    var name=document.getElementById("name").value;
    var number=document.getElementById("number").value;
    console.log('contact data',name,email,number);
    
    
    axios.post('/contact',{name:name,email:email,number:number})
    .then((response)=>{
        if(response.data.status)
        {
           
            contactList();
        }
        else{
            alert(response.data.message);
        }
        
    },(e)=>{
        console.log('err',e);
    })    
}


function contactList(){
    var l='',name="",email="",num="",html="",id="";
    axios.get('/contact')
    .then((response)=>{
        console.log('mycontactlist',response);
        l=response.data.contact.length;
        //console.log('Array Length',l);
        for(i=0;i<l;i++)
        {
        name=response.data.contact[i].name;
        email=response.data.contact[i].email;
        num=response.data.contact[i].number;

        html+=`<tr>
            <td contenteditable='false' class="row${i}" id="name${i}">${name}</td>    
            <td contenteditable='false' class="row${i}" id="email${i}">${email}</td>
            <td contenteditable='false' class="row${i}" id="num${i}">${num}</td>
            <td><button id="btn${i}" onClick="editRow(this.id)">Edit</button></td>
            <td><button id="dltbtn${i}" onClick="dltRow(this.id)">Delete</button></td>
            </tr>`;

        }

document.getElementById("contactBody").innerHTML=html;
    },(e)=>{
        console.log('err',e);
    })    
}
var oldemail="";
function editRow(id)
{
// console.log("id" ,id.slice(3));

j=id.slice(3);
    document.getElementsByClassName(`row${j}`)[0].setAttribute("contenteditable", "true");
    document.getElementsByClassName(`row${j}`)[1].setAttribute("contenteditable", "true");
    document.getElementsByClassName(`row${j}`)[2].setAttribute("contenteditable", "true");
    document.getElementById(`name${j}`).focus();
    oldemail= document.getElementById(`email${j}`).innerHTML;
    document.getElementById(id).innerText='Update';
    document.getElementById(id).removeAttribute("onClick");
    document.getElementById(id).setAttribute('onClick','updateRow(this.id)'); 
    // console.log(oldEmail);

}


function updateRow(id){
    k=id.slice(3);
    var name = document.getElementById(`name${k}`).innerHTML;
    var email = document.getElementById(`email${k}`).innerHTML;
    var num = document.getElementById(`num${k}`).innerHTML;
    console.log(name,email,num,oldemail);
    axios.post('/update',{name:name,email:email,number:num,oldemail:oldemail})
    .then((response)=>{
        console.log(response);
        if(response.data.status)
        {
            alert(response.data.message);
            console.log(response);
            contactList();
        }
        else
        {
            alert(response.data.message);
        }
    },(e)=>{
        alert(response.data.message);
    }); 

    
}
    function dltRow(id)
    {
    k=id.slice(6);
    //console.log(k);
    var email= document.getElementById(`email${k}`).innerHTML;
    //console.log(email);
    axios.post('/delete',{email:email})
    .then((response)=>{
    if(response.data.status){
        contactList();
        alert(response.data.message);
        
    }
    else{
    alert(response.data.message);
    }
    },(e)=>{
        console.log('err',e);
    })
}