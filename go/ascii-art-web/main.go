package main

import (
	"bufio"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"
	"text/template"
	"unicode"
)

func ascii(w http.ResponseWriter, r *http.Request) {

	// checks if the url path is correct
	if r.URL.Path != "/ascii-art" && r.URL.Path != "/" {
		http.Error(w, "Error 404\nPage not found!", 404)
		fmt.Println("ERROR 404")
		return
	}
	r.ParseForm()                                          // reads the input
	t, _ := template.ParseFiles("templates/template.html") //reads template.html file into golang
	input := r.PostFormValue("input")
	banner := r.PostFormValue("banner")

	// controls the given banner choices
	if r.Method == "POST" {
		if banner != "standard" && banner != "shadow" && banner != "thinkertoy" {
			http.Error(w, "Error 400\nBad Request", 400)
			fmt.Println("ERROR 400")
			return
		}
	}

	// detects if input consists only of ascii characters
	for _, rune := range input {
		if rune > unicode.MaxASCII {
			http.Error(w, "Error 400\nBad Request\nNon-Ascii character", 400)
			fmt.Println("ERROR 400, non-ascii character")
			return
		}
	}

	// ascii-art code
	var finaltext string = ""
	if len(input) > 0 {
		file, _ := os.Open(banner + ".txt")
		scanner := bufio.NewScanner(file)
		scanner.Split(bufio.ScanLines)
		var txtlines []string
		for scanner.Scan() {
			txtlines = append(txtlines, scanner.Text())

		}
		newline := strings.Split(input, "\r\n")
		for _, input := range newline {
			for j := 1; j < 9; j++ {
				for _, a := range input {
					line := (((a - 32) * 9) + rune(j))
					finaltext = finaltext + txtlines[line]
				}
				finaltext = finaltext + "\n"
			}
		}
	}
	data := struct {
		Finaltext string
		Input     string
	}{Finaltext: finaltext, Input: input}

	// Executes the processed data as ascii-art
	if err := t.Execute(w, data); err != nil {
		http.Error(w, "Error 500\nInternalServerError", 500)
	}
}

func main() {
	http.HandleFunc("/", ascii)          // set router
	http.HandleFunc("/ascii-art", ascii) // POST request output
	fmt.Println("Localhost up at port :8080")
	err := http.ListenAndServe(":8080", nil) // listen port
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
