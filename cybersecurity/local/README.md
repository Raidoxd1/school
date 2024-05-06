# local

## Description

In this project you will learn about Privilege escalation We will provide a VM 01-Local1.ova. You have to install <br>it locally in VirtualBox And then found a way to go inside it and get root access. There will be no visible IP<br> address, you must find a way to get it. You have to become root and get the flag.<br><br>

Privilege escalation refers to the process of gaining higher levels of access or privileges within a system or <br>network than what was initially granted. It allows an attacker or user to bypass security measures and gain <br>elevated control, potentially leading to unauthorized actions or compromising sensitive information.<br><br>

Each exploit used in this can be fixed:
1. you can close the port 21 and/or dont let anonymous login
2. dont keep user and password in a file
3. dont let user run python with sudo

## Instructions

1. prepare your virtual machine<br>
download virtualbox<br>
install 01-Local1.ova in virtualbox<br>
check if you have the right version of 01-Local1.ova<br>
![Alt text](image.png)<br>
start 01-Local in virtualbox<br>

2. find ip of 01-Local<br>
Using ifconfig:<br>
![Alt text](image-1.png)<br>
Now we go over the 192.168.133.0-255<br>
Using nmap -sP:<br>
![Alt text](image-2.png)<br>
We find that for my instance the ip is 192.168.133.112<br>

3. find open ports<br>
Using nmap -A:<br>
![Alt text](image-3.png) <br>
We find that there are 3 open ports 22, 21, 80<br>
and we find that 80 is running apache<br>
so we can check it in our browser<br>
![Alt text](image-4.png) <br>
We find that on port 21 there is ftp server running<br>
and we can login as anonymous<br>
also we find that there are files in the ftp server<br>
![Alt text](image-16.png)

4. upload reverse shell and .py file for further need<br>
We can upload files using ftp after logging in<br>
![Alt text](image-6.png) <br>

5. Activate reverse shell<br>
![Alt text](image-7.png) <br>
Now we can click on the reverse shell(local.php) and it will open in our browser<br>
and at the same time you should have nc listener running for the port number thats in local.php<br>
using command: nc -lvnp "port number"<br>
![Alt text](image-8.png) <br>
now you have access to the machine<br>
6. find a way to get virtualbox user and password<br>
type ls to find all the files<br>
![Alt text](image-9.png) <br>
after a bit of looking around you find /.runme.sh<br>
look whats inside of it using command: cat /.runme.sh<br>
![Alt text](image-10.png) <br>
we find that the username is shrek<br>
and the password is hashed<br>
go to https://www.dcode.fr/hash-function. to find password<br>

7. login as shrek into virtualbox<br>
![Alt text](image-11.png) <br>
check sudo -l for your sudo permissions<br>
![Alt text](image-12.png)<br>
find you can run python3.5 as root<br>
find the file from: /var/www/html/files <br>
![Alt text](image-13.png)<br>
run the file using: sudo python3.5 local.py<br>
![Alt text](image-14.png)<br>
find the flag in /root directory<br>
use cat root.txt to read the flag<br>
![Alt text](image-15.png)<br><br>

Objective Completed





## Audit

- [Audit file](https://github.com/01-edu/public/tree/master/subjects/cybersecurity/local/audit)

## Author

**Raido Lump**
- [Git profile](https://01.kood.tech/git/raidoxd "raidoxd")
- Discord - Friendly#4382
