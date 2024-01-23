// https://dog.ceo/dog-api/documentation/breed
import React, {useEffect, useState} from 'react'


export default function Home() {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const response = await fetch("https://dog.ceo/api/breeds/list/all");
        const data = await response.json();
        const dogNames = Object.keys(data.message);

        // Fetch all dog images concurrently
        const imagesPromises = dogNames.map(async (dog) => {
          const response = await fetch(`https://dog.ceo/api/breed/${dog}/images`);
          const imageData = await response.json();
          return { dog, image: imageData.message[0] };
        });

        const images = await Promise.all(imagesPromises);

        // Create an object with dog names, breeds, and images
        const dogsWithImages = {};
        images.forEach(({ dog, image }) => {
          dogsWithImages[dog] = { breeds: data.message[dog], image };
        });

        setDogs(dogsWithImages);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDogs();
  }, []);
  return (
    <>

      <form>
        <input
          type='text'
          name='search'
          placeholder='Search for a dog'
        />
      </form>

      <div>
        {dogs ? (<>{Object.keys(dogs).length} DOGS</> ) : (<>LOADING...</>)}
      </div>

      <ul className="list-disc pl-4">
        {Object.keys(dogs).map((dog) => (
          <li key={dog}>
            {dog}
            {dogs[dog]?.image && (
              <img
                src={dogs[dog].image}
                alt="Image"
                className="ml-2 h-8 w-8 rounded-full"
              />
            )}
            <ul className="list-disc pl-4">
              {dogs[dog]?.breeds.map((breed,index) => (
                <li  className="ml-4" key={index}>{breed}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>


    </>
  )
}
