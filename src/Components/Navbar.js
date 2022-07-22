import React from 'react'
import ReactDOM from 'react-dom'

import Typography from "@mui/material/Typography"
import styles from "./styles.module.css"
import abacus from "../Assets/abacus.png"
// import Slider from '@mui/material/Slider';
// import { styled } from '@mui/material/styles';

// const CustomizedSlider = styled(Slider)`
// color: #20b2aa;

// :hover {
//   color: #2e8b57;
// }
// `;

const Navbar = () => {
    return (
    <nav className={styles.navbar}>
        {/* Logo div */}
        <div className={styles.logo}>
            <img src={abacus} style={{height: "32px", marginRight: "12px"}}/>
            <Typography variant="body1">
                <strong>Bible Word Counter</strong>
            </Typography>
        </div>
    </nav>
    )
}

export default Navbar