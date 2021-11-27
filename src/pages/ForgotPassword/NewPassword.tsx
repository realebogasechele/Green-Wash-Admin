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
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { validPassword } from "../../components/Regex/Regex";
import { Storage } from "@capacitor/storage";
import Connection from "../../mixins/Connection";

const NewPassword: React.FC = () => {
  const path = useHistory();

  const [message, setMessage] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  const updatePassword = (password: any) => setPassword(password.target.value);
  const updateCPassword = (cPassword: any) =>
    setCPassword(cPassword.target.value);

  const buttonHandler = () => {
    setShowLoader(true);
    if (password === "" && cPassword === "") {
      setShowLoader(false);
      setMessage("Fields must not be empty.");
      setShowError(true);
    } else if (password !== cPassword) {
      setShowLoader(false);
      setMessage("Passwords do not match.");
      setShowError(true);
    } else if (!validPassword.test(password)) {
      setShowLoader(false);
      setMessage("Weak password.");
      setShowError(true);
    } else {
      getAdminId();
    }
  };
  const getAdminId = async () => {
    const id: any = await Storage.get({ key: "adminId" });
    const adminId = id.value;

    submitPassword(adminId);
  };

  const submitPassword = (adminId: any) => {
    let url = "forgot/changePassword";
    var payload = {
      adminId: adminId,
      name: "",
      surname: "",
      email: "",
      cellNum: "",
      password: password,
    };
    Connection.processPostRequest(payload, url, (response: any) =>
      mapResponse(response)
    );
  };

  const mapResponse = (response: any) => {
    if (response.type === "error") {
      setShowLoader(false);
      setMessage(response.data.data);
      setShowError(true);
    } else {
      setShowLoader(false);
      setMessage(response.data.data);
      setShowSuccess(true);
    }
  };

  const removeAdminId = async () => {
    await Storage.remove({ key: "adminId" });
  };
  const removeIdentifier = async () => {
    await Storage.remove({
      key: "id",
    });
  };

  const removeType = async () => {
    await Storage.remove({
      key: "type",
    });
  };

  return (
    <IonPage>
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
        onDidDismiss={() => {
          setShowError(false);
          removeAdminId();
          removeType();
          removeIdentifier();
          path.replace("/signIn");
        }}
        header={"Succcess"}
        subHeader={"Request Processed."}
        message={message}
        buttons={["OK"]}
      />
      <IonAlert
        isOpen={showInfo}
        onDidDismiss={() => setShowInfo(false)}
        cssClass="my-custom-class"
        header={"Warning"}
        message={message}
        buttons={[
          {
            text: "Cancel",
            role: "cancel",
            cssClass: "secondary",
            handler: () => {},
          },
          {
            text: "Yes, I'm sure",
            handler: () => {
              removeAdminId();
              removeType();
              removeIdentifier();
              path.replace("/signIn");
            },
          },
        ]}
      />
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>New Password </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard sx={styles.card}>
          <IonCardHeader>
            <IonTitle size="small" sx={styles.card.title}>
              Please enter your new Password below:
            </IonTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem>
              <IonLabel position="floating">Password</IonLabel>
              <IonInput
                type="password"
                onIonChange={(e) => updatePassword(e)}
              />
            </IonItem>
            <IonItem sx={styles.input}>
              <IonLabel position="floating"> Confirm Password</IonLabel>
              <IonInput
                type="password"
                onIonChange={(e) => updateCPassword(e)}
              />
            </IonItem>
            <IonButton
              type="submit"
              expand="block"
              shape="round"
              onClick={buttonHandler}
            >
              Submit
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default NewPassword;

const styles = {
  input: {
    mb: 4,
  },

  card: {
    title: {
      pl: 4,
    },
    mt: "25vh",
  },
};
