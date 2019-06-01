document.querySelector("#search-box").addEventListener("input", e => {
    //2. Pročitati koja se trenutno vrijednost nalazi u search input (e.currentTarget.value)
    let query = e.currentTarget.value;
    //3. Dohvatiti sve kartice i za svaku karticu
    let posts = document.querySelectorAll(".post");
    
    for(let i = 0; i < posts.length; i++){
       
        if(posts[i].textContent.indexOf(query) >= 0){ //sadrži -> kartica ne smi biti skrivena
           
            posts[i].style.visibility = "visible";
        }
        else {//ne sadrži -> kartica treba biti skrivena
            
            posts[i].style.visibility = "hidden";
        }
    }
});
let heartIcons = document.querySelectorAll(".post .fa-heart-o");
for(let i = 0; i < heartIcons.length; i++){
    let heartIcon = heartIcons[i];
    //b) Za svako srce registiraj funkciju koja će se pokrenuti na klik
    heartIcon.addEventListener("click", handleHeartIconClick);

}
let heartIcons1 = document.querySelectorAll(".post .fa-heart");
for(let i = 0; i < heartIcons1.length; i++){
    let heartIcon = heartIcons1[i];
    //b) Za svako srce registiraj funkciju koja će se pokrenuti na klik
    heartIcon.addEventListener("click", handleHeartIconClick);

}

async function handleHeartIconClick(e){
    console.log("Frane");
    //c) Promini klase fa-heart fa-heart-o za efekt punog/praznog srca
    let heartIcon = e.currentTarget;
    let heartIconParent = (heartIcon.parentElement).parentElement.parentElement;
    var x = heartIconParent.childNodes;
    let number = Number(x[5].childNodes[1].textContent);
    var sumOfHearts = document.querySelector("#additionalcolumn .infoUser #informacije").childNodes;
   let num = Number(sumOfHearts[4].textContent);
   console.log(number);
   let postid = heartIcon.parentElement.parentElement.parentElement.parentElement.getAttribute("id");
   console.log(postid);
   let liked = heartIcon.classList.contains("fa-heart");
   console.log(liked)
   console.log(sumOfHearts[4].textContent);
     //Srce na koje smo sad klikli

     try{
        let serverResponse = await
        fetch(`API.php?action=togglePostLike&id=${postid}&like=${liked ? 0 : 1}&numberlike=${number}`);
        console.log("nfkasbgdsndskangpsčbgfAWPGFAEWĆEGHŠawg");
        let responseData = await serverResponse.json(); 
        console.log("234");
        if(!responseData.success){ 
        alert(`Error liking post: ${responseData.reason}`);
        return;//
        }
        console.log("kbsfkasbfka");
    if(heartIcon.classList.contains("fa-heart-o")){ //"prazno" srce
    number+=1; 
    num +=1;   
    heartIcon.classList.remove("fa-heart-o");
        heartIcon.classList.add("fa-heart");
    

        

    }
    else {
        console.log("uspjeh");
        number -=1;
        num-=1;
        heartIcon.classList.remove("fa-heart");
        heartIcon.classList.add("fa-heart-o");
    }
   
   x[5].childNodes[1].textContent = number.toString();
   
   sumOfHearts[4].textContent = num.toString();
    }
    catch(e) {
        alert("Error when liking post");
    }
}


let bookmarkIcons = document.querySelectorAll(".post .fa-bookmark-o");
for(let i = 0;i<bookmarkIcons.length;i++)
{
    let bookmark = bookmarkIcons[i];
    bookmark.addEventListener("click", handleBookmarkClick);

}
let bookmarkIcons1 = document.querySelectorAll(".post .fa-bookmark");
for(let i = 0;i<bookmarkIcons1.length;i++)
{
    let bookmark = bookmarkIcons1[i];
    bookmark.addEventListener("click", handleBookmarkClick);

}
async function handleBookmarkClick(e){
    console.log("bookmark");
    let bookmarkIcon = e.currentTarget;
    var sumOfBookmark = document.querySelector("#additionalcolumn .infoUser #informacije").childNodes;
   let numBookmark = Number(sumOfBookmark[8].textContent);
   let postid = bookmarkIcon.parentElement.parentElement.parentElement.getAttribute("id");
   let bookmark = bookmarkIcon.classList.contains("fa-bookmark");
   console.log(postid);
   console.log(bookmark);
   try { 
    let serverResponse = await
    fetch(`API.php?action=togglePostBookmark&id=${postid}&bookmark=${bookmark ? 0 : 1}`);
    
    let responseData = await serverResponse.json(); 
    if(!responseData.success){ 
    alert(`Error bookmarking card: ${responseData.reason}`);
    return;//
    }
    if(bookmarkIcon.classList.contains("fa-bookmark-o")){
        numBookmark+=1;
        bookmarkIcon.classList.remove("fa-bookmark-o");
        bookmarkIcon.classList.add("fa-bookmark");
    }
        
    else{
        bookmarkIcon.classList.remove("fa-bookmark");
        bookmarkIcon.classList.add("fa-bookmark-o");
        numBookmark-=1
    }
    sumOfBookmark[8].textContent = numBookmark.toString();
    }
    catch{
        alert("Error when bookmarking post");
    }
}

let commentIcons = document.querySelectorAll(".post .fa-comment-o");
for(let i = 0;i<commentIcons.length;i++)
{
    let comment = commentIcons[i];
    comment.addEventListener("click", handleCommentClick);

}
function handleCommentClick(e){
    console.log("comment");
    let commentIcon = e.currentTarget;
    console.log( commentIcon.parentElement.parentElement.parentElement.childNodes.length);
    let num_children = commentIcon.parentElement.parentElement.parentElement.childNodes.length; 
    let commentArea = commentIcon.parentElement.parentElement.parentElement.childNodes[num_children-2];
   commentArea.value = "";
   commentArea.focus();
}

let commentAreas = document.querySelectorAll(".commentArea");
for(let i = 0;i<commentIcons.length;i++)
{
    let comment = commentAreas[i];
    comment.addEventListener("keypress", handleEnter);

}
async function handleEnter(e){
    console.log("abcder");
     var key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
      let current = e.currentTarget;
    let commentParent = current.parentElement;
    let postid = current.parentElement.parentElement.getAttribute("id");
    let text = current.value;
    console.log(postid);
    console.log(text);
    let commentTemplate = document.querySelector("#addComment");
    let commentElement = document.importNode(commentTemplate.content, true);
    try { 
        let serverResponse = await
        fetch(`API.php?action=addComment&postid=${postid}&comment=${text}`);
        let responseData = await serverResponse.json(); 
        if(!responseData.success){ 
        alert(`Error addingg comment: ${responseData.reason}`);
        return;//
        }
    commentElement.querySelector("#komentiraj").textContent ="username: "+ current.value;
    commentParent.insertBefore(commentElement,current);
    current.value = "";
    }
    catch{
        alert("Error when liking post");
    }



    
    }
    
    
}

let botun = document.querySelector("#button1").addEventListener("click", handleButtonClick);



async function handleButtonClick(e){
    
    let location = prompt("Unesite lokaciju objave","Instagram");
    if(!location){ return; }
    console.log(location);
    let imageUrl = prompt("Unesite put do slike", "avatars/1.jpg");
    if(!imageUrl){ return; }
    console.log(imageUrl);

    let description = prompt("Unesi opis objave", "LOL");
    if(!description){ return; }
    console.log(description);


    let postTemplate = document.querySelector("#addNewPost");
    let postElement = document.importNode(postTemplate.content, true);

    postElement.querySelector("#location").textContent = location;
    postElement.querySelector("#image").src = imageUrl;
    postElement.querySelector("#opis").textContent = description;

    postElement.querySelector(".fa-heart-o").addEventListener("click", handleHeartIconClick);
    postElement.querySelector(".fa-bookmark-o").addEventListener("click", handleBookmarkClick);
    postElement.querySelector(".fa-comment-o").addEventListener("click", handleCommentClick);
    postElement.querySelector(".commentArea").addEventListener("keyup", handleEnter);
    console.log(location);
    console.log(imageUrl);
    console.log(description);
    try { 
        let serverResponse = await
        fetch(`API.php?action=addPost&location=${encodeURIComponent(location)}&img=${encodeURIComponent(imageUrl)}&desc=${encodeURIComponent(description)}`);
        let responseData = await serverResponse.json(); 
        if(!responseData.success){ 
        alert(`Error liking card: ${responseData.reason}`);
        return;//
        }
  
        let post = document.querySelector(".post").parentElement;
        post.insertBefore(postElement,post.childNodes[4]);
    window.location.reload();
      
}
    catch(e) {
        alert("Error when liking post");
    } //

    

    //post.prepend(postElement);
    

}

document.querySelector("#head-heart").addEventListener("click", handleHeadHeartClick);
let headHeartIcon = document.querySelector("#head-heart")
function handleHeadHeartClick(e){
    console.log("zrinka");
    let allPosts = document.querySelectorAll(".post");
    let current = e.currentTarget;
    if(headHeartIcon.classList.contains("fa-heart-o")){
        headHeartIcon.classList.remove("fa-heart-o");
        headHeartIcon.classList.add("fa-heart");
        for(let i = 0;i<allPosts.length;i++){
            if(allPosts[i].querySelector(".fa-komentari").childNodes[1].childNodes[1].classList.contains("fa-heart-o")){
                allPosts[i].style.visibility = "hidden";
            }
        }
    }
    else{
        headHeartIcon.classList.remove("fa-heart");
        headHeartIcon.classList.add("fa-heart-o");
         for(let i = 0;i<allPosts.length;i++){
            if(allPosts[i].querySelector(".fa-komentari").childNodes[1].childNodes[1].classList.contains("fa-heart-o")){
                allPosts[i].style.visibility = "initial";
            }
        }
    }
}
let userIcon = document.querySelector("#user");
userIcon.addEventListener("click", handleUserIconClick);
function handleUserIconClick(e){
   console.log(userIcon);
   let allPosts = document.querySelectorAll(".userLoca");
let focusedUser = document.querySelector("#hideUser");
    if(userIcon.classList.contains("fa-user")){
        console.log("Frane");
        userIcon.classList.remove("fa-user");
        userIcon.classList.add("fa-users");
        
        for(let i = 0;i<allPosts.length;i++)
            if(allPosts[i].childNodes[1].textContent != focusedUser.textContent)
            allPosts[i].parentElement.parentElement.style.visibility = "hidden";
            else
            console.log("nbkjdnsds");
            
    }
    else{
        
        userIcon.classList.remove("fa-users");
        userIcon.classList.add("fa-user");
        for(let i = 0;i<allPosts.length;i++)
              allPosts[i].parentElement.parentElement.style.visibility = "visible";
            
    }

}

let x = document.querySelectorAll(".delete-button");
for(let i = 0;i<x.length;i++)
x[i].addEventListener("click", handleXclick);
function handleXclick(e){
    let current = e.currentTarget;
    let text = current.parentElement.childNodes[5].textContent;
    current.parentElement.remove();
    let allPrijedlozi = document.querySelectorAll(".user");
    for(let i = 0;i<allPrijedlozi.length;i++)
        if(allPrijedlozi[i].childNodes[1].childNodes[3].textContent == text){
            allPrijedlozi[i].remove();
            break;
        }
}
    
let buttonPrijedlog = document.querySelectorAll(".p1");
for(let i = 0;i<buttonPrijedlog.length;i++)
buttonPrijedlog[i].childNodes[7].addEventListener("click", handleButtonPrijedlog);
function handleButtonPrijedlog(e){
    console.log("pitalo");
    current = e.currentTarget;
    let num_folow = document.querySelector("#pratim").textContent;
    document.querySelector("#pratim").textContent = Number(num_folow)+1;
    let text = current.parentElement.childNodes[5].textContent;
    current.parentElement.remove();
    let allPrijedlozi = document.querySelectorAll(".user");
    for(let i = 0;i<allPrijedlozi.length;i++)
        if(allPrijedlozi[i].childNodes[1].childNodes[3].textContent == text){
            allPrijedlozi[i].remove();
            break;
        }
}

let buttonFollow = document.querySelectorAll(".user");
for(let i = 0;i<buttonFollow.length;i++)
buttonFollow[i].childNodes[1].childNodes[5].addEventListener("click", handlebuttonFollow);
function handlebuttonFollow(e){
    console.log("pitalo");
    current = e.currentTarget;
    let removeUser = current.parentElement.parentElement.childNodes[1].childNodes[3];
    let txt = removeUser.textContent;
    removeUser.parentElement.parentElement.remove();

    console.log(txt);
   let allPrijedlozi = document.querySelectorAll(".p1");
    for(let i = 0;i<allPrijedlozi.length;i++)
        if(allPrijedlozi[i].childNodes[5].textContent == txt){
            allPrijedlozi[i].remove();
            break;
        }
}