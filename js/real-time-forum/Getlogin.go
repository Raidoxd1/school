package main

import "net/http"

func GetLogin(w http.ResponseWriter, r *http.Request) {
	resp := makeLoginForm("", "", "", "", "", "")
	w.Write([]byte(resp))

}
