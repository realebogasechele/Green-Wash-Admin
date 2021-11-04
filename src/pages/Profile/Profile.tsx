import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import React, { useState } from "react";
import AdminForm from "../../components/Forms/AdminForm";

const Profile: React.FC = () => {

  useIonViewWillEnter(()=>{
  })

  interface Admin{
    adminId: string;
    name: string;
    surname: string;
    cellNum: string;
    password: string;
  }

  const admin: Admin =
  {
    adminId: "",
    name:"",
    surname:"",
    cellNum:"",
    password:"",
  }
  const [showLoader, setShowLoader] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/dashboard"/>
          </IonButtons>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent >
        <AdminForm buttonName="Update" content={admin}/>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
