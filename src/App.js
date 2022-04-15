import './App.css';
import WebFont from 'webfontloader';
import { useEffect, useState } from 'react';
import Transac from './Transac'
import placeholder from './assets/placeholder.jpg'
import { Button, Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '25%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '2%'
};

const link = 'https://clgcard.herokuapp.com/'

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Satisfy']
      }
    });
  }, []);

  const [addopen, setAddOpen] = React.useState(false);
  const handleAddOpen = () => setAddOpen(true);
  const handleAddClose = () => setAddOpen(false);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [showup, setShowup] = useState(false);
  const [loading, setLoading] = useState(true);

  const [loggedin, setLoggedin] = useState(false);
  const [meta, setMeta] = useState("Go on, fill up the credentials")


  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const [recents, setRecents] = useState([]);

  const [rollno, setRollno] = useState('');
  const [mobileno, setMobileno] = useState('');

  const addstudent = async () => {
    await axios.post(link + 'payments/addstudent', {
      rollno: rollno,
      mobileno: mobileno
    }).then((res) => {
      console.log(res);
      handleAddClose();
      setRollno('');
      setMobileno('');
    });
  }

  const checkadmin = async () => {
    console.log(userid);
    console.log(password);
    const result = await axios.post(link + 'payments/checkadmin', {
      userid: userid,
      password: password
    })

    console.log(result);
    if (result.data == "Get in") {
      setLoggedin(true);
      setMeta("Go on, fill up the credentials")
    }
    else {
      setMeta("Wrong userid or password");
    }
  }

  const [eventtotal, setEventtotal] = useState(0);
  const [bustotal, setBustotal] = useState(0);
  const [libtotal, setLibtotal] = useState(0);
  const [storestotal, setStorestotal] = useState(0);
  const [canteentotal, setCanteentotal] = useState(0);
  const [roll, setRoll] = useState(0);
  const [event, setEvent] = useState(0);
  const [bus, setBus] = useState(0);
  const [lib, setLib] = useState(0);
  const [stores, setStores] = useState(0);
  const [canteen, setCanteen] = useState(0);
  const [refresh, setRefresh] = useState(0);

  const [search, setSearch] = useState('');
  const doSearch = async () => {
    setRefresh(1);
    setRefresh(0);

    setShowup(true);
    console.log("doing search...")

    await axios.post(link + 'payments/userdetails ', { rollno: search }).then((details) => {
      setRoll(details.data.rollno);
      setBus(details.data.bus);
      setStores(details.data.stores);
      setCanteen(details.data.canteen);
      setLib(details.data.lib);
      setEvent(details.data.event);
      setLoading(false)
    }).catch((e) => {
      console.log(e);
      setShowup(false);
    })
  }



  useEffect(() => {
    const fetchrecents = async () => {
      let results = await axios.post(link + 'payments/allhistory');
      setRecents(results.data.reverse());
      results.data.map((item) => {
        if (item.to == "Bus") {
          setBustotal(bustotal + item.amount);
        }
        else if (item.to == "Stores") {
          setStorestotal(storestotal + item.amount);
        }
        else if (item.to == "Canteen") {
          setCanteentotal(canteentotal + item.amount);
        }
        else if (item.to == "Library") {
          setLibtotal(libtotal + item.amount);
        }
        else if (item.to == "Event") {
          setEventtotal(eventtotal + item.amount);
        }
      })
    };
    fetchrecents();
  }, []);

  const clearCredit = async () => {
    await axios.patch(link + 'payments/clearcredit', {
      rollno: roll
    }).then((e) => {
      setBus(0);
      setLib(0);
      setCanteen(0);
      setStores(0);
      setEvent(0);
      handleClose();
    })
  }


  if (!loggedin) {
    return (
      <>
        <div className='app'>
          < div style={{ fontFamily: 'sans-serif', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }
          }>
            <h1 className='heading'>
              ClgCard
            </h1>
          </div >

          <h1 style={{ textAlign: 'center', fontFamily: 'sans-serif', color: 'white' }}>Login To Countinue</h1>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ borderRadius: '0.6em', backgroundColor: 'white', fontFamily: 'sans-serif', height: '30vh', width: '20%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1%', }}>
              <TextField id="outlined-basic" label="User Id" variant="outlined" sx={{ height: '100%', width: '80%', marginTop: '1%' }} onChange={(e) => { setUserid(e.target.value) }} />
              <TextField id="outlined-basic" label="Password" type="password" variant="outlined" sx={{ height: '100%', width: '80%', marginTop: '1%' }} onChange={(e) => { setPassword(e.target.value) }} />
              <Button variant='contained' sx={{ height: '30%', width: '30%', backgroundColor: '#548CFF' }} onClick={checkadmin}>Login</Button>

            </div>

          </div>
          <h5 style={{ textAlign: 'center', fontSize: '120%', fontFamily: 'sans-serif', color: 'white' }}>{meta}</h5>
        </div>
      </>
    )

  }
  else {
    return (
      <div className='app'>
        < div style={{ fontFamily: 'sans-serif', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }
        }>
          <h1 className='heading'>
            ClgCard
          </h1>
          <Stack sx={{ marginLeft: '75%' }}>
            <h2 className='logout' onClick={() => { setLoggedin(false); setMeta("Go on, fill up the credentials"); }}>LogOut</h2>
            <h2 className='addstudent' onClick={() => { setAddOpen(true); }}>Add A Student</h2>
          </Stack>
          <div>
            <Modal
              open={addopen}
              onClose={handleAddClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>

                <div style={{ height: '80%', width: '100%', textAlign: 'center', }}>
                  <div style={{ borderRadius: '0.6em', backgroundColor: 'white', fontFamily: 'sans-serif', height: '30vh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                    <TextField id="outlined-basic" label="Roll Number" variant="outlined" sx={{ height: '100%', width: '90%', marginTop: '1%', }} onChange={(e) => { setRollno(e.target.value) }} />
                    <TextField id="outlined-basic" label="Mobile Number" variant="outlined" sx={{ height: '100%', width: '90%', marginTop: '1%' }} onChange={(e) => { setMobileno(e.target.value) }} />
                    <Button variant='contained' sx={{ height: '30%', width: '30%', backgroundColor: '#548CFF' }} onClick={addstudent}>Add</Button>

                  </div>
                </div>

              </Box>
            </Modal>
          </div>
        </div >
        <div className='fullwrap'>
          <div className='wrapper'>
            <div className='search'>
              <h1 style={{ marginLeft: '0.5em', fontFamily: 'sans-serif' }}>Recent Transactions..</h1>
            </div>

            <div className='recents'>
              {
                recents.map((item) => {
                  return <Transac Date={item.date.slice(0, 10)} From={item.rollno} To={item.to} Amount={item.amount} />
                })
              }
            </div>
            <div className='footer'>
              <h3 style={{ fontFamily: 'sans-serif', marginTop: 0, marginLeft: 10, marginBottom: 8 }}>Total amount of credit</h3>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', fontFamily: 'sans-serif' }}>
                <div style={{ fontSize: 'medium', fontWeight: 'bold', padding: 10, backgroundColor: 'chartreuse', borderRadius: '0.6em', fontFamily: 'sans-serif' }}>Bus {bustotal}</div>
                <div style={{ fontSize: 'medium', fontWeight: 'bold', padding: 10, backgroundColor: 'chartreuse', borderRadius: '0.6em', fontFamily: 'sans-serif' }}>Library {libtotal}</div>
                <div style={{ fontSize: 'medium', fontWeight: 'bold', padding: 10, backgroundColor: 'chartreuse', borderRadius: '0.6em', fontFamily: 'sans-serif' }}>Stores {storestotal}</div>
                <div style={{ fontSize: 'medium', fontWeight: 'bold', padding: 10, backgroundColor: 'chartreuse', borderRadius: '0.6em', fontFamily: 'sans-serif' }}>Canteen {canteentotal}</div>
                <div style={{ fontSize: 'medium', fontWeight: 'bold', padding: 10, backgroundColor: 'chartreuse', borderRadius: '0.6em', fontFamily: 'sans-serif' }}>Events {eventtotal}</div>
              </div>
            </div>
          </div>
          <div className='wrapper'>
            <div className='search2'>
              <h1 style={{ marginLeft: '0.5em', fontFamily: 'sans-serif', color: 'white' }}>Clear Credit</h1>
            </div>

            <div className='stats'>
              <div className='transac2'>
                <TextField id="outlined-basic" label="Roll Number" variant="outlined" sx={{ height: '80%', width: '75%', marginTop: '2%' }} onChange={(e) => { setSearch(e.target.value); }} />
                <Button variant='contained' sx={{ height: '55%', width: '20%', marginTop: '2%', backgroundColor: '#548CFF' }} onClick={doSearch}>Search</Button>
              </div>
              {!showup ?
                <>
                  <img src={placeholder} style={{
                    marginTop: '6%', marginLeft: '10%', height: '60%', width: '80%'
                  }} />
                  <h3 style={{ marginLeft: '25%', fontFamily: 'sans-serif', marginTop: 0, color: 'darkslategrey', opacity: '80%' }}>Search for the Roll number to clear the Credit</h3>
                </>
                :
                (loading ?
                  < div style={{ marginTop: '22%' }} >
                    <div className='loader' />
                    <h2 style={{ marginTop: '4%', color: 'darkslategrey', textAlign: 'center', fontFamily: 'sans-serif', opacity: '80%' }}>Loading</h2>
                  </div>
                  :
                  (<div className='result'>
                    <h5 style={{ marginTop: '4%', fontSize: '120%', marginLeft: '4%', fontFamily: 'sans-serif' }}>Roll Number</h5>
                    <h2 style={{ marginTop: '-2%', fontSize: '200%', marginLeft: '4%', fontFamily: 'sans-serif', fontWeight: 'bolder' }}>{roll}</h2>
                    <div className='transac3'>
                      <Stack spacing={-1} sx={{ width: '20%' }}>
                        <div style={{ color: '#F0F5F9', marginTop: 10, marginBottom: 20, fontSize: '180%', fontFamily: 'sans-serif' }}>
                          Bus
                        </div>
                        <h4 style={{ textAlign: 'center', color: '#F3F3F3', marginBottom: 10, fontSize: '150%', fontFamily: 'sans-serif' }}>{bus}</h4>
                      </Stack>
                      <Stack spacing={-1} sx={{ width: '20%' }} >
                        <div style={{ color: '#F0F5F9', marginTop: 10, marginBottom: 20, fontSize: '180%', fontFamily: 'sans-serif' }}>
                          Library
                        </div>
                        <h4 style={{ textAlign: 'center', color: '#F3F3F3', marginBottom: 10, fontSize: '150%', fontFamily: 'sans-serif' }}>{lib}</h4>
                      </Stack>
                      <Stack spacing={-1} sx={{ width: '20%' }}>
                        <div style={{ color: '#F0F5F9', marginTop: 10, marginBottom: 20, fontSize: '180%', fontFamily: 'sans-serif' }}>
                          Stores
                        </div>
                        <h4 style={{ textAlign: 'center', color: '#F3F3F3', marginBottom: 10, fontSize: '150%', fontFamily: 'sans-serif' }}>{stores}</h4>
                      </Stack>
                      <Stack spacing={-1} sx={{ width: '20%' }}>
                        <div style={{ color: '#F0F5F9', marginTop: 10, marginBottom: 20, fontSize: '180%', fontFamily: 'sans-serif' }}>
                          Canteen
                        </div>
                        <h4 style={{
                          color: '#F3F3F3',
                          textAlign: 'center',
                          marginBottom: 10, fontSize: '150%', fontFamily: 'sans-serif'
                        }}>{canteen}</h4>
                      </Stack>
                      <Stack spacing={-1} sx={{ width: '20%' }}>
                        <div style={{ color: '#F0F5F9', marginTop: 10, marginBottom: 20, fontSize: '180%', fontFamily: 'sans-serif' }}>
                          Events
                        </div>
                        <h4 style={{
                          color: '#F3F3F3',
                          textAlign: 'center',
                          marginBottom: 10, fontSize: '150%', fontFamily: 'sans-serif'
                        }}>{event}</h4>
                      </Stack>
                    </div>
                    <Stack direction={'row'} sx={{ marginTop: '-5%', justifyContent: 'flex-end', alignItems: 'center' }}>
                      <h3 style={{ marginRight: '5%', fontFamily: 'sans-serif', fontSize: '180%' }}>Total: {' ' + (bus + lib + canteen + event + stores)}</h3>
                      <Button variant='contained' onClick={handleOpen} sx={{ fontWeight: 'bloder', fontSize: '100%', marginRight: '5%', height: '80%', width: '30%', backgroundColor: '#548CFF' }}>Clear Credit</Button>
                    </Stack>
                  </div>
                  )

                )

              }
            </div>
          </div>
        </div>


        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Are you sure??
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                By clicking yes, all the credit will be cleared for this account.
              </Typography>
              <div style={{ textAlign: 'center' }}>
                <Button variant='contained' onClick={clearCredit} sx={{ fontSize: '150%', marginRight: '5%', height: '80%', width: '30%', backgroundColor: 'chartreuse' }} >Yes</Button>
              </div>
            </Box>
          </Modal>
        </div>

      </div >
    );
  }
}

export default App;


/*
  const createpost = async (e) => {
    console.log(e.target.files)
    var medias = [];
    var types = [];
    const data = new FormData();
    data.append("text", "add via React");
    for (var i = 0; i < e.target.files.length; i++) {
      console.log("inside loop " + e.target.files[i].type);
      var temp;
      (e.target.files[i].type === 'video/mp4' ? temp = 'vid' : temp = 'img');
      types.push(temp)
      //lol multer dosen't take array of files it only takes json key with multiple values!!
      data.append('medias', e.target.files[i]);
    }
    data.append("types", types);
    await axios.post('http://localhost:6900/newpost', data).then(console.log("post created @ DB"))

    console.log("post created of type " + e.target.files[0].type);
    setUpdated(true);
  }
  
  */