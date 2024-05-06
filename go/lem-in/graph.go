package main

import (
	"fmt"
	"os"
	"strings"
)

func myGraph(graph map[string][]string, links []string) {
	// find all rooms from links
	for _, v := range links {
		x := strings.Split(v, "-")
		left := x[0]
		right := x[1]
		substr := " "
		str := strings.Contains(left, substr)
		str2 := strings.Contains(right, substr)
		if str == true { // error handling
			fmt.Println("ERROR: invalid data format, room name must have no spaces")
			os.Exit(0)
		}
		if str2 == true { // error handling
			fmt.Println("ERROR: invalid data format, room name must have no spaces")
			os.Exit(0)
		}
		if left[0:1] == "L" || right[0:1] == "L" { // error handling
			fmt.Println("ERROR: invalid data format, room cannot start with letter 'L'")
			os.Exit(0)
		}
		if left[0:1] == "#" || right[0:1] == "#" { // error handling
			fmt.Println("ERROR: invalid data format, room cannot start with character '#'")
			os.Exit(0)
		}
		/// if element is not on the list then it appends it to the list
		if !checkList(rooms, left) {
			rooms = append(rooms, left)
		}
		if !checkList(rooms, right) {
			rooms = append(rooms, right)
		}

	}

	// find all rooms that connect with each other and put them in one map
	for _, v := range rooms {
		for _, w := range links {
			x := strings.Split(w, "-")
			left := x[0]
			right := x[1]

			if v == left {
				graph[v] = append(graph[v], right)
			}
			if v == right {
				graph[v] = append(graph[v], left)
			}

		}
	}
	// // for debug
	// for key, value := range graph {
	// 	fmt.Println("room: ", key, " linked with: ", value)
	// }
}
