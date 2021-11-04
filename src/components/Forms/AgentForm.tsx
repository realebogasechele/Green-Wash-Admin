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
} from "@ionic/react";
import React, { useState } from "react";
import { useHistory } from "react-router";
import Connection from "../../mixins/Connection";
import { validCellNum, validId, validName, validPassword, validPostalCode } from "../Regex/Regex";

interface Agent {
  complexName: string;
  contractId: string;
  name: string;
  surname: string;
  id: string;
  cellNum: string;
  street1: string;
  street2: string;
  city: string;
  province: string;
  postalCode: string;
  password: string;
}

const AgentForm: React.FC<{ name: string; isDisabled: boolean; content: any }> =
  (props) => {
    const {
      agentId,
      complexName,
      contractId,
      name,
      surname,
      id,
      cellNum,
      street1,
      street2,
      city,
      province,
      postalCode,
      password,
    } = props.content;

    const path = useHistory();

    const [showLoader, setShowLoader] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    const [enteredComplexName, setComplexName] = useState(complexName);
    const [enteredName, setName] = useState(name);
    const [enteredSurname, setSurname] = useState(surname);
    const [enteredId, setId] = useState(id);
    const [enteredCellNum, setCellNum] = useState(cellNum);
    const [enteredStreet1, setStreet1] = useState(street1);
    const [enteredStreet2, setStreet2] = useState(street2);
    const [enteredCity, setCity] = useState(city);
    const [enteredProvince, setProvince] = useState(province);
    const [enteredPostalCode, setPostalCode] = useState(postalCode);
    const [enteredPassword, setPassword] = useState("");
    const [enteredConfirm, setConfirmPassword] = useState("");

    const updateComplexName = (complexName: any) => setComplexName(complexName);
    const updateName = (name: any) => setName(name);
    const updateSurname = (surname: any) => setSurname(surname);
    const updateId = (id: any) => setId(id);
    const updateCellNum = (cellNum: any) => setCellNum(cellNum);
    const updateStreet1 = (street1: any) => setStreet1(street1);
    const updateStreet2 = (street2: any) => setStreet2(street2);
    const updateCity = (city: any) => setCity(city);
    const updateProvince = (province: any) => setProvince(province);
    const updatePostalCode = (postalCode: any) => setPostalCode(postalCode);
    const updatePassword = (password: any) => setPassword(password);
    const updateConfirm = (cPassword: any) => setConfirmPassword(cPassword);

    const buttonHandler = () => {
      validateForm();
      if(isFormValid){
        if(props.name === "Add"){
          let url = "agent/add";
          var payload = {
            agentId: agentId,
            complexName: enteredComplexName,
            contractId: contractId,
            name: enteredName,
            surname: enteredSurname,
            id: enteredId,
            cellNum: enteredCellNum,
            street1: enteredStreet1,
            street2: enteredStreet2,
            city: enteredCity,
            province: enteredProvince,
            postalCode: enteredPostalCode,
            password: enteredPassword 
          }
          Connection.processPostRequest(payload, url, (response: any) => {
            mapAddResponse(response);
          });
        }
      }
    };

    const mapAddResponse = (response: any) => {
      if (response.type === "error") {
        setShowLoader(false);
        setErrorMessage(response.data);
        setShowError(true);
      } else {
        setShowLoader(false);
        setSuccessMessage("Agent Details Captured!");
        setShowSuccess(true);
      }
    };

    const validateForm = () => {
      if (
        enteredName === "" ||
        enteredSurname === "" ||
        enteredComplexName === "" ||
        enteredId === "" ||
        enteredCellNum === "" ||
        enteredStreet1 === "" ||
        enteredStreet2 === "" ||
        enteredCity === "" ||
        enteredProvince === "" ||
        enteredPostalCode === "" ||
        enteredPassword === "" ||
        enteredConfirm === ""
      ) {
        setShowLoader(false);
        setErrorMessage("Fields must not be empty.");
        setShowError(true);
      }else if(enteredPassword !== enteredConfirm){
        setShowLoader(false);
        setErrorMessage(
        "Passwords do not match. Please ensure they are entered correctly!"
      );
      setShowError(true);
      setIsFormValid(false);
      }
      else{
        if(!validName.test(enteredName)){
          setShowLoader(false);
          setIsFormValid(false);
          setErrorMessage("Invalid Name.");
          setShowError(true);
        }else if (!validName.test(enteredSurname)){
          setShowLoader(false);
          setIsFormValid(false);
          setErrorMessage("Invalid Surname.");
          setShowError(true);
        }else if (!validName.test(enteredComplexName)){
          setShowLoader(false);
          setIsFormValid(false);
          setErrorMessage("Invalid Complex Name.");
          setShowError(true);
        }else if(!validId.test(enteredId)){
          setShowLoader(false);
          setIsFormValid(false);
          setErrorMessage("Invalid Id.");
          setShowError(true);
        }else if(!validCellNum.test(enteredCellNum)){
          setShowLoader(false);
          setIsFormValid(false);
          setErrorMessage("Invalid Cell Number");
          setShowError(true);
        }else if(!validName.test(enteredCity)){
          setShowLoader(false);
          setErrorMessage("Invalid City");
          setShowError(true);
        }
        else if(!validName.test(enteredProvince)){
          setShowLoader(false);
          setIsFormValid(false);
          setErrorMessage("Invalid Province.");
          setShowError(true);
        }else if(!validPostalCode.test(enteredPostalCode)){
          setShowLoader(false);
          setIsFormValid(false);
          setErrorMessage("Invalid Postal Code.");
          setShowError(true);
        }else if(!validPassword.test(enteredPassword)){
          setShowLoader(false);
          setIsFormValid(false);
          setErrorMessage("Password must be 8-16 characters long. Ensure it includes atleast 1 aphabet character and 1 digit.");
          setShowError(true);
        }
        else{
          setIsFormValid(true)
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
        onDidDismiss={() => path.push("/page/Agent/agent")}
        header={"Success"}
        subHeader={successMessage}
        buttons={["OK"]}
      />
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position="floating">Name</IonLabel>
              <IonInput
                disabled={props.isDisabled}
                value={enteredName}
                onIonChange={(e) => updateName(e.detail.value)}
              />
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position="floating">Surname</IonLabel>
              <IonInput
                disabled={props.isDisabled}
                value={enteredSurname}
                onIonChange={(e) => updateSurname(e.detail.value)}
              />
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position="floating">ID</IonLabel>
              <IonInput
                disabled={props.isDisabled}
                value={enteredId}
                onIonChange={(e) => updateId(e.detail.value)}
              />
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position="floating">Cell Number</IonLabel>
              <IonInput
                disabled={props.isDisabled}
                value={enteredCellNum}
                onIonChange={(e) => updateCellNum(e.detail.value)}
              />
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position="floating">Street 1</IonLabel>
              <IonInput
                disabled={props.isDisabled}
                value={enteredStreet1}
                onIonChange={(e) => updateStreet1(e.detail.value)}
              />
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position="floating">Street 2</IonLabel>
              <IonInput
                disabled={props.isDisabled}
                value={enteredStreet2}
                onIonChange={(e) => updateStreet2(e.detail.value)}
              />
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position="floating">City</IonLabel>
              <IonInput
                disabled={props.isDisabled}
                value={enteredCity}
                onIonChange={(e) => updateCity(e.detail.value)}
              />
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position="floating">Province</IonLabel>
              <IonInput
                disabled={props.isDisabled}
                value={enteredProvince}
                onIonChange={(e) => updateProvince(e.detail.value)}
              />
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              <IonLabel position="floating">Postal code</IonLabel>
              <IonInput
                disabled={props.isDisabled}
                value={enteredPostalCode}
                onIonChange={(e) => updatePostalCode(e.detail.value)}
              />
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position="floating">Complex</IonLabel>
              <IonInput
                disabled={props.isDisabled}
                value={enteredComplexName}
                onIonChange={(e) => updateComplexName(e.detail.value)}
              />
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position="floating">Password</IonLabel>
              <IonInput
                type="password"
                disabled={props.isDisabled}
                value={enteredPassword}
                onIonChange={(e) => updatePassword(e.detail.value)}
              />
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position="floating"> Confirm Password</IonLabel>
              <IonInput
                type="password"
                disabled={props.name === "Add" ? props.isDisabled : true}
                value={enteredConfirm}
                onIonChange={(e) => updateConfirm(e.detail.value)}
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

export default AgentForm;
