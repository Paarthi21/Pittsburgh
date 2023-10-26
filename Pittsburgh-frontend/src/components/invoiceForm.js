/***********************Import section****************************/
import React from "react";
import { styled } from '@mui/material/styles';
import { useState } from "react";
import SplitPane, { Pane } from "react-split-pane";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { parse } from 'date-fns';
import './invoiceFormStyles.css';
import 'split-pane-react/esm/themes/default.css'
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import { Navigate, redirect } from "react-router-dom";
import {useNavigate} from "react-router-dom"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button, CardActionArea, CardActions, Tooltip } from '@mui/material';
import Paper from '@mui/material/Paper';
import axios, * as others from "axios";
import URI from "../utils/request";
import Grid from "@mui/material/Grid";
import TextField from '@mui/material/TextField';
import sampleimg from '../images/modern.png'
import { useEffect } from "react";
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import PublishRoundedIcon from '@mui/icons-material/PublishRounded';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import LinearProgress from '@mui/material/LinearProgress';
import CancelIcon from '@mui/icons-material/Cancel';
import AddIcon from '@mui/icons-material/Add';
import SellIcon from '@mui/icons-material/Sell';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import { type } from "jquery";
import PublishIcon from '@mui/icons-material/Publish';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import companyLogo from "../images/Company_logo.png"

/***********************InvoiceForm component using function approach****************************/
export default function InvoiceForm(props){
  
  /***********************____Defining let,const,state & var____****************************/
  console.log(props.responsedata)
  /* Used to navigate through react component */
  const navigate = useNavigate();
  /* States used in this component */
  const [index,setIndex] = useState(0);
  const [tableData, setTableData] = useState(()=>props.responsedata);
  const [image, setImage] = useState(() => props.images);
  const [companyName,setcompanyName]=useState([])
  const [fromAddress,setFromAddress]=useState([])
  const [toAddress,setToAddress]=useState([])
  const [invoiceNo,setInvoiceNo]=useState([])
  const [phoneNo,setPhoneNo]=useState([])
  const [des,setDes]=useState([])
  const [category,setCategory]=useState([])
  const [date, setDate] = useState(null);
  const [display,setDisplay]=useState(false)
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [editedDes,setEditedDes]=useState([]);
  const [editedAmount,setEditedAmount]=useState([]);
  const [loading, setLoading] = useState(false);
  const [totalreq, setTotalreq] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [total,setTotal]=useState()
  const [isChanged,setIsChanged]=useState(false)
  const [discount,setDiscount]=useState([])
  const [openEditCard,setOpenEditCard]=useState(false)
  const [height, setHeight] = useState(150);
  const [openClosed, setOpenClosed]= useState(true)
  const [openBack,setOpenBack]=useState(false)
  const [price,setPrice]=useState([])
  const [editIndex,setEditIndex]=useState()
  const [tempDes,setTempDes]=useState()
  const [tempAmount,setTempAmount]=useState()
  const [openAdd,setOpenAdd]=useState(false)
  const [addedTaxTotal,setAddedTaxTotal]=useState(false)
  const [tax,setTax]=useState()
  
  const [firstName,setFirstName]=useState([])
  const [lastName,setLastName]=useState([])
  const [address,setAddress]=useState([])
  const [ZIPcode,setZIPCode]=useState([])  

  let img =props.responsedata[index].pdf_image
  let userGivendes , userGivenAmount;
  let bill_of_materials=props.responsedata[index]
  let i=0;
  
  /* This is used to define the date if we click submit */
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  today = mm + "/" + dd + "/" + yyyy;
 
  /************************************____Functions____******************************************/

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleNo= async () =>{
    setOpen(false)
    setOpenBack(false)
  }

   

  const handleYes = async () =>{
    setLoading(true);
    setOpen(false)
    for (var i = 0; i < props.responsedata.length; i++) {

      const formData1 = new FormData();
      formData1.append("filename", props.images[i].name);
      formData1.append("data", JSON.stringify(props.responsedata[i]));
      formData1.append("id", "dl/0" + Math.floor(totalreq + 1).toString());
      formData1.append("name", localStorage.getItem("name"));
      formData1.append("uid", localStorage.getItem("uid"));
      formData1.append("role", localStorage.getItem("role"));
      formData1.append("submitted", today);
      formData1.append("dept", localStorage.getItem("dept"));
      formData1.append("status", "waiting");
      formData1.append("token", localStorage.getItem("token"));
      if (localStorage.getItem("role") == "Associate Practice Lead") {
        formData1.append("l1", "yes");
        formData1.append("l2", "no");
      }
      if (localStorage.getItem("role") == "Employee") {
        formData1.append("l1", "no");
        formData1.append("l2", "no");
      }
      if (localStorage.getItem("role") == "Practice Lead") {
        formData1.append("l2", "yes");
        formData1.append("l1", "yes");
      }
      formData1.append("l3", "no");
      let res;
      let res1;
      const formData2 = new FormData();
      formData2.append("token", localStorage.getItem("token"));
      formData2.append("total", totalreq + 1);
      try {
        res = await axios.post(URI + "request", formData1);
        res1 = await axios.post(URI + "addtotalreq", formData2);
      } catch (error) {
        window.alert("Server Error");
      }
    }

    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
    }, 3000);



  }; 
  
  

 

 

  const handleClose = async () => {
    setOpen(false)
  };

  const handleExpand =()=>{
    if(openClosed==true){
      setHeight(550)
      setOpenClosed(!openClosed)
    }
    else{
      setHeight(170)
      setOpenClosed(!openClosed)
    }
      
  }

  function onDocumentLoadSuccess({numPages}){
    setNumPages(numPages);
    setPageNumber(1);
  }

  useEffect(()=>{
    setDisplay(true)
  })

  function incIndex(){
    setIndex(index+1)
   
  }

  function decIndex(){
    setIndex(index-1)
   
  }

  function backButton(){
   setOpenBack(true)
  }

  const handleRowClick=(x)=>{
    setEditIndex(x)
    setOpenEditCard(true)
    setTempDes(editedDes)
    setTempAmount(editedAmount)
   
}

  function closeEdit(){
    setOpenEditCard(false)
    setEditedDes(tempDes);
    setEditedAmount(tempAmount);
   }

  function closeTaxTotal(){
    setAddedTaxTotal(false)
  }
  function saveEdit(){
    setIsChanged(true)
    setOpenEditCard(false)
  }
   
  function openAddItem(){
    setOpenAdd(true)
  }
   
  function addItem(){
    setOpenAdd(false)
    const DesData=[...editedDes,userGivendes]
    const AmountData=[...editedAmount,userGivenAmount]
    setEditedDes(DesData)   
    setEditedAmount(AmountData)
   }

  function closeAddItems(){
    setOpenAdd(false)
   }

  function deleteRow(){

      let deletedDes=[...editedDes]
      deletedDes.splice(editIndex,1)
      setEditedDes(deletedDes)

      let deletedAmount=[...editedAmount]
      deletedAmount.splice(editIndex,1)
      setEditedAmount(deletedAmount)

      setOpenEditCard(false)
   }

  function editTaxTotal(){
      setAddedTaxTotal(true)
   }

  const handleAddDeacriptionChange=(event)=>{
      userGivendes=event.target.value
   }

  const handleAddAmountChange=(event)=>{
      
      userGivenAmount=parseFloat(event.target.value)
     
  }

  const handleDescriptionChange = (event) => {
    const updatedArray = [...editedDes]; 
    updatedArray[editIndex] = event.target.value; 
    setEditedDes(updatedArray);
  }

  const handleAmountChange = (event) => {
    const updatedArray = [...editedAmount]; 
    updatedArray[editIndex] = parseFloat(event.target.value); 
    setEditedAmount(updatedArray);
  }

  const handleTaxChange=(event)=>{
    const updatedValue = event.target.value;
    setTax(updatedValue);
  }

  const handleTotalChange=(event)=>{
    const updatedValue = event.target.value;
    setTotal(updatedValue);
  

  }


  
 
 
  

  

 


  

  

   /* This `useEffect()` is executed only when there is changes on tableDta here all the initial values are assigned through state variable*/
   useEffect(()=>{
    
    if (tableData && tableData.length > 0) {
      setFirstName((prevFirstName) => prevFirstName.concat(tableData.map((item) => item.first_name)))
      setLastName((prevLastName) => prevLastName.concat(tableData.map((item) => item.last_name)))
      setAddress((prevAddress) => prevAddress.concat(tableData.map((item) => item.address)))
    }  
   }, [tableData])
   


   
   /************************************____Return statement____******************************************/

    return(
        /************ main div **************/
        <Box sx={{width:"100%"}}>
          <div className="main-div"> 

          {/* 
            1)To make this code responsive for both large and small screens we divided view for both large screen and small screen respectively.
            2)Through @media the respective views are rendered (refer invoiceFormStyle.js).
            3) <div> of large-screen is rendered when px >= 1160 and <div> of small-screen is rendered when px < 1160
          */}

             {/* Rendered if the screen is large */}
          <div className="large-screen">
            
            {/* Loading bar */}
            <div className="loader">
              {loading===true? (<Box sx={{ width: '100%' }}> <LinearProgress /></Box>):(<> </>)}
            </div>

            {/* In order to make the split screen view , SplitPane library is used */}
            <SplitPane split="vertical" minSize={700} maxSize={900} defaultSize={900} >
                <Pane className="form-img">
                
                  <Grid container>
                   {/* back button */}
                   
                    <Grid item xs={1} sm={1} >
                      <div className="sidenav">
                        <IconButton onClick={backButton}
                           size="large"
                           edge="start"
                           color="primary"
                           variant="contained"
                           aria-label="menu"
                           sx={{ ml: 4, bgcolor:'whitesmoke', mt:4}}>
                           <ArrowBackTwoToneIcon />
                        </IconButton>
                      </div>
                    </Grid>

                    {/* image of invoice */}
                    <Grid item xs={12} sm={11} >
                      {/* 
                          1)For almost all feilds `key={"okayg_" + (10000 + Math.random() * (1000000 - 10000))` is used.
                          2)Because if state changes the values are not updated in some fields.
                          3)To solve this, some key with random math function is given, so that is components are re-rendered
                            and so the fields are updated when next file is selected.
                          4)Never remove `key={"okayg_" + (10000 + Math.random() * (1000000 - 10000))` from the code
                      */}
                    
                    <div className="image-shower"  key={"okayg_" + (10000 + Math.random() * (1000000 - 10000))}> 
                      <Box 
                        sx={{
                          display: 'flex',
                          paddingTop: '200px',
                          flexWrap: 'wrap',
                          justifyContent:"center",
                        '& > :not(style)': {
                                m: 1,
                                width: "595px",
                                height: "380px",
                              },
                          
                            }}>
                        
                        {/* invoice image */}
                        <div>
                          <img
                           src={img}
                           alt=""
                           style={{ width: '100%', height: '100%' }} /> 
                        </div>
                        
                        {/* Navigation to next file */}
                        <div className="fileNav-btn">

                          <Button sx={{ marginRight: '5px' }} onClick={decIndex}  disabled={index==0?true:false}>
                            <IconButton 
                              size="small"
                              sx={{color:'Black'}}>
                            <KeyboardArrowLeftRoundedIcon /> 
                            </IconButton>Previous file
                          </Button>
                        
                        <Button sx={{ marginLeft: '290px' }} disabled={index===tableData.length-1 ? true: false} onClick={incIndex}>Next file
                          <IconButton 
                            size="small"
                            sx={{color:'Black'}}>
                          <KeyboardArrowRightRoundedIcon />
                          </IconButton>
                        </Button>
                        </div>
                     
                      </Box>
                      </div>
                  </Grid>
                  
                </Grid>
                
                </Pane> 


                {/* Results shown here */}
                 <Pane className="results">
                 
                 <Grid item xs={12} sm={12}>
                    {/* Displaying name of the file */}
                    <div className="results">
                    <div className="top-logo">
                      <div className="center-image">
                        <img
                        src={companyLogo}
                        alt="logo"
                        style={{ width: '160px', height: '60px' }}/>
                      </div>
                    </div>
                      <hr></hr>
                    
                    {/* Displaying postal card data */}
                    <div className="postalCardData">
                       
                       <div className="headingForPostalCardData">
                        <h2 >Postal card data</h2>
                       </div> 
                      {display?<>
                        <div className="PostalCard">
                          <Card sx={{ minWidth: 400 }}>

                            <CardContent>
                              <Grid>
                                <Grid container spacing={2}>
                                  <Grid item xs={12}>
                                  <div className="fileName">
                                    <h5>{image[index].name}</h5>
                                  </div>
                                  </Grid>
                                  <Grid item xs={6}>
                                  <TextField 
                                    key={"okayg_" + (10000 + Math.random() * (1000000 - 10000))}
                                    defaultValue={firstName[index]}
                                    id="firstName" 
                                    label="First name" 
                                    variant="outlined"
                                    autoFocus
                                    fullWidth
                                    margin="dense"
                                    type="text"
                                    color="primary" focused/>
                                  </Grid>
                                  <Grid item xs={6}>
                                  <TextField
                                    key={"okayg_" + (10000 + Math.random() * (1000000 - 10000))} 
                                    defaultValue={lastName[index]}
                                    id="lastName" 
                                    label="Last name" 
                                    variant="outlined"
                                    autoFocus
                                    fullWidth
                                    margin="dense"
                                    type="text"
                                    color="primary" focused/>
                                  </Grid>
                                  <Grid item xs={8}>
                                  <TextField 
                                    key={"okayg_" + (10000 + Math.random() * (1000000 - 10000))}
                                    defaultValue={address[index].slice(0, -1).join(', ')}
                                    id="address" 
                                    label="Address" 
                                    variant="outlined"                                 
                                    autoFocus
                                    multiline
                                    fullWidth
                                    margin="dense"
                                    type="text"
                                    color="primary" focused/>
                                  </Grid>
                                  <Grid item xs={4}>
                                  <TextField 
                                    key={"okayg_" + (10000 + Math.random() * (1000000 - 10000))}
                                    defaultValue={address[index][address[index].length-1]}
                                    id="pincode" 
                                    label="ZIP code" 
                                    variant="outlined"                                  
                                    autoFocus
                                    multiline
                                    fullWidth
                                    margin="dense"
                                    type="text"
                                    color="primary" focused/>
                                  </Grid>
                                  <Grid item xs={12}>
                                  <TextField 
                                    key={"okayg_" + (10000 + Math.random() * (1000000 - 10000))}
                                    defaultValue={address[index].slice(0, -1).join(', ')}
                                    id="description" 
                                    label="Description" 
                                    variant="outlined"                                    
                                    autoFocus
                                    multiline
                                    fullWidth
                                    margin="dense"
                                    type="text"
                                    color="primary" focused/>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </CardContent>

                            <CardActions sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                              <div className="postalSubmit">
                                <Button variant="contained" color="primary"  onClick={handleClickOpen}>
                                  Submit
                                  <IconButton 
                                    size="small"
                                    edge="start"
                                    color="primary"
                                    variant="contained"
                                    aria-label="menu"
                                    sx={{ ml:2, bgcolor:'whitesmoke'}}>
                                    <PublishRoundedIcon />
                                  </IconButton>
                                </Button>
                              </div>
                             
                            </CardActions>
                          </Card>
                          <div className="submit-btn">
                        
                          <Dialog
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                        <DialogTitle id="alert-dialog-title">
                            {"Are you sure that you want to submit the post card?"}
                        </DialogTitle>
                        <DialogActions>
                           <Button onClick={handleNo}>NO</Button>
                           <Button onClick={handleYes} autoFocus>
                               YES
                          </Button>
                        </DialogActions>
                        </Dialog> 

                        <Dialog
                          open={openBack}
                          onClose={handleClose}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                        <DialogTitle id="alert-dialog-title">
                            {"Are you sure that you want to go back?"}
                        </DialogTitle>
                        <DialogActions>
                           <Button onClick={handleNo}>NO</Button>
                           <Button onClick={()=> props.updateParentState()} autoFocus>
                               YES
                          </Button>
                        </DialogActions>
                        </Dialog>  
                        </div>
                        </div></>:<></>}
                            
                    </div>

                    </div></Grid>
                 </Pane>
                 </SplitPane>




          </div>


            {/* Rendered if the screen is small */} 
          <div className="small-screen">

            
            <Grid container spacing={2}>    
                {/* Images are shown here */}
              <Grid item xs={12} sm={12}>
                <Grid item container={true} xs={12}>
                    {/* side images from the invoice */}
                   



                    {/* main image of invoice */}
                    <Grid item xs={12} sm={12} >
                      <div className="img-show"  key={"okayg_" + (10000 + Math.random() * (1000000 - 10000))}>
                      <IconButton onClick={backButton}
                           size="large"
                           edge="start"
                           color="primary"
                           variant="contained"
                           aria-label="menu"
                           
                            sx={{ ml: 4, bgcolor:'whitesmoke', mt:4}}>
                        <ArrowBackTwoToneIcon />
                        </IconButton>
                    
                      <Box
                        
                         sx={{
          
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent:"center",
                          '& > :not(style)': {
                                  m: 1,
                                  width: "595px",
                                  height: "742px",
                                },
                              }}>
                        <Paper elevation={3} >
                       

                           <img
                           key={"okayg_" + (10000 + Math.random() * (1000000 - 10000))}
                           src={img}
                           alt=""
                           style={{ width: '100%', height: '100%' }} />
                           
                        </Paper><br></br>
                        <div className="fileNav-btn">
                     
                        <Button sx={{ marginRight: '5px' }}
                        onClick={decIndex}  disabled={index==0?true:false}>
                        <IconButton 
                            size="small"
                            sx={{color:'Black'}}>
                        <KeyboardArrowLeftRoundedIcon /></IconButton>Previous file
                        </Button>
                        
                        
                        <Button sx={{ marginLeft: '290px' }} disabled={index===tableData.length-1 ? true: false}
                            onClick={incIndex}
                        >Next file
                          <IconButton 
                            size="small"
                            sx={{color:'Black'}}>
                        <KeyboardArrowRightRoundedIcon /></IconButton>
                        </Button>
                      </div>
                     
                      </Box>
                      
                      </div>
                    </Grid>
                  </Grid>
              </Grid>
                
                {/* Results are shown here */}

              <Grid item xs={12} sm={12}>
                

                    {/* Post card info */}
                      
                    <Grid item xs={12} sm={12}>
                    {/* Displaying name of the file */}
                    <div className="results">
                    <div className="top-logo">
                      <div className="center-image">
                        <img
                        src={companyLogo}
                        alt="logo"
                        style={{ width: '160px', height: '60px' }}/>
                      </div>
                    </div>
                      <hr></hr>
                    
                    {/* Displaying postal card data */}
                    <div className="postalCardData">
                       
                       <div className="headingForPostalCardData">
                        <h2 >Postal card data</h2>
                       </div> 
                      {display?<>
                        <div className="PostalCard">
                          <Card sx={{ minWidth: 400 }}>

                            <CardContent>
                              <Grid>
                                <Grid container spacing={2}>
                                  <Grid item xs={12}>
                                  <div className="fileName">
                                    <h5>{image[index].name}</h5>
                                  </div>
                                  </Grid>
                                  <Grid item xs={6}>
                                  <TextField 
                                    defaultValue={firstName[index]}
                                    key={"okayg_" + (10000 + Math.random() * (1000000 - 10000))}
                                    id="firstName" 
                                    label="First name" 
                                    variant="outlined"
                                    maxRows={3}
                                    autoFocus
                                    fullWidth
                                    margin="dense"
                                    type="text"
                                    color="primary" focused
                                   />
                                  </Grid>
                                  <Grid item xs={6}>
                                  <TextField 
                                    defaultValue={lastName[index]}
                                    key={"okayg_" + (10000 + Math.random() * (1000000 - 10000))}
                                    id="lastName" 
                                    label="Last name" 
                                    variant="outlined"
                                    maxRows={3}
                                    autoFocus
                                    fullWidth
                                    margin="dense"
                                    type="text"
                                    color="primary" focused
                                    />
                                  </Grid>
                                  <Grid item xs={8}>
                                  <TextField 
                                    key={"okayg_" + (10000 + Math.random() * (1000000 - 10000))}
                                    defaultValue={address[index].slice(0, -1).join(', ')}
                                    id="address" 
                                    label="Address" 
                                    variant="outlined"
                                    maxRows={3}
                                    autoFocus
                                    multiline
                                    fullWidth
                                    margin="dense"
                                    type="text"
                                    color="primary" focused
                                    />
                                  </Grid>
                                  <Grid item xs={4}>
                                  <TextField 
                                    key={"okayg_" + (10000 + Math.random() * (1000000 - 10000))}
                                    defaultValue={address[index][address[index].length-1]}
                                    id="pincode" 
                                    label="ZIP code" 
                                    variant="outlined"
                                    maxRows={3}
                                    autoFocus
                                    multiline
                                    fullWidth
                                    margin="dense"
                                    type="text"
                                    color="primary" focused
                                    />
                                  </Grid>
                                </Grid>
                              </Grid>
                            </CardContent>

                            <CardActions sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                              <div className="postalSubmit">
                                <Button variant="contained" color="primary"  onClick={handleClickOpen}>
                                  Submit
                                  <IconButton 
                                    size="small"
                                    edge="start"
                                    color="primary"
                                    variant="contained"
                                    aria-label="menu"
                                    sx={{ ml:2, bgcolor:'whitesmoke'}}>
                                    <PublishRoundedIcon />
                                  </IconButton>
                                </Button>
                              </div>
                             
                            </CardActions>
                          </Card>
                        </div></>:<></>}
                            
                    </div>

                    </div></Grid>
                 
                      
                       
                       
                 

                     
                     
                 
              </Grid>
            </Grid>

          </div>

        
          </div>
        </Box>);
}
