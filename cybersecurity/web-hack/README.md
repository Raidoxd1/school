# local

## Description

Deploy the DVWA web platform, find at least 3 vulnerabilities and develop a c99, r57 type shell. Your php shell <br>should allow you to add a file, delete a file, and execute a command.
<br><br>

## 3 vulnerabilities

<br>
1. SQL Injection: SQL injection is a web application vulnerability that allows an attacker to manipulate the SQL <br>queries executed by the application's database. In DVWA, there are scenarios where user input is not properly <br>sanitized or validated before being used in SQL queries. This can enable an attacker to insert malicious SQL code<br> into the application, potentially gaining unauthorized access to the database, retrieving sensitive information, <br>modifying data, or even executing arbitrary commands on the underlying system. <br>
Example: searching by 1 vs ' OR '1'='1 <br>

![Alt text](image.png)<br>
![Alt text](image-1.png)<br>
To prevent SQL injection, always use parameterized queries or prepared statements with bound parameters instead of <br>dynamically concatenating user input into SQL queries. This ensures that user input is treated as data rather <br>than executable code. Additionally, perform input validation and sanitization to block or filter out <br>potentially malicious characters or sequences.

<br>
2. Cross-Site Scripting (XSS): XSS is a vulnerability that occurs when an application fails to properly validate <br>or sanitize user-supplied input, allowing an attacker to inject malicious scripts into web pages viewed by <br>other users. DVWA includes several XSS vulnerabilities that can be exploited to perform actions on behalf of<br> unsuspecting users, steal their session cookies, or redirect them to malicious websites. Successful <br>exploitation of XSS can lead to various attacks, including session hijacking, defacement of websites, and <br>stealing sensitive information.<br>
Example: inserting xss vs `script>alert('xss');/script>`<br>

![Alt text](image-2.png)<br>
![Alt text](image-3.png)<br>
Prevent XSS by properly validating and sanitizing user input before displaying it in web pages. Use output<br> encoding or HTML escaping to ensure that user-supplied content is rendered as plain text and not interpreted as <br>HTML or JavaScript code. Employ Content Security Policy (CSP) headers to restrict the execution of untrusted <br>scripts.
<br><br>
3. File upload vulnerabilities are security weaknesses that can be exploited by attackers to upload malicious<br> files to a web application.<br>
Example: uploading a file with php code that will be executed on the server<br>
![Alt text](image-5.png)<br>

To prevent file upload vulnerabilities, always validate and sanitize user input before allowing it to be <br>uploaded to the server. Additionally, ensure that uploaded files are stored outside of the web root directory <br>and that they cannot be executed by the web server.

## webshell

Uploaded a file using file upload vulnerability in DVWA. The file contained php code that allowed me to <br> upload/delete files and execute commands on the server. <br>
![Alt text](image-5.png)<br>
then going to the file location thats on the image 5<br>
![Alt text](image-4.png)<br>
In here i can upload/delete files and execute commands on the server<br>
Uploading a file<br>
![Alt text](image-6.png) <br>
choosing test.txt <br>
![Alt text](image-7.png) <br>
execute <br>
![Alt text](image-8.png) <br>
check if file is there <br>
![Alt text](image-9.png) <br>
![Alt text](image-10.png) <br>
check whats inside the file <br>
![Alt text](image-11.png) <br>
![Alt text](image-12.png) <br>
and now deleting the file<br>
![Alt text](image-13.png) <br>
![Alt text](image-14.png) <br>
![Alt text](image-15.png) <br>
![Alt text](image-16.png) <br>





## Audit

- [Audit file](https://github.com/01-edu/public/tree/master/subjects/cybersecurity/web-hack/audit)

## Author

**Raido Lump**
- [Git profile](https://01.kood.tech/git/raidoxd "raidoxd")
- Discord - Friendly#4382