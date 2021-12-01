/** @jsxImportSource theme-ui */
import {
  IonAlert,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
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
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToast,
  IonToolbar,
  useIonViewWillEnter,
  useIonViewWillLeave,
} from "@ionic/react";
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router";
import TGWLogo from "../../components/TGWLogo.png";
import Connection from "../../mixins/Connection";
import {
  validCellNum,
  validEmail,
  validPassword,
} from "../../components/Regex/Regex";
import { Storage } from "@capacitor/storage";
import { App } from "@capacitor/app";

const SignIn: React.FC = () => {
  useIonViewWillEnter(()=>{
    App.addListener('backButton', (e) => {
    if (e.canGoBack === true || e.canGoBack === false){
      setShowOptions(true)
    }
  }
  )
  })
  const history = useHistory();

  let valid: boolean = false;

  const [showLoader, setShowLoader] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const updateUsername = (cellNum: any) => {
    setUsername(cellNum);
  };
  const updatePassword = (password: any) => {
    setPassword(password);
  };

  const setAdminId = async (data: any) => {
    await Storage.set({
      key: "adminId",
      value: data,
    });
  };

  const buttonHandler = () => {
    setShowLoader(true);
      if (username === "" || password === "") {
        setShowLoader(false);
        valid = false;
        setErrorMessage("Fields cannot be empty.");
        setShowError(true);
      } else if (!validCellNum.test(username) && !validEmail.test(username)) {
        setShowLoader(false);
        valid = false;
        setErrorMessage("Invalid Cell Number or Email.");
        setShowError(true);
      } else if (!validPassword.test(password)) {
        setShowLoader(false);
        valid = false;
        setErrorMessage(
          "Password must be 8-16 characters long. Ensure it includes atleast 1 aphabet character and 1 digit."
        );
        setShowError(true);
      } else {
        let url = "login/".concat(username, "/", password);
        Connection.processGetRequest({}, url, (response: any) =>
          mapResponse(response)
        );
      }
    }; 

  const mapResponse = async (response: any) => {
    if (response.type === "error") {
      setShowLoader(false);
      setErrorMessage(response.data);
      setShowError(true);
      setUsername("")
      setPassword("");
    } else {
      setShowLoader(false);
      await setAdminId(response.data.data);
      setSuccessMessage("Successfully Sign In!");
      setShowSuccess(true);
    }
  };

  return (
    <IonPage>
      <IonContent>
        <IonImg src={TGWLogo} alt={"Logo.png"} sx={styles.img} />
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
            onDidDismiss={() => {
              history.push("/dashboard");
            }}
            header={"Success"}
            subHeader={successMessage}
            buttons={["OK"]}
          />
      <IonAlert
          isOpen={showOptions}
          onDidDismiss={() => setShowOptions(false)}
          header={'Confirm'}
          message={'Are you sure you want to exit ?'}
          buttons={[
            {
              text: "No",
              cssClass: "secondary",
            },
            {
              text: "Yes",
              handler: () => {
                setShowOptions(false);
                App.exitApp();
              },
            },
          ]}
        />
          <IonCard sx={{ mt: "8vh" }}>
            <IonGrid>
              <IonRow>
                <IonCol offset="4">
                  <IonToolbar>
                    <IonTitle size="large">Sign In</IonTitle>
                  </IonToolbar>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonItem>
                    <IonLabel position="floating">Cell Number/Email</IonLabel>
                    <IonInput
                      value={username}
                      onIonChange={(e) => updateUsername(e.detail.value)}
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
                    onClick={() => buttonHandler()}
                  >
                    SignIn
                  </IonButton>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol style={{textAlign: "center"}}>
                  <p>
                    <a href="/forgot">Forgot password ?</a> or <a href="/recover">Recover account ?</a>
                  </p>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol style={{textAlign: "center"}}>
                  Don't have an account ? <a href="/signUp">Sign Up.</a>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCard>
        </IonToolbar>
      </IonContent>
    </IonPage>
  );
};

export default SignIn;

const styles = {
  img: {
    pt: "6vh",
    pl: "4vh",
    pr: "4vh",
  },
  select: {
    mt: "15px",
    border: "1px solid grey",
  },
};
