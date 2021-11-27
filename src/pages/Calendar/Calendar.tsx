/** @jsxImportSource theme-ui */
import { Storage } from "@capacitor/storage";
import {
  IonAlert,
  IonButtons,
  IonCol,
  IonContent,
  IonDatetime,
  IonGrid,
  IonHeader,
  IonItem,
  IonLabel,
  IonLoading,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import React, { useState } from "react";
import { useHistory } from "react-router";
import CalCard from "../../components/Card/CalCard";
import Connection from "../../mixins/Connection";

const Calendar: React.FC = () => {
  useIonViewWillEnter(() =>{
    setShowLoader(true);
    getBookings(time);
  })
  const history = useHistory();

  const getBookings = (time: any) => {
    setShowLoader(true);
    let url = 'booking/get/'.concat(time);
    Connection.processGetRequest({}, url, (response: any) => mapResponse(response))
  };

 const mapResponse = (response: any) => {
   if(response.type === 'error'){
     setShowLoader(false);
     setMessage(response.data);
     setShowError(true);
   }else{
     setBookings(response.data.data);
     setShowLoader(false)
   }
 }

  const [showLoader, setShowLoader] = useState(false);
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState("");

  const [time, setTime] = useState(new Date().toISOString());
  const [bookings, setBookings] = useState([
    {
      bookingId: "",
      clientName: "Test",
      clientSurname: "Test",
      complexName: "Test",
      packageName: "Test",
      price: "57",
      startTime: new Date().toDateString(),
      endTime: new Date().toDateString(),
    },
  ]);
  const updateTime = (currentTime: any) => {
    setTime(currentTime);
    getBookings(currentTime);
  };
  return (
    <IonPage>
      <IonLoading
            cssClass='my-custom-class'
            showBackdrop
            isOpen={showLoader}
            message={'Please wait...'}
          />
          <IonAlert
          isOpen={showError}
          onDidDismiss={() => setShowError(false)}
          header={'Error'}
          subHeader={'Something went wrong.'}
          message={message}
          buttons={['OK']}
        />
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Calendar</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel>Select a date</IonLabel>
                <IonDatetime
                  min="2021"
                  value={time}
                  onIonChange={(e) => updateTime(e.detail.value)}
                />
              </IonItem>
            </IonCol>
          </IonRow>
          {bookings.length !== 0 &&
            bookings.map((booking) => (
              <CalCard
                key={booking.bookingId}
                name={booking.clientName}
                surname={booking.clientSurname}
                complexName={booking.complexName}
                packageName={booking.packageName}
                price={booking.price}
                startTime={booking.startTime}
                endTime={booking.endTime}
              />
            ))}

          {bookings.length === 0 && (
            <IonRow sx={styles.row}>
              <IonCol>
                <h1 sx={styles.heading}>No Bookings </h1>
              </IonCol>
            </IonRow>
          )}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Calendar;

const styles = {
  heading: {
    display: "flex",
    justifyContent: "center",
    color: "grey",
  },
  row: {
    mt:'30vh',
    borderRadius: '8px',
    opacity: '0.5'
  },
};
