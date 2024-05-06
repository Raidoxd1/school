package main

import (
	"database/sql"
	"fmt"

	_ "github.com/mattn/go-sqlite3"
)

var statement *sql.Stmt

func createDB() {

	statement, _ = database.Prepare("CREATE TABLE IF NOT EXISTS sessions (id INTEGER PRIMARY KEY, user TEXT, session TEXT)")
	statement.Exec()
	statement, _ = database.Prepare("CREATE TABLE IF NOT EXISTS people (id INTEGER PRIMARY KEY, email TEXT UNIQUE, username TEXT UNIQUE, password TEXT)")
	statement.Exec()
	statement, _ = database.Prepare("CREATE TABLE IF NOT EXISTS post (postID INTEGER PRIMARY KEY, title TEXT, body TEXT, user TEXT, categories TEXT)")
	statement.Exec()
	statement, _ = database.Prepare("CREATE TABLE IF NOT EXISTS comments (commentID INTEGER PRIMARY KEY, postID INTEGER, comment TEXT)")
	statement.Exec()
	statement, _ = database.Prepare("CREATE TABLE IF NOT EXISTS likes (likeID PRIMARY KEY, postID INTEGER, user TEXT)")
	statement.Exec()
	statement, _ = database.Prepare("CREATE TABLE IF NOT EXISTS dislikes (dislikeID PRIMARY KEY, postID INTEGER, user TEXT)")
	statement.Exec()
	statement, _ = database.Prepare("CREATE TABLE IF NOT EXISTS commentlikes (likeID PRIMARY KEY, postID INTEGER, user TEXT)")
	statement.Exec()
	statement, _ = database.Prepare("CREATE TABLE IF NOT EXISTS commentdislikes (dislikeID PRIMARY KEY, postID INTEGER, user TEXT)")
	statement.Exec()
	statement, _ = database.Prepare("DELETE FROM sessions WHERE session != ''")
	statement.Exec()
	statement.Close()

}
func checkSession(cookie string) bool {

	cooker, _ := database.Query("SELECT session FROM sessions")
	var b string

	for cooker.Next() {
		cooker.Scan(&b)
		if cookie == b {
			fmt.Println("on")
			cooker.Close()
			return true

		}
	}
	cooker.Close()
	fmt.Println("ei")
	return false

}
func newSession(loginusername string, cookie string) {

	statement, _ = database.Prepare("INSERT INTO sessions (user, session) VALUES (?, ?)")
	statement.Exec(loginusername, cookie)

	statement.Close()

}
func deleteSession(n string) {

	statement, _ := database.Prepare("DELETE FROM sessions WHERE session = ?")
	statement.Exec(n)
	statement.Close()

}
