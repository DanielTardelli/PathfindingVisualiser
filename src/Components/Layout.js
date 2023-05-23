import { Box, Container, IconButton } from '@mui/material';
import React, { useRef, useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import FullMenu from './FullMenu';
import MiniMenu from './MiniMenu';

const Layout = (props) => {
    const ref = useRef(null);
    const ref2 = useRef(null);
    const clearGridRef = useRef(null)

    const [menuOpen, setMenuOpen] = React.useState(false);
    const [prevWidth, setPrevWidth] = React.useState(null);

    let mouseDown = false;
    let mousePos = [null, null];
    let scrollPos = [null, null];

    const handleMouseDown = (e) => {
        if (!e.shiftKey) return;
        mouseDown = true;
        mousePos = [e.clientX, e.clientY];
        scrollPos = [ref.current.scrollLeft, ref.current.scrollTop];
    }

    const handleMouseUp = (e) => {
        mouseDown = false;
        mousePos = [null, null];
        scrollPos = [null, null];
    }

    const handleMouseDrag = (e) => {
        if (!mouseDown || !e.shiftKey) return;
        let x_ = e.clientX - mousePos[0];
        let y_ = e.clientY - mousePos[1];
        ref.current.scrollLeft = scrollPos[0] - x_;
        ref.current.scrollTop = scrollPos[1] - y_;
    }

    useEffect(() => {
        if (ref.current) {
            ref.current.addEventListener('mousedown', handleMouseDown);
            ref.current.addEventListener('mouseup', handleMouseUp);
            ref.current.addEventListener('mouseleave', handleMouseUp);
            ref.current.addEventListener('mousemove', (event) => handleMouseDrag(event));
        }
    }, [])

    const handleMenuOpenClose = () => {
        if (ref2.current) {
            if (menuOpen == false) {
                setPrevWidth(ref2.current.style.width)
                ref2.current.style.width = '300px';
                setMenuOpen(true)
            }
            else {
                ref2.current.style.width = prevWidth;
                setMenuOpen(false);
                setPrevWidth(null);
            }
        }
    }

    return (
        <div style={{height: '100vh', width: '100%', display: 'flex'}}>
            <Box ref={ref2} sx={{
            zIndex: 3,
            position: 'absolute',
            top: 0,
            left: 0,
            background: '#333333', 
            width:{xs: '60px', sm: '60px', md: '100px'}, 
            minWidth: '60px',
            height: '100%',
            maxHeight: '100%',
            transition: 'width 200ms ease-in-out, background 500ms'}}>
                <IconButton onClick={handleMenuOpenClose} sx={{position: 'relative', top: '0', right: '0', width: '100%'}}>
                    <MenuIcon sx={{fontSize: '31px', color: "white"}}/>
                </IconButton>
                {menuOpen == true 
                ? <>
                    <FullMenu pt={props.pt} setPT={props.setPT} clearRef={clearGridRef}/>
                </> 
                : <>
                    <MiniMenu/>
                </>
                }
                
            </Box>
            <Box ref={ref} sx={{height: '100%', width: '100%', overflow: 'hidden', display: 'flex', marginLeft: {xs: '60px', sm: '60px', md: '100px'}}}>
                {React.cloneElement(props.children, {reff: ref, clearGridRef: clearGridRef })}
            </Box>
        </div>
    )
}

export default Layout;