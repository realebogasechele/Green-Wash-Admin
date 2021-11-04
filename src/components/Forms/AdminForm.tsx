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

import { validCellNum, validPassword, validName } from "../Regex/Regex";

interface Admin {
  adminId: string;
  name: string;
  surname: string;
  cellNum: string;
  password: string;
}

const AdminForm: React.FC<{ buttonName: string; content: Admin }> = (props) => {
  const { adminId, name, surname, cellNum, password } = props.content;

  const [showLoader, setShowLoader] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const [enteredName, setEnteredName] = useState(name);
  const [enteredSurname, setEnteredSurname] = useState(surname);
  const [enteredCellNum, setEnteredCellNum] = useState(cellNum);
  const [enteredPassword, setEnteredPassword] = useState(password);
  const [confirmPassword, setConfirmPassword] = useState("");

  const updateName = (name: any) => {
    setEnteredName(name);
  };
  const updateSurname = (surname: any) => {
    setEnteredSurname(surname);
  };
  const updateCellNum = (cellNum: any) => {
    setEnteredCellNum(cellNum);
  };
  const updatePassword = (password: any) => {
    setEnteredPassword(password);
  };
  const updateConfirmPassword = (confirmPassword: any) => {
    setConfirmPassword(confirmPassword);
  };

  let path = useHistory();

  if (props.buttonName === "Update") {
  } else {
  }

  const buttonHandler = () => {
    validateForm();
    if (isFormValid === true) {
      if (props.buttonName === "Update") {
        let url = "update";

        let payload = {
          adminId: adminId,
          name: enteredName,
          surname: enteredSurname,
          cellNum: enteredCellNum,
          password: enteredPassword,
        };
        Connection.processPostRequest(payload, url, (response: any) => {
          mapUpdateResponse(response);
        });

      } else if (props.buttonName === "Delete") {
        setShowLoader(false);
        let path = "remove/";
        console.log(path);
      } else {
        let url = "signUp";
        let payload = {
          adminId: adminId,
          name: enteredName,
          surname: enteredSurname,
          cellNum: enteredCellNum,
          password: enteredPassword,
        };

        Connection.processPostRequest(payload, url, (response: any) => {
          mapPostResponse(response);
        });
      }
    }
  };

  const mapUpdateResponse = (response: any) => {
    setShowLoader(false);
    if (response.type === "error") {
      setShowLoader(false);
      setErrorMessage(response.data);
      setShowError(true);
    } else {
      setShowLoader(false);
      setSuccessMessage("Profile Updated!");
      setShowSuccess(true);
    }
  };

  const mapPostResponse = (response: any) => {
    setShowLoader(false);
    if (response.type === "error") {
      setShowLoader(false);
      setErrorMessage(response.data);
      setShowError(true);
    } else {
      setShowLoader(false);
      setSuccessMessage("Details Successfully Captured!");
      setShowSuccess(true);
    }
  };

  const validateForm = () => {
    if (
      enteredName === "" ||
      enteredSurname === "" ||
      enteredCellNum === "" ||
      enteredPassword === ""
    ) {
      setShowLoader(false);
      setErrorMessage("Fields must not be left empty.");
      setShowError(true);
      setIsFormValid(false);
    } else if (enteredPassword !== confirmPassword) {
      setShowLoader(false);
      setErrorMessage(
        "Passwords do not match. Please ensure they are entered correctly!"
      );
      setShowError(true);
      setIsFormValid(false);
    } else {
      if (!validName.test(enteredName)) {
        setShowLoader(false);
        setErrorMessage("Invalid Name.");
        setShowError(true);
        setIsFormValid(false);
      } else if (!validName.test(enteredSurname)) {
        setShowLoader(false);
        setErrorMessage("Invalid Surname.");
        setShowError(true);
        setIsFormValid(false);
      } else if (!validCellNum.test(enteredCellNum)) {
        setShowLoader(false);
        setErrorMessage("Invalid Cell Number.");
        setShowError(true);
        setIsFormValid(false);
      } else if (!validPassword.test(enteredPassword)) {
        setShowLoader(false);
        setErrorMessage(
          "Password must be 8-16 characters long. Ensure it includes atleast 1 aphabet character and 1 digit."
        );
        setShowError(true);
        setIsFormValid(false);
      } else {
        setIsFormValid(true);
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
        isOpen={
         showSuccess
        }
        onDidDismiss={
            () => path.push("/signIn")
        }
        header={"Success"}
        subHeader={successMessage}
        buttons={["OK"]}
      />
      <IonRow>
        <IonCol>
          <IonItem>
            <IonLabel position="floating">Name</IonLabel>
            <IonInput
              type="text"
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
              type="text"
              value={enteredSurname}
              onIonChange={(e) => updateSurname(e.detail.value)}
            />
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem>
            <IonLabel position="floating">Cell Number</IonLabel>
            <IonInput
              type="text"
              value={enteredCellNum}
              onIonChange={(e) => updateCellNum(e.detail.value)}
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
              value={enteredPassword}
              onIonChange={(e) => updatePassword(e.detail.value)}
            />
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem>
            <IonLabel position="floating">Confrim Password</IonLabel>
            <IonInput
              type="password"
              value={confirmPassword}
              onIonChange={(e) => updateConfirmPassword(e.detail.value)}
            />
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonButton
            shape="round"
            type="submit"
            expand="block"
            onClick={buttonHandler}
          >
            {props.buttonName}
          </IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default AdminForm;
