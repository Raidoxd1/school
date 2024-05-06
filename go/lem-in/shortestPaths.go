package main

import (
	"fmt"
	"os"
)

// find all different parallel paths
func findParallelPaths(allPaths map[int][]string, graph map[string][]string, start string, end string) []shortestPaths {
	// finds maximum number of parallel tunnels
	var keyList []int
	startConnections := findListStringByKey(graph, start)
	endConnections := findListStringByKey(graph, end)
	maxParallel := len(startConnections)
	if len(endConnections) < maxParallel {
		maxParallel = len(endConnections)
	}
	if maxParallel == 0 { // error handling
		fmt.Println("ERROR: invalid data format, start & end do not connect")
		os.Exit(0)
	}
	//fmt.Println("max theoretical number of parallel tunnels", maxParallel) // debug
	var element shortestPaths
	var find selectedPaths
	var room []string
	var shortestUsed bool
	find.steps = len(findListByKey(allPaths, 1))
	find.pathKey = 1
	element.numberOfPaths = 1
	element.totalSteps = find.steps
	element.SelectedPaths = append(element.SelectedPaths, find)
	ShortestPaths = append(ShortestPaths, element)
	var parallelPaths []shortestPaths
	for i := 2; i <= maxParallel; i++ {
		// find best tunnels
		if i == 2 {
			for k, v := range allPaths {
				// if start and end can be passed through one link only
				if find.steps == 2 {
					return ShortestPaths
				}
				// else...
				for l, u := range allPaths {
					if l > k {
						if checkParallel(v, u, false) {

							find.steps = len(findListByKey(allPaths, k))
							find.pathKey = k
							element.SelectedPaths = nil
							element.SelectedPaths = append(element.SelectedPaths, find)
							find.steps = len(findListByKey(allPaths, l))
							find.pathKey = l
							element.SelectedPaths = append(element.SelectedPaths, find)
							element.numberOfPaths = 2
							element.totalSteps = find.steps + len(findListByKey(allPaths, k))
							parallelPaths = append(parallelPaths, element)

						}
					}
				}
			}
			ShortestPaths = append(ShortestPaths, findBestPathByCount(parallelPaths, 2))
		} else {
			for _, v := range parallelPaths {
				if v.numberOfPaths == i-1 {
					// calculate parallel rooms
					room = nil
					for _, u := range v.SelectedPaths {
						temporary := findListByKey(allPaths, u.pathKey)
						if u.steps == 2 {
							shortestUsed = true

						} else {
							for x := 1; x < len(temporary)-1; x++ {
								room = append(room, temporary[x])
							}

						}
					}
					for k, l := range allPaths {

						if checkParallel(l, room, shortestUsed) {
							keyList = nil
							keyList = append(keyList, k)
							for _, c := range v.SelectedPaths {
								keyList = append(keyList, c.pathKey)
							}

							if notParallelExist(parallelPaths, keyList, i) {

								element.SelectedPaths = nil
								for _, b := range v.SelectedPaths {
									find.pathKey = b.pathKey
									find.steps = b.steps
									element.SelectedPaths = append(element.SelectedPaths, find)
								}
								find.pathKey = k
								find.steps = len(findListByKey(allPaths, k))
								element.SelectedPaths = append(element.SelectedPaths, find)
								element.numberOfPaths = i
								element.totalSteps = v.totalSteps + len(findListByKey(allPaths, k))
								parallelPaths = append(parallelPaths, element)
							}
						}
					}
				}
			}
			ShortestPaths = append(ShortestPaths, findBestPathByCount(parallelPaths, i))
		}

	}
	// //debug
	// for _, v := range ShortestPaths {
	// 	fmt.Println("Best parallel nr:", v.numberOfPaths, "  Links needed to pass:", v.totalSteps, "  Tunnels(index/links):", v.SelectedPaths)
	// }
	return ShortestPaths
}

func notParallelExist(parallelPaths []shortestPaths, a []int, count int) bool {

	for _, j := range parallelPaths {
		if j.numberOfPaths == count {
			if listExist(a, j.SelectedPaths) {
				return false
			}

		}
	}
	return true
}

func listExist(a []int, b []selectedPaths) bool {
	nr := len(a)
	for _, v := range a {
		match := false
		for _, u := range b {
			if u.pathKey == v {
				match = true
			}
		}
		if match == true {
			nr = nr - 1
		}
	}
	return nr == 0
}

func findBestPathByCount(input []shortestPaths, count int) shortestPaths {
	var best selectedPaths
	var bestParallel shortestPaths
	shortest := 0
	for _, j := range input {
		if j.numberOfPaths == count {
			if shortest == 0 {
				shortest = j.totalSteps
			} else {
				if shortest > j.totalSteps {
					shortest = j.totalSteps
				}
			}
		}
	}

	found := false
	for _, i := range input {
		if i.numberOfPaths == count {
			if i.totalSteps == shortest && found == false {
				for _, k := range i.SelectedPaths {
					best.steps = k.steps
					best.pathKey = k.pathKey
					bestParallel.SelectedPaths = append(bestParallel.SelectedPaths, best)

				}

				bestParallel.numberOfPaths = count
				bestParallel.totalSteps = i.totalSteps

				found = true
			}
		}
	}
	return bestParallel
}
