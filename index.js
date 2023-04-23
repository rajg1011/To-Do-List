const input=document.querySelector(".input-1");
const btn= document.getElementsByClassName("btn-submit");
btn.addEventListener("click",()=>{
    if(input.value.length==0){
        window.alert("Please add a task");
    }
});