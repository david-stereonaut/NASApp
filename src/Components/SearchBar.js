import { InputAdornment, TextField } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search'
import { useState } from "react";

export default function SearchBar(props) {

  const [searchInput, setSearchInput] = useState('')
  
  const handleInputChange = ({ target }) => {
    setSearchInput(target.value)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      props.search(searchInput)
    }
  }

  return (
    <div id="search-bar">
      <TextField
        value={searchInput}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        label="Search"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon onClick={() => props.search(searchInput)}/>
            </InputAdornment>
          )
        }}
      />
    </div>
  )
}