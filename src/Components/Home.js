import axios from "axios";
import { useEffect, useState } from "react";
import MediaCard from "./MediaCard";
const API_KEY = process.env.REACT_APP_NASA_API_KEY || process.env.NASA_API_KEY

export default function Home(props) {

  const [data, setData] = useState({})
    
  const fetchData = async function() {
    const apiData = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`)
    setData(apiData.data)
  }
    
  useEffect(() => { 
    fetchData()
  }, [])

  const [saved, setSaved] = useState({})

  const fetchSaved = async function() {
    const savedFavs = await axios.get(`http://localhost:3001/saved`)
    setSaved(savedFavs.data)
  }
    
  useEffect(() => {
    fetchSaved()
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
    <div id="home">
      <MediaCard data={data} dbId={saved[data.date]} showDescription={true} save={save} remove={remove}/>
    </div>
  )
}