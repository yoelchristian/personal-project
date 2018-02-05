$(document).ready(function(){
    var config = {
        apiKey: "AIzaSyChWZs4t1PL1N4rNwZDKPqBwA91FP5buEQ",
        authDomain: "project1-auth-c69cf.firebaseapp.com",
        databaseURL: "https://project1-auth-c69cf.firebaseio.com",
        projectId: "project1-auth-c69cf",
        storageBucket: "project1-auth-c69cf.appspot.com",
        messagingSenderId: "816793565972"
        };
        firebase.initializeApp(config); 

        $(document).on("click", "#login-btn", function(event){
            event.preventDefault();
    
            var email = $("#user-name").val();
            var pass = $("#password").val();
            var auth = firebase.auth();
    
            var promise = auth.signInWithEmailAndPassword(email, pass);
            promise.catch(e => console.log(e.message));

            firebase.auth().onAuthStateChanged(firebaseUser => {
                if(firebaseUser) {                    
                    $(".form-container").addClass("fadeout");
                    $(".landing-page-content").addClass("slidedown");
                    $(".subtitle").addClass("enlargefont");

                    setTimeout(function(){
                        $(".landing-page").addClass("fadeout");
                        setTimeout(function(){
                            $(".landing-page").remove();
                            $(".wrapper").removeClass("hideme");
                        }, 1000)
                    }, 2000);
                }
            });

        });
    
        $(document).on("click", "#signup-btn", function(event){
            event.preventDefault();
    
            var email = $("#user-name").val();
            var pass = $("#password").val();
            var auth = firebase.auth();
    
            var promise = auth.createUserWithEmailAndPassword(email, pass);
            promise.catch(e => console.log(e.message));
    
        });
    
        $(document).on("click", "#logout-btn", function(event){
            firebase.auth().signOut();
            location.reload();
        });

        $(document).on("click", "#update-btn", function(event){
            event.preventDefault();

            var userName = $("#username").val();
            var user = firebase.auth().currentUser;

            user.updateProfile({
                displayName: userName
            }).then(function(){
                $(".sa").text("asdasd")
            })
        });
    
        firebase.auth().onAuthStateChanged(firebaseUser => {
            if(firebaseUser) {
                $(".subtitle").html("Welcome " + firebaseUser.displayName);
                $(".username").html(firebaseUser.displayName);
                $("#get-started").on("click", function(){
                    $(".inner").addClass("fadeout");
                    setTimeout(function(){
                        $("#get-started").addClass("hideme");
                        $(".subtitle").removeClass("hideme");
                        $(".inner").removeClass("fadeout");
                        $(".inner").addClass("fadein");
                    }, 1000);

                    setTimeout(function(){
                        $(".landing-page").addClass("fadeout");
                        setTimeout(function(){
                            $(".landing-page").remove();
                            $(".wrapper").removeClass("hideme");
                        }, 1000)
                    }, 3000);
                });
    
            } else {               
                $("#get-started").on("click", function(){
                    $(".inner").addClass("fadeout");
                    
                    setTimeout(function(){
                        $("#get-started").addClass("hideme");
                        $(".form-container").removeClass("hideme");
                        $(".subtitle").removeClass("hideme");
                        $(".inner").removeClass("fadeout");
                        $(".inner").addClass("fadein");
                    }, 1000);
                });
            }
        });      
});