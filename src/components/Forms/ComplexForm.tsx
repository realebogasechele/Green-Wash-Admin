import {
  IonAlert,
  IonButton,
  IonChip,
  IonCol,
  IonDatetime,
  IonGrid,
  IonIcon,
  IonInput,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonLoading,
  IonRow,
  useIonViewDidEnter,
} from "@ionic/react";
import { trash } from "ionicons/icons";
import React, { useState } from "react";
import { useHistory } from "react-router";
import Connection from "../../mixins/Connection";
import { validCellNum, validName, validPostalCode } from "../Regex/Regex";

const ComplexForm: React.FC<{
  name: string;
  isDisabled: boolean;
  id: string;
}> = (props) => {
  useIonViewDidEnter(() => {
    if (props.name === "Update") {
      setShowLoader(true);
      getComplex();
    }
  });

  const [complex, setComplex] = useState({
    complexId: "",
    complexName: "",
    street1: "",
    street2: "",
    city: "",
    province: "",
    postalCode: "",
    telephoneNum: "",
    startTime: "",
    endTime: "",
    cellNum: "",
    units: ["Default"],
    agents: [],
  });

  const getComplex = () => {
    var url = "complex/get/".concat(props.id);
    Connection.processGetRequest({}, url, (response: any) => {
      mapComplex(response);
    });
  };

  const mapComplex = (response: any) => {
    if (response.type === "error") {
      setErrorMessage(response.data);
      setShowError(true);
    } else {
      setShowLoader(false);
      setComplex(response.data.data);
    }
  };

  const [showLoader, setShowLoader] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const updateComplexName = (complexName: any) =>
    (complex.complexName = complexName);
  const updateStreet1 = (street1: any) => (complex.street1 = street1);
  const updateStreet2 = (street2: any) => (complex.street2 = street2);
  const updateCity = (city: any) => (complex.city = city);
  const updateProvince = (province: any) => (complex.province = province);
  const updatePostalCode = (postalCode: any) =>
    (complex.postalCode = postalCode);
  const updateTelNum = (telephoneNum: any) =>
    (complex.telephoneNum = telephoneNum);
  const updateStartTime = (startTime: any) => (complex.startTime = startTime);
  const updateEndTime = (endTime: any) => (complex.endTime = endTime);
  const updateCellNum = (cellNum: any) => (complex.cellNum = cellNum);

  var num = 0;

  const path = useHistory();

  const [unitList, setUnitList] = useState<string[]>(complex.units);

  const addUnit = (e: any) => {
    if (e.key === "Enter" && e.target.value !== "") {
      complex.units.push(e.target.value);
      num = num + 1;
      setUnitList(unitList);
      console.log(complex.units);
      console.log(complex.units.indexOf(e.target.value));
      e.target.value = "";
    }
  };

  const removeUnit = (unit: any) => {
    let temp: any = [];
    for (let i = 0; i < complex.units.length; i++) {
      if (complex.units[i] !== unit) {
        temp.push(complex.units[i]);
      }
    }
    complex.units = temp;
    setUnitList(temp);
    console.log(temp);
  };

  const submitHandler = () => {
    setShowLoader(true);
    if (props.name === "Update") {
      validateForm();
    } else if (props.name === "Delete") {
      let url = "complex/remove/".concat(complex.complexId);

      Connection.processDeleteRequest({}, url, (response: any) => {
        mapDeleteResponse(response);
      });
    } else if (props.name === "Add") {
      validateForm();
    }
  };

  const validateForm = () => {
    if (
      complex.complexName === "" ||
      complex.street2 === "" ||
      complex.city === "" ||
      complex.province === "" ||
      complex.postalCode === "" ||
      complex.telephoneNum === "" ||
      complex.startTime === "" ||
      complex.endTime === "" ||
      complex.units === []
    ) {
      setShowLoader(false);
      setErrorMessage("Fields must not be left empty.");
      setShowError(true);
    } else if (!validName.test(complex.complexName)) {
      setShowLoader(false);
      setErrorMessage("Invalid Complex Name.");
      setShowError(true);
    } else if (!validName.test(complex.city)) {
      setShowLoader(false);
      setErrorMessage("Invalid City.");
      setShowError(true);
    } else if (!validName.test(complex.province)) {
      setShowLoader(false);
      setErrorMessage("Invalid Province.");
      setShowError(true);
    } else if (!validPostalCode.test(complex.postalCode)) {
      setShowLoader(false);
      setErrorMessage("Invalid Postal Code.");
      setShowError(true);
    } else if (!validCellNum.test(complex.telephoneNum)) {
      setShowLoader(false);
      setErrorMessage("Invalid Telephone Number.");
      setShowError(true);
    } else {
      if (props.name === "Add") {
        let url = "complex/add";
        const payload = {
          complexId: complex.complexId,
          complexName: complex.complexName,
          street1: complex.street1,
          street2: complex.street2,
          city: complex.city,
          province: complex.province,
          postalCode: complex.postalCode,
          telephoneNum: complex.telephoneNum,
          startTime: complex.startTime,
          endTime: complex.endTime,
          units: complex.units,
          agents: complex.agents,
        };
        Connection.processPostRequest(payload, url, (response: any) => {
          mapAddResponse(response);
        });
      } else {
        let url = "complex/update";
        const payload = {
          complexId: complex.complexId,
          complexName: complex.complexName,
          street1: complex.street1,
          street2: complex.street2,
          city: complex.city,
          province: complex.province,
          postalCode: complex.postalCode,
          telephoneNum: complex.telephoneNum,
          startTime: complex.startTime,
          endTime: complex.endTime,
          units: complex.units,
          agents: complex.agents,
        };
        Connection.processPostRequest(payload, url, (response: any) => {
          mapUpdateResponse(response);
        });
      }
    }
  };

  const mapAddResponse = (response: any) => {
    if (response.type === "error") {
      setErrorMessage(response.data);
      setShowLoader(false);
      setShowError(true);
      console.log("error!");
    } else {
      setShowLoader(false);
      setSuccessMessage("Complex Added!");
      setShowSuccess(true);
    }
  };
  const mapUpdateResponse = (response: any) => {
    if (response.type === "error") {
      setErrorMessage(response.data);
      setShowLoader(false);
      setShowError(true);
    } else {
      setShowLoader(false);
      setSuccessMessage("Complex Updated!");
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
      setSuccessMessage("Complex Deleted!");
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
        onDidDismiss={() => path.push("/page/Complex/complex")}
        header={"Success"}
        subHeader={successMessage}
        buttons={["OK"]}
      />
      <IonRow>
        <IonCol>
          <IonItem>
            <IonLabel position="floating">Complex Name</IonLabel>
            <IonInput
              value={complex.complexName}
              disabled={props.isDisabled}
              onIonChange={(e) => updateComplexName(e.detail.value)}
            />
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem>
            <IonLabel position="floating">Street 1</IonLabel>
            <IonInput
              value={complex.street1}
              disabled={props.isDisabled}
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
              value={complex.street2}
              disabled={props.isDisabled}
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
              value={complex.city}
              disabled={props.isDisabled}
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
              value={complex.province}
              disabled={props.isDisabled}
              onIonChange={(e) => updateProvince(e.detail.value)}
            />
          </IonItem>
        </IonCol>
        <IonCol>
          <IonItem>
            <IonLabel position="floating">Postal code</IonLabel>
            <IonInput
              value={complex.postalCode}
              disabled={props.isDisabled}
              onIonChange={(e) => updatePostalCode(e.detail.value)}
            />
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem>
            <IonLabel position="floating">Telephone Number</IonLabel>
            <IonInput
              value={complex.telephoneNum}
              disabled={props.isDisabled}
              onIonChange={(e) => updateTelNum(e.detail.value)}
            />
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem>
            <IonLabel>Operational Start Time (hours)</IonLabel>
            <IonDatetime
              displayFormat="HH"
              value={complex.startTime}
              disabled={props.isDisabled}
              onIonChange={(e) => updateStartTime(e.detail.value)}
            />
          </IonItem>
        </IonCol>
        <IonCol>
          <IonItem>
            <IonLabel>Operational End Time (hours)</IonLabel>
            <IonDatetime
              displayFormat="HH"
              value={complex.endTime}
              disabled={props.isDisabled}
              onIonChange={(e) => updateEndTime(e.detail.value)}
            />
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem>
            <IonLabel position="floating">Cell Number</IonLabel>
            <IonInput
              value={complex.cellNum}
              disabled={props.isDisabled}
              onIonChange={(e) => updateCellNum(e.detail.value)}
            />
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItemDivider>
            <IonLabel>Units</IonLabel>
          </IonItemDivider>
          {complex.units.map((unit, index) => (
            <IonChip key={index}>
              <IonLabel>{unit}</IonLabel>
              <IonIcon icon={trash} onClick={(e) => removeUnit(unit)} />
            </IonChip>
          ))}
          <IonItem>
            <IonInput onKeyUp={(e) => addUnit(e)} disabled={props.isDisabled} />
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonButton
            shape="round"
            type="submit"
            expand="block"
            onClick={() => submitHandler()}
          >
            {props.name}
          </IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default ComplexForm;
