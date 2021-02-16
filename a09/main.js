/* Ishaan Phadnis
   a09  
   Twitter */

export async function likeTweet(event) {
    event.preventDefault();
    
    let compWeb = "https://comp426-1fa20.cs.unc.edu/a09/tweets/" + event.target.value + "/like";
    const request = await axios({
        method: "put",
        url: compWeb,
        withCredentials: true,
      });

    $("#tweetcontainer").replaceWith(load());
    return request;
};

export async function unlikeTweet(event) {
    event.preventDefault(); 
    
    let compWeb="https://comp426-1fa20.cs.unc.edu/a09/tweets/" + event.target.value + "/unlike"; 
    const request = await axios({
        method: "put",
        url: compWeb,
        withCredentials: true,
      });
      
      $("#tweetcontainer").replaceWith(load());
      return request;
};

let tempRetweet=0;

export async function retweet(event) {
    event.preventDefault()
    
    let thisRetweet = "" + $("textarea[id = editRetweet").val() + "";
    var placeBody = document.getElementById(tempRetweet)
    
    const request = await axios({
        method: "post",
        url: "https://comp426-1fa20.cs.unc.edu/a09/tweets/",
        withCredentials: true,
        data: {
          "type": "retweet",
          "parent": tempRetweet,
          "body": thisRetweet + "<br>" + "Retweeted by: " + placeBody.innerHTML
        },
    });
    
    $("#tweetcontainer").replaceWith(load());
    return request;
};

let tempReply = 0;

export async function reply(event) {
    event.preventDefault();
    
    let thisReply = "" + $("textarea[id = editReplyID").val() + "";
    const request = await axios({
        method: "post",
        url: "https://comp426-1fa20.cs.unc.edu/a09/tweets/",
        withCredentials: true,
        data: {
          "type": "reply",
          "parent": tempReply,
          "body": thisReply
        },
    });
    
    $("#tweetcontainer").replaceWith(load());
    return request;
};

export function editReply(event) {
    const $root = $("#root");
    
    let thisReply = `<form  value = "${event.target.value}" class = "thirdForm">
    <textarea id = "editReplyID" rows = "20" cols = "20"> What's Happening? </textarea>
    <br><button value = "${event.target.value}" class = "submit" type = "submit"> Tweet </button></form>`
    
    $("#replySection-" + event.target.value).replaceWith(thisReply);
    tempReply = event.target.value
    $root.on("submit",".thirdForm",reply);
}

export async function editTweet(event) {
    event.preventDefault();
    
    let check = "" + $("textarea[id = editID]").val() + "";
    let compWeb = "https://comp426-1fa20.cs.unc.edu/a09/tweets/" + tempEdit;
    
    const request = await axios({
        method: "put",
        url: compWeb,
        withCredentials: true,
        data: {
            "type": "tweet",
            "body": check,
        },
    });
    
    $("#tweetcontainer").replaceWith(load());
    return request;
};

export async function deleteTweet(event) {
    event.preventDefault();
    
    let compWeb = "https://comp426-1fa20.cs.unc.edu/a09/tweets/" + event.target.value;
    const request = await axios({
        method: "delete",
        url: compWeb,
        withCredentials: true,
    });
    
    $("#tweetcontainer").replaceWith(load());
    return request;
};

export async function getTweets() {
    const request = await axios({
        method: "get",
        url: "https://comp426-1fa20.cs.unc.edu/a09/tweets/",
        withCredentials: true,
    });
    
    return request;
};

export async function postTweet(event) {
    event.preventDefault();
    const request = await axios({
        method: "post",
        url: "https://comp426-1fa20.cs.unc.edu/a09/tweets/",
        withCredentials: true,
        data: {
            "type": "tweet",
            "body": $("textarea[id = underlay]").val(),
        },
    });
    
    let userInter = ``
    userInter += `<div id = "sectionPost">
    <h2> Tweet Something </h2>
    <button class = "post" type = "button"> Tweet </button></div>`
    
    $("#tweetcontainer").replaceWith(load());
    $("#sectionPost").replaceWith(userInter);
    return request;
};

export function editPostTweet() {
    const $root = $("#root");
    let editUI = ``
    editUI += `<div id = "sectionPost">
    <h2> Tweet Something </h2>
    <form class = "form">
    <textarea id = "underlay" name = "upload" rows = "20" cols = "20"> What's Happening? </textarea>
    <br><button class = "submit" type = "submit"> Tweet </button></form><br></div>`
    
    $("#sectionPost").replaceWith(editUI);
    $root.on("submit",".form",postTweet)
}

export function uploadUI() {
    const $root = $("#root");
    $root.html("");
    
    let userInter = ``
    userInter += `<div id = "sectionPost">
    <h2> Tweet Something </h2>
    <button class= "post" type="button"> Tweet </button></div>`
    
    $root.append(userInter);
    $root.on("submit",".form",postTweet)
    load();
}

let tempEdit = 0;

export function createEdit(event) {
    const $root = $("#root");
    document.getElementById(event.target.value)
    
    let thisEdit = `<form value = "${event.target.value}" class = "secondForm">
    <textarea id = "editID" rows = "20" cols = "20"> What's Happening? </textarea>
    <br><button value = "${event.target.value}" class = "submit" type = "submit"> Tweet </button></form>`
    
    $("#editSection-" + event.target.value).replaceWith(thisEdit);
    tempEdit = event.target.value
    $root.on("submit",".secondForm",editTweet);
}

export function createRetweet(event) {
    const $root = $("#root");
    
    let thisEdit = `<form  value = "${event.target.value}" class = "thirdForm">
    <textarea id = "editRetweet" rows = "20" cols = "20"> What's Happening? </textarea>
    <br><button value = "${event.target.value}" class = "submit" type = "submit"> Tweet </button></form>`
    
    $("#retweetSection-" + event.target.value).replaceWith(thisEdit);
    tempRetweet = event.target.value
    $root.on("submit",".thirdForm",retweet);
  
}

export function load() {
    const $root = $("#root");
    let tweets = ``
    const loadData = async function() {
        let info = await getTweets();
        tweets += `<div id = tweetcontainer>`
    for (let i = 0; i<50; i++) {
        
        tweets += (`<div class = "tweet" id = "${info.data[i].id}">
        <h1>${info.data[i].author}<h1/>
        <p>${info.data[i].body}</p></div>
        <p>Likes:${info.data[i].likeCount}</p>
        <p>Retweets:${info.data[i].retweetCount}</p>
        <p>Replies:${info.data[i].replyCount}</p>`);
        
        if(info.data[i].isMine == true) {
            tweets += (`<div id = "editSection-${info.data[i].id}">
            <button class = "edit" value = ${info.data[i].id} type = "button">Edit</button></div>`);
            
            tweets += (`<div id = "replySection-${info.data[i].id}">
            <button class = "reply" value = "${info.data[i].id}"  type = "button"> Reply </button></div>`);
            
            tweets += (`<button class = "secondDelete" value = "${info.data[i].id}" type = "button">Delete</button><br>`);
            
            tweets += (`<div id = "retweetSection-${info.data[i].id}">
            <button class = "retweet" value = "${info.data[i].id}" type = "button">Retweet</button></div> <br>`);
            
            tweets += (`<br>`);
    
        } else {
            
            if(info.data[i].isLiked == true){
                tweets += (`<button class = "unlike" value="${info.data[i].id}" type = "button"> Unlike </button>`);
            } else {
                tweets += (`<button class = "like" value = "${info.data[i].id}" type = "button"> Like </button>`);
          }
                tweets += (`<div id = "replySection-${info.data[i].id}">
                <button class = "reply" value="${info.data[i].id}" type="button"> Reply </button></div>`);
                
                tweets += (`<div id = "retweetSection-${info.data[i].id}">
                <button class = "retweet" value="${info.data[i].id}"  type = "button"> Retweet </button></div><br>`);
                
                tweets += (`<br>`);
        }
    }
    tweets += `</div>`
    
    $root.off("click").on("click",".secondDelete",function(){
      deleteTweet(event)
    });
    
    $root.on("click",".retweet",createRetweet)
    $root.on("click",".edit",createEdit)
    $root.on("click",".post",editPostTweet)
    $root.on("click",".like",likeTweet)
    $root.on("click",".reply",editReply)
    $root.on("click",".unlike",unlikeTweet)
    $root.append(tweets);
    }
    
    loadData()
}

$(function(){
    uploadUI();
}); 