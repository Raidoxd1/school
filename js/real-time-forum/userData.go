package main

import (
	"crypto/subtle"
	"net/http"
)

func userData(w http.ResponseWriter, r *http.Request) {
	// reads the input

	email := r.URL.Query().Get("email")
	username := r.URL.Query().Get("username")
	password := r.URL.Query().Get("password")
	loginusername := r.URL.Query().Get("loginusername")
	loginpassword := r.URL.Query().Get("loginpassword")
	submitted := r.URL.Path
	logged := r.URL.Path

	cookie, _ := r.Cookie("session")

	var (
		x int
		y int
		a string
		b string
	)

	sort, _ := database.Query("SELECT COUNT (*) FROM sessions WHERE user = ?", (loginusername))
	for sort.Next() {
		sort.Scan(&x)
		if x == 1 {
			a = "success"
		}
	}
	sort.Close()
	value, _ := database.Query("SELECT COUNT (*) FROM sessions WHERE session = ?", (cookie.Value))
	for value.Next() {
		value.Scan(&y)
		if y == 1 {
			b = "success"
		}
	}
	value.Close()
	var thing string
	if email != "" && username != "" && password != "" {
		statement, _ = database.Prepare("INSERT INTO people (email, username, password) VALUES (?, ?, ?)")

		rows, _ := database.Query("SELECT id, email, username, password FROM people")
		var id int
		var emailSign string
		var usernameSign string
		var passwordSign string
		for rows.Next() {
			rows.Scan(&id, &emailSign, &usernameSign, &passwordSign)
			if emailSign == email {
				thing = "Email already taken."

			} else if usernameSign == username {
				thing = "Username already taken."
			}
		}
		rows.Close()
		statement.Exec(email, username, password)
		statement.Close()
	} else if submitted == "/register" && email == "" || submitted == "/register" && username == "" || submitted == "/register" && password == "" {
		thing = "Fill out the form before submitting."
	}

	if loginusername != "" && loginpassword != "" && a == "" && b == "" {
		var q string
		rows, _ := database.Query("SELECT username, password FROM people")
		for rows.Next() {
			rows.Scan(&username, &password)
			if loginusername == username && loginpassword == password {
				if subtle.ConstantTimeCompare([]byte(loginpassword), []byte(password)) == 1 && subtle.ConstantTimeCompare([]byte(loginusername), []byte(username)) == 1 {
					//w.Write([]byte(createLoggedInPage()))
					http.Redirect(w, r, "/mainPage", http.StatusFound)
					q = "success"

				}
			}

		}
		rows.Close()

		// puts user with current session into table if they aren't already there
		var k string
		if q != "" && a == "" && b == "" {
			k = "check"
			check, _ := database.Query("SELECT user, session FROM sessions")
			var e string
			var r string
			for check.Next() {
				check.Scan(&e, &r)
				if e == loginusername && r == cookie.Value {
					k = ""
				}
			}
			check.Close()
			if k != "" {
				newSession(loginusername, cookie.Value)

			}
			q = ""
		}
		thing = "Wrong username or password"
	} else if logged == "/login" && loginusername == "" || logged == "/login" && loginpassword == "" {
		thing = "Fill out the form before submitting."
	}

	// Executes the processed data
	resp := makeLoginForm(email, password, username, thing, loginpassword, loginusername)

	w.Write([]byte(resp))
}
