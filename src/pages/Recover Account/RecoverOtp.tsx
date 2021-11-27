/** @jsxImportSource theme-ui */
import { Storage } from "@capacitor/storage";
import {
    IonAlert,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonLoading,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { validOtp } from "../../components/Regex/Regex";
import Connection from "../../mixins/Connection";

const RecoverOtp: React.FC = () => {
  const history = useHistory();
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSuccessResend, setShowSuccessResend] = useState(false);

  const updateOtp = (otp: any) => setOtp(otp);
  const getId = async(username: any) => {
    const id: any = await Storage.get({key: "adminId"});
    const adminId: any = id.value;

    let url = "resendOtp/"
  };
const getUsername = async() => {
  const id: any = await Storage.get({key: "username"});
  const username: any = id.value;

  getId(username);
};
  const getAdminId = async() => {
    const id: any = await Storage.get({key: "adminId"});
    const adminId: any = id.value;

    const time = new Date().toISOString();

    let url = "recovery/recover/".concat(otp, "/", adminId, "/", time);
    Connection.processPostRequest({}, url, (response: any) => mapResponse(response))
};

const mapResponse = (response: any) => {
  if(response.type === "error"){
      setShowLoader(false);
      setMessage("Otp Error.");
      setShowError(true);
  }else{
      setShowLoader(false);
      setMessage("Account Recovered.");
      setShowSuccess(true);
  }
};

  const resendOtp = () => {
      getUsername();
  };

  const buttonHandler = () => {
      if(!validOtp.test(otp)){
          setShowLoader(false);
          setMessage("Invalid Otp");
          setShowError(true);
      }else{
          getAdminId();
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
        message={message}
        buttons={["OK"]}
      />
      <IonAlert
        isOpen={showSuccessResend}
        onDidDismiss={() => history.replace("/signIn")}
        header={"Success"}
        message={message}
        buttons={["OK"]}
      />
      <IonAlert
        isOpen={showSuccess}
        onDidDismiss={() => setShowSuccess(false)}
        header={"Success"}
        message={message}
        buttons={["OK"]}
      />
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons>
            <IonBackButton />
          </IonButtons>
          <IonTitle>Verify Otp</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonCard sx={styles.card}>
                <IonCardHeader>
                  <IonCardSubtitle style={{ textAlign: "center" }}>
                    Enter the otp that was sent to the respective choice of
                    medium
                  </IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonRow>
                    <IonCol>
                      <IonItem>
                        <IonLabel position="floating">One-Time Pin</IonLabel>
                        <IonInput
                          type="text"
                          value={otp}
                          onIonChange={(e) => updateOtp(e.detail.value)}
                        />
                      </IonItem>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                      <IonCol>
                          <IonButton type="submit" expand="block" shape="round" sx={styles.button} onClick={()=>buttonHandler()}>Verify</IonButton>
                      </IonCol>
                  </IonRow>
                  <IonRow>
                      <IonCol>
                          <p style={{textAlign: "center"}}>Didn't recieve it ? <a onClick={()=>resendOtp()}>Resend One-Time Pin</a></p>
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

export default RecoverOtp;

const styles = {
    card:{
        mt: "23vh",
    },
    button: {
        mt: "3",
        mb: "4",
    },
};
