import MessageListItem from '../components/MessageListItem';
import { useState,setState,useEffect } from 'react';
import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter
} from '@ionic/react';
import './Home.css';
import axios from 'axios';


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

const Home: React.FC = () => {

	const auth = getAuth();

  
  const [user, setUser] = useState(null);
  const [muzList, setMuzList] = useState([]);
  const [saveStr, setSaveStr] = useState('');
  const [messageSh, setMessageSh] = useState('block');
  const [bran, setBrd] = useState([]);
  const [cond, setCond] = useState(<a href="/Authorization">Авторизация</a>);
  const [addgood, setAddgood] = useState('');
  

  const [addt, setAddt] = useState('addn');
  const [status, setStatus] = useState('пользователь');


  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };
const url = new URL(window.location.href);
  useEffect(() => {



	  onAuthStateChanged(auth, (user) => {
   if (user) {

	   setUser(user.email);

      setCond(`Статус: пользователь`);


   //  alert(user.email);



	  axios.get("http://localhost:3000/getstatus?user=" + user.email).then(response => { 


		  if (response.data[0].status=="администратор")
		  {
			  setStatus("администратор");
			  setCond('');
			  setAddt('adds');
			  //setDelotz('block');
			 
		  }

		//alert(status + " / " +user.email);

	
	
			
	})
		.catch(error => {console.log ("Error sending POST request", error)});



      } 
  });





	  if (url.searchParams.has('dm')) {

	
	const urlParams = new URLSearchParams(window.location.search);
    const dm = urlParams.get('dm');

	axios.get("http://localhost:3000/delgood?dm=" + dm).then(response => { 
		setSaveStr('Товар удален!' );
			
	})
		.catch(error => {console.log ("Error sending POST request", error)});

   }

   if (url.searchParams.has('id')) {

	const queryString = window.location.search;
	    const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get('id');

			 fetch("http://localhost:3000/getallgoods?id=" + id)
      .then((response) => response.json())
      .then((data) => setMuzList(data));
		

			setMessageSh('hidden');

   }


  fetch("http://localhost:3000/getbrands")
      .then((response) => response.json())
      .then((data) => setBrd(data));


		}, []);

   

	

  return (

    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>

		 <ion-grid>
  <ion-row>
     <ion-col size="auto" >
 <IonTitle>Оптовик
 </IonTitle>
    </ion-col>
    <ion-col>

<form  ><input type="text"></input><input type="submit" value="Искать"></input></form>
			</ion-col>

	 <ion-col>
	 <div align="right" style={{width: "100%"}}>
<a href="/Addgood" className={addt}>Добавить товар</a>
	</div>
			</ion-col>

  <ion-col>
	 <div align="right" style={{width: "200px"}}>
	{cond}	
	</div>
			</ion-col>
  </ion-row>
</ion-grid>


        </IonToolbar>
		    
	</IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

     
	{saveStr}

	 <ion-grid>
  <ion-row>
     <ion-col size="auto" >
      <div align="left" style={{width: "150px", marginLeft: "10px"}}><br /><b>Бренды:</b><br/><br/>
	{
	 bran.map(m =>  (<div key={m.id}><a style={{color: "black", lineHeight: "23px"}} href={"/home/?id=" + m.id}>{m.brands}</a></div>) )
	}
	</div>
    </ion-col>
    <ion-col>



        <IonList  >
	<div className={messageSh} style={{height: '200px', marginLeft: '10px'}}>Выберете бренд</div>
          {muzList.map(m => <MessageListItem key={m.id} message={m} />)}
        </IonList>
			</ion-col>
 
  </ion-row>
</ion-grid>


      </IonContent>
    </IonPage>
  );
};

export default Home;
