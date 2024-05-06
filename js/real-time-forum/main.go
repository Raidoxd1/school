package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
)

var AllPost []Post

type Post struct {
	PostID     int
	Title      string
	Body       string
	User       string
	Likes      int
	Dislikes   int
	Comments   []Comment
	Categories string
}

type Comment struct {
	PostID    int
	CommentID int
	Opinion   string
	Likes     int
	Dislikes  int
}

var database *sql.DB

func main() {

	database, _ = sql.Open("sqlite3", "./forum.db")
	createDB()
	fs := http.FileServer(http.Dir("./static"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))
	http.HandleFunc("/", homePage)
	http.HandleFunc("/mainPage", mainPage)
	http.HandleFunc("/Getlogin", GetLogin)
	http.HandleFunc("/register", userData)
	http.HandleFunc("/login", userData)

	http.HandleFunc("/logout", logout)

	fmt.Println("Localhost up at port :8080")
	err := http.ListenAndServe(":8080", nil) // listen port
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
