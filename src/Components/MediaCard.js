import { Card, CardMedia, CardContent, Typography, CardActions, Button, CardActionArea } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import './MediaCard.scss'


export default function MediaCard(props) {

  const [apiData, setApiData] = useState({})
  const [saved, setSaved] = useState({})

  let { id } = useParams()
  useEffect(() => {

    const fetchFav = async function() {
      if (id) {
        let fav = await axios.get(`http://localhost:3001/images/${id}`)
        setApiData(fav.data.data)
        setSaved(fav.data.saved)
      }
    }
    fetchFav()
  }, [id])
  
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

  let data = props.data || apiData
  let dbId = props.dbId || (apiData ? saved[apiData.nasaId] : null)
  let saveFunc = props.save || save
  let removeFunc = props.remove || remove
  return (
    data ? 
    <Card>
      <CardActionArea>
      <Link to={`/favourites/${dbId}`} onClick={(event) => !props.favs && event.preventDefault() }>
        <CardMedia
          component={data.media_type === 'image' ? 'img' : 'iframe'}
          alt={data.title}
          src={data.url}
          title={data.title}
        /> 
        <CardContent>
          <Typography variant="h5">{data.title}</Typography>
          {props.showDescription && <Typography variant="body2"  color="textSecondary">{data.description || data.explanation}</Typography>}
        </CardContent>
        </Link>
      </CardActionArea>
      <CardActions>
        {dbId ?
          <Button onClick={() => removeFunc(dbId, (data.nasaId || data.date))} size="small">Remove</Button> :
          <Button onClick={() => saveFunc({
            title: data.title,
            description: data.description || data.explanation,
            url: data.url,
            nasaId: data.nasaId || data.date,
            media_type: data.media_type
          })} size="small">Save</Button>
        }
      </CardActions>
    </Card> :
    <Typography>Can't find image in favourites</Typography>
  )       
}