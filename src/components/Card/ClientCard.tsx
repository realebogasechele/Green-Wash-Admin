import {
    IonAlert,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonLoading,
  IonRow,
} from "@ionic/react";
import React, { useState } from "react";
import { useHistory } from "react-router";
import Connection from "../../mixins/Connection";

const ClientCard: React.FC<{
  complexName: any;
  name: any;
  surname: any;
  id: any;
}> = (props) => {
  const path = useHistory();
    const [showOptions, setShowOptions] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [message, setMessage] = useState("");

    const handler = () => {
        setShowOptions(true);
    };
    const deleteClient = (id: any) => {
      setShowLoader(true);
      let url = 'client/remove/'.concat(id);
      Connection.processDeleteRequest({}, url, (response: any) => mapResponse(response))
    };

    const mapResponse = (response: any) => {
      if (response.type === 'error'){
        setShowLoader(false);
        setMessage(response.data);
        setShowError(true);
      }else{
        setShowLoader(false);
        setMessage(response.data);
        setShowSuccess(true);
      }
    };
  return (
    <>
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
        onDidDismiss={() => path.replace("/clients")}
        header={"Success"}
        subHeader={message}
        buttons={["OK"]}
      />
    <IonAlert
          isOpen={showOptions}
          onDidDismiss={() => setShowOptions(false)}
          header={'Warning'}
          message={'By removing this client, you are revoking their access to this application and permanently removing them from your system ?'}
          buttons={[
            {
              text: "Cancel",
              cssClass: "secondary",
            },
            {
              text: "Continue",
              handler: () => {
                setShowOptions(false);
                setShowConfirm(true);
              },
            },
          ]}
        />
        <IonAlert
          isOpen={showConfirm}
          onDidDismiss={() => setShowConfirm(false)}
          header={'Confirm'}
          message={'Are you sure ?'}
          buttons={[
            {
              text: "No",
              cssClass: "secondary",
            },
            {
              text: "Yes",
              handler: () => {
                setShowConfirm(false);
                deleteClient(props.id);
              },
            },
          ]}
        />
      <IonRow>
        <IonCol>
          <IonCard color="secondary" button={true} onClick={handler}>
            <IonCardHeader>
              <IonCardTitle>
                {props.name} {props.surname}
              </IonCardTitle>
              <IonCardSubtitle>{props.complexName}</IonCardSubtitle>
            </IonCardHeader>
          </IonCard>
        </IonCol>
      </IonRow>
    </>
  );
};

export default ClientCard;
