# obfuscator

## Description

The goal of this project is to understand polymorphic encryption.<br> Principle used by computer virus developers to change the signature of their programs.

## Q&A

1. What polymorphic encryption means?<br>
Polymorphic encryption is a security method that continuously modifies <br>encryption algorithms and keys, making it difficult for attackers to analyze<br> or decrypt data. It adds an extra layer of protection against <br>advanced threats by rendering traditional decryption methods ineffective.
<br><br>

2. How we change the signature with each execution?<br>
The code used the change_file function to replace function names within the file. By <br>generating random names with generate_new_name and updating the function definitions <br>accordingly, the code dynamically altered the function signatures on each<br> execution, resulting in a changed signature.
<br><br>

3. How this program works.    <br>
This program consists of two functions. The shell function executes a bash <br>command, while the change_file function changes function <br>names in a file by generating random names and replacing the original names.
<br>



## Usage

I did this between Kali linux(the target) and Ubuntu(the attacker).<br>
First lets check signature of the file before and after running it.<br>
![Alt text](image-1.png) <br>
Now for the reverse shell im going to listen on port 1234 with my attacker machine and run the file on my target machine.<br>
![Alt text](image.png) <br>
I then see that i have access to my target machine by using some simple commands.<br>
![Alt text](image-2.png) <br>





## Audit

- [Audit file](https://github.com/01-edu/public/tree/master/subjects/cybersecurity/obfuscator/audit)

## Author

**Raido Lump**
- [Git profile](https://01.kood.tech/git/raidoxd "raidoxd")
- Discord - Friendly#4382