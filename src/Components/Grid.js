import { CircularProgress, Box, Typography, Button, Fab } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import React, { useEffect, useRef } from 'react'
import Square from './Square';

const Grid = (props) => {
    const [grid, setGrid] = React.useState(null)
    const [loading, setLoading] = React.useState(true);
    const [start, setStart] = React.useState([null, null]);
    const [gridWidth, setGridWidth] = React.useState(null);
    const [gridHeight, setGridHeight] = React.useState(null);

    let col = "#ffffff"
    if (props.pt == 1) {
        col = '#cd7dff'
    } else if (props.pt == -1) {
        col = '#ff5454'
    } else if (props.pt == 2) {
        col = '#59d459'
    } else {
        col = '#ffffff'
    }

    let mouseDown = false;

    const ref = useRef(null);

    useEffect(() => {
        let cGrid = [];
        for (let i = 0; i < props.reff.current.clientHeight / 25; i++) {
            cGrid.push([]);
            for (let j = 0; j < props.reff.current.clientWidth / 25; j++) {
                cGrid[i].push(0);
            };
        }
        setGrid(cGrid);
        setLoading(false); 
        setGridHeight(props.reff.current.clientHeight / 25);
        setGridWidth(props.reff.current.clientWidth / 25);
        console.log('finished')  
    }, [])

    useEffect(() => {
        let b = false;
        if (ref.current) {
            b = true;
            ref.current.addEventListener('mousedown', handleGridEditStart)
            ref.current.addEventListener('mousemove', handleGridEdit);
            ref.current.addEventListener('mouseup', () => {
                mouseDown = false;
            })
        }

        return (b) ? () => {
            ref.current.removeEventListener('mousedown', handleGridEditStart)
            ref.current.removeEventListener('mousemove', handleGridEdit);
            ref.current.removeEventListener('mouseup', () => {
                mouseDown = false;
            })
        } : () => {};
    }, [loading, props.pt])
    
    props.clearGridRef.current = () => {
        let cGrid = [];
        for (let i = 0; i < gridHeight; i++) {
            cGrid.push([]);
            for (let j = 0; j < gridWidth; j++) {
                cGrid[i].push(0);
            };
        }
        setGrid(cGrid);
    }

    const clbckToEditGrid = (i, j, val) => {
        let cGrid = [...grid];
        cGrid[i][j] = val;
        //console.log(cGrid)
        setGrid(cGrid);
    }

    const handleGridEdit = (e) => {
        if (e.target.dataset.i && mouseDown && !e.shiftKey && (props.pt != 1 && props.pt != 2)) {
            //e.target.style.background = col
            clbckToEditGrid(e.target.dataset.i, e.target.dataset.j, props.pt)
        }
    }

    const handleGridEditStart = (e) => {
        if (e.target.dataset.i && !e.shiftKey) {
            if (props.pt == 1) {
                setStart([Number(e.target.dataset.i), Number(e.target.dataset.j)])
            }
            mouseDown = true;
            //e.target.style.background = col
            clbckToEditGrid(Number(e.target.dataset.i), Number(e.target.dataset.j), props.pt)
        }
    }

    const backtrack = (visited, i, j, visitedArr) => {
        if (visited[i][j] != -1) {
            visitedArr.push([1, i, j])
            backtrack(visited, visited[i][j][0], visited[i][j][1], visitedArr);
        } else {
            animate(visitedArr)
        }
    }

    const animate = async (arr) => {
        let arrC = [...arr]
        const animationStep = () => {
            let x = arr.shift();
            let elem = document.getElementsByClassName(`${x[1]}-${x[2]}`)
            if (x[0] == 0) {
                elem[0].style.background = "#92cad1"
            } else {
                elem[0].style.background = "#00850d"
            }
            if (arr.length == 0) {
                let cGrid = [...grid];
                arrC.map((elem) => {
                    if (elem[0] == 0 ) {
                        cGrid[elem[1]][elem[2]] = 3;
                    } else {
                        cGrid[elem[1]][elem[2]] = 4;
                    }
                })
                console.log(cGrid)
                setGrid(cGrid);
                return;
            }
            requestAnimationFrame(animationStep);
        }
        requestAnimationFrame(animationStep);
    }

    const djkstraBFS = () => {
        // IMPLEMENT
        // creation of the visited array
        let visited = []
        for (let i = 0; i < gridHeight; i++) {
            visited.push([]);
            for (let j = 0; j < gridWidth; j++) {
                visited[i].push(0);
            };
        } 
        let visitedArr = [];

        let queue = [start];
        visited[start[0]][start[1]] = -1;
        // order for adjacent will be left up right down
        while (queue.length > 0) {
           let val = queue.shift();
           if (val[0] < grid.length - 1 && visited[val[0]+1][val[1]] == 0 && grid[val[0]+1][val[1]] != -1) {
                queue.push([val[0]+1, val[1]])
                visitedArr.push([0, val[0]+1, val[1]])
                visited[val[0]+1][val[1]] = val
                if (grid[val[0]+1][val[1]] == 2) {
                    backtrack(visited, val[0]+1, val[1], visitedArr);
                    break;
                }
           }

           if (val[0] > 0 && visited[val[0]-1][val[1]] == 0 && grid[val[0]-1][val[1]] != -1) {
                queue.push([val[0]-1, val[1]])
                visitedArr.push([0, val[0]-1, val[1]])
                visited[val[0]-1][val[1]] = val
                if (grid[val[0]-1][val[1]] == 2) {
                    backtrack(visited, val[0]-1, val[1], visitedArr);
                    break;
                } 
           }

           if (val[1] < grid[0].length - 1 && visited[val[0]][val[1]+1] == 0 && grid[val[0]][val[1]+1] != -1) {
                queue.push([val[0], val[1]+1])
                visitedArr.push([0, val[0], val[1]+1])
                visited[val[0]][val[1]+1] = val
                if (grid[val[0]][val[1]+1] == 2) {
                    backtrack(visited, val[0], val[1]+1, visitedArr);
                    break;
                } 
            }

            if (val[1] > 0 && visited[val[0]][val[1]-1] == 0 && grid[val[0]][val[1]-1] != -1) {
                queue.push([val[0], val[1]-1])
                visitedArr.push([0, val[0], val[1]-1])
                visited[val[0]][val[1]-1] = val
                if (grid[val[0]][val[1]-1] == 2) {
                    backtrack(visited, val[0], val[1]-1, visitedArr);
                    break;
                } 
            }
        }
    }

    if (loading) {
        return (
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%', flexDirection: 'column'}}>
                <CircularProgress></CircularProgress>
                <Typography variant='h6' sx={{paddingTop: '20px', fontWeight: '600'}}>
                    Loading.... Please Wait
                </Typography>
            </Box>
        )
    } else {
        return (
            <div ref={ref} style={{height: '100%', width: '100%', background: '#b3b3b3', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                <Box sx={{height: '100%', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                {grid.map((e, i, arr) => {
                    return(
                        <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            {e.map((_e, j, _arr) => {
                                return <Square i={i} j={j} val={_e} gridh={grid.length} gridw={grid[0].length}/>
                            })}
                        </Box>
                    )
                })}
                </Box>
                <Fab variant="extended" sx={{position: 'fixed', bottom: '20px', right: '20px', width: {xs: '20px', sm: '20px', md: '100px'} ,background: 'black', zIndex: 0, display: 'flex', justifyContent: 'center', alignItems: 'center'}}  onClick={djkstraBFS}>
                    <PlayArrowIcon sx={{color: 'white'}}></PlayArrowIcon>
                    <Typography sx={{color: 'white', fontWeight: 600, display: {xs: 'none', sm: 'none', md: 'flex'}}}>
                        Play
                    </Typography> 
                </Fab>
            </div>
        )
    }
}

export default Grid