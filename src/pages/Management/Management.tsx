/** @jsxImportSource theme-ui */
import {
  IonAlert,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonLoading,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { add } from "ionicons/icons";
import { useState } from "react";
import { useParams } from "react-router";
import Card from "../../components/Card/Card";
import Connection from "../../mixins/Connection";
import "./Page.css";

const Management: React.FC = () => {
  const addUrl = "/add/";
  const { name, title } =
    useParams<{
      name: string;
      title: "agent" | "complex" | "package" | "promotion";
    }>();

  const [showLoader, setShowLoader] = useState(true);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [agents, setAgents] = useState([
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
    },
  ]);
  const [complexes, setComplexes] = useState([
    {
      complexId: "",
      complexName: "",
      street1: "",
      street2: "",
      city: "",
      province: "",
      postalCode: "",
      telephoneNum: "",
      startTime: "",
      endTime: "",
      cellNum: "",
      units: [],
      agents: [],
    },
  ]);
  const [packages, setPackages] = useState([
    {
      packageId: "",
      promotionId: "",
      packageName: "",
      minutes: 0,
      standardPrice: "",
      suvPrice: "",
      description: "",
      onPromotion: false,
    },
  ]);
  const [promotions, setPromotions] = useState([
    {
      promotionId: "",
      promotionName: "",
      packageName: "",
      standardPrice: "",
      suvPrice: "",
      isEnabled: false,
    },
  ]);

  useIonViewWillEnter( () => {
    if(title === 'agent'){
      getAgents();
    }else if(title === 'complex'){
      getComplexes();
    }else if(title === 'package'){
      getPackages();
    }else{
      getPromotions();
    }
  });

  const getAgents = () => {
    setShowLoader(true);
    var url = "agent/get/all";
    Connection.processGetRequest({}, url, (response: any) => {
      mapAgents(response);
    });
  };
  const getComplexes = () => {
    setShowLoader(true);
    var url = "complex/get/all";
    Connection.processGetRequest({}, url, (response: any) => {
      mapComplexes(response);
    });
  };
  const getPackages = () => {
    setShowLoader(true);
    var url = "package/get/all";

    Connection.processGetRequest({}, url, (response: any) => {
      mapPackages(response);
    });
  };
  const getPromotions = () => {
    setShowLoader(true);
    var url = "promotion/get/all";
    Connection.processGetRequest({}, url, (response: any) => {
      mapPromotions(response);
    });
  };

  const mapPackages = (response: any) => {
    if (response.type === "error") {
      setShowLoader(false);
      setErrorMessage(response.data);
      setShowError(true);
    } else {
      setShowLoader(false);
      setPackages(response.data.data);
    }
  };
  const mapAgents = (response: any) => {
    if (response.type === "error") {
      setShowLoader(false);
      setErrorMessage(response.data);
      setShowError(true);
    } else {
      setShowLoader(false);
      setAgents(response.data.data);
    }
  };

  const mapComplexes = (response: any) => {
    if (response.type === "error") {
      setShowLoader(false);
      setErrorMessage(response.data);
      setShowError(true);
    } else {
      setShowLoader(false);
      setComplexes(response.data.data);
    }
  };
  const mapPromotions = (response: any) => {
    if (response.type === "error") {
      setShowLoader(false);
      setErrorMessage(response.data);
      setShowError(true);
    } else {
      setShowLoader(false);
      setPromotions(response.data.data);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name.concat(" Management")}</IonTitle>
        </IonToolbar>
        <IonAlert
          isOpen={showError}
          onDidDismiss={() => setShowError(false)}
          header={'Error'}
          subHeader={'Something went wrong.'}
          message={errorMessage}
          buttons={['OK']}
        />
      </IonHeader>

      <IonContent fullscreen>
      <IonLoading
            cssClass='my-custom-class'
            showBackdrop
            isOpen={showLoader}
            message={'Please wait...'}
          />
        { title === "agent" && agents.length !== 0 &&
        agents.map((agent) => (
          <Card
            type={title}
            id={agent.agentId}
            key={agent.agentId}
            title={agent.name.concat(" ", agent.surname)}
            subtitle={agent.complexName}
            reference={name}
          />
        ))}
      { title === "agent" && agents.length === 0 && 
        <h2 sx={styles.heading}>No Agents</h2>
      }
      { title === "complex" && complexes[0].complexId !== '' &&
        complexes.map((complex) => (
          <Card
            type={title}
            id={complex.complexId}
            key={complex.complexId}
            title={complex.complexName}
            subtitle={complex.street2}
            reference={name}
          />
        ))}
      { title === "complex" && complexes[0].complexId === '' &&
        <h2 sx={styles.heading}>No Complexes</h2>
      }
      { title === "package" && packages[0].minutes !== 0 &&
      packages.map((pack) => (
        <Card
          type={title}
          id={pack.packageId}
          key={pack.packageId}
          title={pack.packageName}
          subtitle={pack.description}
          reference={name}
        />
      ))}
      { title === "package" && packages[0].minutes === 0 &&
        <h2 sx={styles.heading}>No Packages</h2>
      }
      { title === "promotion" && promotions.length !== 0  &&
        promotions.map((promotion) => (
          <Card
            type={title}
            id={promotion.promotionId}
            key={promotion.promotionId}
            title={promotion.promotionName}
            subtitle={promotion.packageName}
            reference={name}
          />
        ))}
      { title === "promotion" && promotions.length === 0 &&
        <h2 sx={styles.heading}>No Promotions</h2>
      }
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton href={addUrl.concat(name, "/", title)}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Management;

const styles = {
  heading: {
    display: "flex",
    justifyContent: "center",
    color: "grey",
    mt:'40vh',
    opacity: '0.5'
  }
}