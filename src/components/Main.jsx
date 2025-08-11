import { useState, useEffect, useMemo } from "react";


function Main() {
  const [politicians, setPoliticians] = useState([])
  const [search, setSearch] = useState("")

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

  const filteredPoliticians = useMemo(() => {
      return politicians.filter(politicians => {
      const isIncluded = politicians.name.toLowerCase().includes(search.toLowerCase())
      const isInDescr = politicians.biography.toLowerCase().includes(search.toLowerCase())
      return isIncluded || isInDescr
    })  
  }, [politicians, search])



  return (
    <section>
      <h1 className="mb-40">Ecco la lista dei politici</h1>
      <form className="mb-40" action="">
        <input 
        type="text" 
        name="" id="" 
        placeholder="Cerca per nome o biografia..."
        onChange={(e) => setSearch(e.target.value)}/>
        <button>Cerca</button>
      </form>
      <div className="card-box">
        <ul className="card-flex">
          {filteredPoliticians.map((curElem, index) => (
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