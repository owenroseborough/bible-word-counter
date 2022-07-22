import React from 'react'
import ReactDOM from 'react-dom'

import { makeStyles } from '@mui/material/styles';
import { useState } from "react"
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Navbar from "./Components/Navbar"
import Searchbar from "./Components/Searchbar"
import Language from "./Components/Language"
import BiblePicker from "./Components/BiblePicker"
import DisplayOccurrences from "./Components/DisplayOccurrences"

import styles from "./styles.module.css"

function App() {

  // Theme
  const theme = createTheme();

  // State
  const [language, setLanguage] = useState("hebrew")
  const [occurrences, setOccurrences] = useState(null)
  const [query, setQuery] = useState(null)

  return (
  <ThemeProvider theme={theme}>
    <Navbar />
    <Searchbar setQuery={setQuery}/>
    <div className={styles.body}>
      <Language language={language} setLanguage={setLanguage}/>
      <DisplayOccurrences query={query} occurrences={occurrences} />
      <BiblePicker language={language} setOccurrences={setOccurrences} query={query}/>
    </div>
  </ThemeProvider>
  );
}

export default App;
