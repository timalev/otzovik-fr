import {
  IonItem,
  IonLabel,
  IonNote
  } from '@ionic/react';

import './BrandListItem.css';
import { useState,useEffect } from 'react';
import { useParams } from 'react-router';

interface BrandListItemProps {
  brand: Brand;
}

const BrandListItem: React.FC<BrandListItemProps> = ({ brand }) => {


	const params = useParams<{ id: string }>();

	//alert(params.id);

	 const [qId, setQId] = useState(null);

	 const url = new URL(window.location.href);

	 if (url.searchParams.has('id')) {

		 console.log('test');


	    const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');

		alert(id);

		setQId(id);
	 }

  return (
    <IonItem  detail={false}>
   
      <IonLabel className="ion-text-wrap">
        <h2>
          {brand.brands}
          <span className="date">
            <IonNote>&nbsp;&nbsp;&nbsp;<a href={`/brands/?db=${brand.id}`}>удалить</a></IonNote>
          </span>
        </h2>
     
  
      </IonLabel>
    </IonItem>
  );
};

export default BrandListItem;
