/** @jsxImportSource theme-ui */
import { Storage } from "@capacitor/storage";
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
  useIonViewWillEnter,
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

const AdminForm: React.FC<{
  buttonName: string;
  content: Admin;
  isDisabled: boolean;
}> = (props) => {
  const { adminId, name, surname, cellNum, password } = props.content;

  useIonViewWillEnter(() => {
    if (props.buttonName === "Update") {
      setShowLoader(true);
      getAdminId();
    }
  });

  let admin = {
    adminId: "",
    name: "",
    surname: "",
    cellNum: "",
    email: "",
    password: "",
  };

  const getAdminId = async () => {
    const id: any = await Storage.get({ key: "adminId" });
    const adminId = id.value;

    getAdminDetails(adminId);
  };

  const getAdminDetails = (adminId: string) => {
    let url = "get/".concat(adminId);
    Connection.processGetRequest({}, url, (response: any) => {
      mapResponse(response);
    });
  };
  const updateAdmin = (response: any) => {
    admin = response;
  };

  const mapResponse = (response: any) => {
    if (response.type === "error") {
      setShowLoader(false);
      setMessage(response.data);
      setShowError(true);
    } else {
      updateAdmin(response.data.data);
      updateName(admin.name);
      updateSurname(admin.surname);
      updateCellNum(admin.cellNum);
      updateEmail(admin.email);
      setShowLoader(false);
    }
  };

  const [showLoader, setShowLoader] = useState(false);
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState("");
  const [showSuccessUpdate, setShowSuccessUpdate] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const [enteredName, setEnteredName] = useState(name);
  const [enteredSurname, setEnteredSurname] = useState(surname);
  const [enteredCellNum, setEnteredCellNum] = useState(cellNum);
  const [enteredEmail, setEnteredEmail] = useState(cellNum);
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
  const updateEmail = (email: any) => {
    setEnteredEmail(email);
  };
  const updatePassword = (password: any) => {
    setEnteredPassword(password);
  };
  const updateConfirmPassword = (confirmPassword: any) => {
    setConfirmPassword(confirmPassword);
  };

  const getId = async () => {
    const id: any = await Storage.get({ key: "adminId" });
    const adminId = id.value;
    if (props.buttonName === "Update") {
      finishUpdate(adminId);
    } else {
      finishDelete(adminId);
    }
  };
  const finishUpdate = (adminId: any) => {
    let url = "update";
    let payload = {
      adminId: adminId,
      name: enteredName,
      surname: enteredSurname,
      cellNum: enteredCellNum,
      email: enteredEmail,
      password: enteredPassword,
    };
    Connection.processPostRequest(payload, url, (response: any) => {
      mapUpdateResponse(response);
    });
  };

  const finishDelete = (adminId: any) => {
    let url = "remove/".concat(adminId);
    Connection.processPostRequest({}, url, (response: any) =>
      mapDeleteResponse(response)
    );
  };

  const removeId = async() => {
    await Storage.remove({key: "adminId"});
  }

  let path = useHistory();

  const buttonHandler = () => {
    if (props.buttonName === "Update") {
      setShowLoader(true);
      validateForm();
    } 
    else if(props.buttonName === 'Delete'){
      setMessage('By selecting delete you will lose all of your personal data as well as your account ?')
      setShowInfo(true);
    }else{
      setShowLoader(true);
      validateForm();
    }
  };

  const mapUpdateResponse = (response: any) => {
    setShowLoader(false);
    if (response.type === "error") {
      setShowLoader(false);
      setMessage(response.data);
      setShowError(true);
    } else {
      setShowLoader(false);
      setMessage("Profile Updated!");
      setShowSuccessUpdate(true);
    }
  };

  const mapPostResponse = (response: any) => {
    if (response.type === "error") {
      setShowLoader(false);
      setMessage(response);
      setShowError(true);
    } else {
      setShowLoader(false);
      setMessage("Details Successfully Captured!");
      setShowSuccess(true);
    }
  };

  const mapDeleteResponse = (response: any) => {
    if (response.type === "error") {
      setShowLoader(false);
      setMessage(response.data);
      setShowError(true);
    } else {
      removeId();
      setMessage("Profile Deleted!");
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
      setMessage("Fields must not be left empty.");
      setShowError(true);
      setIsFormValid(false);
    } else if (enteredPassword !== confirmPassword) {
      setShowLoader(false);
      setMessage(
        "Passwords do not match. Please ensure they are entered correctly!"
      );
      setShowError(true);
      setIsFormValid(false);
    } else {
      if (!validName.test(enteredName)) {
        setShowLoader(false);
        setMessage("Invalid Name.");
        setShowError(true);
        setIsFormValid(false);
      } else if (!validName.test(enteredSurname)) {
        setShowLoader(false);
        setMessage("Invalid Surname.");
        setShowError(true);
        setIsFormValid(false);
      } else if (!validCellNum.test(enteredCellNum)) {
        setShowLoader(false);
        setMessage("Invalid Cell Number.");
        setShowError(true);
        setIsFormValid(false);
      } else if (!validPassword.test(enteredPassword)) {
        setShowLoader(false);
        setMessage(
          "Password must be 8-16 characters long. Ensure it includes atleast 1 aphabet character and 1 digit."
        );
        setShowError(true);
        setIsFormValid(false);
      } else {
        if(props.buttonName === "Update"){
          getId();
        }else{
          let url = "signUp";
          let payload = {
          name: enteredName,
          surname: enteredSurname,
          cellNum: enteredCellNum,
          email: enteredEmail,
          password: enteredPassword,
        };

        Connection.processPostRequest(payload, url, (response: any) => {
          mapPostResponse(response);
        });
        }
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
        message={message}
        buttons={["OK"]}
      />

      <IonAlert
        isOpen={showSuccess}
        onDidDismiss={() => path.push("/signIn")}
        header={"Success"}
        subHeader={message}
        buttons={["OK"]}
      />
      <IonAlert
        isOpen={showSuccessUpdate}
        onDidDismiss={() => path.push("/dashboard")}
        header={"Success"}
        subHeader={message}
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
          },
          {
            text: "Continue",
            handler: () => {
              setShowInfo(false);
              setMessage('Are you sure ?');
              setShowConfirm(true);
            },
          },
        ]}
      />
      <IonAlert
        isOpen={showConfirm}
        onDidDismiss={() => setShowConfirm(false)}
        cssClass="my-custom-class"
        header={"Confirm"}
        message={message}
        buttons={[
          {
            text: "No",
            role: "cancel",
            cssClass: "secondary",
            handler: () => {},
          },
          {
            text: "Yes, I'm sure",
            handler: () => {
              getId();
              setShowConfirm(false);
            },
          },
        ]}
      />
      <IonRow>
        <IonCol>
          <IonItem sx={styles.item}>
            <IonLabel position="floating">
              Name <span sx={styles.arterisk.name}>*</span>
            </IonLabel>
            <IonInput
              type="text"
              value={enteredName}
              disabled={props.isDisabled}
              onIonChange={(e) => updateName(e.detail.value)}
            />
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem sx={styles.item}>
            <IonLabel position="floating">
              Surname <span sx={styles.arterisk.surname}>*</span>
            </IonLabel>
            <IonInput
              type="text"
              value={enteredSurname}
              disabled={props.isDisabled}
              onIonChange={(e) => updateSurname(e.detail.value)}
            />
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem sx={styles.item}>
            <IonLabel position="floating">
              Cell Number <span sx={styles.arterisk.cellNum}>*</span>
            </IonLabel>
            <IonInput
              type="text"
              value={enteredCellNum}
              disabled={props.isDisabled}
              onIonChange={(e) => updateCellNum(e.detail.value)}
            />
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem sx={styles.item}>
            <IonLabel position="floating">
              Email <span sx={styles.arterisk.email}>*</span>
            </IonLabel>
            <IonInput
              type="text"
              value={enteredEmail}
              disabled={props.isDisabled}
              onIonChange={(e) => updateEmail(e.detail.value)}
            />
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem sx={styles.item}>
            <IonLabel position="floating">
              Password <span sx={styles.arterisk.pass}>*</span>
            </IonLabel>
            <IonInput
              type="password"
              value={enteredPassword}
              disabled={props.isDisabled}
              onIonChange={(e) => updatePassword(e.detail.value)}
            />
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem sx={styles.item}>
            <IonLabel position="floating">
              Confrim Password <span sx={styles.arterisk.confirm}>*</span>
            </IonLabel>
            <IonInput
              type="password"
              value={confirmPassword}
              disabled={props.isDisabled}
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
var display = {
  name: "inline-block",
  surname: "inline-block",
  cellNum: "inline-block",
  email: "inline-block",
  pass: "inline-block",
  confirm: "inline-block",
};

const styles = {
  arterisk: {
    name: {
      display: display.name,
      color: "red",
    },
    surname: {
      display: display.surname,
      color: "red",
    },
    cellNum: {
      display: display.cellNum,
      color: "red",
    },
    email: {
      display: display.email,
      color: "red",
    },
    pass: {
      display: display.pass,
      color: "red",
    },
    confirm: {
      display: display.confirm,
      color: "red",
    },
  },
  item: {
    mb: "2vh",
  },
};
