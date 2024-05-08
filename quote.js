let api_url="https://api.quotable.io/random"
let quote=document.getElementById("quote")
let author=document.getElementById("author")
let seeQoute=document.getElementById("btn")
let saving=document.getElementById("saving")
let saves=document.getElementById("tasks")
let data;
let savedQuoteContent
let see=document.getElementById("show")
let liking=document.getElementById("liking")
let saved=[];
let liked=[]

if(localStorage.getItem('likedQuotes') == null){
    localStorage.setItem('likedQuotes' , JSON.stringify(liked))
}else{
    liked = JSON.parse(localStorage.getItem('likedQuotes'))
}
if(localStorage.getItem('savedQuotes') == null){
    localStorage.setItem('savedQuotes' , JSON.stringify(saved))
}else{
    liked = JSON.parse(localStorage.getItem('savedQuotes'))
}

async function getQuote(url){
      const res=await fetch(url)
        data=await res.json()
    quote.innerHTML=data.content
    saving.style.display="inline"
    liking.style.display="inline"
   author.innerHTML=data.author 
   savedQuoteContent=data.content
   likedQoute=data.content
   
   if(saving.classList.contains("fa-solid")){
       saving.classList.remove("fa-solid")
       saving.classList.add("fa-regular")
    //    saveData()
}
if (liking.classList.contains("fa-solid")) {
    liking.classList.remove("fa-solid")
    liking.classList.add("fa-regular")
    liking.style.color="black"
} 
}
seeQoute.onclick=()=>{
    getQuote(api_url)
}

function saveData(){
    saved.push(savedQuoteContent)
    localStorage.setItem('savedQuotes',JSON.stringify(saved));
}
function saveLiked(){
    liked.push(likedQoute)
    localStorage.setItem('likedQuotes',JSON.stringify(liked))
    
}
// function removeData(){
//     saved.pop
//     localStorage.setItem('savedQuotes',JSON.stringify(saved));
// }
saving.onclick = () => {
    if (saving.classList.contains("fa-regular")) {
        saving.classList.remove("fa-regular")
        saving.classList.add("fa-solid")
        saveData()
       } else {
        saving.classList.remove("fa-solid")
        saving.classList.add("fa-regular")
        // removeData()
    }
}
liking.onclick = () => {
    if (liking.classList.contains("fa-regular")) {
        liking.classList.remove("fa-regular")
        liking.classList.add("fa-solid")
        liking.style.color="red"
        saveLiked()
         
    } else {
        liking.classList.remove("fa-solid")
        liking.classList.add("fa-regular")
        liking.style.color="black"
    }

}
// see.onclick=()=>{
//     for(i=0;i<=saved.length;i++){
//      saves.append(JSON.stringify(saved[i]));
//     }
// }




