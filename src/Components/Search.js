import axios from "axios";
import { useEffect, useState } from "react";
import MediaCard from "./MediaCard";
import SearchBar from "./SearchBar";

export default function Search(props) {

  const [searchResults, setSearchResults] = useState([])

  const search = async (value) => {
    let data = await axios.get(`https://images-api.nasa.gov/search?q=${value}`)
    setSearchResults(data.data.collection.items)
  }
  const [saved, setSaved] = useState({})

  const fetchSaved = async function() {
    const savedFavs = await axios.get(`http://localhost:3001/saved`)
    setSaved(savedFavs.data)
  }
  
  useEffect(() => {
    fetchSaved()
  }, [])

  const arrangeData = (obj) => {
    return {
      title: obj.data[0].title,
      url: obj.links ? obj.links[0].href : null,
      description: obj.data[0].description,
      media_type: obj.links ? obj.links[0].render : null,
      nasaId: obj.data[0].nasa_id
    }
  }

  const save = async toSave => {
    const newData = await axios.post(`http://localhost:3001/image`, toSave)
    props.snackbar('saved')
    setSaved(newData.data.saved)
  }

  const remove = async (id, nasaId) => {
    const newData = await axios.delete(`http://localhost:3001/image/${id}`,{data: { nasaId }})
    props.snackbar('removed')
    setSaved(newData.data.saved)
  }


  return (
    <div id="search">
      <SearchBar search={search} />
      <div id="results">
        {searchResults.length !== 0 && searchResults.map(s => <MediaCard key={s.data[0].nasa_id} dbId={saved[s.data[0].nasa_id]} data={arrangeData(s)} save={save} remove={remove} />)}
      </div>
    </div>
  )
}