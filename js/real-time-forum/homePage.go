package main

import (
	"net/http"
	"text/template"

	uuid "github.com/satori/go.uuid"
)

func homePage(w http.ResponseWriter, r *http.Request) {
	t, err := template.ParseFiles("static/index.html")
	if err != nil {
		http.Error(w, "Error 500\nInternalServerError", 500)
	}
	cookies, _ := r.Cookie("session")

	cookie := &http.Cookie{
		Name:  "session",
		Value: uuid.NewV4().String(),
	}

	if cookies == nil {
		http.SetCookie(w, cookie)
	}

	if err := t.Execute(w, nil); err != nil {
		http.Error(w, "Error 500\nInternalServerError", 500)
	}
}
