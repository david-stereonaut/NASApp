import { Route, Redirect } from "react-router-dom";
import Home from "./Home";
import Search from "./Search";
import './Container.css'
import Favourites from "./Favourites";
import MediaCard from "./MediaCard";


export default function Container(props) {

  return (
    <div id="container">
      <Route exact path="/">
        <Redirect to="/home" />
      </Route> 
      <Route exact path="/home" render={() => <Home snackbar={props.snackbar}/>}/>
      <Route exact path="/search" render={() => <Search snackbar={props.snackbar}/>}/>
      <Route exact path="/favourites" render={() => <Favourites snackbar={props.snackbar}/>}/>
      <Route exact path="/favourites/:id" render={({ match }) => <MediaCard showDescription={true} snackbar={props.snackbar}/>}/>
    </div>
  )
}