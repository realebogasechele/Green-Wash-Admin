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
  useIonViewDidEnter,
} from "@ionic/react";
import React, { useState } from "react";
import { useHistory } from "react-router";
import Connection from "../../mixins/Connection";
import {
  validCellNum,
  validId,
  validName,
  validPassword,
  validPostalCode,
} from "../Regex/Regex";

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

const AgentForm: React.FC<{ name: string; isDisabled: boolean; id: string }> = (
  props
) => {
  useIonViewDidEnter(() => {
    if (props.name === "Update") {
      setShowLoader(true);
      getAgent();
    }
  });

  const path = useHistory();
  const [agent, setAgent] = useState({
    agentId: "",
    complexName: "",
    contractId: "",
    name: "",
    surname: "",
    id: "",
    cellNum: "",
    street1: "",
    street2: "",
    city: "",
    province: "",
    postalCode: "",
    password: "",
  });

  const getAgent = () => {
    var url = "agent/get/".concat(props.id);
    Connection.processGetRequest({}, url, (response: any) => {
      mapAgent(response);
    });
  };

  const getComplexes = () => {
    let url = "complex/get/all/names";
    Connection.processGetRequest({}, url, (response: any) =>
      mapComplexResponse(response)
    );
  };

  const mapComplexResponse = (response: any) => {
    if (response.type === "error") {
      setErrorMessage(response.data.data);
      setShowError(true);
    } else {
      setComplexes(response.data.data);
    }
  };

  const mapAgent = (response: any) => {
    if (response.type === "error") {
      setErrorMessage(response.data);
      setShowError(true);
    } else {
      setShowLoader(false);
      updateAgent(response.data.data);
    }
  };

  const [showLoader, setShowLoader] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [complexes, setComplexes] = useState([]);

  const [enteredComplexName, setComplexName] = useState(agent.complexName);
  const [enteredName, setName] = useState(agent.name);
  const [enteredSurname, setSurname] = useState(agent.surname);
  const [enteredId, setId] = useState(agent.id);
  const [enteredCellNum, setCellNum] = useState(agent.cellNum);
  const [enteredStreet1, setStreet1] = useState(agent.street1);
  const [enteredStreet2, setStreet2] = useState(agent.street2);
  const [enteredCity, setCity] = useState(agent.city);
  const [enteredProvince, setProvince] = useState(agent.province);
  const [enteredPostalCode, setPostalCode] = useState(agent.postalCode);
  const [enteredPassword, setPassword] = useState("");
  const [enteredConfirm, setConfirmPassword] = useState("");

  const updateAgent = (agent: any) => setAgent(agent);

  const updateComplexName = (complexName: any) =>
    (agent.complexName = complexName);
  const updateName = (name: any) => (agent.name = name);
  const updateSurname = (surname: any) => (agent.surname = surname);
  const updateId = (id: any) => (agent.id = id);
  const updateCellNum = (cellNum: any) => (agent.cellNum = cellNum);
  const updateStreet1 = (street1: any) => (agent.street1 = street1);
  const updateStreet2 = (street2: any) => (agent.street2 = street2);
  const updateCity = (city: any) => (agent.city = city);
  const updateProvince = (province: any) => (agent.province = province);
  const updatePostalCode = (postalCode: any) => (agent.postalCode = postalCode);
  const updatePassword = (password: any) => (agent.password = password);
  const updateConfirm = (cPassword: any) => setConfirmPassword(cPassword);

  const buttonHandler = () => {
    if (props.name === "Add") {
      validateForm();
    } else if (props.name === "Delete") {
      let url = "agent/remove/".concat(agent.agentId);
      console.log("deleted");
    } else {
      setShowLoader(true);
      validateForm();
    }
  };

  const mapResponse = (response: any) => {
    if (response.type === "error") {
      setShowLoader(false);
      setErrorMessage(response.data);
      setShowError(true);
    } else {
      if (props.name === "Update") {
        setShowLoader(false);
        setSuccessMessage("Agent Details Updated!");
        setShowSuccess(true);
      } else {
        setShowLoader(false);
        setSuccessMessage("Agent Details Captured!");
        setShowSuccess(true);
      }
    }
  };

  const validateForm = () => {
    if (
      agent.name === "" ||
      agent.surname === "" ||
      agent.complexName === "" ||
      agent.id === "" ||
      agent.cellNum === "" ||
      agent.street1 === "" ||
      agent.street2 === "" ||
      agent.city === "" ||
      agent.province === "" ||
      agent.postalCode === "" ||
      agent.password === ""
    ) {
      setShowLoader(false);
      setErrorMessage("Fields must not be empty.");
      setShowError(true);
    } 
    else if (props.name === "Add") {
      if (agent.password !== enteredConfirm) {
        setShowLoader(false);
        setErrorMessage(
          "Passwords do not match. Please ensure they are entered correctly!"
        );
        setShowError(true);
      } else {
        if (!validName.test(agent.name)) {
          setShowLoader(false);
          setErrorMessage("Invalid Name.");
          setShowError(true);
        } else if (!validName.test(agent.surname)) {
          setShowLoader(false);
          setErrorMessage("Invalid Surname.");
          setShowError(true);
        } else if (!validName.test(agent.complexName)) {
          setShowLoader(false);
          setErrorMessage("Invalid Complex Name.");
          setShowError(true);
        } else if (!validId.test(agent.id)) {
          setShowLoader(false);
          setErrorMessage("Invalid Id.");
          setShowError(true);
        } else if (!validCellNum.test(agent.cellNum)) {
          setShowLoader(false);
          setErrorMessage("Invalid Cell Number");
          setShowError(true);
        } else if (!validName.test(agent.city)) {
          setShowLoader(false);
          setErrorMessage("Invalid City");
          setShowError(true);
        } else if (!validName.test(agent.province)) {
          setShowLoader(false);
          setErrorMessage("Invalid Province.");
          setShowError(true);
        } else if (!validPostalCode.test(agent.postalCode)) {
          setShowLoader(false);
          setErrorMessage("Invalid Postal Code.");
          setShowError(true);
        } else if (!validPassword.test(agent.password)) {
          setShowLoader(false);
          setErrorMessage(
            "Password must be 8-16 characters long. Ensure it includes atleast 1 aphabet character and 1 digit."
          );
          setShowError(true);
        } else {
          console.log("add");
          let url = "agent/add";
          var request = {
            complexName: agent.complexName,
            contractId: "",
            name: agent.name,
            surname: agent.surname,
            id: agent.id,
            cellNum: agent.cellNum,
            street1: agent.street1,
            street2: agent.street2,
            city: agent.city,
            province: agent.province,
            postalCode: agent.postalCode,
            password: agent.password,
          };
          Connection.processPostRequest(request, url, (response: any) => {
            mapResponse(response);
          });
        }
      }
    } else {
      if (!validName.test(agent.name)) {
        setShowLoader(false);
        setErrorMessage("Invalid Name.");
        setShowError(true);
      } else if (!validName.test(agent.surname)) {
        setShowLoader(false);
        setErrorMessage("Invalid Surname.");
        setShowError(true);
      } else if (!validName.test(agent.complexName)) {
        setShowLoader(false);
        setErrorMessage("Invalid Complex Name.");
        setShowError(true);
      } else if (!validId.test(agent.id)) {
        setShowLoader(false);
        setErrorMessage("Invalid Id.");
        setShowError(true);
      } else if (!validCellNum.test(agent.cellNum)) {
        setShowLoader(false);
        setErrorMessage("Invalid Cell Number");
        setShowError(true);
      } else if (!validName.test(agent.city)) {
        setShowLoader(false);
        setErrorMessage("Invalid City");
        setShowError(true);
      } else if (!validName.test(agent.province)) {
        setShowLoader(false);
        setErrorMessage("Invalid Province.");
        setShowError(true);
      } else if (!validPostalCode.test(agent.postalCode)) {
        setShowLoader(false);
        setErrorMessage("Invalid Postal Code.");
        setShowError(true);
      } else if (!validPassword.test(agent.password)) {
        setShowLoader(false);
        setErrorMessage(
          "Password must be 8-16 characters long. Ensure it includes atleast 1 aphabet character and 1 digit."
        );
        setShowError(true);
      } else {
        if (props.name === "Update") {
          let url = "agent/update";
          var payload = {
            agentId: agent.agentId,
            complexName: agent.complexName,
            contractId: agent.contractId,
            name: agent.name,
            surname: agent.surname,
            id: agent.id,
            cellNum: agent.cellNum,
            street1: agent.street1,
            street2: agent.street2,
            city: agent.city,
            province: agent.province,
            postalCode: agent.postalCode,
            password: agent.password,
          };
          Connection.processPostRequest(payload, url, (response: any) => {
            mapResponse(response);
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
              value={agent.name}
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
              value={agent.surname}
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
              value={agent.id}
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
              value={agent.cellNum}
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
              value={agent.street1}
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
              value={agent.street2}
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
              value={agent.city}
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
              value={agent.province}
              onIonChange={(e) => updateProvince(e.detail.value)}
            />
          </IonItem>
        </IonCol>
        <IonCol>
          <IonItem>
            <IonLabel position="floating">Postal code</IonLabel>
            <IonInput
              disabled={props.isDisabled}
              value={agent.postalCode}
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
              value={agent.complexName}
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
              value={agent.password}
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
          <IonButton
            shape="round"
            type="submit"
            expand="block"
            onClick={buttonHandler}
          >
            {props.name}
          </IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default AgentForm;
