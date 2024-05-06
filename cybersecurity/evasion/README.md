
# evasion

## Description

You will need to develop a windows program<br>
The windows program will have to give us the possibility to encrypt another program<br>
Increase its size by 101mb<br>
Add an increment of an int to 100001<br>
Look at the time, do a sleep of 101 seconds, look at the time to check that 101 seconds has passed, if the 101 seconds have not <br>elapsed, do not decrypt the binary and do not execute it<br>

## Q&A

1. Antivirus software detects viruses by comparing file code patterns against a database of known virus signatures, monitoring<br> program behavior for suspicious activities, and using heuristics and machine learning algorithms to identify new<br> threats based on behavior and characteristics.<br><br>

2. To bypass antivirus software, attackers can use techniques such as encrypting or obfuscating malware code, employing packers <br>or compressors, utilizing polymorphic or metamorphic techniques, leveraging rootkits to hide malicious activities, or <br>exploiting zero-day vulnerabilities until they are detected and patched.<br><br>

3. This program takes a file path as input and performs encryption on the specified file using XOR encryption with a given key.<br> It then increases the file size by adding additional data and an increment value. The program checks for a specific process <br>("calc.exe") and terminates it if found. After a delay, the file is decrypted using the same key, restoring it to its <br>original form.<br><br>

## Usage

Clone the repo into your virtualbox.<br>
Copy calc.exe from system32 to the evasion folder<br>
![Alt text](image.png) <br>
Check the calc.exe file hash. <br>
![Alt text](image-1.png) <br>
when opening calc.exe <br>
![Alt text](image-2.png)<br>
Run the program <br>
![Alt text](image-3.png)<br>
and now when opening calc.exe<br>
![Alt text](image-4.png)<br>
and checking new hash:<br>
![Alt text](image-5.png)<br>
and new file size:<br>
![Alt text](image-7.png)<br>
After 101 seconds the file will be decrypted and the calc.exe can be openend normally.<br>






## Audit

- [Audit file](https://github.com/01-edu/public/tree/master/subjects/cybersecurity/evasion/audit)

## Author

**Raido Lump**
- [Git profile](https://01.kood.tech/git/raidoxd "raidoxd")
- Discord - Friendly#4382