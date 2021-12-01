/** @jsxImportSource theme-ui */
import { Storage } from "@capacitor/storage";
import {
  IonAlert,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonLoading,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import React, { useState } from "react";
import { Bar, Doughnut, Pie } from "react-chartjs-2";
import { useHistory } from "react-router";
import { App } from '@capacitor/app';
import Connection from "../../mixins/Connection";

interface ResponseObject {
  name: string;
  value: number;
}

interface Admin {
  adminId: string;
  name: string;
  surname: string;
  cellNum: string;
  email: string;
  password: string;
}

const Dashboard: React.FC = () => {
  const history = useHistory();
  useIonViewWillEnter(() => {
    setShowLoader(true);
    getAdminId();
    getPast7Days();
    getPopularity();
    getPopulation();
    getMostBookings();
    getTotalEarnings();
    getTypeOBookings();
    setShowLoader(false);
  });
  const getMostBookings = () => {
    let url = "query/complexMostBookings";
    Connection.processGetRequest({}, url, (response: any) => {
      mapMostBookings(response);
    });
  };
  let past7Days: ResponseObject[];
  let packPopularity: ResponseObject[];
  let clientPopulation: ResponseObject[];

  const getAdminId = async () => {
    const id: any = await Storage.get({ key: "adminId" });
    const adminId = id.value;
    if(adminId !== null){
      getAdminDetails(adminId);
    }else{
      setShowLeave(true);
    }
  };

  const [admin, setAdmin] = useState({
    adminId: "",
    name: "",
    surname: "",
    cellNum: "",
    email: "",
    password: "",
  });

  const [past7DaysValues, setPast7DaysValues] = useState<number[]>([]);
  const [packPopularityNames, setPackPopularityNames] = useState<string[]>([]);
  const [packPopularityValues, setPackPopularityValues] = useState<number[]>(
    []
  );
  const [complexNames, setComplexNames] = useState<string[]>([]);
  const [clients, setClients] = useState<number[]>([]);
  const [mostBookings, setMostBookings] = useState("");
  const [totalEarnings, setTotalEarnings] = useState([]);
  const [typeOfBookings, setTypeOfBookings] = useState([]);

  const [showLoader, setShowLoader] = useState(true);
  const [showLeave, setShowLeave] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [callDone, setCallDone] = useState(false);

  const getAdminDetails = (adminId: string) => {
    let url = "get/".concat(adminId);
    Connection.processGetRequest({}, url, (response: any) =>
      mapAdminDetails(response)
    );
  };

  const getPast7Days = () => {
    let url = "query/past7Days";
    Connection.processGetRequest({}, url, (response: any) => 
      mapPast7Days(response)
    );
  };

  const getPopularity = () => {
    let url = "query/packagePopularity";
    Connection.processGetRequest({}, url, (response: any) =>
      mapPopularity(response)
    );
  };

  const getPopulation = () => {
    let url = "query/clientPopulation";
    Connection.processGetRequest({}, url, (response: any) => 
      mapPopulation(response)
    );
  };
  const getTypeOBookings = () => {
    let url = 'query/typeOfBookingsToday';
    Connection.processGetRequest({}, url, (response: any) => mapBookingResponse(response))
  };
  const getTotalEarnings = () => {
    let url = 'query/totalEarningsToday';
    Connection.processGetRequest({}, url, (response: any) => mapEarningResponse(response))
  };
  const mapEarningResponse = (response: any) => {
    if(response.type === 'error'){
      setShowLoader(false);
      setErrorMessage(response.data);
      setShowError(true);
    }else{
      setTotalEarnings(response.data.data);

    }
  };
  const mapBookingResponse = (response: any) => {
    if(response.type === 'error'){
      setShowLoader(false);
      setErrorMessage(response.data);
      setShowError(true);
    }else{
      setTypeOfBookings(response.data.data);
    }
  };

  const mapPopulation = (response: any) => {
    if (response.type === "error") {
      setShowLoader(false);
      setErrorMessage(response.data);
      setShowError(true);
    } else {
      clientPopulation = response.data.data;
      for (let i = 0; i < clientPopulation.length; i++) {
        complexNames.push(clientPopulation[i].name);
        clients.push(clientPopulation[i].value);
      }
    }
  };

  const mapPopularity = (response: any) => {
    if (response.type === "error") {
      setShowLoader(false);
      setErrorMessage(response.data);
      setShowError(true);
    } else {
      packPopularity = response.data.data;
      for (let i = 0; i < packPopularity.length; i++) {
        packPopularityNames.push(packPopularity[i].name);
        packPopularityValues.push(packPopularity[i].value);
      }
    }
  };

  const mapAdminDetails = (response: any) => {
    if (response.type === "error") {
      setShowLoader(false);
      setErrorMessage(response.data);
      setShowError(true);
    } else {
      setAdmin(response.data.data);
      setCallDone(true);
    }
  };

  const mapPast7Days = (response: any) => {
    if (response.type === "error") {
      setShowLoader(false);
      setErrorMessage(response.data);
      setShowError(true);
    } else {
      past7Days = response.data.data;
      for (let i = 0; i <= past7Days.length - 2; i++) {
        past7DaysValues.push(past7Days[i].value);
      }
      setPast7DaysValues(past7DaysValues);
    }
  };

  const mapMostBookings = (response: any) => {
    if (response.type === "error") {
      setShowLoader(true);
      setErrorMessage(response.data);
      setShowError(true);
    } else {
      setMostBookings(response.data.data);
    }
  };

  const state = {
    labels: [
      "Today",
      "Yesterday",
      "2 Days Ago",
      "3 Days Ago",
      "4 Days Ago",
      "5 Days Ago",
      "6 Days Ago",
      "7 Days Ago",
    ],
    datasets: [
      {
        label: "Bookings",
        backgroundColor: "rgba(91, 159, 78)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: past7DaysValues,
      },
    ],
  };
  const state2 = {
    labels: packPopularityNames,
    datasets: [
      {
        label: "Packages",
        data: packPopularityValues,
        backgroundColor: [
          "rgb(93,204,90)",
          "rgb(132,227,151)",
          "rgb(87,205,90)",
          "rgb(55,66,65)",
          "rgb(10,168,76)"
        ],
        hoverOffset: 4,
      },
    ],
  };

  const state3 = {
    labels: complexNames,
    datasets: [
      {
        label: "Clients",
        data: clients,
        backgroundColor: [
          "rgb(93,204,90)",
          "rgb(132,227,151)",
          "rgb(87,205,90)",
          "rgb(55,66,65)",
          "rgb(10,168,76)"
        ],
        hoverOffset: 4,
      },
    ],
  };
  const state4 = {
    labels: ["Cash", "Card"],
    datasets: [
      {
        data: typeOfBookings,
        backgroundColor: [
          "rgb(93,204,90)",
          "rgb(132,227,151)",
          "rgb(87,205,90)",
          "rgb(55,66,65)",
          "rgb(10,168,76)"
        ],
        hoverOffset: 4,
      },
    ],
  };
  const state5 = {
    labels: ["Cash", "Card"],
    datasets: [
      {
        data: totalEarnings,
        backgroundColor: [
          "rgb(93,204,90)",
          "rgb(132,227,151)",
          "rgb(87,205,90)",
          "rgb(55,66,65)",
          "rgb(10,168,76)"
        ],
        hoverOffset: 4,
      },
    ],
  };

  const removeUnit = () => {
    let temp: string[] = [];
    for (let i = 0; i < packPopularityNames.length; i++) {
      if (packPopularityNames[i] !== "Default") {
        temp.push(packPopularityNames[i]);
      }
      setPackPopularityNames(temp);
    }
  };

  return (
    <IonPage>
      <IonLoading
        cssClass="my-custom-class"
        showBackdrop
        isOpen={showLoader}
        message={"Please wait..."}
      />

      <IonAlert
        isOpen={showError}
        onDidDismiss={() => setShowError(false)}
        header={"Error"}
        subHeader={"Something went wrong."}
        message={errorMessage}
        buttons={["OK"]}
      />
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonTitle color="medium">
                {callDone === true
                  ? "Welcome " + admin.name + " " + admin.surname + " !"
                  : ""}
              </IonTitle>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle color="medium">
                    Bookings for the past 7 days
                  </IonCardTitle>
                  <IonCardContent>
                    {packPopularityNames.length !== 0 &&
                      packPopularityValues.length !== 0 && <Bar data={state} />}
                  </IonCardContent>
                </IonCardHeader>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonCard>
                <IonCardHeader>
                  <IonRow>
                    <IonCol size="8">
                      <IonCardTitle color="medium">
                        Package Popularity
                      </IonCardTitle>
                    </IonCol>
                  </IonRow>
                </IonCardHeader>
                <IonCardContent>
                  {packPopularityNames.length !== 0 &&
                    packPopularityValues.length !== 0 && <Pie data={state2} />}
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonCard>
                <IonCardHeader>
                  <IonRow>
                    <IonCol size="8">
                      <IonCardTitle color="medium">
                        Client Population
                      </IonCardTitle>
                    </IonCol>
                  </IonRow>
                </IonCardHeader>
                <IonCardContent>
                  {packPopularityNames.length !== 0 &&
                    packPopularityValues.length !== 0 && (
                      <Doughnut data={state3} />
                    )}
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle color="medium">
                    Type of Bookings Today
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  {packPopularityNames.length !== 0 &&
                    packPopularityValues.length !== 0 && (
                      <Doughnut data={state4} />
                    )}
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle color="medium">
                    Total Earnings For Today
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  {packPopularityNames.length !== 0 &&
                    packPopularityValues.length !== 0 && (
                      <Doughnut data={state4} />
                    )}
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;