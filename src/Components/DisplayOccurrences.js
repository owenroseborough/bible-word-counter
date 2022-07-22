import React from 'react'
import ReactDOM from 'react-dom'

const DisplayOccurrences = ({ query, occurrences }) => {

    return (
        [occurrences && (
        <div>
            {query} occurs {occurrences} times
        </div>
        )]
    )
}

export default DisplayOccurrences