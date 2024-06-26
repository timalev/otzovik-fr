import { useState, useEffect } from 'react';
import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import OtziviListItem from '../components/OtziviListItem';
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
import './ViewMessage.css';




function ViewMessage() {

  const [user, setUser] = useState(null);
  const [post, setPost] = useState([]);
  const [otzi, setOtzi] = useState([]);
  const [muzTit, setMuzTit] = useState('');
  const [muzDesc, setMuzDesc] = useState('');
  const [muzPho, setMuzPho] = useState('');
  const [str, setStr] = useState('');
  const [qId, setQId] = useState(null);
  const [visTit, setVisTit] = useState('');
  const [visDesc, setVisDesc] = useState('');
  const [visPho, setVisPho] = useState('');
  const [img, setImg] = useState('src/data/noph.png');
  const [otstr, setOtstr] = useState('block');
  const [otfrm, setOtfrm] = useState('hidden');
  


  const params = useParams<{ id: string }>();
const auth = getAuth();




 useEffect(() => {

	 onAuthStateChanged(auth, (user) => {
   if (user) {
	   setUser(user.email);
	   setOtstr('hidden');
	   setOtfrm('block');
      } 
  });

// получаем информацию о товаре
	 axios.get("http://localhost:3000/getmuzeirec?id=" + params.id).then((response) => {
		 
		 setMuzTit(response.data[0].names);
	     setMuzDesc(response.data[0].descr);
	     //setMuzPho(response.data[0].photos);
		 if (response.data[0].photos!="")
		 {
			 setImg('http://localhost:3000/src/uploads/' + response.data[0].photos);
		 }

    });


// получаем отзывы о данном товаре

   fetch("http://localhost:3000/getotzivi?tovar="+params.id)
      .then((response) => response.json())
      .then((data) => setOtzi(data));
}, []);



  



     const url = new URL(window.location.href);

	 if (url.searchParams.has('id')) {


	    const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
		
		useEffect(() => {
			setQId(id);
		}, []);

	 }


const AddRev: React.FC = (event) => {

 event.preventDefault();


if (event.target.otz.value!="")
	{
    

	axios.post("http://localhost:3000/addotz", {
            "otziv": event.target.otz.value,
			"user": user,
			"tovar": params.id
        })
		.then(response => { 
				console.log ("POST request successful", response.data); 
				setStr("Отзыв успешно добавлен!");
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
            <IonBackButton text="Назад" defaultHref="/home"></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>




{(
			

			
              <IonItem>
              
              <IonLabel className="ion-text-wrap">

				<br/>
         
              

        <div className="ion-padding" align="center">
             
<table border="0">
			
			<tbody>
  <tr>
	<td style={{borderSpacing: '35px 35px'}}><img src={`${img}`} width="200px"  />  </td>
		<td>&nbsp;&nbsp;</td>
	<td  valign="top" > <h1>{muzTit}</h1>{muzDesc}</td>
  </tr>
		</tbody>
  </table>
  <br />
			<font color="green">{str}</font><br/>

			Оставить отзыв:
				<div className={otstr}>Оставлять отзывы могут только зарегестрированные пользователи</div>

 <form  onSubmit={AddRev}  className={otfrm}>

 <textarea cols="40" rows="5" name="otz"></textarea>
                <br />
	            
	     <input type="submit" value="Добавить" />
                </form>


<IonList>
          {otzi.map(m => <OtziviListItem key={m.id} otziv={m} />)}
        </IonList>

				
           
            </div>

              </IonLabel>
            </IonItem>


    
        )}


      

       
        



       
      
      </IonContent>
    </IonPage>
  );
}












export default ViewMessage;
