import {
  IonItem,
  IonLabel,
  IonNote
  } from '@ionic/react';

import './MessageListItem.css';
import { useState,useEffect } from 'react';
import { useParams } from 'react-router';

import { initializeApp } from 'firebase/app';
import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCKhhnOXdBkD2udkP1hZiGrdjlCuSll5OA",
  authDomain: "nearmeeting-afc99.firebaseapp.com",
  databaseURL: "https://nearmeeting-afc99-default-rtdb.firebaseio.com",
  projectId: "nearmeeting-afc99",
  storageBucket: "nearmeeting-afc99.appspot.com",
  messagingSenderId: "819922553345",
  appId: "1:819922553345:web:42cb6c77c8281ede78ce00"
};

initializeApp(firebaseConfig);

import axios from 'axios';


interface OtziviListItemProps {
  otziv: Otziv;
}
const auth = getAuth();
const OtziviListItem: React.FC<OtziviListItemProps> = ({ otziv }) => {


	const params = useParams<{ id: string }>();

	//alert(params.id);
     const [user, setUser] = useState(null);
	 const [qId, setQId] = useState(null);
	 const [status, setStatus] = useState('пользователь');
	 const [delotz, setDelotz] = useState('hidden');
	 const [delotzu, setDelotzu] = useState('hidden');
	 const [usernamesInp, setUsernamesInp] = useState('');
	 const [otvidInp, setOtvidInp] = useState('');
	 const [str, setStr] = useState('');
	 const [re, setRe] = useState('');
	 const [otname, setOtname] = useState(otziv.usernames);



	 const [otv, setOtv] = useState('');

	 const handleUsernamesChange: React.FC = (e) => {
	   setUsernamesInp(e.target.value);
	   }
	 const handleOtvidChange: React.FC = (e) => {
	   setOtvidInp(e.target.value);
	   }

	 

	 const url = new URL(window.location.href);
	   const urlParams = new URLSearchParams(window.location.search);

	 if (url.searchParams.has('id')) {

        const id = urlParams.get('id');

		setQId(id);

	 }



	useEffect(() => {

		if (otziv.id!=otziv.otveti_id)
{
	setRe("re to: " + otname);
}


	 

 axios.get("http://localhost:3000/getotzname?mai=" + otziv.usernames).then(response => { 
		

		setOtname(response.data);
			
	})
		.catch(error => {console.log ("Error sending POST request", error)});




onAuthStateChanged(auth, (user) => {
   if (user) {

	   setUser(user.email);



	   setDelotzu('block');

	  axios.get("http://localhost:3000/getstatus?user=" + user.email).then(response => { 


		  if (response.data[0].status=="администратор")
		  {
			  setStatus("администратор");
			  setDelotz('block');
			 
		  }

		//alert(status + " / " +user.email);

	
	
			
	})
		.catch(error => {console.log ("Error sending POST request", error)});



      } 
  });

 }, []);


 


 const AddOtv: React.FC = (event) => {

 event.preventDefault();


if (event.target.otv.value!="")
	{
    

	axios.post("http://localhost:3000/addotv", {
            "otziv": event.target.otv.value,
			"otveti": event.target.otvmai.value,
			"otveti_id": event.target.otvid.value,
			"user": user,
			"tovar": params.id
        })
		.then(response => { 
				console.log ("POST request successful", response.data); 
				setStr("Ответ успешно добавлен!");
				//this.setState({shouldRedirect: true});
				
				
				})
		.catch(error => {console.log ("Error sending POST request", error)});
	
	

  


}else alert ("Поле обязательно!");
}


const openNav = () => {
    if (
 
      document.getElementById("main" + otziv.id)
    ) {
     
      document.getElementById("main" + otziv.id).style.display = "block";
    }
  };
const closeNav = () => {
    if (
 
      document.getElementById("main" + otziv.id)
    ) {
     
      document.getElementById("main" + otziv.id).style.display = "none";
    }
  };

const handleDelete= (event,i) =>   {

	console.log("ok");

	 event.preventDefault();


  axios.get("http://localhost:3000/delotz?dot=" + i).then(response => { 
		
		console.log(response);

		alert("ok");
		//window.location.href = "asdcac";
			
	})
		.catch(error => {console.log ("Error sending POST request", error)});
	
}






  return (


	
    <IonItem  detail={false}>
   
      <IonLabel className="ion-text-wrap">
       
        <h3 ><b>{re}</b> {otziv.otzivi} (<b>{otname})</b></h3>

		<p > 
			<a className={delotzu} onClick={openNav}   >ответить</a><a className={delotz} onClick={(e) => handleDelete(e, `${otziv.id}`)} >удалить</a>

		<form id={`main${otziv.id}`} style={{display: "none"}} onSubmit={AddOtv}><input type="hidden" name="otvmai" value={otziv.usernames} onChange={handleUsernamesChange}></input><input type="hidden" value={otziv.otveti_id} onChange={handleOtvidChange} name="otvid"></input><textarea cols="40" rows="5" name="otv"></textarea><br /><input type="submit" value="Ответить" />&nbsp;<input type="button" onClick={closeNav} value="Закрыть" /></form>

        </p>

       
	

		

	{str}
	{otv}


      </IonLabel>
    </IonItem>
  );
};

export default OtziviListItem;
