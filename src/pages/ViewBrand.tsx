import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';

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

import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import BrandListItem from '../components/BrandListItem';
import axios from "axios";
import React from "react";



import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonList,
  IonIcon,
  IonItem,
  IonLabel,
  IonNote,
  IonPage,
  IonToolbar,
  useIonViewWillEnter,
} from '@ionic/react';
import { personCircle } from 'ionicons/icons';
import { useParams } from 'react-router';
import './ViewBrand.css';




function ViewBrand() {

  const [user, setUser] = useState(null);
  const [post, setPost] = useState([]);
  const [bran, setBrd] = useState([]);
  const [muzTit, setMuzTit] = useState('');
  const [muzDesc, setMuzDesc] = useState('');
  const [muzPho, setMuzPho] = useState('');
  const [str, setStr] = useState('');
  const [qId, setQId] = useState(null);
  const [visTit, setVisTit] = useState('');
  const [visDesc, setVisDesc] = useState('');
  const [visPho, setVisPho] = useState('');


  const params = useParams<{ id: string }>();
const auth = getAuth();




 useEffect(() => {

	 onAuthStateChanged(auth, (user) => {
   if (user) {
	   setUser(user.email);
      } else window.location.href="/authorization";
  });


// получаем бренды

   fetch("http://localhost:3000/getbrands")
      .then((response) => response.json())
      .then((data) => setBrd(data));
}, []);

//console.log(bran);

     const url = new URL(window.location.href);

	 if (url.searchParams.has('id')) {


	    const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
		
		useEffect(() => {
			setQId(id);
		}, []);

	 }

	if (url.searchParams.has('db')) {

	
	const urlParams = new URLSearchParams(window.location.search);
    const db = urlParams.get('db');

	useEffect(() => {
		
		

	axios.get("http://localhost:3000/delbrd?db=" + db).then(response => { 
		setStr('Бренд удален!');
			
	})
		.catch(error => {console.log ("Error sending POST request", error)});
	}, []);

   }


const AddBrd: React.FC = (event) => {

 event.preventDefault();


if (event.target.brd.value!="")
	{
    

	axios.post("http://localhost:3000/addbrd", {
            "brand": event.target.brd.value,
			"user": user

        })
		.then(response => { 
				console.log ("POST request successful", response.data); 

				setStr("Бренд успешно добавлен!");
				//this.setState({shouldRedirect: true});
				
				
				})
		.catch(error => {console.log ("Error sending POST request", error)});
	
	

  


}else alert ("Поле обязательно!");
}



  return (
    <IonPage id="view-message-page">
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="Назад" defaultHref="/AddGood"></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
{(
			

			
              <IonItem>
              
              <IonLabel className="ion-text-wrap">


        <div className="ion-padding" align="left">
              <h1>Бренды</h1>

	

 <form  onSubmit={AddBrd}  >
	   
        
<input type="text" name="brd" />


	            
	     <input type="submit" value="Добавить" />
                </form>

	<font color="green">{str}</font><br/>
<IonList>
          {bran.map(m => <BrandListItem key={m.id} brand={m} />)}
        </IonList>

				
           
            </div>

              </IonLabel>
            </IonItem>


    
        )}


      

       
        



       
      
      </IonContent>
    </IonPage>
  );
}












export default ViewBrand;
