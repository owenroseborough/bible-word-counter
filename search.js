class Search {
  constructor() {
    this.phraseCount = 0;
  }

  // Method
  search(phrase, language, jsonObject) {
    //TESTING CODE
    //const testJSON = '[{"book":"Genesis", "chapters":[1,2]}]';
    //jsonObject = testJSON
    //TESTING CODE

    this.wordCount = 0;

    //make array with individual words from phrase
    var phraseArray = this.refineArrayOfLines(phrase.split(" "));

    //parse json object into myObj array
    const myObj = JSON.parse(jsonObject);

    //iterate through array of books
    for (const bookIndex in myObj) {
      //iterate through chapter array for the book
      for (const chapIndex in myObj[bookIndex].chapters) {
        const fs = require("fs");

        this.checkWorkingDirectory();

        //get the book and chapter in string so the filename can be built
        let book = myObj[bookIndex].book;
        let chapter = myObj[bookIndex].chapters[chapIndex];

        var filename = this.chooseFileName(language, book, chapter);

        //initialize contents variable
        var contents = "";

        //catch exceptions if the chapters of the requested book are not in the directory
        try {
          //read the file into contents
          contents = fs.readFileSync(filename, "utf-8");
        } catch (err) {
          console.log("The chapter/book you have requested does not exist");
          return;
        }

        var arrayOfLines = contents.split("\r\n");

        var refinedArrayOfWords = this.refineArrayOfLines(arrayOfLines);

        var wordCounter = 0;
        //now search through refinedArrayOfWords and count how many strings match our phrase
        for (var index = 0; index < refinedArrayOfWords.length; index++) {
          //if we find first word, then look at the other words to see if they match
          if (refinedArrayOfWords[index] === phraseArray[0]) {
            wordCounter++;
            for (var index1 in phraseArray) {
              if (index1 == 0) {
                index1++;
              }
              if (
                refinedArrayOfWords[parseInt(index) + index1] ==
                phraseArray[index1]
              ) {
                wordCounter++;
              }
            }
          } //end of first word matching if block
          //if we found phrase, increment index2 to start past phrase
          if (wordCounter === phraseArray.length) {
            while (wordCounter != 0) {
              index++;
              wordCounter--;
            }
            index--; //to compensate for for loop
            this.phraseCount++;
          }
          //else reset wordCounter
          else {
            wordCounter = 0;
          }
        } //end of word for loop
      } //end of chapter array for loop
    } //end of book array for loop

    return this.phraseCount;
  } //end of search method

  //helper method
  checkWorkingDirectory() {
    //for some reason the working directory was at bwc-back-end's parent folder so I had to change directory to the bwc-back-end folder
    var cwd = process.cwd();
    if (!cwd.includes("bwc-back-end")) {
      process.chdir("./bwc-back-end");
      cwd = process.cwd();
    }
  }

  //helper method
  chooseFileName(language, book, chapter) {
    //choose the file name based on the language requested
    var filename = "";

    if (language.toLowerCase() == "hebrew") {
      filename = "HebrewBible/" + book + "/" + chapter + ".txt";
    } else {
      filename = "EnglishBible/" + book + "/" + chapter + ".txt";
    }
    return filename;
  }

  //helper method
  refineArrayOfLines(arrayOfLines) {
    var refinedArrayOfWords = [];
    //loop through each newline array item
    for (const index in arrayOfLines) {
      var tempArray = [];
      var tempArrayWords = arrayOfLines[index].split(" ");
      //tempArrayWords = tempArrayWords.reverse();
      //loop through each line, and only add to refined array if item is a word
      for (const index1 in tempArrayWords) {
        if (tempArrayWords[index1].length > 0) {
          //if word contains hebrew colon, then strip it out
          if (tempArrayWords[index1].includes("׃")) {
            //if hebrew colon at end of word, then get substring from 0 to 2nd last character
            if (
              tempArrayWords[index1].indexOf("׃") ==
              tempArrayWords[index1].length - 1
            ) {
              tempArrayWords[index1] = tempArrayWords[index1].substring(
                0,
                tempArrayWords[index1].length - 1
              );
            }
          }
          //else if word contains english punctuation, then strip it out
          else if (
            tempArrayWords[index1].includes(".") ||
            tempArrayWords[index1].includes(",") ||
            tempArrayWords[index1].includes(";") ||
            tempArrayWords[index1].includes("?") ||
            tempArrayWords[index1].includes("!") ||
            tempArrayWords[index1].includes(":") ||
            tempArrayWords[index1].includes('"')
          ) {
            //if english punctuation at end of word, then get substring from 0 to 2nd last character
            if ((tempArrayWords[index1].indexOf(".") == tempArrayWords[index1].length - 1) ||
                (tempArrayWords[index1].indexOf(",") == tempArrayWords[index1].length - 1) ||
                (tempArrayWords[index1].indexOf(";") == tempArrayWords[index1].length - 1) ||
                (tempArrayWords[index1].indexOf("?") == tempArrayWords[index1].length - 1) ||
                (tempArrayWords[index1].indexOf("!") == tempArrayWords[index1].length - 1) ||
                (tempArrayWords[index1].indexOf(":") == tempArrayWords[index1].length - 1) ||
                (tempArrayWords[index1].indexOf('"') == tempArrayWords[index1].length - 1)) {
              tempArrayWords[index1] = tempArrayWords[index1].substring(
                0,
                tempArrayWords[index1].length - 1
              );
            }
            //else if english punctuation at start of word, then get substring from 1 to last character
            else if (
              (tempArrayWords[index1].indexOf(".") == 0) ||
              (tempArrayWords[index1].indexOf(",") == 0) ||
              (tempArrayWords[index1].indexOf(";") == 0) ||
              (tempArrayWords[index1].indexOf("?") == 0) ||
              (tempArrayWords[index1].indexOf("!") == 0) ||
              (tempArrayWords[index1].indexOf(":") == 0) ||
              (tempArrayWords[index1].indexOf('"') == 0)) {
              tempArrayWords[index1] = tempArrayWords[index1].substring(
                1,
                tempArrayWords[index1].length
              );
            }
          }
          tempArray = tempArray.concat(tempArrayWords[index1]);
        }
      }
      refinedArrayOfWords = refinedArrayOfWords.concat(tempArray);
    }
    return refinedArrayOfWords;
  }
} //end of search class

//TESTING CODE
//NOTE: אֱלֹהִים֙ = God
//const search = new Search();
//search.search("וְאֵ֥ת הָאָֽרֶץ׃","hebrew");
// console.log('The word אֱלֹהִים֙ (God) appears ' + search.search("אֱלֹהִים֙", "HEBREW") + ' times in the chapters selected in Hebrew Bible');
// console.log('The word God appears ' + search.search("God", "english") + ' times in the chapters selected in the English bible');
//TESTING CODE
