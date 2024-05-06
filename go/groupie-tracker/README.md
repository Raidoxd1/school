<h1>GROUPIE-TRACKER</h1>

<h2>Description</h2>
Groupie-Tracker consists of running server,
where you are able to choose between given artists and see their information.

<h2>Authors</h2>

**Kerly Kallas**
- [Git profile](https://git.01.kood.tech/kyrander "kyrander")
- Discord - Kyrander

**Raido Lump**
- [Git profile](https://git.01.kood.tech/raidoxd "raidoxd")
- Discord - Friendly

<h2>Usage: how to run</h2>
- In terminal use command 'go run .'<br>
- Then head over to your browser and type 'localhost:8080'<br>
- Choose the artist of preference and click on the name or image<br>
- On click redirects you to the next page of your chosen artist and shows their information<br>
(to screen the artist page localhost must be 'http://localhost:8080/artist?id=1' for example)<br>
[Audit file](https://github.com/01-edu/public/tree/master/subjects/groupie-tracker/audit)


<h2>Implementation details: algorithm</h2>
func main<br>
    - makes an HTTP server<br>
    - executes HTML and CSS templates<br>
    - listen and serve 'localhost:8080'<br>
func homePage<br>
    - checks URL for error<br>
    - redirects the API and prepares it to pass through HTML file<br>
    - executes index HTML template and displays all artists from the API<br>
func findArtistByID<br>
    - finds the artists by their ID<br>
func returnArtist<br>
    - checks the URL for correct display of artist ID<br>
    - deals with unraveling the relation part of the API<br>
    - executes artist HTML template and displays information about specific artist<br>