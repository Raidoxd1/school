package main

import (
	"fmt"
	"os"
	"sort"
)

// move ants through tunnels and print out informational chart
func moveAnts(input shortestPaths, allPaths map[int][]string, ants int) {
	antsMoved := false
	var antsInPath []antInPath
	stepNr := 1
	var paths [][]string
	antsLeft := ants
	var big big
	big.antsInPath = antsInPath
	big.antsLeft = antsLeft
	paths = getPaths(input, allPaths)

	// if ants move straight from start to end then..
	if len(paths[len(paths)-1]) == 2 {
		for !antsMoved {
			big = addAntToPath(big.antsInPath, big.antsLeft, paths)
			big.antsInPath = moveAntsInPath(big.antsInPath)
			paths = checkRemovePath(paths, big.antsLeft)
			antsMoved = checkAllMoved(big.antsInPath, big.antsLeft)
			stepNr++
			fmt.Print("")
		}
		fmt.Println("")
	} else {
		for !antsMoved {
			//fmt.Print(stepNr, ". ") //debug, how many moves it takes for ants to reach end
			big = addAntToPath(big.antsInPath, big.antsLeft, paths)
			big.antsInPath = moveAntsInPath(big.antsInPath)
			paths = checkRemovePath(paths, big.antsLeft)
			antsMoved = checkAllMoved(big.antsInPath, big.antsLeft)
			stepNr++
			fmt.Println("")
		}
	}
}

func getPaths(input shortestPaths, allPaths map[int][]string) [][]string {
	var final [][]string
	for _, v := range input.SelectedPaths {
		final = append(final, allPaths[v.pathKey])
	}
	sort.Slice(final, func(i, j int) bool {
		return len(final[i]) < len(final[j])
	})
	//fmt.Println(final, "final tunnels") // debug, what tunnels are being used
	if final == nil {
		fmt.Println("ERROR: invalid data format")
		os.Exit(0)
	}
	return final
}

func addAntToPath(antsInPath []antInPath, antsLeft int, paths [][]string) big {
	var temp antInPath
	for _, v := range paths {
		if antsLeft > 0 {
			temp.index = 0
			temp.finished = false
			temp.path = v
			antsInPath = append(antsInPath, temp)
			antsLeft--
		}
	}
	var notBig big
	notBig.antsInPath = antsInPath
	notBig.antsLeft = antsLeft
	return notBig
}

func moveAntsInPath(antsInPath []antInPath) []antInPath {
	var temp int
	temp2 := true
	for k, v := range antsInPath {
		if v.finished == false {
			fmt.Print("L", k+1, "-", v.path[v.index+1], " ")
			temp = v.index + 1
			antsInPath[k].index = temp
			if v.index >= len(v.path)-2 {
				antsInPath[k].finished = temp2
			}
		}
	}
	return antsInPath
}

func checkRemovePath(paths [][]string, antsLeft int) [][]string {
	ants := 0
	maxPath := len(paths)
	if len(paths) > 0 {
		maxPath = len(paths[len(paths)-1])
	}
	for _, v := range paths {
		ants = ants + maxPath - len(v) + 1
	}
	if antsLeft < ants {
		paths = paths[:len(paths)-1]
	}
	return paths
}

func checkAllMoved(antsInPath []antInPath, antsLeft int) bool {
	if antsLeft > 0 {
		return false
	}
	for _, v := range antsInPath {
		if v.finished == false {
			return false
		}
	}
	return true
}
