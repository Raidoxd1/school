package piscine

func Atoi(s string) int {
	if StrLen(s) == 0 {
		return 0
	}

	s0 := s
	if s[0] == '-' || s[0] == '+' {
		s = s[1:]
		if StrLen(s) < 1 {
			return 0
		}
	}

	nm := 0

	for _, ch := range s {
		if !containsIn0to9(ch) {
			return 0
		}
		nm = nm*10 + charToInt(ch)
	}

	if s0[0] == '-' {
		nm *= -1
	}
	return nm
}

func containsIn0to9(ch rune) bool {
	for i := '0'; i <= '9'; i++ {
		if ch == i {
			return true
		}
	}

	return false
}

func charToInt(ch rune) int {
	count := 0
	if ch < 48 && ch > 58 {
		return 0
	}

	for i := '1'; i <= ch; i++ {
		count++
	}

	return count
}
