import {
  IonAlert,
  IonButton,
  IonCol,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonLoading,
  IonRow,
  IonToggle,
  useIonViewWillEnter,
} from "@ionic/react";
import React, { useState } from "react";
import { useHistory } from "react-router";
import Connection from "../../mixins/Connection";

const PromotionForm: React.FC<{
  name: string;
  isDisabled: boolean;
  id: string;
}> = (props) => {
  const [promotion, setPromotion] = useState(
    {
      promotionId: "",
      promotionName: "",
      packageName: "",
      standardPrice: "",
      suvPrice: "",
      isEnabled: false,
    });

  const getPromotion = () => {
    var url = "promotion/get/".concat(props.id);
    Connection.processGetRequest({}, url, (response: any) => {
      mapPromotion(response);
    });
  };
  const mapPromotion = (response: any) => {
    if (response.type === "error") {
      setErrorMessage(response.data);
      setShowError(true);
    } else {
      setPromotion(response.data.data);
    }
  };

  const [showLoader, setShowLoader] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [enteredPromotionName, setPromotionName] = useState(promotion.promotionName);
  const [enteredPackageName, setPackageName] = useState(promotion.packageName);
  const [enteredStandardPrice, setStandardPriceName] = useState(promotion.standardPrice);
  const [enteredSuvPrice, setSuvPrice] = useState(promotion.suvPrice);
  const [enteredIsEnabled, setIsEnabled] = useState(promotion.isEnabled);

  const updatePromotionName = (promotionName: any) => {
    setPromotionName(promotionName);
  };
  const updatePackageName = (packageName: any) => {
    setPackageName(packageName);
  };
  const updateStandardPrice = (standardPrice: any) => {
    setStandardPriceName(standardPrice);
  };
  const updateSuvPrice = (suvPrice: any) => {
    setSuvPrice(suvPrice);
  };
  const updateIsEnabled = (isEnabled: any) => {
    setIsEnabled(isEnabled);
  };

  const path = useHistory();

  const buttonHandler = () => {
    setShowLoader(true);
    if (props.name === "Update") {
      let url = "promotion/update";
      var payload = {
        promotionId: promotion.promotionId,
        promotionName: enteredPromotionName,
        packageName: enteredPackageName,
        standardPrice: enteredStandardPrice,
        suvPrice: enteredSuvPrice,
        isEnabled: enteredIsEnabled
      };

      Connection.processPostRequest(payload, url, (response: any) => {
        mapUpdateResponse(response);
      });
    } else if (props.name === "Delete") {
      let url = "promotion/remove/".concat(promotion.promotionId);

      Connection.processDeleteRequest({}, url, (response: any) => {
        mapDeleteResponse(response);
      });
    } else if (props.name === "Add") {
      let url = "promotion/add";
      var payload = {
        promotionId: promotion.promotionId,
        promotionName: enteredPromotionName,
        packageName: enteredPackageName,
        standardPrice: enteredStandardPrice,
        suvPrice: enteredSuvPrice,
        isEnabled: enteredIsEnabled
      };
      console.log(payload);
      Connection.processPostRequest(payload, url, (response: any) => {
        mapAddResponse(response);
      });
    }
  };

  const mapUpdateResponse = (response: any) => {
    if (response.type === "error") {
      setShowLoader(false);
      setErrorMessage(response.data);
      setShowError(true);
    } else {
      setShowLoader(false);
      setSuccessMessage("Promotion Updated!")
      setShowSuccess(true);
    }
  };
  const mapDeleteResponse = (response: any) => {
    if (response.type === "error") {
      setShowLoader(false);
      setErrorMessage(response.data);
      setShowError(true);
      console.log("error!");
    } else {
      setShowLoader(false);
      setSuccessMessage("Promotion Deleted!")
      setShowSuccess(true);
    }
  };
  const mapAddResponse = (response: any) => {
    if (response.type === "error") {
      setShowLoader(false);
      setErrorMessage(response.data);
      setShowError(true);
      console.log("error!");
    } else {
      setShowLoader(false);
      setSuccessMessage("Promotion Added!")
      setShowSuccess(true);
    }
  };

  return (
    <IonGrid>
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
        onDidDismiss={() => path.push("/page/Promotion/promotion")}
        header={"Success"}
        subHeader={successMessage}
        buttons={["OK"]}
      />
      <IonRow>
        <IonCol>
          <IonItem>
            <IonLabel position="floating">Promotion Name</IonLabel>
            <IonInput
              disabled={props.isDisabled}
              value={enteredPromotionName}
              onIonChange={(e) => updatePromotionName(e.detail.value)}
            ></IonInput>
          </IonItem>
        </IonCol>
      </IonRow>
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
            <IonLabel position="floating">Suv Price</IonLabel>
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
            <IonLabel>Enabled</IonLabel>
            <IonToggle
              checked={enteredIsEnabled}
              disabled={props.isDisabled}
              onIonChange={(e) => updateIsEnabled(e.detail.value)}
            />
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonButton shape="round" type="submit" expand="block" onClick={buttonHandler}>
            {props.name}
          </IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default PromotionForm;
