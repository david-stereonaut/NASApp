import { AppBar, Toolbar } from "@material-ui/core";
import './NavBar.scss'
import NavBarLink from "./NavBarLink";


export default function NavBar() {
  const links = ['home', 'search', 'favourites']
  return (
    <AppBar position="fixed">
      <Toolbar>
        {links.map(l => <NavBarLink key={l} link={l}/>)}
      </Toolbar>
    </AppBar>
  )
}