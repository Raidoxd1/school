package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {

	//reading the input
	arg := os.Args
	make := arg[3]
	//makes a .txt file without the '--output='
	make = strings.Replace(make, "--output=", "", -1)
	//destination puts the ascii-art into new .txt file that it creates
	destination, _ := os.Create(make)

	if len(arg[1]) > 0 {
		if arg[1] == `\n` {
			fmt.Fprintln(destination, "")
		} else {
			//reading the file line by line and not by text
			file, _ := os.Open(arg[2] + ".txt")
			scanner := bufio.NewScanner(file)
			scanner.Split(bufio.ScanLines)
			var txtlines []string
			for scanner.Scan() {
				txtlines = append(txtlines, scanner.Text())

			}
			//splitting the line if \n is between characters
			words := strings.Split(arg[1], `\n`)
			for _, word := range words {
				if word == "" {
					fmt.Fprintln(destination, "")
				} else {
					//printing 8 lines from the txt file
					for j := 1; j < 9; j++ {
						//calculating the line where the symbol starts
						for _, a := range word {
							line := (((a - 32) * 9) + rune(j))
							symbol := (txtlines[line])
							fmt.Fprint(destination, symbol)
						}
						fmt.Fprintln(destination, " ")
					}
				}
			}
		}
	}
}
