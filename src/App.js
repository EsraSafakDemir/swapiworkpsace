import ReactDOM from 'react-dom';
import React, { useEffect, useState } from 'react';
import './style.css';
import 'simplebar-react/dist/simplebar.min.css';
import Navbar from './components/Navbar'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import Home from './components/Home';
import Films from './components/Films';

function App() {
   const [ films,setFilms] = useState([]);
   const [ people,setPeople] = useState([]);
   const  [loading,setLoading] = useState(true); 


  useEffect(() => {
    async function fetchFilms() { 
      const results = await fetch("https://swapi.dev/api/films/?format=json");
      const data = await results.json();
      setFilms(data.results)
        console.log(data.results,"ess");
    } 
    async function fetchPeople() { 
      const results = await fetch("https://swapi.dev/api/people/?format=json");
      const data = await results.json();
      setPeople(data.results)
        console.log(data.results,"ess");
    } 
    fetchFilms();
    fetchPeople();
  } ,[]);
  console.log(films,"films") 
  console.log(people,"people")  

  return (
    <>
    <Router>
     <Navbar/>
     <Container>
       <Routes>
         <Route exact path='/' element={<Home />} ></Route>

         <Route exact path='/films'  element={<Films value ={films} />} ></Route>
       </Routes>
     </Container>
      </Router></>
  );
}

export default App;