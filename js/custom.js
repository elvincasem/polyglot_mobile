/* ===== variables === */
var global_url = "http://polyglot.world/m/functions.php";

/* ===== login ===== */
function login(){
    myApp.showPreloader();
	//myApp.showIndicator()
    var x = document.getElementById("loginbutton");
    var closebutton = document.getElementById("closebutton");
    var uname = document.getElementById("username").value;
    var pwd = document.getElementById("password").value;
	var home = document.getElementById("menu_home");

    //alert(sessionId);
    $$.post(global_url, {action: 'login',username: uname, password: pwd}, function (data,status) {
       var datas = JSON.parse(data);
        var user = datas.userid;
        console.log(datas);
		console.log(status);
       
        
        if(user != undefined){
			
             //console.log(user);
             var user_name = datas.firstname + " " + datas.lastname;
             var email_add = datas.email;

			document.getElementById("userdata").value = data.trim();
            localStorage.setItem("firstname", datas.firstname);
            localStorage.setItem("lastname", datas.lastname);
            localStorage.setItem("nickname", datas.firstname);
            localStorage.setItem("email", datas.email);
            localStorage.setItem("uid", datas.userid);
            localStorage.setItem("profileP", datas.profileP);
			localStorage.setItem("language", datas.language);
			localStorage.setItem("password", datas.password);
			
           
            document.getElementById("user_name").innerHTML = user_name;
            document.getElementById("email_add").innerHTML = email_add;
            document.getElementById("pimage").src = "http://polyglot.world/img/"+localStorage.getItem("profileP");
			 closebutton.click();
			 //createContentPage();
			 
			//$$(document).on('pageInit', '.page[data-page="home"]', function (e) {})
			 //home.click(); 
			 //trigger createContentPage
			 createContentPage();
			 //loadpostdata();
			myApp.hidePreloader();
			//window.location.reload();
			//home.click(); 
			//myApp.hideIndicator();
        }else{
			//$$('.demo-alert').on('click', function () {
				//modalTitle: 'Polyglot'
				myApp.hidePreloader();
				myApp.alert('Invalid Username or Password');
			//});
			
		}
        
    },JSON);
    

   
    

}

function register(){

var email = document.getElementById("email").value;
var password = document.getElementById("password").value;
var fname = document.getElementById("firstname").value;
var lname = document.getElementById("lastname").value;
var bday = document.getElementById("bday").value;
var language = document.getElementById("language").value;
var gender = document.forms[0];
var i;
    for (i = 0; i < gender.length; i++) {
        if (gender[i].checked) {
            //txt = txt + coffee[i].value + " ";
			//alert(gender[i].value);
			var gendervalue = gender[i].value;
        }
    }
	//alert(email);
//check email if available

$$.post(global_url, {action: 'checkemail', email:email}, function (validity) {
		//console.log(parseInt(validity));
		
		if(parseInt(validity) == 0){
		myApp.showPreloader();	
			$$.post(global_url, {action: 'register', email:email,password: password, fname: fname, lname:lname, bday: bday, language:language, gender:gendervalue}, function (register) {
				myApp.hidePreloader();	
				myApp.alert(register);
				var closeregister = document.getElementById("cancelbutton");
				closeregister.click();
		
			});	
			//myApp.alert('Valid Email');
		}else{
			myApp.showPreloader();	
			setTimeout(function () {myApp.hidePreloader();}, 500);
			myApp.alert('Email already exist!');
		}
		
	});	
	
	//POST request
	
	
	
}

function loadpostdata(){
	var uid = localStorage.getItem("uid");

	$$.post(global_url, {action: 'showposts', userid:uid}, function (posts) {
		console.log(posts);
		
	});	
	
}

function submitPost(){
	var uid = localStorage.getItem("uid");
	var pmessage = document.getElementById("post").value;
	$$.post(global_url, {action: 'submitpost', userid:uid, pmessage:pmessage }, function (postid) {
	//console.log(postid);
	//createContentPage();
	
	});	
}


$$(document).on('pageInit', '.page[data-page="postblank"]', function (e) {
//alert("postblank");

 myApp.showPreloader();
        setTimeout(function () {
            myApp.hidePreloader();
			var home = document.getElementById("menu_home");
			home.click();
        }, 1500);
}) 
$$(document).on('pageInit', '.page[data-page="dynamic-content"]', function (e) {
//window.location.reload();
			//var home = document.getElementById("menu_home");
			//home.click();
 myApp.showPreloader();
        setTimeout(function () {
            myApp.hidePreloader();
			//var home = document.getElementById("menu_home");
			//home.click();
        }, 1500);
}) 


$$(document).on('pageInit', '.page[data-page="setting"]', function (e) {

		var home = document.getElementById("menu_home");
		home.click();
		myApp.showPreloader();
        setTimeout(function () {
            myApp.hidePreloader();
        }, 500);
})  
$$(document).on('pageInit', '.page[data-page="tabbar-labels"]', function (e) {

 myApp.showPreloader();
        setTimeout(function () {
            myApp.hidePreloader();
        }, 500);
})  
$$(document).on('pageInit', '.page[data-page="cards"]', function (e) {

 myApp.showPreloader();
        setTimeout(function () {
            myApp.hidePreloader();
        }, 500);
}) 


$$(document).on('pageInit', '.page[data-page="profile"]', function (e) {

 myApp.showPreloader();
        setTimeout(function () {
            myApp.hidePreloader();
			ownpost_profile();
        }, 500);
		
}) 


$$(document).on('pageInit', '.page[data-page="following"]', function (e) {

 myApp.showPreloader();
        setTimeout(function () {
            myApp.hidePreloader();
			following_list();
        }, 500);
		
}) 




$$(document).on('pageAfterAnimation', '.page[data-page="setting"]', function (e) {
  // Do something here when page with data-page="about" attribute loaded and initialized
  document.getElementById('fname').value = localStorage.getItem("firstname");
  document.getElementById('lname').value = localStorage.getItem("lastname");
  document.getElementById('nname').value = localStorage.getItem("nickname");
  document.getElementById('email').value = localStorage.getItem("email");
  document.getElementById('password').value = localStorage.getItem("password");

  //alert("dsa");
})  

$$(document).on('pageAfterAnimation', '.page[data-page="profile"]', function (e) {
		var uid = localStorage.getItem("uid");
		var nopost;
		var nofollowers;
		var nofollowing;
		//get number of post
		$$.post(global_url, {action: 'numberofpost', userid:uid}, function (noofpost) {
			console.log(noofpost);
			document.getElementById("noofpost").innerHTML = noofpost;
			nopost = noofpost;
		}); 
		//get number of followers
		$$.post(global_url, {action: 'numberoffollowers', userid:uid}, function (nooffollowers) {
			console.log(nooffollowers);
			document.getElementById("nooffollowers").innerHTML = nooffollowers;
			nofollowers = nooffollowers;
		});
		//get number of following
		$$.post(global_url, {action: 'numberoffollowing', userid:uid}, function (nooffollowing) {
			console.log(nooffollowing);
			document.getElementById("nooffollowing").innerHTML = nooffollowing;
			nofollowing = nooffollowing;
		});
		
		
  //console.log("pageanimate profile");

            //document.getElementById("profile_user_name").innerHTML = localStorage.getItem("firstname")+ " " +localStorage.getItem("lastname");
            //document.getElementById("profile_email_add").innerHTML = localStorage.getItem("email");

            //document.getElementById("profile_image").src = "http://polyglot.world/img/"+localStorage.getItem("profileP");
})  

$$(document).on('pageAfterAnimation', '.page[data-page="profile"]', function (e) {
	var completename = localStorage.getItem("firstname")+" "+ localStorage.getItem("lastname");
  // Do something here when page with data-page="about" attribute loaded and initialized
  document.getElementById('profile_name').innerHTML = completename;
  document.getElementById('profile_complete_name').innerHTML = completename;
  document.getElementById('profile_email_add').innerHTML = localStorage.getItem("email");
  
})  

$$(document).on('pageAfterAnimation', '.page[data-page="following"]', function (e) {
	
  
})  


function logout(){
  //window.location.href = "#";
  //return false;
  //$$('.post-content').innerHTML="";
  localStorage.clear();
  document.getElementById("username").value = "";
   document.getElementById("password").value  = "";
  
  //localStorage.setItem("email") == "";
  //alert("logout");
}



function forgotpassword(){
	var forgotback = document.getElementById("forgotback");
	forgotback.click();
	
}

function checkLocalStorage(){
	
	if(localStorage.getItem("email") != null){
	/*	 myApp.showPreloader();
        setTimeout(function () {
            myApp.hidePreloader();
        }, 500);
		var forgotpwd = document.getElementById("menu_home");
		forgotpwd.click();
		
		
		
		document.getElementById("username").value = localStorage.getItem("email");
    document.getElementById("password").value = localStorage.getItem("password");
		var home = document.getElementById("menu_home");
		var closebutton = document.getElementById("closebutton");
		closebutton.click();
		closebutton.click();
		//createContentPage();
		login();
		//login();
		//home.click();
		//home.click();*/
		
		var home = document.getElementById("menu_home");
		//home.click();
		createContentPage();
		var closebutton = document.getElementById("closebutton");
		closebutton.click();
		
		
	var offsetvalue =+ 8;
	localStorage.setItem("offset", 8);
				
    return;

	}
	
}

function unfollow(){
	     myApp.confirm('Are you sure you want to unfollow?', function () {
            myApp.alert('Unfollow Successful!');
			//myApp.showPreloader();
				setTimeout(function () {
					//myApp.hidePreloader();
					following_list();
				}, 2500);
			//window.location.reload();
			//window.location.replace("pages/following.html");
        });
		
}
function buttonLike(pid){
    var uid = localStorage.getItem("uid");
    
    //myApp.alert(pid);
   // myApp.alert(uid);
    $$.post(global_url, {action: 'buttonlike',uid: uid, pid: pid}, function (data,status) {
		
		console.log(data);
		myApp.alert("liked");
		
	},JSON);
}
 function translate(ajax_source,ajax_postid,ajax_pmessage, destinationId)
    {
		
   //alert(ajax_postid);
        $$.get("https://www.googleapis.com/language/translate/v2",
            {
            key:"AIzaSyBKW9NPxbuAyJ20dFTgrh5hLMzF2SF-czA",
            //source:"en",
            target:ajax_source,
            //alert(target);
            q:ajax_pmessage
            },
            function(response)
            {
				var ttext =JSON.parse(response);
            	
				//console.log(ttext.data.translations[0].translatedText);
				
                $$("#"+destinationId+"-"+ajax_postid).html(ttext.data.translations[0].translatedText);
				
 
            },"json");
    }
function comments(pid,uid){
	//myApp.alert(pid);
	//myApp.alert(uid);

	$$.post(global_url, {action: 'postSelect', pid:pid, uid:uid}, function (posts) {
		console.log(posts);
		//myApp.alert(posts);
		var datas = JSON.parse(posts);
		var lang = localStorage.getItem("language");
		//myApp.alert(lang);
		for(var i = 0; i<datas.length; i++){
			//myApp.alert(datas[i].firstname);
		$$('#postComment').append("<center><div class='card ks-facebook-card'>"+
                "<div class='card-header no-border link'>"+
                "   	<div class='item-media'>"+
                "       	<img src='http://polyglot.world/img/"+datas[i].profileP+"' width='34' height='34'/>"+
                "		</div>"+
                "		<div class='item-title label'>"+
                "			<strong>"+datas[i].firstname+" "+datas[i].lastname+"</strong>"+
                "		</div>"+
                "		<div class='item-input'>"+
                "   		<div id='translations-"+datas[i].postid+"' class='card-content'></div>"+
                "		</div>"+
                "   </div></center>"
           


					);
		translate(lang,datas[i].postid,datas[i].pmessage,"translations");
		}
	});	

	$$.post(global_url, {action: 'postComment', pid:pid, uid:uid}, function (com) {
		console.log(com);
		//myApp.alert(com);
		document.getElementById("comments").value = "";
		var comms = JSON.parse(com);
		var langs = localStorage.getItem("language");
		for(var i = 0; i<comms.length; i++){
				$$('#postCommenttor').append('<form id="my-form" class="list-block store-data">'+
				  '<ul>'+
				  '	<li>'+
				  '		<div class="content-block">'+
				  '       <div class="item-title label">'+comms[i].firstname+' '+comms[i].lastname+'</div>'+
				  '       	<div class="item-block">'+
				  '		  	<strong><div id="translationss-'+comms[i].commentid+'" ></div></strong>'+
				  '     	</div>'+
				  '     </div>'+
				  ' </li>'+
				  '	</ul>'+
				  '</form>');
				 translate(langs,comms[i].commentid,comms[i].comments,"translationss");



           } 
          
			$$('#PS').append(''+pid+'');

	
	});	

}
function sendCom(){
	var uid = localStorage.getItem("uid");
	var pid = document.getElementById("PS").innerHTML;
	var comments = document.getElementById("comments").value;
	//myApp.alert(uid);
	//myApp.alert(pid);
	//myApp.alert(comments);
		$$.post(global_url, {action: 'insertComment', pid:pid, uid:uid, comments: comments}, function (inCom) {
			console.log(inCom);
			document.getElementById("comments").value = "";
			//document.getElementById("postCommenttor").value = "";
			$$('#postCommenttor').load(document.URL +  ' #postCommenttor');
		
		});	
}

$$(document).on('pageInit', '.page[data-page="followers"]', function (e) {
	document.getElementById("followDisplay").innerHTML="";
	var uid = localStorage.getItem("uid");
	//document.getElementById("followersID").innerHTML = uid;
	$$.post(global_url, {action: 'displayF',uid:uid}, function (follow) {
		console.log(follow);
		var follows = JSON.parse(follow);

		for(var i = 0; i<follows.length; i++){
			$$('#followDisplay').append('<li class="item-content">'+
          									'<div class="item-inner">'+
            									'<div class="item-title">'+follows[i].firstname+' '+follows[i].lastname+'</div>'+
										          '</div>'+
										        '</li>'
										);
		}
	});
	
}) 
function forgetretrive(){
	var email = document.getElementById("emailadd").value;
	$$.post(global_url, {action: 'forgetAccount',email:email}, function (emailD) {
		console.log(emailD);
	});

}
function updateProf(){
	//myApp.alert("hello s");
	var uid = localStorage.getItem("uid");
	var fn = document.getElementById('fname').value;
  	var ln = document.getElementById('lname').value;
  	var nn = document.getElementById('nname').value;
  	var em = document.getElementById('email').value;
  	var pwd = document.getElementById('password').value;
  	var lang = document.getElementById('language').value;
  	//myApp.alert(lang);
  		document.getElementById('user_name').innerHTML="";
  		$$.post(global_url, {action: 'upProfile',fname: fn,lname: ln,nname: nn,email: em,pass: pwd,lang: lang, uid: uid}, function (profUp) {
  			console.log(profUp);
  			myApp.alert(profUp);
  		});
}

