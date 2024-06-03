import {
  IonItem,
  IonLabel,
  IonNote
  } from '@ionic/react';

import { useState,setState,useEffect } from 'react';
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

import './MessageListItem.css';
import axios from 'axios';

interface MessageListItemProps {
  message: Message;
}

const auth = getAuth();

const MessageListItem: React.FC<MessageListItemProps> = ({ message }) => {

	const [showCont, setShowCont] = useState('hidden');
const [status, setStatus] = useState('пользователь');

	useEffect(() => {

onAuthStateChanged(auth, (user) => {
   if (user) {

	  axios.get("http://localhost:3000/getstatus?user=" + user.email).then(response => { 

		  console.log(response);

		  if (response.data[0].status=="администратор")
		  {
			  setStatus("администратор");
			  setShowCont('block');
		  }

		//alert(status + " / " +user.email);

	
	
			
	})
		.catch(error => {console.log ("Error sending POST request", error)});



      } 
  });

 }, []);




  return (
    <IonItem /*routerLink={`/review/${message.id}`} */ detail={false}>
  	
      <IonLabel className="ion-text-wrap" style={{marginLeft: '30px'}}>
        <h2>
          {message.fromName}
          <span className="date">
            <IonNote><span className={showCont}><a href={`/Addgood/?edit=${message.id}`}>редактировать</a>&nbsp;&nbsp;<a href={`/home/?dm=${message.id}`}>удалить</a></span></IonNote>
          </span>
        </h2>
        <b>{message.names}</b>
        <p> 
		  

	{message.descr} <a href={`/review/${message.id}`} style={{textDecoration: 'none'}}>&rarr;</a>
        </p>
      </IonLabel>
    </IonItem>
  );
};

export default MessageListItem;

