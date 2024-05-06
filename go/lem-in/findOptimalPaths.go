package main

// find most optimal tunnels to move through
func findOptimalPaths(input []shortestPaths, ants int) bestWay {
	bestWayToGo := -1
	bestFind := false
	steps := 0
	for i := len(input) - 1; i >= 0; i-- {
		if bestFind == false {
			tempSteps := 0
			tempMoved := 0
			if input[i].numberOfPaths <= ants {
				tempSteps = findPathLength(input, i) - 1
				movedAnts := 0
				for _, v := range input[i].SelectedPaths {
					movedAnts = movedAnts + tempSteps - v.steps + 2
				}
				if movedAnts <= ants {
					tempMoved = ants - movedAnts
					if tempMoved%input[i].numberOfPaths > 0 {
						tempSteps++
					}
					tempSteps = tempSteps + tempMoved/input[i].numberOfPaths
				}
			}
			if steps == 0 {
				steps = tempSteps
				bestWayToGo = i
			} else {
				if tempSteps <= steps {
					steps = tempSteps
					bestWayToGo = i
				} else {
					bestFind = true
				}
			}
		}
	}
	//fmt.Println("number of moves: ", steps)
	var final bestWay
	final.pathsIndex = bestWayToGo
	final.steps = steps
	return final
}
