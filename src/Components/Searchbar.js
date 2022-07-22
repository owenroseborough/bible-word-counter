import React from 'react'
import ReactDOM from 'react-dom'

import OutlinedInput from '@mui/material/OutlinedInput';
import styles from "./styles.module.css"

const Searchbar = ({ setQuery }) => {
    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            <OutlinedInput 
                variant="outlined"
                placeholder="Search a Word" 
                className={styles.search} 
                onChange={(e) => setQuery(e.target.value)}
             />
        </div>
    )
}

export default Searchbar