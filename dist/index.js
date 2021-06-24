var nameInputEl=document.querySelector("#username"),usersContainerEl=document.querySelector(".users-container");let myRepos=document.getElementById("myRepos"),userGithub=document.getElementById("usergithub");const firstNameUpdate=async()=>{const a=document.querySelector("#first-name-input").value;if($("body").toast({title:"SUCCESS",message:"Your first name has been updated!",showProgress:"bottom",class:"success"}),a){const b=await fetch("/api/users/firstname",{method:"PUT",body:JSON.stringify({firstname:a}),headers:{"Content-Type":"application/json"}});b.ok?window.location.reload():console.log(b)}},lastNameUpdate=async()=>{const a=document.querySelector("#last-name-input").value;if($("body").toast({title:"SUCCESS",message:"Your last name has been updated!",showProgress:"bottom",class:"success"}),a){const b=await fetch("/api/users/lastname",{method:"PUT",body:JSON.stringify({lastname:a}),headers:{"Content-Type":"application/json"}});b.ok?window.location.reload():console.log(b)}},cityUpdate=async()=>{const a=document.querySelector("#city-input").value;if($("body").toast({title:"SUCCESS",message:"Your city has been updated!",showProgress:"bottom",class:"success"}),a){const b=await fetch("/api/users/city",{method:"PUT",body:JSON.stringify({city:a}),headers:{"Content-Type":"application/json"}});b.ok?window.location.reload():console.log(b)}},countryUpdate=async()=>{const a=document.querySelector("#country-input").value;if($("body").toast({title:"SUCCESS",message:"Your country has been updated!",showProgress:"bottom",class:"success"}),a){const b=await fetch("/api/users/country",{method:"PUT",body:JSON.stringify({country:a}),headers:{"Content-Type":"application/json"}});b.ok?window.location.reload():console.log(b)}},emailUpdate=async()=>{const a=document.querySelector("#email-input").value;if($("body").toast({title:"SUCCESS",message:"Your email has been updated!",showProgress:"bottom",class:"success"}),a){const b=await fetch("/api/users/email",{method:"PUT",body:JSON.stringify({email:a}),headers:{"Content-Type":"application/json"}});b.ok?window.location.reload():console.log(b)}},linkedinUpdate=async()=>{const a=document.querySelector("#linkedin-input").value;if($("body").toast({title:"SUCCESS",message:"Your linkedin has been updated!",showProgress:"bottom",class:"success"}),a){const b=await fetch("/api/users/linkedin",{method:"PUT",body:JSON.stringify({linkedin:a}),headers:{"Content-Type":"application/json"}});b.ok?window.location.reload():console.log(b)}},githubUpdate=async()=>{const a=document.querySelector("#github-input").value;if($("body").toast({title:"SUCCESS",message:"Your github has been updated!",showProgress:"bottom",class:"success"}),a){const b=await fetch("/api/users/github",{method:"PUT",body:JSON.stringify({github:a}),headers:{"Content-Type":"application/json"}});b.ok?window.location.reload():console.log(b)}},mainProject=async()=>{const a=document.querySelector("#myRepos").value.trim();if($("body").toast({title:"SUCCESS",message:"Your main project has been updated!",showProgress:"bottom",class:"success"}),console.log(a),a){const b=await fetch("/api/users/mainproject",{method:"PUT",body:JSON.stringify({mainproject:a,usermainproject:`${userGithub}/${a}`}),headers:{"Content-Type":"application/json"}});b.ok?window.location.reload():console.log(response)}},portfolioUpdate=async()=>{const a=document.querySelector("#portfolio-input").value;if($("body").toast({title:"SUCCESS",message:"Your portfolio has been updated!",showProgress:"bottom",class:"success"}),console.log(a),a){const b=await fetch("/api/users/portfolio",{method:"PUT",body:JSON.stringify({portfolio:a}),headers:{"Content-Type":"application/json"}});b.ok?window.location.reload():console.log(b)}},aboutmeUpdate=async()=>{const a=document.querySelector("#about-me").value;if($("body").toast({title:"SUCCESS",message:"Your about me has been updated!",showProgress:"bottom",class:"success"}),console.log(a),a){const b=await fetch("/api/users/aboutme",{method:"PUT",body:JSON.stringify({aboutme:a}),headers:{"Content-Type":"application/json"}});b.ok?window.location.reload():console.log(b)}},insertTech=async()=>{const a=document.querySelector("#tech-input").value.trim().toLowerCase();if(console.log(a),a){const b=await fetch("/api/users/tech",{method:"POST",body:JSON.stringify({tech:a}),headers:{"Content-Type":"application/json"}});200===b.status?($("body").toast({title:"SUCCESS",message:"A new technology been added!",showProgress:"bottom",class:"success"}),window.location.reload()):400===b.status&&$("body").toast({class:"error",message:`Tech already exists ! `})}},addTech=async()=>{const a=document.querySelector("#techs").value;if($("body").toast({title:"SUCCESS",message:"Technology has been updated!",showProgress:"bottom",class:"success"}),console.log(a),a){const b=await fetch("/api/users/mytech",{method:"PUT",body:JSON.stringify({tech:a}),headers:{"Content-Type":"application/json"}});b.ok?window.location.reload():console.log(b)}},addAvatar=async()=>{const a=document.querySelector("#avatar-input").value;if(console.log(`Avatar => ${a}`),$("body").toast({title:"SUCCESS",message:"Avatar has been updated!",showProgress:"bottom",class:"success"}),a){const b=await fetch("/api/users/avatar",{method:"PUT",body:JSON.stringify({avatar:a}),headers:{"Content-Type":"application/json"}});b.ok?location.reload():$("body").toast({class:"error",message:`Select an avatar !`})}},deleteAccount=async()=>{const a=await fetch("/api/users/delete",{method:"DELETE",headers:{"Content-Type":"application/json"}});a.ok?location.reload():alert(a.statusText)};var getUserRepos=async function(a){await fetch("https://api.github.com/users/"+a+"/repos").then(function(a){a.ok?a.json().then(function(a){console.log(a),displayRepos(a)}):$("body").toast({class:"error",message:`An error occured !`})}).catch(function(){$("body").toast({class:"error",message:`An error occured !`})})},displayRepos=function(a){if(0===a.length)return void(usersContainerEl.textContent="No repositories found.");for(var b=0;b<a.length;b++){var c="https://github.com/"+a[b].owner.login+"/"+a[b].name,d=document.createElement("div");d.classList.add("ui","card","yellow");var e=document.createElement("div");e.classList.add("content");var f=document.createElement("a");f.classList.add("center","aligned","header"),f.setAttribute("href",c),f.setAttribute("target","_blank"),f.textContent=a[b].name;var g=document.createElement("i");g.classList.add("github","icon");var h=document.createElement("div");h.classList.add("center","aligned","meta");var j=document.createElement("a");j.textContent=a[b].description,j.setAttribute("href",c),j.setAttribute("target","_blank"),d.appendChild(e),f.appendChild(g),e.appendChild(f),e.appendChild(h),h.appendChild(j),usersContainerEl.appendChild(d);let i=document.createElement("option");i.textContent=a[b].name,myRepos.appendChild(i)}};$(".edit-profile-button").click(function(){$(".ui.modal").modal({onHide:function(){console.log("hidden")},onShow:function(){console.log("shown")},onApprove:function(){return console.log("Approve"),validateModal()}}).modal("show")}),$(".dropdown").dropdown(),"1"===$("#aboutme-toast").text()&&$("body").toast({class:"purple",displayTime:0,closeIcon:!0,message:"Please fill in your about me..."}),"1"===$("#portfolio-toast").text()&&$("body").toast({class:"blue",displayTime:0,closeIcon:!0,message:"Please link your portfolio..."}),"1"===$("#mainproject-toast").text()&&$("body").toast({class:"yellow",displayTime:0,closeIcon:!0,message:"Please select a main project..."}),document.getElementById("delete-button").addEventListener("click",()=>{$("body").toast({message:"Are you sure you want to delete your account? All your stars will be deleted as well.",displayTime:0,class:"black",classActions:"left vertical attached",actions:[{text:"Delete Account",class:"red",click:function(){$("body").toast({message:"Account Deleted"}),deleteAccount()}},{text:"Nevermind",class:"green",click:function(){$("body").toast({message:"Hooray!"})}}]})}),ifdark=!0;const theme=()=>{var a=document.querySelector(".user-background");a.classList.toggle("background");var b=document.querySelector("#night-tech");b.classList.toggle("inverted");var c=document.body;c.classList.toggle("dark-mode");var d=document.querySelector("#nav");d.classList.toggle("inverted"),ifdark?($(".divider").css({color:"white"}),ifdark=!ifdark):($(".divider").css({color:"black"}),ifdark=!ifdark)};$(document).ready(()=>{var a=nameInputEl.innerHTML.trim();a?(getUserRepos(a),nameInputEl.value=""):$("body").toast({class:"error",message:`No github username under this account !`})}),$(document).ready(()=>{let a=$(".userbadge");$(a).css("border","2px solid yellow"),"Star Hunter"===$(a).text()&&$(a).css("background-color","#fbbd08"),"New Star"===$(a).text()&&$(a).css("background-color","#ffe596"),"Bright Star"===$(a).text()&&$(a).css("background-color","#ffd865"),"Super Star"===$(a).text()&&$(a).css("background-color","#fbbd08")}),document.querySelector("#avatar-button").addEventListener("click",addAvatar),document.querySelector("#add-tech-button").addEventListener("click",addTech),document.querySelector("#insert-tech-button").addEventListener("click",insertTech),document.querySelector("#about-me-button").addEventListener("click",aboutmeUpdate),document.querySelector("#main-project-button").addEventListener("click",mainProject),document.querySelector("#portfolio-button").addEventListener("click",portfolioUpdate),document.querySelector("#first-name-button").addEventListener("click",firstNameUpdate),document.querySelector("#last-name-button").addEventListener("click",lastNameUpdate),document.querySelector("#city-button").addEventListener("click",cityUpdate),document.querySelector("#country-button").addEventListener("click",countryUpdate),document.querySelector("#email-button").addEventListener("click",emailUpdate),document.querySelector("#linkedin-button").addEventListener("click",linkedinUpdate),document.querySelector("#github-button").addEventListener("click",githubUpdate);