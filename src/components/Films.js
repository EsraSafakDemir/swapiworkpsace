import React,{useState, useEffect} from 'react'
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container ,Box} from '@mui/material';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SimpleBar from 'simplebar-react';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

export default function Films({value}) {
    const [selectFilm, setSelectFilm] = useState({});
    const [charList, setCharList] = useState([]);

    useEffect(() => {
      
        selectFilm.characters && selectFilm.characters.forEach(x=> {
            getPersonDetail(x);
        })
    }, [selectFilm])
    

const getDetails = async (id) => {
    setCharList([]);
    const results = await fetch(`https://swapi.dev/api/films/${id}?format=json`);
      const data = await results.json();
      setSelectFilm(data);

}

const getPersonDetail = async (url) => {
    const results = await fetch(url);
      const data = await results.json();
      setCharList(prevState => [...prevState, data]);

}


  return (
    <Container>
    <h1>Films</h1>
    <Box sx={{'& .simplebar-content': {display: 'flex'}}}>
    <SimpleBar forceVisible="x" style={{ maxHeight: 300, margin: '15px' }} autoHide={false}>


      {value && value.map((films) => {
         return (
            <Card sx={{ display: 'flex', flexDirection: 'column' ,flex: '0 0 auto', height: '270px', width: '320px', margin: '15px'}}>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <CardContent  sx={{width : '100%'}}>
              <Typography gutterBottom variant="h6" component="div">
                {films.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" >
                    <strong>Release_Date</strong><br /><br />
                    <span>{films.release_date}</span><br />
                    <strong>Producer</strong><br />
                    <span>{films.producer}</span>
              </Typography>
            </CardContent>
            <Avatar sx={{ bgcolor: '#a14f7a' }} variant="rounded">
            {films.episode_id}
            </Avatar>
            </Box>
            <CardActions sx={{marginBottom:0, marginTop: 'auto'}}>
              <Button size="small" onClick={()=>getDetails(films.episode_id)}>Show People</Button>
            </CardActions>
          </Card>
        )
      })}

</SimpleBar>
</Box>

{charList.length > 0 && <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table" >
        <TableHead>
          <TableRow>
            <StyledTableCell align="right">Name</StyledTableCell>
            <StyledTableCell align="right">Birth Year</StyledTableCell>
            <StyledTableCell align="right">Gender </StyledTableCell>
            <StyledTableCell align="right">Mass&nbsp;(kg)</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {charList.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.birth_year}</StyledTableCell>
              <StyledTableCell align="right">{row.gender}</StyledTableCell>
              <StyledTableCell align="right">{row.mass}</StyledTableCell>
            </StyledTableRow>
          ))} 
        </TableBody>
      </Table>
    </TableContainer>}
    </Container>
  )
}


