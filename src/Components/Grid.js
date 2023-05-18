import { CircularProgress, Box, Typography, Button } from '@mui/material';
import React, { useEffect, useRef } from 'react'
import Square from './Square';

const Grid = (props) => {
    const [grid, setGrid] = React.useState(null)
    const [loading, setLoading] = React.useState(true);
    const [start, setStart] = React.useState([null, null]);

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
        for (let i = 0; i < props.size; i++) {
            cGrid.push([]);
            for (let j = 0; j < props.size; j++) {
                cGrid[i].push(0);
            };
        } 
        setGrid(cGrid);
        setLoading(false); 
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
            clbckToEditGrid(e.target.dataset.i, e.target.dataset.j, props.pt)
        }
    }

    const backtrack = (visited, i, j) => {
        if (visited[i][j] != -1) {
            let cGrid = [...grid]
            cGrid[i][j] = 4;
            setGrid(cGrid);
            backtrack(visited, visited[i][j][0], visited[i][j][1]);
        }
    }

    const djkstraBFS = () => {
        // IMPLEMENT
        // creation of the visited array
        let visited = []
        for (let i = 0; i < props.size; i++) {
            visited.push([]);
            for (let j = 0; j < props.size; j++) {
                visited[i].push(0);
            };
        } 

        let queue = [start];
        visited[start[0]][start[1]] = -1;

        console.log(queue[0], visited)
        // order for adjacent will be left up right down
        while (queue.length > 0) {
           let val = queue.shift();
           if (val[0] < grid.length - 1 && visited[val[0]+1][val[1]] == 0 && grid[val[0]+1][val[1]] != -1) {
                queue.push([val[0]+1, val[1]])
                visited[val[0]+1][val[1]] = val
                if (grid[val[0]+1][val[1]] == 2) {
                    backtrack(visited, val[0]+1, val[1]);
                    break;
                } else {
                    let cGrid = [...grid];
                    cGrid[val[0]+1][val[1]] = 3;
                    setGrid(cGrid);
                }
           }

           if (val[0] > 0 && visited[val[0]-1][val[1]] == 0 && grid[val[0]-1][val[1]] != -1) {
                queue.push([val[0]-1, val[1]])
                visited[val[0]-1][val[1]] = val
                if (grid[val[0]-1][val[1]] == 2) {
                    backtrack(visited, val[0]-1, val[1]);
                    break;
                } else {
                    let cGrid = [...grid];
                    cGrid[val[0]-1][val[1]] = 3;
                    setGrid(cGrid);
                }
           }

           if (val[1] < grid.length - 1 && visited[val[0]][val[1]+1] == 0 && grid[val[0]][val[1]+1] != -1) {
                queue.push([val[0], val[1]+1])
                visited[val[0]][val[1]+1] = val
                if (grid[val[0]][val[1]+1] == 2) {
                    backtrack(visited, val[0], val[1]+1);
                    break;
                } else {
                    let cGrid = [...grid];
                    cGrid[val[0]][val[1]+1] = 3;
                    setGrid(cGrid);
                }
            }

            if (val[1] > 0 && visited[val[0]][val[1]-1] == 0 && grid[val[0]][val[1]-1] != -1) {
                queue.push([val[0], val[1]-1])
                visited[val[0]][val[1]-1] = val
                if (grid[val[0]][val[1]-1] == 2) {
                    backtrack(visited, val[0], val[1]-1);
                    break;
                } else {
                    let cGrid = [...grid];
                    cGrid[val[0]][val[1]-1] = 3;
                    setGrid(cGrid);
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
            <>
                <Box ref={ref} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%', flexDirection: 'column'}}>
                    {grid.map((e, i, arr) => {
                        return(
                            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                                {e.map((_e, j, _arr) => {
                                    return <Square i={i} j={j} val={_e}/>
                                })}
                            </Box>
                        )
                    })}
                </Box>
                <Button sx={{position: 'fixed', bottom: '20px', right: '20px', height: '100px', width: '200px', background: '#adadad', zIndex: 0}}  onClick={djkstraBFS}>
                    <Typography sx={{color: 'white', fontWeight: 700}}>
                        Run animation
                    </Typography>
                </Button>
            </>
        )
    }
}

export default Grid