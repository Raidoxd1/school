# active

## Description


In this project you will have to make a simple port scanner, which will tell you if the port is open or closed. You must create the project from scratch.<br>

<br>
1.A port is a numbered gateway that enables different programs on a computer to send and receive data over a network.<br>
 It acts as a communication channel for data transmission and helps ensure that the correct data reaches the intended program or service on a device.<br><br>
2.Port scanning is the process of checking the ports on a computer or network to find out which ones are open or closed, helping to identify available services and potential vulnerabilities.<br><br>
3.Port scanning is important in penetration testing (pentesting) because it helps identify open ports and services running on a target system. This information is crucial for understanding the attack surface, identifying<br> potential entry points, and assessing the security posture of the network. By discovering open ports, pentesters can focus their efforts on exploiting vulnerabilities, gaining unauthorized access, and <br>simulating real-world attacks to help organizations strengthen their defenses.<br><br>
4.The program is a port scanner that allows users to specify a target host and range of ports to scan. <br>
It checks if the ports are open or closed by attempting to establish a connection using TCP or UDP sockets.<br>
 The program prints the status of each port, indicating whether it is open or closed.<br><br>

## PS: Keep in mind, the audit file for this project is very inconsistent, so dont take everything in there for granted.<br>





## Usage



$>  python3 active.py -u 127.0.0.1 -p 80-83<br>
Port 80 is open<br>
Port 81 is open<br>
Port 82 is open<br>
Port 83 is open<br><br>

$> python3 active.py -t 127.0.0.1 -p 80-83<br>
Port 80 is closed<br>
Port 81 is closed<br>
Port 82 is closed<br>
Port 83 is closed<br><br>

$>python3 active.py --help<br>
usage: active.py [-h] [-p P] [-u] [-t] host<br>

Simple port scanner<br>

positional arguments:<br>
  host        The target host to scan<br>

options:<br>
  -h, --help  show this help message and exit<br>
  -p P        Range of ports to scan<br>
  -u, --udp   Perform UDP scan<br>
  -t, --tcp   Perform TCP scan<br>

## Audit

- [Audit file](https://github.com/01-edu/public/tree/master/subjects/cybersecurity/active/audit)

## Author

**Raido Lump**
- [Git profile](https://01.kood.tech/git/raidoxd "raidoxd")
- Discord - Friendly#4382