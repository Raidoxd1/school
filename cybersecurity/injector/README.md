# local

## Description

The goal of this project is to develop a binder that merges two programs into one <br><br>
I first created 2 programs called bin1 that prints out 01 and another program called bin2 that prints out Hello, World! <br>
and then i made them into binary/executable files. <br><br>
I then created a program called injector that takes in 2 arguments, the first argument is the path to the binary/executable file of bin1 and the second argument is the path to the binary/executable file of bin2. <br><br>
The injector.go file creates a wrapper binary that combines two existing binary files into a single executable. <br>The two binary files are read and encoded as base64 strings. Then, a Go source code template is defined, which <br>includes the base64-encoded data and code to decode and execute the binaries from memory. The Go source code <br>is written to a temporary file, compiled into the wrapper binary using the Go compiler, and saved as <br>"newbinary". The wrapper binary can be executed to run both binary1 and binary2 sequentially.<br>

Usage:<br>
![Alt text](image-1.png)


## Audit

- [Audit file](https://github.com/01-edu/public/tree/master/subjects/cybersecurity/injector/audit)

## Author

**Raido Lump**
- [Git profile](https://01.kood.tech/git/raidoxd "raidoxd")
- Discord - Friendly#4382