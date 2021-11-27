/** @jsxImportSource theme-ui */
import {
    IonAlert,
  IonButtons,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonLoading,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { informationCircle } from "ionicons/icons";
import React, { useState } from "react";
import ClientCard from "../../components/Card/ClientCard";
import Connection from "../../mixins/Connection";

const Clients: React.FC = () => {
    useIonViewWillEnter(()=>{
        getClients();
    })
    const getClients = () => {
        setShowLoader(true);
        let url = 'client/get/all';
        Connection.processGetRequest({}, url, (response: any) => mapResponse(response))
    };
    const mapResponse = (response: any) => {
        if(response.type === 'error'){
            setShowLoader(false);
            setMessage(response.data);
            setShowError(true);
        }else{
            setClients(response.data.data);
            setShowLoader(false);
        }
    };

    const [showLoader, setShowLoader] = useState(true);
    const [showError, setShowError] = useState(false);
    const [message, setMessage] = useState("");
    const [clients, setClients] = useState([
    {
      clientId: "",
      complexName: "Park Square",
      name: "Justin",
      surname: "Gabriel",
      cellNum: "",
      email: "",
      password: "",
      deviceId: "",
      otp: "",
    },
  ]);
  return (
    <IonPage>
        <IonAlert
          isOpen={showError}
          onDidDismiss={() => setShowError(false)}
          header={'Error'}
          subHeader={'Something went wrong.'}
          message={message}
          buttons={['OK']}
        />
        <IonLoading
            cssClass='my-custom-class'
            showBackdrop
            isOpen={showLoader}
            message={'Please wait...'}
          />
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Client Management</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          {clients[0].clientId !== "" && (
            <IonRow sx={styles.row}>
              <h2 sx={styles.heading.info}>
                <IonIcon icon={informationCircle} sx={styles.icon} />
                Click on a card if you would like to remove a client
              </h2>
            </IonRow>
          )}
          {clients[0].clientId !== "" &&
            clients.map((client) => (
              <ClientCard
                key={client.clientId}
                id={client.clientId}
                name={client.name}
                surname={client.surname}
                complexName={client.complexName}
              />
            ))}
          {clients[0].clientId === "" && (
            <h2 sx={styles.heading}>No Clients</h2>
          )}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Clients;

const styles = {
  row: {
      m: '3',
      mt: '0',
      mb: '0',
      p:'2',
      pt:'0',
      opacity: '0.6'
  },
  heading: {
    display: "flex",
    justifyContent: "center",
    color: "grey",
    mt: "40vh",
    opacity: "0.5",

    info: {
      display: "flex",
      justifyContent: "center",
      color: "grey",
      fontSize: "15px",
    },
  },
  icon: {
    pr: "1vh",
    pt: "2px",
    size: "30px",
  },
};
