document.querySelectorAll(".card button").forEach(function(btn){

btn.onclick=function(){

alert("Live Demo Coming Soon!");

}

});

document.querySelector("form").addEventListener("submit",function(e){

e.preventDefault();

alert("Thank you! Your message has been sent.");

this.reset();

});
