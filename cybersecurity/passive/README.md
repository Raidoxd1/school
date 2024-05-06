# passive

## Description
The goal of this project is to become more comfortable with open source investigative methods.<br>
For the case of the full name, it will have to recognize the entry: "Last name" and "First name", and then look in the<br> directories for the telephone number and the address.<br>
If it is the IP address, your tool should display at least the city and the name of the internet service provider.<br>
If it is a username, your tool will have to check if this username is used in at least 5 known social networks.<br>
The result should be stored in a result.txt file (result2.txt if the file already exists)<br>
<br>
Investigative methods used: web scraping and API calls to gather information. They extract data from websites, search for <br>patterns using regular expressions, and use libraries like geocoder and ipinfo for IP address geolocation.<br><br>
Open-source intelligence (OSINT) is the collection and analysis of data gathered from open sources (covert sources and publicly <br>available information [PAI]) to produce actionable intelligence.<br><br>
Program is designed to perform passive reconnaissance using various search methods. It takes command-line arguments (-fn for <br>full name, -ip for IP address, -u for username) and executes different search functions based on the provided argument. The <br>program then collects relevant information, such as phone numbers, addresses, and online presence, by scraping websites and <br>making API requests. The results are saved in separate text files.<br>


## Usage

$> pip install geocoder<br>
$> pip install ipinfo

$> python3 passive.py --help

Welcome to passive v1.0.0

OPTIONS:<br>
    -fn         Search with full-name<br>
    -ip         Search with ip address<br>
    -u          Search with username

$> python3 passive.py -fn "Jean Dupont" 
<br>First name: Jean<br>
Last name: Dupont<br>
Address: Rue des Mini&#232;res 40/206 11, 6760 Virton<br>
Number: +3263578238<br>
Saved in result.txt<br>

$> python3 passive.py -ip 142.250.74.68 <br>
ISP: AS15169 Google LLC <br>
Lat/Lon:	[59.3294, 18.0687] <br>
City:    Stockholm<br>
Saved in result2.txt<br>

$> python3 passive.py -ip 127.0.0.1 <br>
ISP: cannot find <br>
Lat/Lon:	[] <br>
City:    cannot find<br>
Saved in result2.txt<br>

$> python3 passive.py -u "@user01"<br>
Username : user01<br>
Twitch : yes<br>
Reddit : yes<br>
Snapchat : yes<br>
Facebook : no<br>
Instagram : yes<br>
Saved in result3.txt

## Audit

- [Audit file](https://github.com/01-edu/public/tree/master/subjects/cybersecurity/passive/audit)

## Author

**Raido Lump**
- [Git profile](https://01.kood.tech/git/raidoxd "raidoxd")
- Discord - Friendly#4382