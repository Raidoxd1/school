package main

func makeLoginForm(email string, password string, username string, thing string, loginpassword string, loginusername string) string {
	resp := ""
	resp += "<div class='login'>" +
		"<h2><button onclick='mainPage()' class='blog-post_cta'>BACK</button><br><br>" +

		"Register<br>" +
		"Email<textarea type='text' class='blog-post_create' placeholder='example@email.com' id='email'" +
		"rows='1' cols='30' value='" + email + "'></textarea><br />" +
		"Username<textarea type='text' class='blog-post_create' placeholder='Schmetterling' id='username'" +
		"rows='1' cols='20' value='" + username + "'></textarea><br />" +
		"Password<textarea type='password' class='blog-post_create' placeholder='Qwerty123' id='password'" +
		"rows='1' cols='20' value='" + password + "'></textarea><br /><br>" +
		"<h2><button id='register'onclick='register()' class='blog-post_cta'>Register</button><br><br>" +
		"<hr class='hr1'>" +
		"OR" +
		"<hr class='hr2'><br>" +
		"Login<br>" +
		"Username<textarea type='text' class='blog-post_create' placeholder='Schmetterling' id='loginusername'" +
		"rows='1' cols='20' value='" + loginusername + "'></textarea><br />" +
		"Password<textarea type='text' class='blog-post_create' placeholder='Qwerty123' id='loginpassword'" +
		"rows='1' cols='20' value='" + loginpassword + "'></textarea><br /><br>" +
		"<h2><button id='login' onclick='login()' class='blog-post_cta'>Login</button><br><br>" +
		"<pre min-width:50px max-width:500px readonly>" + thing + "</pre>" +
		"</h2>" +
		"</div>"

	return resp
}
