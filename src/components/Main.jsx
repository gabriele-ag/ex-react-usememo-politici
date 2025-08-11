import { useState, useEffect, useMemo, memo } from "react";

const Card = memo(({name, biography, image, position, index}) => {
  console.log('Rendered PoliticianCard:', name)
  return (
    <>
            <li>
              <div className="card-politicians">
                <h3>{name}</h3>
                <img src={image} alt="politician-image" />
                <h4>{position}</h4>
                <p>{biography}</p>
              </div>
            </li>       
    </>
  )
}) 


const Main = () => {
  const [politicians, setPoliticians] = useState([])
  const [position, setPosition] = useState("")
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
      const isInPosition = position === "" || politicians.position === position
      return (isIncluded || isInDescr) && isInPosition
    })  
  }, [politicians, search, position])


  const politicianPosition = useMemo(() => {
    const allPosition = politicians.map(curPosition => curPosition.position)
    const uniquePosition = allPosition.filter((p, index, arr) => {
      return arr.indexOf(p) === index
    })
    return uniquePosition
  }, [politicians])



  return (
    <section>
      <h1 className="mb-40">Ecco la lista dei politici</h1>
      <form className="mb-40" onSubmit={(e) => e.preventDefault()}>
        <input 
        type="text" 
        name="" id="" 
        placeholder="Cerca per nome o biografia..."
        onChange={(e) => setSearch(e.target.value)}/>
        <select onChange={(e) => setPosition(e.target.value)} value={position}>
          <option value="">Tutte le posizioni</option>
          {politicianPosition.map((pos, i) => (
          <option key={i} value={pos}>{pos}</option>
        ))}
         </select>
        <button>Cerca</button>
      </form>
      <div className="card-box">
        <ul className="card-flex">
          {filteredPoliticians.map((curElem, index) => (
            <Card
            key={index}
            name={curElem.name}
            biography={curElem.biography}
            image={curElem.image}
            position={curElem.position}/>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Main;