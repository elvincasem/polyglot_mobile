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
			
           
            document.getElementById("user_name").innerHTML = user_name;
            document.getElementById("email_add").innerHTML = email_add;
            document.getElementById("pimage").src = "http://polyglot.world/img/"+localStorage.getItem("profileP");
			 closebutton.click();
			 //createContentPage();

			 home.click(); //trigger createContentPage
			 //createContentPage();
			 //loadpostdata();
			myApp.hidePreloader();
			//myApp.hideIndicator();
        }
        
    },JSON);
    

   
    

}

function loadpostdata(){
	var uid = localStorage.getItem("uid");

	$$.post(global_url, {action: 'showposts', userid:uid}, function (posts) {
		console.log(posts);
		
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

            document.getElementById("profile_user_name").innerHTML = localStorage.getItem("firstname")+ " " +localStorage.getItem("lastname");
            document.getElementById("profile_email_add").innerHTML = localStorage.getItem("email");

            document.getElementById("profile_image").src = "http://polyglot.world/img/"+localStorage.getItem("profileP");
})  

function logout(){
  //window.location.href = "#";
  //return false;
  //$$('.post-content').innerHTML="";
  localStorage.clear();
  //localStorage.setItem("email") == "";
  //alert("logout");
}


function prof(){
  alert("me");
}
