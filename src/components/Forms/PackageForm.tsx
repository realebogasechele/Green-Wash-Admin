import {
  IonButton,
  IonCol,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
  IonTextarea,
  IonToggle,
} from "@ionic/react";
import React, { useState } from "react";
import Connection from "../../mixins/Connection";

const PackageForm: React.FC<{
  name: string;
  isDisabled: boolean;
  content: any;
}> = (props) => {
  const {
    packageId,
    promotionId,
    packageName,
    minutes,
    standardPrice,
    suvPrice,
    description,
    onPromotion,
  } = props.content;

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const updatePackageName = (packageName: any) => {
    setEnteredPackageName(packageName);
  };
  const updateMinutes = (minutes: any) => {
    setEnteredMinutes(minutes);
  };
  const updateStandardPrice = (standardPrice: any) => {
    setEnteredStandardPrice(standardPrice);
  };
  const updateSuvPrice = (suvPrice: any) => {
    setEnteredSuvPrice(suvPrice);
  };
  const updateDescription = (description: any) => {
    setEnteredDescription(description);
  };
  const updateOnPromotion = (onPromotion: any) => {
    setOnPromotion(onPromotion);
  };

  const [enteredPackageName, setEnteredPackageName] = useState(packageName);
  const [enteredMinutes, setEnteredMinutes] = useState(minutes);
  const [enteredStandardPrice, setEnteredStandardPrice] =
    useState(standardPrice);
  const [enteredSuvPrice, setEnteredSuvPrice] = useState(suvPrice);
  const [enteredDescription, setEnteredDescription] = useState(description);
  const [enteredOnPromotion, setOnPromotion] = useState(onPromotion);

  function mapDeleteResponse(response: any) {
    return (console.log("deleted"));
  }

  const buttonHandler = () => {
    if (props.name === "Update") {
      var url = "package/update";
      var pack = {
        packageId: packageId,
        promotionId: promotionId,
        packageName: enteredPackageName,
        minutes: enteredMinutes,
        standardPrice: enteredStandardPrice,
        suvPrice: enteredSuvPrice,
        onPromotion: onPromotion,
      };

      Connection.processPostRequest(pack, url, (response: any) => {
        mapResponse(response);
      });
    } else if (props.name === "Delete") {
      url = "package/remove/".concat(packageId);

      Connection.processDeleteRequest({}, url,(response: any)=>{
        mapDeleteResponse(response);
      })

    } else {
      url = "package/add";
      var pack = {
        packageId: packageId,
        promotionId: promotionId,
        packageName: enteredPackageName,
        minutes: enteredMinutes,
        standardPrice: enteredStandardPrice,
        suvPrice: enteredSuvPrice,
        onPromotion: onPromotion,
      };
      console.log(pack);
      Connection.processPostRequest(pack, url, (response: any) => {
        mapResponse(response);
      });
    }
  };

  const mapResponse = (response: any) => {};
  return (
    <IonGrid>
      <IonRow>
        <IonCol>
          <IonItem>
            <IonLabel position="floating">Package Name</IonLabel>
            <IonInput
              disabled={props.isDisabled}
              value={enteredPackageName}
              onIonChange={(e) => updatePackageName(e.detail.value)}
            ></IonInput>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem>
            <IonLabel position="floating">Minutes</IonLabel>
            <IonInput
              disabled={props.isDisabled}
              value={enteredMinutes}
              onIonChange={(e) => updateMinutes(e.detail.value)}
            ></IonInput>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem>
            <IonLabel position="floating">Standard Price</IonLabel>
            <IonInput
              disabled={props.isDisabled}
              value={enteredStandardPrice}
              onIonChange={(e) => updateStandardPrice(e.detail.value)}
            ></IonInput>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem>
            <IonLabel position="floating">SUV Price</IonLabel>
            <IonInput
              disabled={props.isDisabled}
              value={enteredSuvPrice}
              onIonChange={(e) => updateSuvPrice(e.detail.value)}
            ></IonInput>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem>
            <IonLabel position="floating">Description</IonLabel>
            <IonTextarea
              disabled={props.isDisabled}
              value={enteredDescription}
              onIonChange={(e) => updateDescription(e.detail.value)}
            />
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem>
            <IonLabel>On Promotion</IonLabel>
            <IonToggle
              color={"primary"}
              disabled={props.isDisabled}
              checked={enteredOnPromotion}
              onIonChange={(e) => updateOnPromotion(e.detail.checked)}
            />
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonButton type="submit" expand="block" onClick={buttonHandler}>
            {props.name}
          </IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default PackageForm;