import { IconButton, Snackbar } from '@material-ui/core';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import CloseIcon from '@material-ui/icons/Close';
import Container from './Components/Container';
import NavBar from './Components/NavBar';
import { useState } from 'react';

function App() {

  const [openSaved, setOpenSaved] = useState(false)
  const [openRemoved, setOpenRemoved] = useState(false)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenSaved(false)
    setOpenRemoved(false)
  }

  const handleSnackbar = which => {
    if (which === 'saved') {
      setOpenSaved(true)
    } else {
      setOpenRemoved(true)
    }
  }

  return (
    <Router>
    <div className="App">
      <NavBar />
      <Container snackbar={handleSnackbar}/>
      <Snackbar
        open={openSaved}
        autoHideDuration={4000}
        onClose={handleClose}
        message="Image Saved"
        action={
          <>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      />
      <Snackbar
        open={openRemoved}
        autoHideDuration={4000}
        onClose={handleClose}
        message="Image Removed"
        action={
          <>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      />
    </div>
    </Router>
  )
}

export default App;
