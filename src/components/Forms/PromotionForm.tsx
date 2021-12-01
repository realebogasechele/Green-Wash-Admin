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
import { validName } from "../Regex/Regex";

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

    useIonViewWillEnter(()=>{
      if(props.name === "Update"){
        getPromotion();
      }
    })

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

  const updatePromotionName = (promotionName: any) => {
    promotion.promotionName = promotionName;
  };
  const updatePackageName = (packageName: any) => {
    promotion.packageName = packageName;
  };
  const updateStandardPrice = (standardPrice: any) => {
    promotion.standardPrice = standardPrice;
  };
  const updateSuvPrice = (suvPrice: any) => {
    promotion.suvPrice = suvPrice;
  };
  const updateIsEnabled = (isEnabled: any) => {
    promotion.isEnabled = isEnabled;
  };

  const path = useHistory();

  const buttonHandler = () => {
    setShowLoader(true);
    if (props.name === "Update") {
      validateForm();
    } else if (props.name === "Delete") {
      let url = "promotion/remove/".concat(promotion.promotionId);

      Connection.processDeleteRequest({}, url, (response: any) => {
        mapDeleteResponse(response);
      });
    } else if (props.name === "Add") {
      validateForm();
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

  const validateForm = () => {
    if(promotion.promotionName === "" ||
    promotion.packageName === "" ||
    promotion.standardPrice === "" ||
    promotion.suvPrice === ""){
      setShowLoader(false);
      setErrorMessage("Fields must not be empty.");
      setShowError(true);
    }else if (!validName.test(promotion.promotionName)){
      setShowLoader(false);
      setErrorMessage("Invalid Promotion Name.")
      setShowError(true);
    }else if(!validName.test(promotion.packageName)){
      setShowLoader(false);
      setErrorMessage("Invalid Package Name.");
      setShowError(true);
    }else{
      if(props.name === "Update"){
        let url = "promotion/update";
      var payload = {
        promotionId: promotion.promotionId,
        promotionName: promotion.promotionName,
        packageName: promotion.packageName,
        standardPrice: promotion.standardPrice,
        suvPrice: promotion.suvPrice,
        isEnabled: promotion.isEnabled
      };

      Connection.processPostRequest(payload, url, (response: any) => {
        mapUpdateResponse(response);
      });
      }else{
        let url = "promotion/add";
        var add = {
        promotionName: promotion.promotionName,
        packageName: promotion.packageName,
        standardPrice: promotion.standardPrice,
        suvPrice: promotion.suvPrice,
        isEnabled: promotion.isEnabled
      };
      Connection.processPostRequest(add, url, (response: any) => {
        mapAddResponse(response);
      });
      }
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
              value={promotion.promotionName}
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
              value={promotion.packageName}
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
              value={promotion.standardPrice}
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
              value={promotion.suvPrice}
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
              checked={promotion.isEnabled}
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
