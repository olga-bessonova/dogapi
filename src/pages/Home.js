import React, {useEffect, useState} from 'react'


export default function Home() {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    const fetchDogs = async() => {
      try{
        const response = await fetch("https://api.thedogapi.com/v1/breeds")
        const data = await response.json()
        console.log(response)
        console.log(data)
        setDogs(data)
      }
      catch(error){
        console.error(error)
      }
    }
    fetchDogs()
  },[])
  return (
    <div>Home</div>
  )
}
