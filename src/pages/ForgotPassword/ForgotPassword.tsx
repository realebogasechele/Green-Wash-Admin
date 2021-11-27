/** @jsxImportSource theme-ui */
import { jsx } from "theme-ui";
import {
  IonAlert,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonLoading,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { validCellNum, validEmail } from "../../components/Regex/Regex";
import TGWLogo from "../../components/TGWLogo.png";
import Connection from "../../mixins/Connection";
import { Storage } from "@capacitor/storage";

const ForgotPassword: React.FC = () => {
  const path = useHistory();

  const [cellNum, setCellNum] = useState("");
  const [email, setEmail] = useState("");
  const [selection, setSelection] = useState("cell");
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const updateCellNum = (cellNum: any) => setCellNum(cellNum);
  const updateEmail = (email: any) => setEmail(email);
  const updateSelection = (selection: any) => {
    setSelection(selection);
    setCellNum('');
    setEmail('');
  };

  const buttonHandler = () => {
    setShowLoader(true);   
    if (selection === "cell") {
      if (cellNum !== "") {
        if (validCellNum.test(cellNum)) {
          let url = "forgot/verify/".concat(selection,'/',cellNum);
          Connection.processPostRequest({}, url, (response: any) =>
            mapResponse(response, cellNum, selection)
          );
        } else {
          setShowLoader(false);
          setErrorMessage("Invalid Cell Number.");
          setShowError(true);
        }
      } else {
        setShowLoader(false);
        setErrorMessage("You need to provide a cell number to continue.");
        setShowError(true);
      }
    } else {
      if(email !== ''){
        if(validEmail.test(email)){
          let url = "forgot/verify/".concat(selection,'/',email);
          Connection.processPostRequest({}, url, (response: any) =>
            mapResponse(response, email, selection)
          );
        }else{
          setShowLoader(false);
          setErrorMessage("Invalid Email.");
          setShowError(true);
        }
      }else{
        setShowLoader(false);
        setErrorMessage("You need to provide an email to continue.");
        setShowError(true);
      }
    }
  };

  const mapResponse = (response: any, id: any, type: any) => {
    if (response.type === "error") {
      setShowLoader(false);
      setErrorMessage(response.data);
      setShowError(true);
    } else {
      setShowLoader(false);
      setIdentifier(id);
      setType(type)
      setAdminId(response.data.data);
      path.push("/forgot/otp");
    }
  };

  const setAdminId = async (data: any) => {
    await Storage.set({
      key: 'adminId',
      value: data,
    });
  };

  const setIdentifier = async (data: any) => {
    await Storage.set({
      key: 'id',
      value: data,
    });
  };

  const setType = async(data: any) => {
    await Storage.set({
      key: 'type',
      value: data,
    });
  }

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
            <IonBackButton defaultHref="/signIn" />
          </IonButtons>
          <IonTitle>Forgot Password</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard sx={styles.card}>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel>Verification Type</IonLabel>
                  <IonSelect
                    value={selection}
                    onIonChange={(e) => updateSelection(e.detail.value)}
                  >
                    <IonSelectOption value="cell">
                      Cell Number
                    </IonSelectOption>
                    <IonSelectOption value="email">Email</IonSelectOption>
                  </IonSelect>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonToolbar>
                  <IonTitle size="small">
                    Please enter the {selection} associated with your account
                  </IonTitle>
                </IonToolbar>
              </IonCol>
            </IonRow>
            <IonRow>
              {selection === "cell" ? (
                <IonCol>
                  <IonItem sx={styles.input}>
                    <IonLabel position="floating">Cell Number</IonLabel>
                    <IonInput
                      type="text"
                      value={cellNum}
                      onIonChange={(e) => updateCellNum(e.detail.value)}
                    />
                  </IonItem>
                </IonCol>
              ) : (
                <IonCol>
                  <IonItem sx={styles.input}>
                    <IonLabel position="floating">Email</IonLabel>
                    <IonInput
                      type="text"
                      value={email}
                      onIonChange={(e) => updateEmail(e.detail.value)}
                    />
                  </IonItem>
                </IonCol>
              )}
            </IonRow>
            <IonRow>
              <IonCol>
                <IonButton
                  shape="round"
                  type="submit"
                  expand="block"
                  onClick={() => buttonHandler()}
                >
                  Submit
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default ForgotPassword;

const styles = {
  input: {
    mb: 2,
  },
  card: {
    mt: "30vh",
  },
};
