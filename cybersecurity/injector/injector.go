package main

import (
	"encoding/base64"
	"fmt"
	"io/ioutil"
	"os"
	"os/exec"
	"path/filepath"
)

func createWrapperBinary(binary1, binary2, wrapperBinary string) error {
	// Read binary data of the two files
	data1, err := ioutil.ReadFile(binary1)
	if err != nil {
		return err
	}

	data2, err := ioutil.ReadFile(binary2)
	if err != nil {
		return err
	}

	// Encode binary data as base64 strings
	data1Base64 := base64.StdEncoding.EncodeToString(data1)
	data2Base64 := base64.StdEncoding.EncodeToString(data2)

	// Define the Go source code template
	template := `package main

import (
	"encoding/base64"
	
	"io/ioutil"
	"os"
	"os/exec"
	"path/filepath"
)

func main() {
	// Decode binary data of the first file
	data1, _ := base64.StdEncoding.DecodeString(%q)

	// Decode binary data of the second file
	data2, _ := base64.StdEncoding.DecodeString(%q)

	// Execute the first binary from memory
	dir1, err := ioutil.TempDir("", "binary1")
	if err != nil {
		panic(err)
	}
	defer os.RemoveAll(dir1)
	file1 := filepath.Join(dir1, "binary1")
	if err := ioutil.WriteFile(file1, data1, 0700); err != nil {
		panic(err)
	}
	cmd1 := exec.Command(file1)
	cmd1.Stdout = os.Stdout
	cmd1.Stderr = os.Stderr
	if err := cmd1.Run(); err != nil {
		panic(err)
	}

	// Execute the second binary from memory
	dir2, err := ioutil.TempDir("", "binary2")
	if err != nil {
		panic(err)
	}
	defer os.RemoveAll(dir2)
	file2 := filepath.Join(dir2, "binary2")
	if err := ioutil.WriteFile(file2, data2, 0700); err != nil {
		panic(err)
	}
	cmd2 := exec.Command(file2)
	cmd2.Stdout = os.Stdout
	cmd2.Stderr = os.Stderr
	if err := cmd2.Run(); err != nil {
		panic(err)
	}
}`

	// Create a temporary directory for the Go source code
	tempDir, err := ioutil.TempDir("", "wrapper")
	if err != nil {
		return err
	}
	defer os.RemoveAll(tempDir)

	// Write the Go source code to a temporary file
	sourceFile := filepath.Join(tempDir, "main.go")
	sourceCode := fmt.Sprintf(template, data1Base64, data2Base64)
	if err := ioutil.WriteFile(sourceFile, []byte(sourceCode), 0644); err != nil {
		return err
	}

	// Disable Go module mode for the temporary directory
	env := append(os.Environ(), "GO111MODULE=off")

	// Compile the Go source code into the wrapper binary
	cmd := exec.Command("go", "build", "-o", wrapperBinary, sourceFile)
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	cmd.Env = env
	if err := cmd.Run(); err != nil {
		return err
	}

	return nil
}

func main() {
	args := os.Args[1:]

	binary1 := args[0]
	binary2 := args[1]
	wrapperBinary := "newbinary"

	err := createWrapperBinary(binary1, binary2, wrapperBinary)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}

}
