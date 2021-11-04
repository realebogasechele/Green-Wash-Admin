import React, { useState } from "react";
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import MultiForm from "../../components/MultiForm/MultiForm";
import { useParams } from "react-router";
interface Pack {
  packageId: string;
  promotionId: string;
  packageName: string;
  minutes: number;
  standardPrice: string;
  suvPrice: string;
  description: string;
  onPromotion: boolean;
}

interface Promotion {
  promotionId: string;
  promotionName: string;
  packageName: string;
  standardPrice: string;
  suvPrice: string;
  isEnabled: boolean;
}
interface Complex {
  complexId: string;
  complexName: string;
  street1: string;
  street2: string;
  city: string;
  province: string;
  postalCode: string;
  telephoneNum: string;
  startTime: Date;
  endTime: Date;
  cellNum: string;
  units: string[];
  agents: string[];
}
interface Agent {
  agentId: string;
  complexName: string;
  contractId: string;
  name: string;
  surname: string;
  id: string;
  cellNum: string;
  street1: string;
  street2: string;
  city: string;
  province: string;
  postalCode: string;
  password: string;
}

const agent: Agent =
  {
    agentId: "",
    complexName: "",
    contractId: "",
    name: "",
    surname: "",
    id: "",
    cellNum: "",
    street1: "",
    street2: "",
    city: "",
    province: "",
    postalCode: "",
    password: "",
  }

const complex: Complex =
  {
    complexId: "",
    complexName: "",
    street1: "",
    street2: "",
    city: "",
    province: "",
    postalCode: "",
    telephoneNum: "",
    startTime: new Date,
    endTime: new Date,
    cellNum: "",
    units: ["Default"],
    agents: [""],
  }
const pack: Pack = {
    packageId: "",
    promotionId: "",
    packageName: "",
    minutes: 0,
    standardPrice: "",
    suvPrice: "",
    description: "",
    onPromotion: false,
  }
const promotion: Promotion =
  {
    promotionId: "",
    promotionName: "",
    packageName: "",
    standardPrice: "",
    suvPrice: "",
    isEnabled: false,
  }

const AddAgent: React.FC = () => {
  const {name, title} = useParams<{name: string, title: "agent" | "complex" | "package" | "promotion" }>();
  const backUrl = "/page/";
  let content;
  if (title === "agent"){
    content = agent;
  }
  else if (title === "complex"){
    content = complex;
  }
  else if (title === "package"){
    content = agent;
  }else{
    content = promotion
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref={backUrl.concat(name).concat("/").concat(title)} />
          </IonButtons>
          <IonTitle>Add {name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <MultiForm buttonName="Add" type={title} isDisabled={false} content={content}/>
      </IonContent>
    </IonPage>
  );
};

export default AddAgent;
