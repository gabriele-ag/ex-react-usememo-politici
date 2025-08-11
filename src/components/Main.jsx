import { useState, useEffect } from "react";


function Main() {
  const [politicians, setPoliticians] = useState([])

  const fetchJson = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    return data
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const json = await fetchJson('http://localhost:3333/politicians');
        console.log('Dati ricevuti dalla API:', json)
        setPoliticians(json);
      } catch (error) {
        console.error("Errore nel fetch:", error);
      }
    };

    getData();
  }, []);



  return (
    <section>
      <div className="card-box">
        <ul className="card-flex">
          {politicians.map((curElem, index) => (
            <li key={index}>
              <div className="card-politicians">
                <h3>{curElem.name}</h3>
                <img src={curElem.image} alt="politician-image" />
                <h4>{curElem.position}</h4>
                <p>{curElem.biography}</p>
              </div>
            </li>       
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Main;