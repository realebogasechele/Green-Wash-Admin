import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
  useIonViewWillEnter,
} from "@ionic/react";
import React, { useState } from "react";
import { useParams } from "react-router";
import MultiForm from "../../components/MultiForm/MultiForm";
import InputControls from "../../components/InputControls/InputControls";
import Connection from "../../mixins/Connection";

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

const CardDetails: React.FC = () => {

  const [selectedSegment, setSelectedSegment] = useState<"Update" | "Delete">("Update");
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [showLoader, setShowLoader] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { name, id ,type, back } = useParams<{
    name: string;
    id: string;
    type: "agent" | "complex" | "package" | "promotion";
    back: string;
  }>();

  const selectedSegmentHandler = (selectedValue: "Update" | "Delete") => {
    setSelectedSegment(selectedValue);
    if (selectedValue == "Delete") {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  };

  const url = "/page/";

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton
              defaultHref={url.concat(back).concat("/").concat(type)}
            />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <InputControls
          selectedValue={selectedSegment}
          onSelectedValue={selectedSegmentHandler}
        />
        <>
        {<MultiForm
          buttonName={selectedSegment}
          type={type}
          isDisabled={isDisabled}
          id={id}
        />}
        </>
      </IonContent>
    </IonPage>
  );
};

export default CardDetails;
