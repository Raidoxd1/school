How to run ascii-art-output:

EX: go run . "Hello" standard --output=banner.txt

After that run: cat -e banner.txt

More examples:

go run . "Hello\nThere" shadow --output=result.txt

cat -e result.txt

go run . "[]^_ 'a" thinkertoy --output=outcome.txt

cat -e outcome.txt