<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8"/>
    <title>Instagram</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="styles/font-awesome.min.css"/>
    <link rel="stylesheet" href="styles/stylesdr.css"/>
    <template class = "add-comment" id = "addComment">
        <p id = "komentiraj"></p>
    </template>
    <template class = "add-post" id = "addNewPost">
        <article class = "post">
            <div class = "userInfo">
                    <img src="avatars/1.jpg" alt="user1"/>
                    <div class = "userLoca">
                         <span >Korisnik_1</span>
                         <br>
                         <span id = "location">Split, Hrvatska</span>
                    </div>
                 </div>
                 <br>
                 <img id = "image" src="avatars/2.jpg" alt="user2"/>
                 <div class = "komentari">
                     <div class="fa-komentari">
                         <span>
                             
                     <i class = "fa fa-heart-o" ></i>
             
                 &nbsp;
                     <i class = "fa fa-comment-o" ></i>
                     &nbsp;
                     <i class = "fa fa-download"></i>
                     </span>
                     <i class = "fa fa-bookmark-o"></i><br>
                     </div>
                     <span id = "opis">HAHAHA</span>
                     <p >Sviđa mi se: <span>0</span></p>
                     <a href = "">#tag</a>
                     <a href = "">#tag2</a>
                     <p>user1: comment!</p>
                     <textarea class="commentArea" >
                         Komentiraj...</textarea>
                        </div>
                        </article>
    </template>
    
</head>
  <body>
      <header>
          <i class = "fa fa-instagram">  Instagram</i>
          <div id="search-container">
            <i class="fa fa-search search-icon"></i>
            <input type="text" id="search-box" placeholder="search"/>
          </div>
          <span>
          <i class = "fa fa-heart-o" id = "head-heart"></i>
          <i class = "fa fa-user" id = "user"></i>
        </span>
      </header>

      <main>
          <nav>
          <div id="maincolumn">

            <button id = "button1">
                <i class="fa fa-instagram">  Dodaj post</i>
                
                
            </button><br>
            <?php 
                require_once("php/posts.php");
                echo(generatePostsHtml());
            ?>
            </div>
              <aside id="additionalcolumn"> 
                  <div class = "fix">
                    <div class = "userInfo">
                            <img src="avatars/2.jpg" alt="user4"/>
                            <div class = "userLoca">
                                 <span id = "hideUser">Petar</span>
                                 <br>
                                 <span>Pariz, Francuska</span>
                            </div>
                         </div>
                         <br>
                         <div class = "infoUser">
                             O meni:<br>
                             <p id = "informacije">Pratiš: <span id = "pratim">103</span><br>
                                broj srca:<span>40</span> <br>
                                broj bookmarka: <span>33</span></p>
                         </div>
                         <br>
                         <div class = "prijedlog">
                             Mi predlažemo:<br><br>
                             <div class = "user">
                                <span id = "span1"> <img src = "avatars/5.jpg" alt = "user5">
                                    &nbsp; <span >user6</span>
                                 &nbsp;&nbsp;
                                 <button id = "follow">prati</button>
                                </span>
                             </div>
                         
                         <div class = "user">
                             <span id = "span2">   <img src = "avatars/6.jpg" alt = "user6">
                                &nbsp; <span >user7</span>
                                    &nbsp;&nbsp;
                                    <button >prati</button>
                            </span> 
                            </div>
                            <div class = "user">
                                  <span id = "span3">  <img src = "avatars/1.jpg" alt = "user1">
                                    &nbsp; <span id = namePrijedlog>user8</span>
                                    &nbsp; &nbsp;
                                    <button >prati</button>
                                </span>
                                </div>
                            </div>
                        </div>
              </aside>
              
            </nav>
      </main>
      
    <script language="javascript" src="scripts/function.js"></script>
  </body>