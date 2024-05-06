package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

//copy commands from test.txt to test the code
func main() {
	//reading the input
	arg := os.Args
	input := ""
	for i, s := range arg {
		if i != 0 {
			input = input + s
		}
	}
	if len(input) > 0 {
		if input == `\n` {
			fmt.Println("")
		} else {
			//reading the file line by line and not by text
			file, _ := os.Open("standard.txt")
			scanner := bufio.NewScanner(file)
			scanner.Split(bufio.ScanLines)
			var txtlines []string
			for scanner.Scan() {
				txtlines = append(txtlines, scanner.Text())
			}
			//splitting the line if \n is between characters
			words := strings.Split(input, `\n`)
			for _, word := range words {
				if word == "" {
					fmt.Println("")
				} else {
					//printing 8 lines from the txt file
					for j := 1; j < 9; j++ {
						//calculating the line where the symbol starts
						for _, a := range word {
							line := (((a - 32) * 9) + rune(j))
							fmt.Print(txtlines[line])
						}
						fmt.Println(" ")
					}
				}
			}
		}
	}
}
