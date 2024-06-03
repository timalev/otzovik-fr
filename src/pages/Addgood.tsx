import { useState,useEffect } from 'react';

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


import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import './Addgood.css';
import axios from 'axios';





const Addgood: React.FC = () => {

   const url = new URL(window.location.href);

   const [user, setUser] = useState(null);
   const [descrValue, setDescrValue] = useState('');
   const [saveStr, setSaveStr] = useState('');
   const [updValue, setUpdValue] = useState('');
   const [nameValue, setNameValue] = useState('');
   const [image, setImage] = useState(null);
   const [bran, setBrd] = useState([]);
   const [selBrd, setSelBrd] = useState('');
   const [showCont, setShowCont] = useState('hidden');
   const [showMess, setShowMess] = useState('block');
  
   
const handleBrdChange = (e) => {
	setSelBrd(e.target.value);
}
const handleUpdChange: React.FC = (e) => {
	setNameValue(e.target.value);
}
const handleInputChange: React.FC = (e) => {
	setNameValue(e.target.value);
}

const handleImageChange: React.FC = (e) => {
	setImage(e.target.files[0]);
}

   const handleDescrChange: React.FC = (e) => {
	   setDescrValue(e.target.value);
	   }
   const handleFormSubmit: React.FC = (e) => {


	e.preventDefault();

	if (selBrd!="")
	{
	
	
	const formData= new FormData();

	formData.append('image', image);
	formData.append('good', nameValue);
	formData.append('brand', selBrd);
	formData.append('descr', descrValue);
	formData.append('upd', updValue);
	formData.append('usr', user);

	 axios.post("http://localhost:3000/AddGoods", formData)
		.then(response => { 
				console.log ("POST request successful", response.data); 
                 
				  setSaveStr('Данные успешно сохранены!');
				

				//this.setState({shouldRedirect: true});
				
				})
		.catch(error => {
					 setSaveStr('Ошибка отправки');
					console.log ("Error sending POST request", error)
						
					
					});
	}else alert("Поле бренд обязаельно!");

}







   const auth = getAuth();




   useEffect(() => {

	   
         if (url.searchParams.has('edit')) {

	const queryString = window.location.search;
	    const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get('edit');


	    axios.get("http://localhost:3000/getdatabyid?id=" + id)
		.then(response => { 


			


			   setNameValue(response.data[0].names);
			   setDescrValue(response.data[0].descr);
			  setUpdValue(id);


			
				
				})
		.catch(error => {console.log ("Error sending POST request", error)});

   }



	 onAuthStateChanged(auth, (user) => {
   if (user) {
	   setShowCont("block");
       setShowMess("hidden");

	   setUser(user.email);
      } else window.location.href="/authorization";
  });

    
    
  fetch("http://localhost:3000/getbrands")
      .then((response) => response.json())
      .then((data) => setBrd(data));




	}, []);


   const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };


  return (
    <IonPage id="addgood-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Добавить товар</IonTitle>
        </IonToolbar>
      </IonHeader>



      <IonContent fullscreen >
  

<div style={{marginLeft:'20px'}} className={showMess}><br />Идет загрузка данных..</div>
    <div className={showCont}>
	

<br />
                <label style={{marginLeft:'20px'}}>
                 Карта сайта: <a href={`/home/`} >Главная</a> 
                </label>
       
 <form onSubmit={handleFormSubmit} style={{marginLeft:'20px'}}>
		  <label> <br /><font color="green">{saveStr}</font><br /><br />

<select value={selBrd} onChange={handleBrdChange}><option>Бренд</option>
	   {
	bran.map(m =>  (<option  key={m.id} value={m.id}>{m.brands}</option>) )
		
	}
	   </select>

	   
	  

&nbsp;&nbsp;&nbsp;<a href="/brands">Добавить бренд</a>
			  <br/><br/>
	
	  <input type="hidden"  value={updValue} onChange={handleUpdChange} size="5" />
	  Название товара:<br />

	  	  
	  <input type="text"  value={nameValue} onChange={handleInputChange} size="50" /></label>


		   <label> <br /><br />
		  Описание товара:<br />
		  <textarea  cols="55" rows="7" value={descrValue} onChange={handleDescrChange} />
	      </label>
 <label> <br /><br />
		  Добавить фото:<br />
		  

<input type="file" name="image" onChange={handleImageChange} />

	      </label>

		  <br /><br /><label>
          <button type="submit"  >Сохранить</button></label>


			 
		  

          </form>




</div>



      </IonContent>
    </IonPage>
  );
};

export default Addgood;
