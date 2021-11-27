import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonRow,
} from "@ionic/react";
import React from "react";

const CalCard: React.FC<{
  name: any;
  surname: any;
  complexName: any;
  packageName: any;
  price: any;
  startTime: any;
  endTime: any;
}> = (props) => {
  return (
    <>
      <IonRow>
        <IonCol>
          <IonCard color="secondary">
            <IonCardHeader>
              <IonCardTitle>
                {props.name + " " + props.surname}
              </IonCardTitle>
              <IonCardSubtitle>{props.complexName}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <IonRow>Package: {props.packageName}</IonRow>
              <IonRow> Price: R {props.price}</IonRow>
              <IonRow>Start Time: {props.startTime}</IonRow>
              <IonRow>EndTime: {props.endTime}</IonRow>
            </IonCardContent>
          </IonCard>
        </IonCol>
      </IonRow>
    </>
  );
};

export default CalCard;