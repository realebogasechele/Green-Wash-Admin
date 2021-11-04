import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import React, { ReactComponentElement } from "react";

const Card: React.FC<{type: "agent" | "complex" | "package" | "promotion", id: string, title: any, subtitle: any, reference: string}> = (props) => {
    const url = "/cardDetails/";
  return (
    <IonCard color="secondary" button={true} href={url.concat(props.title,"/",props.id,"/",props.type,"/",props.reference)}>
      <IonCardHeader>
        <IonCardTitle>{props.title}</IonCardTitle>
        <IonCardSubtitle>{props.subtitle}</IonCardSubtitle>
      </IonCardHeader>
    </IonCard>
  );
};

export default Card;
