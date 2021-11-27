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
  IonTextarea,
  IonToggle,
  useIonViewDidEnter,
} from "@ionic/react";
import React, { useState } from "react";
import { useHistory } from "react-router";
import Connection from "../../mixins/Connection";
import { validName } from "../Regex/Regex";

const PackageForm: React.FC<{
  name: string;
  isDisabled: boolean;
  id: string;
}> = (props) => {

  useIonViewDidEnter(()=>{
    if(props.name === 'Update'){
      setShowLoader(true);
      getPackage();
    }
  });

  const path = useHistory();
  let valid: boolean = false;

  const [pack, setPack] = useState(
    {
      packageId: "",
      promotionId: "",
      packageName: "",
      minutes: 0,
      standardPrice: "",
      suvPrice: "",
      description: "",
      onPromotion: true,
    });

    const getPackage = () => {
      var url = "package/get/".concat(props.id);
  
      Connection.processGetRequest({}, url, (response: any) => {
        mapPackage(response);
      });
    };

    const mapPackage = (response: any) => {
      if (response.type === "error") {
        setShowLoader(false);
        setErrorMessage(response.data);
        setShowError(true);
      } else {
        setShowLoader(false);
        setPack(response.data.data);
      }
    };

    const [showLoader, setShowLoader] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);

  const updatePackageName = (packageName: any) => {
    pack.packageName = packageName;
  };
  const updateMinutes = (minutes: any) => {
    pack.minutes = minutes;
  };
  const updateStandardPrice = (standardPrice: any) => {
    pack.standardPrice = standardPrice
  };
  const updateSuvPrice = (suvPrice: any) => {
   pack.suvPrice = suvPrice;
  };
  const updateDescription = (description: any) => {
    pack.description = description;
  };
  const updateOnPromotion = (onPromotion: any) => {
    pack.onPromotion = onPromotion;
  };

  function mapDeleteResponse(response: any) {
    return (console.log("deleted"));
  }

  const buttonHandler = () => {
    validateForm();
    if(valid === true){
    if (props.name === "Update") {
      var url = "package/update";
      var payload = {
        packageId: pack.packageId,
        promotionId: pack.promotionId,
        packageName: pack.packageName,
        minutes: pack.minutes,
        standardPrice: pack.standardPrice,
        description:pack.description,
        suvPrice: pack.suvPrice,
        onPromotion: pack.onPromotion,
      };

      Connection.processPostRequest(payload, url, (response: any) => {
        mapResponse(response);
      });
    } else if (props.name === "Delete") {
      url = "package/remove/".concat(pack.packageId);

      Connection.processDeleteRequest({}, url,(response: any)=>{
        mapDeleteResponse(response);
      })

    } else {
      url = "package/add";
      var payload = {
        packageId: pack.packageId,
        promotionId: pack.promotionId,
        packageName: pack.packageName,
        minutes: pack.minutes,
        standardPrice: pack.standardPrice,
        description:pack.description,
        suvPrice: pack.suvPrice,
        onPromotion: pack.onPromotion,
      };
      Connection.processPostRequest(payload, url, (response: any) => {
        mapResponse(response);
      });
    }
  }
  };

  const mapResponse = (response: any) => {
    if(response.data === 'error'){
      setShowLoader(false);
      setErrorMessage(response.data.data);
      setShowError(true);
    }else{
      setShowLoader(false);
      if(props.name === 'Update'){
        setSuccessMessage('Successfully Updated!');
        setShowSuccess(true);
      }else{
        setSuccessMessage('Successfully Added!');
        setShowSuccess(true);
      }
    }
  };

  const validateForm = () => {
    if(pack.packageName === '' || pack.standardPrice === '' || pack.suvPrice === '' || pack.description === ''){
      setShowLoader(false);
      setErrorMessage('Fields must not be empty.')
      setShowError(true);
    }else if(!validName.test(pack.packageName)){
      setShowLoader(false);
      setErrorMessage('Invalid Package Name.')
      setShowError(true);
    }else if(pack.minutes <= 0){
      setShowLoader(false);
      setErrorMessage('You cannot have 0 minutes.')
      setShowError(true);
    }else if(pack.standardPrice <='0'){
      setShowLoader(false);
      setErrorMessage('You cannot have a free item')
      setShowError(true);
    }else{
      valid = true;
    }
  }
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
        onDidDismiss={() => path.push("/page/Package/package")}
        header={"Success"}
        subHeader={successMessage}
        buttons={["OK"]}
      />
      <IonRow>
        <IonCol>
          <IonItem>
            <IonLabel position="floating">Package Name</IonLabel>
            <IonInput
              disabled={props.isDisabled}
              value={pack.packageName}
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
              value={pack.minutes}
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
              value={pack.standardPrice}
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
              value={pack.suvPrice}
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
            spellcheck={true}
              disabled={props.isDisabled}
              value={pack.description}
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
              checked={pack.onPromotion}
              onIonChange={(e) => updateOnPromotion(e.detail.checked)}
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

export default PackageForm;