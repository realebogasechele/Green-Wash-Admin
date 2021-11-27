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
  IonCardTitle,
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
import { Link } from "@theme-ui/components";
import { verify } from "crypto";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { validOtp } from "../../components/Regex/Regex";
import Connection from "../../mixins/Connection";

const Otp: React.FC = () => {
  const path = useHistory();
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const updateOtp = (otp: any) => setOtp(otp.target.value);

  const buttonHandler = () => {
    setShowLoader(true);
    if (otp === "") {
      setShowLoader(false);
      setMessage("Please enter One-Time Pin.");
      setShowError(true);
    } else if (!validOtp.test(otp)) {
      setShowLoader(false);
      setMessage("Invalid One-Time Pin.");
      setShowError(true);
    } else {
      getAdminId();
    }
  };

  const getAdminId = async () => {
    const response: any = await Storage.get({
      key: "adminId",
    });
    const id = response.value;

    let date = new Date();
    let time = date.toISOString();

    verifyOtp(time, id);
  };

  const verifyOtp = (time: any, id: any) => {
    let url = "forgot/verifyOtp/".concat(otp, "/", time, "/", 'sechele.rk@gmail.com');
    Connection.processPostRequest({}, url, (response: any) =>
      mapResponse(response)
    );
  };

  const mapResponse = (response: any) => {
    if (response.type === "error") {
      setShowLoader(false);
      setMessage(response.data);
      setShowError(true);
    } else {
      setShowLoader(false);
      console.log(response.data.data)
      path.push("/newPassword");
    }
  };

  const resendHandler = () => {
      setShowLoader(true);
      getType();
  };

  const getType = async () => {
    const response: any = await Storage.get({
      key: "type",
    });
    const type = response.value;
    getIdtifier(type);
  };

  const getIdtifier = async (type: any) => {
    const response: any = await Storage.get({
      key: "id",
    });

    const id = response.value;
    resendOtp(id, type);
  };

  const resendOtp = (id: any, type: any) => {
    let url = 'forgot/resendOtp/'.concat(type, '/', id);
    Connection.processPostRequest({}, url, (response: any) => mapResendResponse(response))
  };
const mapResendResponse = (response: any) => {
  if(response.type === 'error'){
    setShowLoader(false);
    setMessage(response.data.data);
    setShowError(true);
  }else{
    setShowLoader(false);
    setMessage(response.data.data);
    setShowSuccess(true);
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
      <IonAlert
        isOpen={showSuccess}
        onDidDismiss={() => setShowSuccess(false)}
        header={"Success"}
        subHeader={"Request granted."}
        message={message}
        buttons={["OK"]}
      />
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>One-Time Pin Validation</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard sx={styles.card}>
          <IonCardHeader>
            <IonCardSubtitle>
              Please Enter the One-Time Pin sent to your phone:
            </IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem sx={styles.input}>
              <IonLabel position="floating">One-Time Pin</IonLabel>
              <IonInput type="text" onIonChange={(e) => updateOtp(e)} />
            </IonItem>
            <IonRow>
              <IonCol size='8'> <p> No Code ? <span sx={styles.resend} onClick={() => resendHandler()}>Resend Code</span></p></IonCol>
              <IonCol>
            <IonButton
              type="submit"
              shape="round"
              expand="block"
              sx={styles.button}
              onClick={() => buttonHandler()}
            >
              Verify
            </IonButton>
            </IonCol>
            </IonRow>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Otp;

const styles = {
  resend:{
    color: 'green',
    textDecoration: 'underline',
  },
  button:{
    mt: '-1',
  },
  input: {
    mb: "4",
  },

  card: {
    mt: "28vh",
  },
};
