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
import './Authorization.css';


const SignOut: React.FC = () => {
    	 
const auth = getAuth();

   auth.signOut().then(function() {
    console.log('Signed Out');
    // navigate('/authorization');
	window.location.href = '/authorization';

    },
    function(error) {
    console.error('Sign Out Error', error);
  });
}


const SignIn: React.FC = (event) => {

 event.preventDefault();

// console.log(event.target.login.value)

   const auth = getAuth();


signInWithEmailAndPassword(auth, event.target.login.value, event.target.password.value)
  .then((userCredential) => {

    // Signed in
    const user = userCredential.user;

	 if (user) {
   
      console.log(user);
  }

   
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;


    //alert(errorMessage);
    console.log(errorMessage);
  });

}






const Authorization: React.FC = () => {

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
    <IonPage id="authorization-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Авторизация</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              Авторизация
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
              <form   onSubmit={SignIn} >
	       <br /><br />
           <label>
                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Логин:&nbsp;
                <input type="text" name="login" />
               </label><br /><br />
	              <label>
             &nbsp;&nbsp;Пароль:&nbsp;
                <input type="text" name="password" />
              </label><br /><br />
	               <label>
                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;<a href="/Registration" >Регистрация</a>
               </label><br /><br />&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; <input type="submit" value="Войти" />
                </form>
        )}








      </IonContent>
    </IonPage>
  );
};

export default Authorization;
