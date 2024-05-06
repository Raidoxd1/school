package main

import (
	"net/http"
)

func logout(w http.ResponseWriter, r *http.Request) {
	cookie, _ := r.Cookie("session")
	deleteSession(cookie.Value)

	/*if checkSession(cookie.Value) {
		w.Write([]byte(createLoggedInPage()))
	} else {*/
	w.Write([]byte(createNotLoggedInPage()))
	//}
}
