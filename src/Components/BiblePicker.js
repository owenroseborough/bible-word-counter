import React from 'react'
import ReactDOM from 'react-dom'
import { useState, useEffect } from "react"

import styles from "./styles.module.css"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Checkbox from '@mui/material/Checkbox';
import Collapsible from 'react-collapsible';

import books from "../Assets/bibleBooks.json"

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from "@mui/material/Typography"



const BiblePicker = (props) => {

    const [selectedChapters, setSelectedChapters] = useState([])
    const [selectedBooks, setSelectedBooks] = useState([])

    /*useEffect(() => {
        const func = async () => {
            // reduce selectedChapters to simplified format
            // from array of strings like "Genesis 1" to object format with {book: "Genesis", chapters: [1, 2, 7]}
            
            // Model of what formatted object will look like
            // {
            //     "Genesis": {
            //         book: "Genesis",
            //         chapters: []
            //     }
            // }

            let formattedSelectedChapters = {}
            for (const chapter of selectedChapters) {
                const currChapter = JSON.parse(chapter)
                // if book is not in object, put in
                if (!(currChapter.book in formattedSelectedChapters)) {
                    formattedSelectedChapters[currChapter.book] = {}
                }
                // add chapter to chapters array
                if (!("chapters" in formattedSelectedChapters[currChapter.book])) {
                    formattedSelectedChapters[currChapter.book]["chapters"] = []
                }
                formattedSelectedChapters[currChapter.book].chapters.push(currChapter.chapter)
                
                // add name to object
                if (!("book" in formattedSelectedChapters[currChapter.book])) {
                    formattedSelectedChapters[currChapter.book].book = currChapter.book
                }
            }

            // console.log(formattedSelectedChapters)

            let formattedChaptersArray = []
            for (const key in formattedSelectedChapters) {
                formattedChaptersArray.push(formattedSelectedChapters[key])
            }

            console.log(formattedChaptersArray)

            // make request to backend

            const occurrencesResponse = await fetch(`https://biblewordcounter.herokuapp.com?language=${props.language}&query=${props.query}`, {
                method: "POST",
                body: JSON.stringify(formattedChaptersArray)
            })

            // Model of what request body will look like
            // [
            //     {
            //         book: "Genesis",
            //         chapters: []
            //     },
            //     {
            //         book: "Romans",
            //         chapters: []
            //     }
            // ]

            const numOcurrences = await occurrencesResponse.json()
            props.setOccurrences(numOcurrences)
        }
        func()

    }, [selectedChapters])*/

    const handleSelection = (event, newChapters) => {
        setSelectedChapters(newChapters)
    };

    const onAllChapters = (checked, book) => {
        // add book to selected books
        setSelectedBooks(selectedBooks.push(book.name))

        // const allChapters = Array.from({length: book.numChapters}, (v, i) => `${book.name} ${i + 1}`)
        const allChapters = Array.from({length: book.numChapters}, (v, i) => `{"book": "${book.name}", "chapter": ${i + 1}}`)
        const chaptersSet = new Set(selectedChapters)

        for (const chapter of allChapters) {
            if (checked) {
                chaptersSet.add(chapter)
            } else {
                chaptersSet.delete(chapter)
            }
        }
        return setSelectedChapters(Array.from(chaptersSet))
    }
    
    const onWholeBible = (checked) => {
        
        const chaptersSet = new Set(selectedChapters)

        let allBooksSelected = selectedBooks.length === 66
        if (allBooksSelected) {
            setSelectedBooks([]);
        }

        for (const book of books) {
            if (!allBooksSelected && !selectedBooks.includes(book.name)) {
                setSelectedBooks(selectedBooks.push(book.name))
            }
            // const bookChapters = Array.from({length: book.numChapters}, (v, i) => `${book.name} ${i + 1}`)
            const bookChapters = Array.from({length: book.numChapters}, (v, i) => `{"book": "${book.name}", "chapter": ${i + 1}}`)
            for (const chapter of bookChapters) {
                if (checked) {
                    chaptersSet.add(chapter)
                } else {
                    chaptersSet.delete(chapter)
                }
            }
        }

        // TODO: make all chapters' checkboxes checked off
    
        return setSelectedChapters(Array.from(chaptersSet))
    }

    return (
        <div className={styles.biblePicker}>
            {/* Select all chapters in bible button */}
            <div style={{display: "flex", alignItems: "center", justifyContent: "flex-end"}}>
                <Typography variant="caption">
                    Select Entire Bible
                </Typography>
                <Checkbox onChange={(e) => onWholeBible(e.target.checked)}/>
            </div>
            {/* Mapping each book to selection element */}
            {books.map((book) => {
                if (props.language == "hebrew" && book.sectionOfBible == "New Testament") {
                    return
                }
                return (
                    <div className={styles.bookContainer} key={book.name}>
                        <ExpandMoreIcon style={{marginRight: "4px"}}/>
                        <Collapsible className={styles.book} trigger={book.name}>
                            <ToggleButtonGroup
                            value={selectedChapters}
                            onChange={handleSelection}
                            color="primary"
                            style={{flexWrap: "wrap"}}
                            >
                                {Array.from({length: book.numChapters}, (v, i) => i + 1)
                                .map((chapter) => {
                                    return (
                                    <ToggleButton 
                                    value={`{"book": "${book.name}", "chapter": ${chapter}}`}
                                    // value={`${book.name} ${chapter}`} 
                                    key={`${book.name} ${chapter}`}
                                    >
                                        {chapter}
                                    </ToggleButton>
                                    )
                                })}
                            </ToggleButtonGroup>
                        </Collapsible>
                        <Checkbox 
                            className="checkbox" 
                            // checked={selectedBooks.includes(book.name)}
                            onChange={(e) => onAllChapters(e.target.checked, book)}
                         />
                    </div>
                )
            })}
        </div>
    )

}

export default BiblePicker