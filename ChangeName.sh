#cd to whatever folder contains the large amount of files to change the names of
cd /Users/coltonundseth/Desktop/'Shell Test'

#the names of the files will start at the number 1
a=1

#loop through all files in the folder that end in .txt
for f in *.txt; do
	#create variable for new name that uses c syntax
	#creates a string that puts the value of "a" followed by ".txt"
	new=$(printf "%d.txt" "$a")

	#this mv command will change the name from value of f to the value of new
	mv -- "$f" "$new"

	#increment the value of a so the next file has a different name
	let a=a+1
done
