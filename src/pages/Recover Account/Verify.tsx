/** @jsxImportSource theme-ui */
import {
  IonAlert,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonLoading,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Browser } from "@capacitor/browser";
import React, { useState } from "react";
import { validCellNum, validEmail } from "../../components/Regex/Regex";
import Connection from "../../mixins/Connection";
import { useHistory } from "react-router";
import { Storage } from "@capacitor/storage";

const Verify: React.FC = () => {
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const updateUsername = (username: any) => setUsername(username);

  const openWebsite = async () => {
    await Browser.open({ url: "https://thegreenwash.co.za" });
  };

  const setAdminId = async (adminId: any) => {
    await Storage.set({ key: "adminId", value: adminId, });
  };

  const buttonHandler = () => {
    setShowLoader(true);
    if (!validCellNum.test(username) && !validEmail.test(username)) {
      setShowLoader(false);
      setMessage("Invalid Cell Number or Email");
      setShowError(true);
    } else {
      let url = "recovery/otp/".concat(username);
      Connection.processGetRequest({}, url, (response: any) =>
        mapResponse(response)
      );
    }
  };

  const mapResponse = (response: any) => {
    if (response.type === "error") {
      setShowLoader(false);
      setMessage(response.data.data);
      setShowError(true);
     } else {
      setShowLoader(false);
      setAdminId(response.data.data);
      history.replace("/recover/otp");
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
        message={message}
        buttons={["OK"]}
      />
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Verify Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol></IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonCard sx={styles.card}>
                <IonCardHeader>
                  <IonCardSubtitle style={{ textAlign: "center" }}>
                    Please enter the last cell number or email associated with
                    your account
                  </IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonRow>
                    <IonCol>
                      <IonItem>
                        <IonLabel position="floating">
                          Cell Number/Email
                        </IonLabel>
                        <IonInput
                          type="text"
                          value={username}
                          onIonChange={(e) => updateUsername(e.detail.value)}
                        />
                      </IonItem>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <IonButton
                        type="submit"
                        expand="block"
                        shape="round"
                        onClick={() => buttonHandler()}
                      >
                        Submit
                      </IonButton>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol offset="1.5">
                      <p sx={styles.link}>
                        Having a problem?{" "}
                        <a onClick={() => openWebsite()}>Leave us a query</a>
                      </p>
                    </IonCol>
                  </IonRow>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Verify;

const styles = {
  link: {
    pt: "3",
  },
  card: {
    mt: "23vh",
  },
};
