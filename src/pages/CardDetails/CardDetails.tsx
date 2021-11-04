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

var result : Agent| Complex | Pack | Promotion;
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

  useIonViewDidEnter(()=>{
    if(type==="agent"){
      getAgent();
    }else if(type==="complex"){
      getComplex();
    }else if(type==="package"){
      getPackage();
    }else{
      getPromotion();
    }
  })
  const [selectedSegment, setSelectedSegment] = useState<"Update" | "Delete">("Update");
  const [isDisabled, setIsDisabled] = useState<true | false>(false);
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
  
  let agent: Agent =
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

  let complex: Complex =
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
      units: [],
      agents: [],
    }
  let pack: Pack =
    {
      packageId: "",
      promotionId: "",
      packageName: "",
      minutes: 0,
      standardPrice: "",
      suvPrice: "",
      description: "",
      onPromotion: true,
    }
  let promotion: Promotion =
    {
      promotionId: "",
      promotionName: "",
      packageName: "",
      standardPrice: "",
      suvPrice: "",
      isEnabled: false,
    }

  const getAgent = () => {
    var url = "agent/get/".concat(id);
    Connection.processGetRequest({}, url, (response: any) => {
      mapAgent(response);
    });
  };
  const getComplex = () => {
    var url = "complex/get/".concat(id);
    Connection.processGetRequest({}, url, (response: any) => {
      mapComplex(response);
    });
  };
  const getPackage = () => {
    var url = "package/get/".concat(id);

    Connection.processGetRequest({}, url, (response: any) => {
      mapPackage(response);
    });
  };
  const getPromotion = () => {
    var url = "promotion/get/".concat(id);
    Connection.processGetRequest({}, url, (response: any) => {
      mapPromotion(response);
    });
  };

  const mapPackage = (response: any) => {
    if (response.type === "error") {
      setErrorMessage(response.data);
      setShowError(true);
    } else {
      pack = response.data.data;
      console.log(pack)
    }
  };
  const mapAgent = (response: any) => {
    if (response.type === "error") {
      setErrorMessage(response.data);
      setShowError(true);
    } else {
      agent = response.data.data
    }
  };

  const mapComplex = (response: any) => {
    if (response.type === "error") {
      setErrorMessage(response.data);
      setShowError(true);
    } else {
      complex = response.data.data;
      console.log(complex)
    }
  };
  const mapPromotion = (response: any) => {
    if (response.type === "error") {
      setErrorMessage(response.data);
      setShowError(true);
    } else {
      promotion = response.data.data;
      console.log(promotion)
    }
  };

  const url = "/page/";
  /*Assign Content from API*/
  
  const getResult= () =>{
    if (type === "agent") {
      result = agent;
      return result;
      
    } else if (type === "complex") {
      result = complex;
      console.log(result)
      return result;
      
    } else if (type === "package") {
      result = pack;
      console.log(result)
      return result;
    } else {
      result = promotion;
      return result

    }
  }

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
          content={getResult()}
        />}
        </>
      </IonContent>
    </IonPage>
  );
};

export default CardDetails;
