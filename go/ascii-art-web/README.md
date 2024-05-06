<h1>ASCII-ART-WEB</h1>

<h2>Description</h2>
Ascii-art-web consists of running server,
where you are able to input your text in three
different banners and in return get it back in ascii-art.

<h2>Authors</h2>

**Kerly Kallas**
- [Git profile](https://git.01.kood.tech/kyrander "kyrander")
- Discord - Kyrander

**Raido Lump**
- [Git profile](https://git.01.kood.tech/raidoxd "raidoxd")
- Discord - Friendly

<h2>Usage: how to run</h2>
- In terminal use command '. main.go'<br/>
- Then head over to your browser and type 'localhost:8080'<br/>
- Put your text into 'type something..' textarea, choose your banner and press run<br/>
EX: 'Hello There!' '123ABC'<br/>
    *You can also make a newline while pressing 'ENTER' while in the textarea.<br/>
[Audit file](https://github.com/01-edu/public/tree/master/subjects/ascii-art-web/audit)


<h2>Implementation details: algorithm</h2>
func main <br/>
    - makes an HTTP server<br/>
    - executes HTML template<br/>
    - listen and serves 'localhost:8080'<br/>
func ascii<br/>
    - checks URL for errors<br/>
    - reads the input and passes it through template.html filev
    - checks banner and input for errors<br/>
    - form goes through ascii-art code<br/>
    - executes HTML template in lower area as ascii-art<br/>