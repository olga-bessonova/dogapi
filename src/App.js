import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./pages/Home"
import SingleDog from "./pages/SingleDog"

function App() {
  const [dogs, setDogs] = useState([]);
  const url = "https://dog.ceo/api/breeds/list/all"
 
  useEffect(() => {
    fetch(url)
    .then(response => {
      if (!response.ok){
        throw new Error('No response')
      }
      return response.json()
    })
    .then((data) => {
      console.log(data)
      console.log(data.message)
      setDogs(data.message)
    })

  },[])
  const dogsArray = []
  
  for (const dog in dogs) {
        console.log(dog)
        if (dogs[dog].length > 0) {
          for (let i = 0; i < dogs[dog].length; i++){
            dogsArray.push(dog + ' ' + dogs[dog][i])
          }
        }
        else {

          dogsArray.push(dog)  
        }
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/:name" element={<SingleDog />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
