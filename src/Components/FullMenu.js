import { Container, Typography, Box, Button, Divider } from '@mui/material';
import React, { useEffect } from 'react'

const FullMenu = (props) => {

    const [col, setCol] = React.useState('#ffffff')
    const handleColChange = (val) => {
        props.setPT(val);
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
        <>
            <Box width="100%" height='380px' sx={{display: 'flex', alignItems: 'center', flexDirection: 'column', marginBottom: '30px'}}>
                <Typography sx={{color: 'white', fontWeight: '600'}}>
                    Choose your pen:
                </Typography>
                <Box width="90%" height="80px" sx={{display: 'flex', alignItems: 'center', paddingLeft: '15px', marginTop: '30px'}}>
                    <Button sx={{background: '#cd7dff', borderRadius: '5px', height: '40px', width: '30px', flexShrink: 0}} onClick={() => handleColChange(1)}></Button>
                    <Typography sx={{color: 'white', fontWeight: '600', paddingLeft: '15px'}}> STARTING POINT </Typography>
                </Box>
                <Box width="90%" height="80px" sx={{display: 'flex', alignItems: 'center', paddingLeft: '15px', marginTop: '30px'}}>
                    <Button sx={{background: '#ff5454', borderRadius: '5px', height: '40px', width: '30px', flexShrink: 0}} onClick={() => handleColChange(-1)}></Button>
                    <Typography sx={{color: 'white', fontWeight: '600', paddingLeft: '15px'}}> WALLS </Typography>
                </Box>
                <Box width="90%" height="80px" sx={{display: 'flex', alignItems: 'center', paddingLeft: '15px', marginTop: '30px'}}>
                    <Button sx={{background: '#59d459', borderRadius: '5px', height: '40px', width: '30px', flexShrink: 0}} onClick={() => handleColChange(2)}></Button>
                    <Typography sx={{color: 'white', fontWeight: '600', paddingLeft: '15px'}}> ENDING POINT </Typography>
                </Box>
                <Box width="90%" height="80px" sx={{display: 'flex', alignItems: 'center', paddingLeft: '15px', marginTop: '30px'}}>
                    <Button sx={{background: '#ffffff', borderRadius: '5px', height: '40px', width: '30px', flexShrink: 0}} onClick={() => handleColChange(0)}></Button>
                    <Typography sx={{color: 'white', fontWeight: '600', paddingLeft: '15px'}}> ERASER </Typography>
                </Box>
                <Box width="90%" height="80px" sx={{display: 'flex', alignItems: 'center', paddingLeft: '15px', paddingRight: '15px', marginTop: '30px', flexDirection: 'column'}}>
                    <Button sx={{background: col, borderRadius: '5px', height: '20px', width: '100%', flexShrink: 0}}></Button>
                    <Typography sx={{color: '#ffffff', fontWeight: '600', paddingLeft: '15px', paddingRight: '15px', width: '100%', textAlign: 'center'}}> CURRENT COLOR </Typography>
                </Box>
            </Box>
            <Divider variant="middle" sx={{background: 'white', marginBottom: '30px'}}/>
            <Box width="100%" height="300px" sx={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                <Typography sx={{color: 'white', fontWeight: '600'}}>
                    Choose your pathfinding algorithm:
                </Typography>
            </Box>
        </>
    )
}

export default FullMenu;