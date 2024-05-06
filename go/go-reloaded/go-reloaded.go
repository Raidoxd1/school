package main

import (
	"io/ioutil"
	"regexp"
	"strconv"
	"strings"
)

var (
	newtxt string
)

func main() {
	//adding the file reader
	test, _ := ioutil.ReadFile("sample.txt")
	newtxt := string(test)
	//changing from hexadecimal to decimal
	myhex := regexp.MustCompile("([0-9a-fA-F])+\\s?(\\(hex\\))")
	hexlist := myhex.FindAllString(newtxt, -1)
	for _, hexstr := range hexlist {
		re := regexp.MustCompile("\\s?(\\(hex\\))")
		hexstring := re.ReplaceAllString(hexstr, "")
		hex, _ := strconv.ParseInt(hexstring, 16, 64)
		hexreplacer := strings.NewReplacer(hexstr, strconv.FormatInt(hex, 10))
		newtxt = hexreplacer.Replace(newtxt)
	}
	//changing from binary to decimal
	mybin := regexp.MustCompile("\\w+\\s?(\\(bin\\))")
	binlist := mybin.FindAllString(newtxt, -1)
	for _, binstr := range binlist {
		re := regexp.MustCompile("\\s?(\\(bin\\))")
		binstring := re.ReplaceAllString(binstr, "")
		bin, _ := strconv.ParseInt(binstring, 2, 64)
		binreplacer := strings.NewReplacer(binstr, strconv.FormatInt(bin, 10))
		newtxt = binreplacer.Replace(newtxt)
	}
	//changing word letter to uppercase
	myup := regexp.MustCompile("\\w+\\s?(\\(up\\))")
	uplist := myup.FindAllString(newtxt, -1)
	for _, upstr := range uplist {
		re := regexp.MustCompile("\\s?(\\(up\\))")
		upstring := re.ReplaceAllString(upstr, "")
		upreplacer := strings.NewReplacer(upstr, strings.ToUpper(upstring))
		newtxt = upreplacer.Replace(newtxt)
	}
	//chaning word letter to lowercase
	mylow := regexp.MustCompile("\\w+\\s?(\\(low\\))")
	lowlist := mylow.FindAllString(newtxt, -1)
	for _, lowstr := range lowlist {
		re := regexp.MustCompile("\\s?(\\(low\\))")
		lowstring := re.ReplaceAllString(lowstr, "")
		lowreplacer := strings.NewReplacer(lowstr, strings.ToLower(lowstring))
		newtxt = lowreplacer.Replace(newtxt)
	}
	//capitalizing first letter of word
	mycap := regexp.MustCompile("\\w+\\s?(\\(cap\\))")
	caplist := mycap.FindAllString(newtxt, -1)
	for _, capstr := range caplist {
		re := regexp.MustCompile("\\s?(\\(cap\\))")
		capstring := re.ReplaceAllString(capstr, "")
		capreplacer := strings.NewReplacer(capstr, strings.Title(capstring))
		newtxt = capreplacer.Replace(newtxt)
	}
	//changing word or mulitple to uppercase
	myupx := regexp.MustCompile("(\\(up,\\s*?\\d\\))")
	upxlist := myupx.FindAllString(newtxt, -1)
	for _, upxstr := range upxlist {
		re := regexp.MustCompile("(\\d)")
		upxstring := re.FindString(upxstr)
		myupx2 := regexp.MustCompile("((([!,.:;?]*?)|(\\s*?))\\w+(([!,.:;?]*?)|(\\s*?))){" + upxstring + "}\\s*?(\\(up,\\s*?" + upxstring + "\\))")
		upxstring2 := myupx2.FindString(newtxt)
		upxstring3 := myupx.ReplaceAllString(upxstring2, "")
		upxreplacer := strings.NewReplacer(upxstring2, strings.ToUpper(upxstring3))
		newtxt = upxreplacer.Replace(newtxt)
	}
	//changing word or multiple to lowercase
	mylowx := regexp.MustCompile("(\\(low,\\s*?\\d\\))")
	lowxlist := mylowx.FindAllString(newtxt, -1)
	for _, lowxstr := range lowxlist {
		re := regexp.MustCompile("(\\d)")
		lowxstring := re.FindString(lowxstr)
		mylowx2 := regexp.MustCompile("((([!,.:;?]*?)|(\\s*?))\\w+(([!,.:;?]*?)|(\\s*?))){" + lowxstring + "}\\s?(\\(low,\\s*?" + lowxstring + "\\))")
		lowxstring2 := mylowx2.FindString(newtxt)
		lowxstring3 := mylowx.ReplaceAllString(lowxstring2, "")
		lowxreplacer := strings.NewReplacer(lowxstring2, strings.ToLower(lowxstring3))
		newtxt = lowxreplacer.Replace(newtxt)
	}
	//capitalizing word or mulitple words first letter
	mycapx := regexp.MustCompile("(\\(cap,\\s*?\\d\\))")
	capxlist := mycapx.FindAllString(newtxt, -1)
	for _, capxstr := range capxlist {
		re := regexp.MustCompile("(\\d)")
		capxstring := re.FindString(capxstr)
		mycapx2 := regexp.MustCompile("((([!,.:;?]*?)|(\\s*?))\\w+(([!,.:;?]*?)|(\\s*?))){" + capxstring + "}\\s?(\\(cap,\\s*?" + capxstring + "\\))")
		capxstring2 := mycapx2.FindString(newtxt)
		capxstring3 := mycapx.ReplaceAllString(capxstring2, "")
		capxreplacer := strings.NewReplacer(capxstring2, strings.Title(capxstring3))
		newtxt = capxreplacer.Replace(newtxt)
	}
	//punctuations close to previous word
	mypoint := regexp.MustCompile("(\\s+)([!,.:;?])")
	pointlist := mypoint.FindAllString(newtxt, -1)
	for _, pointstring := range pointlist {
		re := regexp.MustCompile("(\\s+)")
		pointstr := re.ReplaceAllString(pointstring, "")
		pointreplacer := strings.NewReplacer(pointstring, pointstr)
		newtxt = pointreplacer.Replace(newtxt)
	}
	//punctuations appart from the next word
	replacer := strings.NewReplacer(",", ", ", "!", "! ", "?", "? ", ".", ". ", ":", ": ", ";", "; ")
	mypoint1 := regexp.MustCompile("([!,.:;?])([a-zA-Z])")
	pointlist1 := mypoint1.FindAllString(newtxt, -1)
	for _, pointstring1 := range pointlist1 {
		pointstr1 := replacer.Replace(pointstring1)
		pointreplacer1 := strings.NewReplacer(pointstring1, pointstr1)
		newtxt = pointreplacer1.Replace(newtxt)
	}
	//punctuation mark exactly right of left from word or words
	replacer = strings.NewReplacer(" ' ", "'", " '", "'", "' ", "'", " ‘ ", "‘", " ‘", "‘", "‘ ", "‘", " ’ ", "’", " ’", "’", "’ ", "’")
	mymark := regexp.MustCompile("([’|‘|']?\\s?([0-9A-Za-z_]+)\\s?([!.?]?)\\s?[’|‘|']?)")
	marklist := mymark.FindAllString(newtxt, -1)
	for _, markstring := range marklist {
		markstr := replacer.Replace(markstring)
		markreplacer := strings.NewReplacer(markstring, markstr)
		newtxt = markreplacer.Replace(newtxt)
	}
	//punctuation mark dont have whitespaces next to it if there are letters on both sides
	letter := regexp.MustCompile("([a-zA-Z])\\s?['|‘|’]\\s?([a-zA-Z])")
	letterlist := letter.FindAllString(newtxt, -1)
	for _, letterstring := range letterlist {
		letterstr := replacer.Replace(letterstring)
		letterreplacer := strings.NewReplacer(letterstring, letterstr)
		newtxt = letterreplacer.Replace(newtxt)
	}
	//replacing a or A if there is a vowel or h after it
	replacer = strings.NewReplacer("a ", "an ", "A ", "An ")
	vowel := regexp.MustCompile("([A|a])\\s([aeiouAEIOUhH])")
	vowellist := vowel.FindAllString(newtxt, -1)
	for _, vowelstring := range vowellist {
		vowelstr := replacer.Replace(vowelstring)
		vowelreplacer := strings.NewReplacer(vowelstring, vowelstr)
		newtxt = vowelreplacer.Replace(newtxt)
	}
	//if there are more than 1 whitspace it delets the extras
	replacer = strings.NewReplacer("  ", " ")
	x := regexp.MustCompile("\\s\\s*")
	xlist := x.FindAllString(newtxt, -1)
	for _, xstring := range xlist {
		xstr := replacer.Replace(xstring)
		xreplacer := strings.NewReplacer(xstring, xstr)
		newtxt = xreplacer.Replace(newtxt)
	}

	ioutil.WriteFile("output.txt", []byte(newtxt), 0666)
}
