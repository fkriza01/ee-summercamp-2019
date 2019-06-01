<?php

require_once("php/posts.php");

function processRequest(){
    $action = getRequestParameter("action");
    switch ($action) {
        case 'togglePostLike':{
            processTogglePostLike();}
            break;
        case 'togglePostBookmark':
            processTogglePostBookmark();
            break;
        case 'addPost':
            processAddingNewPost();
            break;
        case 'addComment':
            processAddingNewComment();
            break;
        default:
            echo(json_encode(array(
                "success" => false,
                "reason" => "Unknown action: $action"
            )));
            break;
            
        
    }
}
function processAddingNewPost()
{
    $success = false;
    $reason = "";
    $id = 0;

    $location = getRequestParameter("location");
    $description = getRequestParameter("desc");
    $imageUrl = getRequestParameter("img");

    if($location != "" && $imageUrl != "")
    {
        $id = addNewPost($location, $imageUrl, $description);
        $success = true;
    }

    else
    {
        $success = false;
        $reason = "You have to enter title and image url";
    }

    echo(json_encode(array(
        "success" => $success,
        "reason" => $reason,
        "id" => $id
    )));
}


function processAddingNewComment()
{
    $success = false;
    $reason = "";
    $idcomment= getRequestParameter("postid");;
    $text = getRequestParameter("comment");
    

    if (is_numeric($idcomment) && $text!='')
    {
        $idcomment= addNewComment($idcomment, $text);
        $success = true;
    }

    else
    {
        $success = false;
        $reason = "You have to enter comment";
    }

    echo(json_encode(array(
        "success" => $success,
        "reason" => $reason,
        "id" => $idcomment
    )));
}

function getRequestParameter($key) {
    // $_REQUEST[$key] -> asocijativna mapa s klju�evima i vrijednostima iz zahtjeva
    return isset($_REQUEST[$key]) ? $_REQUEST[$key] : "";
}

function processTogglePostLike(){
    
    
    $success = false;
    $reason = "";
    $id = getRequestParameter("id");
    $like = getRequestParameter("like");
    $num = getRequestParameter("numberlike"); 
    $num = (int)$num;
    if($like == 0)
       $num = $num - 1;
   else
       $num = $num + 1;
    if (is_numeric($id) && is_numeric($like) && is_numeric($num)) {
    togglePostLike($id, $like, $num);
    $success = true;
    } else {
    $success = false;
    $reason = "Needs id:number; like:number";
    }
    echo(json_encode(array(
    "success" => $success,
    "reason" => $reason
    )));
   }
   
   function processTogglePostBookmark(){
    $success = false;
    $reason = "";
    $id = getRequestParameter("id");
    $bookmark = getRequestParameter("bookmark");
   
    if (is_numeric($id) && is_numeric($bookmark)) {
    togglePostBookmark($id, $bookmark);
    $success = true;
    } else {
    $success = false;
    $reason = "Needs id:number; bookmark:number";
    }
    echo(json_encode(array(
    "success" => $success,
    "reason" => $reason
    )));
   }

processRequest();