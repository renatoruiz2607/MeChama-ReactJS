import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container,HistoriPurchases,Config, ItemPurchase, Photo } from './styles';


interface UserDataProps
  {
    "userinfo"?: {
      "imgPerfile": String,
      "name": String,
      "CPF": String,
      "number": String,
      "userName": String,
      "email": String
    },
    "purchaseHistory"?: [
      {
        "companyName": String,
        "productName": String,
        "productValue": String,
        "productDate": String,
        "productQuantity": Number
      },
    ],
    "mansageError"?: Boolean,
    "mansageConfirm"?: Boolean
  }
  interface ItemHistoryProps 
    {
      "companyName": String,
      "productName": String,
      "productValue": String,
      "productDate": String,
      "productQuantity": Number
    }
  


const ConfigUser: React.FC = () => {

  const [UserData, setUserData] = useState<UserDataProps>({});


  const DataLocalStorage = localStorage.getItem('tokenUserJWT');

  useEffect(() => {

  async function  callAPI(){

    await axios.get('http://tn-15mechama-com.umbler.net/userConfig',{
      headers: {
       tokenUserJWT : DataLocalStorage
      }
     }).then(response =>  setUserData(response.data));
  }
    callAPI();

  
  }, [DataLocalStorage]);

  return (
    <Container>

      <Config>
        <div className="Card">
        <label htmlFor="Photo">
        <Photo src={"http://tn-15mechama-com.umbler.net/images/"+UserData.userinfo?.imgPerfile}  alt=""/>
        </label>
        <input type="file"  name="Photo" id="Photo" accept="image/*"  />
        <h1>{UserData.userinfo?.name}</h1>
        <h1>{UserData.userinfo?.email}</h1>
        </div>



      </Config>
      <HistoriPurchases>{UserData.purchaseHistory?.map((item : ItemHistoryProps,i:any) => {

        return (<ItemPurchase key={i}>
          <h1 className="title">{item.companyName}</h1>
          <h2 className="nameProduct">{item.productName} {item.productQuantity}x</h2>
          <h3 className="value">R$ {item.productValue}</h3>
          <p className="Date">{item.productDate}</p>
        
        
        
        
        </ItemPurchase>)
        
      })}</HistoriPurchases>

    </Container>
  );
}

export default ConfigUser;