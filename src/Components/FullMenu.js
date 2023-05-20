import { Container, Typography, Box, Button, Divider } from '@mui/material';
import React, { useEffect, useRef } from 'react'

const FullMenu = (props) => {

    const [col, setCol] = React.useState('#ffffff')
    const handleColChange = (val) => {
        props.setPT(val);
    }
    
    const handleGridClear = () => {
        if (props.clearRef.current) {
            props.clearRef.current();
        }
    }

    useEffect(() => {
        if (props.pt == 1) {
            setCol('#cd7dff')
        } else if (props.pt == -1) {
            setCol('#ff5454')
        } else if (props.pt == 2) {
            setCol('#59d459')
        } else {
            setCol('#ffffff')
        }
    }, [props.pt])
    

    return (
        <div style={{overflowY: 'auto', overflowX: 'hidden', height: '80%', width: '100%'}}>
            <Box width="100%" height='380px' sx={{display: 'flex', alignItems: 'center', flexDirection: 'column', marginBottom: '30px'}}>
                <Typography sx={{color: 'white', fontWeight: '600', whiteSpace: 'nowrap'}}>
                    Choose your pen:
                </Typography>
                <Box width="90%" height="80px" sx={{display: 'flex', alignItems: 'center', paddingLeft: '15px', marginTop: '30px'}}>
                    <Button sx={{background: '#cd7dff', borderRadius: '5px', height: '40px', width: '30px', flexShrink: 0}} onClick={() => handleColChange(1)}></Button>
                    <Typography sx={{color: 'white', fontWeight: '600', paddingLeft: '15px', fontSize: '15px', whiteSpace: 'nowrap'}}> STARTING POINT </Typography>
                </Box>
                <Box width="90%" height="80px" sx={{display: 'flex', alignItems: 'center', paddingLeft: '15px', marginTop: '30px'}}>
                    <Button sx={{background: '#ff5454', borderRadius: '5px', height: '40px', width: '30px', flexShrink: 0}} onClick={() => handleColChange(-1)}></Button>
                    <Typography sx={{color: 'white', fontWeight: '600', paddingLeft: '15px', fontSize: '15px', whiteSpace: 'nowrap'}}> WALLS </Typography>
                </Box>
                <Box width="90%" height="80px" sx={{display: 'flex', alignItems: 'center', paddingLeft: '15px', marginTop: '30px'}}>
                    <Button sx={{background: '#59d459', borderRadius: '5px', height: '40px', width: '30px', flexShrink: 0}} onClick={() => handleColChange(2)}></Button>
                    <Typography sx={{color: 'white', fontWeight: '600', paddingLeft: '15px', fontSize: '15px', whiteSpace: 'nowrap'}}> ENDING POINT </Typography>
                </Box>
                <Box width="90%" height="80px" sx={{display: 'flex', alignItems: 'center', paddingLeft: '15px', marginTop: '30px'}}>
                    <Button sx={{background: '#ffffff', borderRadius: '5px', height: '40px', width: '30px', flexShrink: 0}} onClick={() => handleColChange(0)}></Button>
                    <Typography sx={{color: 'white', fontWeight: '600', paddingLeft: '15px', fontSize: '15px', whiteSpace: 'nowrap'}}> ERASER </Typography>
                </Box>
                <Box width="90%" height="80px" sx={{display: 'flex', alignItems: 'center', paddingLeft: '15px', paddingRight: '15px', marginTop: '30px', flexDirection: 'column'}}>
                    <Box sx={{background: col, borderRadius: '5px', height: '20px', width: '100%', flexShrink: 0}}></Box>
                    <Typography sx={{color: '#ffffff', fontWeight: '600', paddingLeft: '15px', paddingRight: '15px', width: '100%', textAlign: 'center', whiteSpace: 'nowrap'}}> CURRENT COLOR </Typography>
                </Box>
            </Box>
            <Divider variant="middle" sx={{background: 'white', marginBottom: '30px'}}/>
            <Box width="100%" height="300px" sx={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                <Typography sx={{color: 'white', fontWeight: '600', whiteSpace: 'nowrap'}}>
                    Choose your pathfinding algorithm:
                </Typography>
            </Box>
            <Box width="100%" height="100px" sx={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                <Button sx={{background: 'grey', borderRadius: '5px', height: '40px', width: '80%', flexShrink: 0}} onClick={() => handleGridClear()}>
                    <Typography sx={{fontWeight: 600, color: 'white'}}>CLEAR</Typography>
                </Button>
            </Box>
        </div>
    )
}

export default FullMenu;