# hole-in-bin

## Description


This exercise is designed to test your skills and understanding of binary exploitation and reverse engineering. <br>You will need to work through a series of binary exploitation challenges using a provided virtual machine.<br><br>
Inside the /opt/hole-in-bin directory, you will find a set of binaries (ex00 to ex11) that you need to exploit. <br>Each binary presents a unique challenge and will test different aspects of your knowledge about binary <br>exploitation and reverse engineering. <br><br>
Commands used: <br>
objdump |less : for reading the bin file<br>
xxd : for converting the bin file to hex<br>
nano : for editing the hex file<br><br>

![Alt text](image.png)

## ex00
Output that i need to get: "you have changed the 'modified' variable"
<br><br>
First i read the bin file and found "int volatile modified 0x5c", then i found it here:  <br>
![Alt text](image-1.png) <br>
Then i converted the bin file to hex"xxd bin > hex" and edited the hex file "nano hex". <br>
Then i changed the value to 00. <br>
Now i converted the hex file back to bin "xxd -r hex new_bin" and ran the bin file "./new_bin". <br>
![Alt text](image-2.png) <br>

## ex01
Output that i need to get: "you have correctly got the variable to the right value"
<br><br>
![Alt text](image-3.png) <br>
Here i discovered that it compared something to 0x00000000. <br>
![Alt text](image-4.png) <br>
In the main function i discovered the "cmp" command. <br>
and then i changed the value to 0x00000000 <br>
same way as in previous exercise. <br>
![Alt text](image-5.png) <br>

## ex02
Output that i need to get: "you have correctly modified the variable"
<br><br>
![Alt text](image-6.png)<br>
Here i discovered that it again compared something to 0x00000000. <br>
![Alt text](image-7.png) <br>
here i once again saw the "cmp" command. <br>
and then i changed the value to 0x00000000 <br>
same way as in previous exercise. <br>
![Alt text](image-8.png) <br>

## ex03
Output that i need to get: "code flow successfully changed"
<br><br>
This time i found that ./bin didnt work, so i checked the README file and there it said that i needed to change <br>the code flow <br>
I checked the bin file and found now there was 2 functions. <br>
So to change the code flow i changed what func its going to call in "start"function. <br>
I saw that main was being called with 0x8048438 so i changed it to 0x8048424 to call the win function. <br>
![Alt text](image-9.png) <br>
![Alt text](image-10.png) <br>

## ex04
Output that i need to get: "code flow successfully changed"
<br><br>
This time it said again to change the code flow. <br>
So i did the exact same steps. <br>
![Alt text](image-11.png) <br>  
This time it was 0x8048408 and needed to change it to 0x80483f4. <br>
![Alt text](image-12.png) <br>

## ex05
Output that i need to get: "you have hit the target correctly"
<br><br>
This time i found vuln function that gets called inside the main function <br>
and it has a jne command that is always true. <br>
![Alt text](image-14.png) <br>
So i changed the jne command to nop command. <br>
![Alt text](image-15.png)<br>
![Alt text](image-16.png) <br>

## ex06
Output that i need to get: "that wasn't too bad now, was it?"
<br><br>
This time i again found 2 functions in bin file. <br>
and on them was name Winner so i thought of changing from calling main to calling winner function. <br>
![Alt text](image-17.png) <br>
changed the push from 8048889 to 8048864 in start. <br>
![Alt text](image-18.png) <br>

## ex07
Output that i need to get: "you have modified the target"
<br><br>
This time again saw the vuln fucntion and doing the exact same steps as in ex05. <br>
but with different address. <br>
![Alt text](image-19.png)

## ex08
Output that i need to get: "you have modified the target"
<br><br>
This time again saw the vuln fucntion and doing the exact same steps as in ex05. <br>
but with different address. <br>
![Alt text](image-20.png)

## ex09
Output that i need to get: "code execution redirected"
<br><br>
Here i see that there is a second funtion called hello. <br>
So like previously, i thought of changing from calling main to calling hello function.<br>
![Alt text](image-21.png) 

## ex10
Output that i need to get: "level passed"
<br><br>
Here i see that there is a second funtion called winner. <br>
So like previously, i thought of changing from calling main to calling winner function.<br>
![Alt text](image-22.png)

## ex11
Output that i need to get: "and we have a winner"
<br><br>
Here i see that there is a second funtion called winner. <br>
So like previously, i thought of changing from calling main to calling winner function.<br>
![Alt text](image-23.png)
  



## Audit

- [Audit file](https://github.com/01-edu/public/tree/master/subjects/cybersecurity/hole-in-bin/audit)

## Author

**Raido Lump**
- [Git profile](https://01.kood.tech/git/raidoxd "raidoxd")
- Discord - Friendly#4382