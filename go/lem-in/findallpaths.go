package main

import (
	"sort"
)

var (
	mylist    []string
	newList   []string
	pathsList [][]string
)

func findAllPaths(allPaths map[int][]string, graph map[string][]string, start string, end string) {
	insertElementToIntMap(allPaths, 1, mylist, start)
	for checkIfEnd(allPaths, end) != 0 {
		pathIndex := checkIfEnd(allPaths, end)
		managedPath := findListByKey(allPaths, pathIndex)        // weaved path so far
		currentRoom := managedPath[len(managedPath)-1]           // current room name
		possibleRooms := findListStringByKey(graph, currentRoom) // list of next possible rooms
		number := 0
		for k, v := range possibleRooms {
			if !checkList(managedPath, v) {
				if number == 0 {
					insertElementToIntMap(allPaths, pathIndex, managedPath, possibleRooms[k])
					number++
				} else {
					newIndex := getMaxIndex(allPaths) + 1
					newList = copyList(managedPath)
					insertElementToIntMap(allPaths, newIndex, newList, possibleRooms[k])
					number++
				}
			}
		}
		if number == 0 {
			delete(allPaths, pathIndex)
		}
	}
	for k, v := range allPaths {
		if len(v) > 0 {
			pathsList = append(pathsList, v)
			delete(allPaths, k)
		}
	}
	// sorts by shortest path to longest
	sort.Slice(pathsList, func(i, j int) bool {
		return len(pathsList[i]) < len(pathsList[j])
	})
	for k, v := range pathsList {
		allPaths[k+1] = v
		//fmt.Println("teekond: ", k+1, "list: ", v) // for debug
	}
}
