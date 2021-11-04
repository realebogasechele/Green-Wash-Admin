import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import AdminForm from "../../components/Forms/AdminForm";

const SignUp: React.FC = () => {
  interface Admin{
    adminId: string;
    name: string;
    surname: string;
    cellNum: string;
    password: string;
  }
  const admin: Admin =(
  {
    adminId: "",
    name:"",
    surname:"",
    cellNum:"",
    password:"",
  }
  );
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Sign Up</IonTitle>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/signIn"/>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <AdminForm buttonName="Sign Up" content={admin}/>
      </IonContent>
    </IonPage>
  );
};

export default SignUp;
