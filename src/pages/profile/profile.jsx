import { TextField } from "@material-ui/core";
import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./profile.css";
import {useState , useEffect} from 'react'
import axios from 'axios'
import React from 'react'
import { useParams } from 'react-router'

const createAxios = axios.create({
  baseURL: `http://localhost:4000/api/v1` 
}) ;

export default function User() {

  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState([]);

  const [Succcess, setSuccess] = useState("");
  const [userName, setUserName] = useState("");
  const [Email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setlocation] = useState("");
  const [description, setDescription] = useState("");
  const [image , setImage] = React.useState("") ;
  const [file ,setfile] = useState() ;
  const [filename ,setfileName] = useState() ;

  const {id} = useParams() ;


  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };

  function useDisplayImage() {
    const [result, setResult] = React.useState("");
    let imageFile = null ;
    function uploader(e) {
      imageFile = e.target.files[0];
      setfile(e.target.files[0])
      setfileName(e.target.files[0].name) ;
      const reader = new FileReader();
      reader.addEventListener("load", (e) => {
        setResult(e.target.result);
      });

      reader.readAsDataURL(imageFile);
    }

    return { result, uploader };
  }

  const { result, uploader } = useDisplayImage();


  useEffect(() => {
    const fetchPrivateDate = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
         // Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      try {
        //console.log(localStorage.getItem('id')) ;
        const { data } = await createAxios.get( `/orgs/${id}` , config);
       // console.log(data) ;
        setPrivateData(data.data.org);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    };
    console.log(privateData)
    fetchPrivateDate();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault() ;
    try{ 
      
      const { data } = await createAxios.patch( `/orgs/${localStorage.getItem('id')}`  , 
    { 
      "name": userName ,
      "description": description ,
      "email": Email ,
      "phoneNum": phone

     }, config );
     setSuccess("SuccessFully Added");
     setTimeout(() => {
      setSuccess("")
     }, 5000);
   
    } catch(error) {
      console.log(error) ;
      console.log('Failed') ;
    }
   
  }
  const imagePath = `http://localhost:4000/` + privateData.imagePath ;
  return (
    <div className="user">
      {Succcess && <span className="success-message">{Succcess}</span>}
      <div className="userTitleContainer">
        <h1 className="userTitle">Inspect</h1>
        <div>
        <button class="button1">Approve</button>
        <button class="button2">Reject</button>
        </div>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={imagePath}
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{privateData.name}</span>
              <span className="userShowUserTitle">{privateData.description}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{privateData.slug}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">10.12.1999</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{privateData.phoneNum}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{privateData.email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">Bahir Dar | Ethiopia</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">our Legal Paper</span>
         <div>
           <img src={`http://localhost:4000/${privateData.imagePath}`} alt="" className="userUpdateImg" />
         </div>
        </div>
      </div>
    </div>
  );
}
