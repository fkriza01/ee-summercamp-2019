<?php
require_once("DatabaseAccess.php");

function getPostsFromDb(){
    $dbAccess = getDbAccess();
	return $dbAccess->executeQuery("SELECT * FROM Posts ORDER BY ID DESC;");
}
function getCommentFromDb(){
    $dbAccess = getDbAccess();
	return $dbAccess->executeQuery("SELECT * FROM comment;");
}

function togglePostLike($id, $like, $num){
    getDbAccess()->executeQuery("UPDATE Posts SET isLiked='$like', numberLike='$num' WHERE ID='$id';");
}
function togglePostBookmark($id, $bookmark){
    getDbAccess()->executeQuery("UPDATE Posts SET isBookmarked='$bookmark' WHERE ID='$id';");
}
function addNewComment($id, $comment){
    return getDbAccess() -> executeQuery("INSERT INTO comment (IDpost,Username, Comment)
     VALUES ('$id', 'Username', '$comment');");
}
function addNewPost($location, $imageUrl, $description){
    return getDbAccess() -> executeQuery("INSERT INTO Posts (username, profileImage, location1, numberLike, isLiked, isBookmarked, postImage, description1)
     VALUES ('Username','avatars/4.jpg', '$location', '0', '0', '0','$imageUrl', '$description');");
}

function generatePostsHtml(){
    $html = "";
    $posts = getPostsFromDb();
    $br = 0;
    $comment = getCommentFromDb();

    foreach($posts as $post)
    {
            $id = $post[0];
            $username = $post[1];
            $profileImage = $post[2];
            
            $location = $post[3];
            $numberLike = $post[4];
            $isLiked = $post[5];
            
            $isBookmarked = $post[6];
            $postImage = $post[7];
            $description = $post[8];

            $heartClass = $isLiked == '1' ? "fa-heart" : "fa-heart-o";
            $boookmarkClass = $isBookmarked == '1' ? "fa-bookmark" : "fa-bookmark-o";

            $html .= "<article class = 'post' id = '$id'>
            <div class = 'userInfo'>
               <img src='$profileImage' alt='user3'/>
               <div class = 'userLoca'>
                    <span >'$username'</span>
                    <br>
                    <span>'$location'</span>
               </div>
            </div>
            <br>
            <img src='$postImage' alt='user4'/>
            <div class = 'komentari'>
                <div class='fa-komentari'>
                    <span>
                        
                <i class =  'fa $heartClass' ></i>
            &nbsp;
            
                <i class = 'fa fa-comment-o' ></i>
                &nbsp;
                <i class = 'fa fa-download'></i>
                </span>
                <i class = 'fa $boookmarkClass' ></i><br>
                </div>
                <span>status!</span>
                <p >Sviđa mi se: <span>$numberLike</span></p>
                <a href = ''>$description</a>";
                foreach($comment as $comments)
                {
                    $idComment = $comments[0];
                    $idPost = $comments[1];
                    $username = $comments[2];
                    $text = $comments[3];
                    if($id ==$idPost)
                     $html.="<p>$username: $text</p>";

                }
                $html.="<textarea class='commentArea' >Komentiraj...</textarea>

            </div>
         </article>";

        if($br==0){
        $html .= '<div id = "prijedlozi-container">
            Prijedlozi za vas:
             <nav>
            <div class = "p1">
                    <i class="fa fa-times delete-button" ></i>
                    <img src="avatars/5.jpg" alt="user5"/>
                    
                    <span >user6</span>
                    
                    <button >prati</button>

            </div>
            <div class = "p1">
                    
                    <i class="fa fa-times delete-button" ></i>
                    <img src="avatars/6.jpg" alt="user6"/>
                    
                    <span  >user7</span>
                    
                  
                    <button >prati</button>

            </div>
            <div class = "p1">
                    <i class="fa fa-times delete-button" ></i>
                    
                    <img src="avatars/1.jpg" alt="user1"/>
                    
                    <span  >user8</span>
                    
                  
                    <button >prati</button>

            </div>

            
        </nav>
            </div>';
        $br=1;
        }


    }
                
    return $html;
}
