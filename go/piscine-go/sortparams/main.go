package main

import (
	"os"

	"github.com/01-edu/z01"
)

func main() {
	arg := os.Args
	count := 0
	for x := range arg {
		count = x + 1
	}
	for i := 1; i < count; i++ {
		for j := i + 1; j < count; j++ {
			if arg[i] > arg[j] {
				arg[i], arg[j] = arg[j], arg[i]
			}
		}
	}
	for j := 1; j <= count-1; j++ {
		for _, elem := range arg[j] {
			z01.PrintRune(elem)
		}
		z01.PrintRune('\n')
	}
}
