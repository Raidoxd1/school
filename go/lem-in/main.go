package main

import (
	"fmt"
	"io/ioutil"
	"os"
	"regexp"
	"strconv"
	"strings"
)

var (
	rooms         []string
	ShortestPaths []shortestPaths
)

type selectedPaths struct {
	pathKey int
	steps   int
}

type shortestPaths struct {
	numberOfPaths int
	totalSteps    int
	SelectedPaths []selectedPaths
}

type bestWay struct {
	steps      int
	pathsIndex int
}

type antInPath struct {
	path     []string
	index    int
	finished bool
}

type big struct {
	antsInPath []antInPath
	antsLeft   int
}

func main() {
	test, err := ioutil.ReadFile(os.Args[1])
	if err != nil { // error handling
		fmt.Println("ERROR: cannot find textfile")
		os.Exit(0)
	}
	newtxt := string(test)

	x := regexp.MustCompile("^\\d+")
	leia := x.FindString(newtxt)
	numberOfAnts, err := strconv.Atoi(leia)
	if err != nil { // error handling
		fmt.Println("ERROR: invalid data format, ants not found")
		os.Exit(0)
	}
	// fmt.Println(numberOfAnts, "number of ants") // for debug
	if numberOfAnts == 0 { // error handling
		fmt.Println("ERROR: invalid data format, invalid number of Ants")
		os.Exit(0)
	}

	/// find start
	findStart := regexp.MustCompile("\\#+[s].+\n.+")
	whereStart := findStart.FindString(newtxt)
	if whereStart == "" { // error handling
		fmt.Println("ERROR: invalid data format, no start room found")
		os.Exit(0)
	}
	startSplit := strings.Split(whereStart, "\n")
	startSplitter := strings.Split(startSplit[1], " ")
	start := startSplitter[0]
	rooms = append(rooms, start)

	/// find end
	findEnd := regexp.MustCompile("\\#+[e].+\n.+")
	whereEnd := findEnd.FindString(newtxt)
	if whereEnd == "" { // error handling
		fmt.Println("ERROR: invalid data format, no end room found")
		os.Exit(0)
	}
	endSplit := strings.Split(whereEnd, "\n")
	endSplitter := strings.Split(endSplit[1], " ")
	end := endSplitter[0]
	rooms = append(rooms, end)

	// find all links between rooms
	a := regexp.MustCompile(".+\\-.+")
	links := a.FindAllString(newtxt, -1)
	if links == nil { // error handling
		fmt.Println("ERROR: invalid data format, no links between rooms found")
		os.Exit(0)
	}

	graph := make(map[string][]string)
	allPaths := make(map[int][]string)

	// find all rooms which are connected with each other somehow
	myGraph(graph, links)
	// find all roads that connect start and end
	findAllPaths(allPaths, graph, start, end)

	// find all possible paralleled paths
	ShortestPaths = findParallelPaths(allPaths, graph, start, end)

	// find most optimal tunnels to move through
	bestWay := findOptimalPaths(ShortestPaths, numberOfAnts)
	//fmt.Println("how many tunnels are being used: ", ShortestPaths[bestWay.pathsIndex].numberOfPaths) // debug
	// move ants through tunnels and print out informational chart
	moveAnts(ShortestPaths[bestWay.pathsIndex], allPaths, numberOfAnts)

}
