package main

// this function checks for an element in list
func checkList(s []string, e string) bool {
	for _, a := range s {
		if a == e {
			return true
		}
	}
	return false
}

// adds element to map slice
func insertElementToIntMap(m map[int][]string, i int, s []string, element string) {
	s = append(s, element)
	m[i] = s
}

// returns all maps which contain end
func checkIfEnd(m map[int][]string, end string) int {
	for k, v := range m {
		if !checkList(v, end) {
			return k
		}
	}
	return 0
}

// finds list in map by key
func findListByKey(m map[int][]string, i int) []string {
	for k, v := range m {
		if k == i {
			return v
		}
	}
	return nil
}

// finds list string in map by key
func findListStringByKey(m map[string][]string, s string) []string {
	for k, v := range m {
		if k == s {
			return v
		}
	}
	return nil
}

// find maximum number of paths
func getMaxIndex(m map[int][]string) int {
	maxIndex := 0
	for k := range m {
		if k > maxIndex {
			maxIndex = k
		}
	}
	return maxIndex
}

// copy list by one element at time
func copyList(s []string) []string {
	var result []string
	for _, v := range s {
		result = append(result, v)
	}
	return result
}

// controls if parallels are not equivalent to each other
func checkParallel(a []string, b []string, c bool) bool {
	if equal(a, b) {
		return false
	} else {
		if len(a) == 2 && c || len(b) == 2 && c {
			return false
		} else {
			for i := 1; i < len(a)-1; i++ {
				if checkList(b, a[i]) {
					return false
				}
			}
		}
	}
	return true
}

// if two lists are same, returns true
func equal(a []string, b []string) bool {
	if len(a) != len(b) {
		return false
	}
	for k, v := range a {
		if v != b[k] {
			return false
		}
	}
	return true
}

// find path length count
func findPathLength(input []shortestPaths, index int) int {
	count := 0
	for _, v := range input[index].SelectedPaths {
		if v.steps > count {
			count = v.steps
		}
	}
	return count
}
