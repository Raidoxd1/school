package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strconv"
	"text/template"
)

var AllArtists []artist

type artist struct {
	Id           int      `json:"id"`
	Image        string   `json:"image"`
	Name         string   `json:"name"`
	Members      []string `json:"members"`
	CreationDate int      `json:"creationDate"`
	FirstAlbum   string   `json:"firstAlbum"`
	Locations    string   `json:"locations"`
	ConcertDates string   `json:"concertDates"`
	Relations    string   `json:"relations"`
}

func findArtistByID(id int) int { // finds the artists by their ID
	for i := 0; i < len(AllArtists); i++ {
		if AllArtists[i].Id == id {
			return i
		}
	}
	return -1
}

func returnArtist(w http.ResponseWriter, r *http.Request) {

	// // checks the URL for correct display of artist ID
	// keys, ok := r.URL.Query()["id"]
	// if !ok || len(keys[0]) < 1 {
	// 	http.Error(w, "Error 400\nPage not found! Bad Request!", 400)
	// 	return
	// }
	type datesLocations map[string][]string
	type relation struct {
		Id             int            `json:"id"`
		DatesLocations datesLocations `json:"datesLocations"`
	}

	var Relation relation

	id, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil || id < 1 || id > 52 { // checks the URL for correct display of artist ID
		http.Error(w, "Error 400\nBad Request! Try: 'http://localhost:8080/artist?id=1'", 400)
		fmt.Println("ERROR 400")
		return
	}

	selectedArtist := AllArtists[findArtistByID(id)]

	// unraveling the relation part of the API
	response, err := http.Get(selectedArtist.Relations)
	if err != nil {
		http.Error(w, "Error 500\nInternalServerError", 500)
		os.Exit(1)
	}
	defer response.Body.Close()
	responseData, _ := ioutil.ReadAll(response.Body)
	json.Unmarshal(responseData, &Relation)

	data := struct {
		Artist   artist
		Relation relation
	}{Artist: selectedArtist, Relation: Relation}

	// executes artist HTML template and displays information about specific artist
	t, err := template.ParseFiles("templates/artist.html")
	if err != nil {
		http.Error(w, "Error 500\nInternalServerError", 500)
	}
	if err := t.Execute(w, data); err != nil {
		http.Error(w, "Error 500\nInternalServerError", 500)
	}
}

func homePage(w http.ResponseWriter, r *http.Request) {

	// checks URL for error
	if r.URL.Path != "/" {
		http.Error(w, "Error 404\nPage not found!", 404)
		fmt.Println("ERROR 404")
		return
	}

	// redirects the API and prepares it to pass through HMTL file
	response, err := http.Get("https://groupietrackers.herokuapp.com/api/artists")
	if err != nil {
		http.Error(w, "Error 500\nInternalServerError", 500)
		os.Exit(1)
	}
	defer response.Body.Close()
	responseData, _ := ioutil.ReadAll(response.Body)
	json.Unmarshal(responseData, &AllArtists)

	// executes index HTML template and displays all artists from the API
	t, err := template.ParseFiles("templates/index.html")
	if err != nil {
		http.Error(w, "Error 500\nInternalServerError", 500)
	}
	if err := t.Execute(w, AllArtists); err != nil {
		http.Error(w, "Error 500\nInternalServerError", 500)
	}

}

func main() {
	http.Handle("/static/", // handles CSS files
		http.StripPrefix("/static/",
			http.FileServer(http.Dir("static"))))
	http.HandleFunc("/", homePage)
	http.HandleFunc("/artist", returnArtist)
	fmt.Println("Localhost up at port :8080")
	err := http.ListenAndServe(":8080", nil) // listen port
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
