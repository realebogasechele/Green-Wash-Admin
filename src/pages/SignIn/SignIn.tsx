import {
  IonAlert,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonLoading,
  IonPage,
  IonRow,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
import { useHistory } from "react-router";
import TGWLogo from "../../components/TGWLogo.png";
import Connection from "../../mixins/Connection";
import {
  validCellNum,
  validPassword,
} from "../../components/Regex/Regex";

const SignIn: React.FC = () => {
  const path = useHistory();

  const [showLoader, setShowLoader] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const [cellNum, setCellNum] = useState("");
  const [password, setPassword] = useState("");

  const updateCellNum = (cellNum: any) => {
    setCellNum(cellNum);
  };
  const updatePassword = (password: any) => {
    setPassword(password);
  };

  const buttonHandler = () => {
    validateForm();
    if (isFormValid === true) {
      let url = "login".concat("/", cellNum, "/", password);
      Connection.processGetRequest({}, url, (response: any) => {
        mapResponse(response);
      });
    }
  };

  const validateForm = () => {
    if (cellNum === "" || password === "") {
      setShowLoader(false);
      setIsFormValid(false);
      setErrorMessage("Fields cannot be empty.");
      setShowError(true);
    } else {
      if (!validCellNum.test(cellNum)) {
        setShowLoader(false);
        setIsFormValid(false);
        setErrorMessage("Invalid Cell Number.");
        setShowError(true);
      } else if (!validPassword.test(password)) {
        setShowLoader(false);
        setIsFormValid(false);
        setErrorMessage(
          "Password must be 8-16 characters long. Ensure it includes atleast 1 aphabet character and 1 digit."
        );
        setShowError(true);
      } else {
        setIsFormValid(true);
      }
    }
  };

  const mapResponse = (response: any) => {
    setShowLoader(false);
    if (response.type === "error") {
      setShowLoader(false);
      setErrorMessage(response.data);
      setShowError(true);
      setCellNum("");
      setPassword("");
    } else {
      setSuccessMessage("Successfully Sign In!");
      setShowSuccess(true);
    }
  };

  return (
    <IonPage>
      <IonContent>
        <IonImg src={TGWLogo} alt={"Logo.png"} />
        <IonToolbar>
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

          <IonAlert
            isOpen={showSuccess}
            onDidDismiss={() => path.push("/dashboard")}
            header={"Success"}
            subHeader={successMessage}
            buttons={["OK"]}
          />
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonToolbar>
                  <IonTitle>Sign In</IonTitle>
                </IonToolbar>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">Cell Number</IonLabel>
                  <IonInput
                    value={cellNum}
                    onIonChange={(e) => updateCellNum(e.detail.value)}
                  ></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">Password</IonLabel>
                  <IonInput
                    type="password"
                    value={password}
                    onIonChange={(e) => updatePassword(e.detail.value)}
                  ></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonButton
                  shape="round"
                  type="submit"
                  expand="block"
                  onClick={buttonHandler}
                >
                  SignIn
                </IonButton>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <p>
                  <a href="/forgot">Forgot password ?</a>
                </p>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <p>
                  Don't have an account ? <a href="/signUp">Sign Up.</a>
                </p>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonContent>
    </IonPage>
  );
};

export default SignIn;
