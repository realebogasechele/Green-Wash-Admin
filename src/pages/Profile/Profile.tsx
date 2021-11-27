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
import InputControls from "../../components/InputControls/InputControls";

const Profile: React.FC = () => {
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
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [selectedSegment, setSelectedSegment] = useState<"Update" | "Delete">("Update");
  const selectedSegmentHandler = (selectedValue: "Update" | "Delete") => {
    setSelectedSegment(selectedValue);
    if (selectedValue == "Delete") {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent >
      <InputControls selectedValue={selectedSegment} onSelectedValue={selectedSegmentHandler}/>
        <AdminForm buttonName={selectedSegment} content={admin} isDisabled={isDisabled}/>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
