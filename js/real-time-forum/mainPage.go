package main

import (
	"net/http"
)

func mainPage(w http.ResponseWriter, r *http.Request) {
	cookie, _ := r.Cookie("session")

	if checkSession(cookie.Value) {

		w.Write([]byte(createLoggedInPage()))
	} else {

		w.Write([]byte(createNotLoggedInPage()))
	}

}
