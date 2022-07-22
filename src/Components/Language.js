import React from 'react'
import ReactDOM from 'react-dom'

import { useState } from "react"
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from "@mui/material/Typography"

const Language = ({language, setLanguage}) => {
    const handleLanguage = (event, language) => {
        setLanguage(language)
    }

    return (
    <div style={{display: "flex", flexDirection: "column", margin: "auto"}}>
        <Typography variant="overline">Bible Language</Typography>
        <ToggleButtonGroup
        value={language}
        exclusive
        onChange={handleLanguage}
        sx={{height: "40px"}}
        color="primary"
        >
            <ToggleButton value="hebrew">
                <Typography variant="body1">Hebrew</Typography>
            </ToggleButton>
            <ToggleButton value="english">
            <Typography variant="body1">English</Typography>
            </ToggleButton>
        </ToggleButtonGroup>

    </div>
    )
}

export default Language