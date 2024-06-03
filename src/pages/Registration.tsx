import { useState,useEffect } from 'react';

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
import './Registration.css';
import axios from 'axios';

const SignOut: React.FC = () => {
    	 
const auth = getAuth();

   auth.signOut().then(function() {
    console.log('Signed Out');
    // navigate('/authorization');
	window.location.href = '/registration';

    },
    function(error) {
    console.error('Sign Out Error', error);
  });
}


const printForm: React.FC = (event) => {

 event.preventDefault();

 //console.log(event.target.login.value + " / " + event.target.password.value + " / " + event.target.type.value);

const auth = getAuth();

if (event.target.password.value==event.target.password2.value)
	{

    createUserWithEmailAndPassword(auth, event.target.login.value, event.target.password.value)
  .then((userCredential) => {
    // Signed in

	
	
    const user = userCredential.user;

    const uid = user.email;


	axios.post("http://localhost:3000/adduser", {
            "email": event.target.login.value,
            "type": event.target.type.value,
			"usname": event.target.usname.value
        })
		.then(response => { 
				console.log ("POST request successful", response.data); 

				this.setState({shouldRedirect: true});
				
				
				})
		.catch(error => {console.log ("Error sending POST request", error)});
	


  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
   console.log(errorCode + ": " + errorMessage);

   alert(errorMessage);
  });


}else alert ("Пароли не совпадают!");
}




const Registration: React.FC = () => {

   const [user, setUser] = useState(null);

   const auth = getAuth();

   useEffect(() => {
		
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user.email);
				} 
		});

    
    

	}, []);

   const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  return (
    <IonPage id="registration-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Регистрация</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              Inbox
            </IonTitle>
          </IonToolbar>
        </IonHeader>

	



  {user ? (
          <>

	   <label>
	              <br /><br /><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Вы авторизованы!</div><br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button className="button button1" onClick={() =>  SignOut()}>
                Выход
              </button>
	           </label>

        
          </>
        ) : (
              <form  onSubmit={printForm} >
<br/><br/>
			  <table>
  <tr>
	<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Логин:</td>
	<td><input type="text" name="login" /><br/></td>
  </tr>
			  <tr>
	<td>&nbsp;</td>
	<td>&nbsp;</td>
  </tr>
  <tr>
	<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Пароль:</td>
	<td> <input type="password" name="password" /><br/></td>
  </tr>
			    <tr>
	<td>&nbsp;</td>
	<td>&nbsp;</td>
  </tr>
  <tr>
	<td>&nbsp;Повторите пароль:&nbsp;</td>
	<td><input type="password" name="password2" /><br/></td>
  </tr>
			    <tr>
	<td>&nbsp;</td>
	<td>&nbsp;</td>
  </tr>
			    <tr>
	<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Имя:</td>
	<td><input type="text" name="usname" /><br/></td>
  </tr>
			  			    <tr>
	<td>&nbsp;</td>
	<td>&nbsp;</td>
  </tr>
  <tr>
	<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Права:</td>
	<td><select name="type"   >
		     <option value="пользователь">Пользователь</option>
            <option value="администратор">Администратор</option>
            
    
          </select></td>
  </tr>

			  		    <tr>
	<td>&nbsp;</td>
	<td>&nbsp;</td>
  </tr>
  <tr>
	<td> </td>
	<td><input className="button button1" type="submit" value="Регистрация" /></td>
  </tr>


  </table>
</form>
        )}








      </IonContent>
    </IonPage>
  );
};

export default Registration;
