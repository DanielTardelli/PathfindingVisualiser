import { Box } from '@mui/material'
import React, { useRef, useEffect } from 'react'

const Square = (props) => {
    const ref = useRef(null);
    const prev = useRef('#727273')

    // const handleSquareSelect = (e) => {
    //     if (props.md() && !e.shiftKey) {
    //       ref.current.style.background = "#333333"
    //       props.chng(props.i, props.j);  
    //     }
    // }

    // const handleSquareSelectt = (e) => {
    //     if (!e.shiftKey) {
    //       ref.current.style.background = "#333333"
    //       props.chng(props.i, props.j); 
    //     } 
    // }

    // useEffect(() => {
    //     if (ref.current) {
    //         ref.current.addEventListener('mousedown', handleSquareSelectt);
    //         ref.current.addEventListener('mousemove', handleSquareSelect);
    //         return () => {
    //             ref.current.removeEventListener('mousemove', handleSquareSelect);
    //             ref.current.addEventListener('mousedown', handleSquareSelect);
    //         }
    //     }
    // }, [])
    
    useEffect(() => {
        if (ref.current) {
            if (props.val == 1) {
                ref.current.style.background = 'linear-gradient(145deg, #eaaae8, #c58fc3)'
            } else if (props.val == -1) {
                ref.current.style.background = 'linear-gradient(145deg, #ef6f8e, #c95e78)'
            } else if (props.val == 2) {
                ref.current.style.background = 'linear-gradient(145deg, #83d09c, #6eaf83)'
            } else if (props.val == 3) {
                ref.current.style.background = 'linear-gradient(145deg, #9de7f1, #84c2cb)'
            } else if (props.val == 4) {
                ref.current.style.background = 'linear-gradient(145deg, #b6b2f3, #9995cc)'
            } else {
                ref.current.style.background = 'linear-gradient(145deg, #f0f0f0, #cacaca)'
            }
        }
    }, [props.val])

    let a,b,c,d = '';
    a = b = c = d;

    if (props.i == 0 && props.j == 0) {
        a = '15px';
    } else if (props.i == 0 && props.j == props.gridw - 1) {
        b = '15px'
    } else if (props.i == props.gridh - 1 && props.j == 0) {
        c = '15px'
    } else if (props.i == props.gridh - 1 && props.j == props.gridw - 1) {
        d = '15px'
    }
    
    return (
        <>
            <div class={`${props.i}-${props.j}`} data-i={props.i} data-j={props.j} ref={ref} style={{borderTopLeftRadius: a, borderTopRightRadius: b, borderBottomLeftRadius: c, borderBottomRightRadius: d, transition: 'background 100ms ease-in-out', border: '0.1px solid black', height: '20px', width: '20px'}}></div>
        </>
    )
}

export default Square