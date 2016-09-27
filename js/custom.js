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
			 home.click(); 
			 //trigger createContentPage
			 //createContentPage();
			 //loadpostdata();
			myApp.hidePreloader();
			window.location.reload();
			home.click(); 
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
var password = document.getElementById("email").value;
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
	console.log(postid);
		
	});	
}

$$(document).on('pageInit', '.page[data-page="setting"]', function (e) {

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

  //console.log("pageanimate profile");

            //document.getElementById("profile_user_name").innerHTML = localStorage.getItem("firstname")+ " " +localStorage.getItem("lastname");
            //document.getElementById("profile_email_add").innerHTML = localStorage.getItem("email");

            //document.getElementById("profile_image").src = "http://polyglot.world/img/"+localStorage.getItem("profileP");
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


function prof(){
  alert("me");
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
		home.click();
		var closebutton = document.getElementById("closebutton");
		closebutton.click();
		
		localStorage.setItem("offset", 0);
	var uid = localStorage.getItem("uid");
	var offset = localStorage.getItem("offset");
	var userLanguage = localStorage.getItem("language");

    mainView.router.loadContent(
        '  <!-- Page, data-page contains page name-->' +
        '  <div data-page="dynamic-content" class="page">' +
        '    <!-- Top Navbar-->' +
        '    <div class="navbar">' +
        '      <div class="navbar-inner">' +
        '        <div class="left"><img src="img/logo.png" style="width:64px; height:64px;"></div>' +
		'        <div class="center">Polyglot</div>' +
        '        <div class="right"><a href="#" class="open-panel link icon-only"><i class="icon icon-bars"></i></a></div>' +
        '      </div>' +
        '    </div>' +
        '    <!-- Scrollable page content-->' +
        '    <div class="page-content">' +
        '      <div class="content-block post-content">' +
        '      </div>' +
		'        <p><a id="loadmorebutton" href="#" class="button button-fill" onclick="loadpost();" hidden>Load more post</a>.</p>' +

        '    </div>' +
		'<a href="pages/post.html" class="floating-button color-red"><i class="icon icon-plus"></i></a>' +
        '  </div>'

    );
	
	//first load of posts from database show only 8
	$$.post(global_url, {action: 'showposts', userid:uid, offset: offset}, function (posts) {
		console.log(JSON.parse(posts));
		
		var userpost = JSON.parse(posts);
		console.log(userpost.length);
		for(var i=0; i<userpost.length; i++){
			
			$$('.post-content').append("<div class='card ks-facebook-card'><div class='card-header no-border link'><div class='ks-facebook-avatar'><img src='http://polyglot.world/img/"+userpost[i].profileP+"' width='34' height='34'/></div>		<div class='ks-facebook-name'>"+userpost[i].firstname+" "+userpost[i].lastname+"</div><div class='ks-facebook-date'>Monday at 3:47 PM</div>	</div><div id='translation-"+userpost[i].postid+"' class='card-content'>"+userpost[i].pmessage+"</div><div class='card-footer no-border'><a href='#' class='link'>Like</a><a href='#' class='link'>Comment</a><a href='#' class='link'>Share</a></div></div>");
			
			//translate the text
			//translate(userLanguage,userpost[postindex].postid,userpost[postindex].pmessage,"translate");
			
		}
		
	});
	
	var offsetvalue =+ 8;
	localStorage.setItem("offset", offsetvalue);
				
    return;

	}
	
}
