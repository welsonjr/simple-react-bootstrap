import React, { useState, useEffect } from "react";
// import $ from 'jquery';
// import Popper from 'popper.js';
// import 'bootstrap/dist/js/bootstrap.bundle.min';
import People from './components/People';
import './App.scss';

const fd = async (url) => {
  let res = await fetch(url);
  res = await res.json();
  return [res['results'],res['next']];
}

const App = () => {

  const [people, setPeople] = useState(null);

  useEffect(
    () => {
      const fetchData = async () => {
        try {
          let arr = [];
          let url = 'https://swapi.co/api/people';
          let [data,next] = await fd(url);
          arr.push(...data);

          while(next){
            [data,next] = await fd(next);
            arr.push(...data);
          }

          setPeople(arr);
        }catch (err){
          console.log(err);
        }; 
      }

      fetchData();
    },[]);


  return (
  <div className='container'>
    <ul>
      { 
        people ?
        people.map((v,i) => (<People key={i} data={v}></People>)) : 
        (
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )
      }
    </ul>
  </div>)
}


export default App;