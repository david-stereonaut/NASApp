import { Link } from 'react-router-dom'

export default function NavBarLink(props) {

  return (
    <Link to={`/${props.link}`}>{props.link[0].toUpperCase() + props.link.slice(1)}</Link>
  )
}