import axios from "axios"
import { useEffect, useState } from "react"
import MediaCard from "./MediaCard"

export default function Favourites(props) {

  const [favs, setFavs] = useState([])
  const [saved, setSaved] = useState({})

  const fetchFavs = async function() {
    const apiFavs = await axios.get(`http://localhost:3001/images`)
    console.log(apiFavs.data)
    setFavs(apiFavs.data.data)
    setSaved(apiFavs.data.saved)
  }

  useEffect(() => {
    fetchFavs()
  }, [])
  
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
    <div id="favourites">
      {favs.length !== 0 && favs.map(f => <MediaCard key={f.title} data={f} dbId={saved[f.nasaId]} showDescription={false} favs={true} save={save} remove={remove}/>)}
    </div>
  )
}