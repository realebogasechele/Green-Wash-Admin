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
} from "@ionic/react";
import { trash } from "ionicons/icons";
import React, { useState } from "react";
import { useHistory } from "react-router";
import Connection from "../../mixins/Connection";

const ComplexForm: React.FC<{
  name: string;
  isDisabled: boolean;
  content: any;
}> = (props) => {

  var {
    complexId,
    complexName,
    street1,
    street2,
    city,
    province,
    postalCode,
    telephoneNum,
    startTime,
    endTime,
    cellNum,
    agents,
    units,
  } = props.content;

  const [showLoader, setShowLoader] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [enteredComplexName, setEnteredComplexName] = useState(complexName);
  const [enteredStreet1, setEnteredStreet1] = useState(street1);
  const [enteredStreet2, setEnteredStreet2] = useState(street2);
  const [enteredCity, setEnteredCity] = useState(city);
  const [enteredProvince, setEnteredProvince] = useState(province);
  const [enteredPostalCode, setEnteredPostalCode] = useState(postalCode);
  const [enteredTelNum, setEnteredTelNum] = useState(telephoneNum);
  const [enteredStartTime, setEnteredStartTime] = useState(startTime.toString());
  const [enteredEndTime, setEnteredEndTime] = useState(endTime.toString());
  const [enteredCellNum, setEnteredCellNum] = useState(cellNum);

  const updateComplexName = (complexName: any) => {setEnteredComplexName(complexName)};
  const updateStreet1= (street1: any) => {setEnteredStreet1(street1)};
  const updateStreet2 = (street2: any) => {setEnteredStreet2(street2)};
  const updateCity = (city: any) => {setEnteredCity(city)};
  const updateProvince = (province: any) => {setEnteredProvince(province)};
  const updatePostalCode = (postalCode: any) => {setEnteredPostalCode(postalCode)};
  const updateTelNum = (telephoneNum: any) => {setEnteredTelNum(telephoneNum)};
  const updateStartTime = (startTime: any) => {setEnteredStartTime(startTime); console.log(startTime)};
  const updateEndTime = (endTime: any) => {setEnteredEndTime(endTime)};
  const updateCellNum = (cellNum: any) => {setEnteredCellNum(cellNum)};

  var num = 0;

  const path = useHistory();

  const [unitList, setUnitList] = useState<string[]>(units);
  
  const addUnit = (e: any) => {
    if (e.key === "Enter" && e.target.value !== '') {
      unitList.push(e.target.value);
      num = num + 1;
      setUnitList(unitList);
      console.log(unitList);
      console.log(unitList.indexOf(e.target.value))
      e.target.value = '';
    }
  };

  const removeUnit = (unit: any) => {
    let temp:any = [];
      for(let i = 0; i < unitList.length; i++){
          if(unitList[i] !== unit){
              temp.push(unitList[i]);
          }
      }
      setUnitList(temp);
      console.log(temp);
  };
  
  const submitHandler = () => {
    setShowLoader(true);
    if(props.name === "Update"){
      let url = "complex/update"
       const payload = {
         complexId: complexId,
         complexName: enteredComplexName,
         street1: enteredStreet1,
         street2: enteredStreet2,
         city: enteredCity,
         province: enteredProvince,
         postalCode: enteredPostalCode,
         telephoneNum: enteredTelNum,
         startTime: enteredStartTime,
         endTime: enteredEndTime,
         units: unitList,
         agents: agents
       }
       Connection.processPostRequest(payload, url, (response: any) =>{
         mapUpdateResponse(response);
       })

    }
    else if(props.name === "Delete"){
      let url = "complex/remove/".concat(complexId);

      Connection.processDeleteRequest({}, url, (response: any) =>{
        mapDeleteResponse(response);
      })

    }else if(props.name === "Add"){
       let url = "complex/add"
       const payload = {
         complexId: complexId,
         complexName: enteredComplexName,
         street1: enteredStreet1,
         street2: enteredStreet2,
         city: enteredCity,
         province: enteredProvince,
         postalCode: enteredPostalCode,
         telephoneNum: enteredTelNum,
         startTime: enteredStartTime,
         endTime: enteredEndTime,
         units: unitList,
         agents: agents
       }
       Connection.processPostRequest(payload, url, (response: any) =>{
         mapAddResponse(response);
       })
    }
  };

  const mapAddResponse = (response: any) =>{
    if (response.type === "error") {
      setErrorMessage(response.data);
      setShowLoader(false);
      setShowError(true);
      console.log("error!");
    } else {
      setShowLoader(false);
      setSuccessMessage("Complex Added!")
      setShowSuccess(true);
    }
  }
  const mapUpdateResponse = (response: any) =>{
    if (response.type === "error") {
      setErrorMessage(response.data);
      setShowLoader(false);
      setShowError(true);
    } else {
      setShowLoader(false);
      setSuccessMessage("Complex Updated!")
      setShowSuccess(true);
    }
  }

  const mapDeleteResponse = (response: any) =>{
    if (response.type === "error") {
      setShowLoader(false);
      setErrorMessage(response.data);
      setShowError(true);
      console.log("error!");
    } else {
      setShowLoader(false);
      setSuccessMessage("Complex Deleted!")
      setShowSuccess(true);
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
        onDidDismiss={() => path.push("/page/Complex/complex")}
        header={"Success"}
        subHeader={successMessage}
        buttons={["OK"]}
      />
      <IonRow>
        <IonCol>
          <IonItem>
            <IonLabel position="floating">Complex Name</IonLabel>
            <IonInput value={enteredComplexName} disabled={props.isDisabled} onIonChange={e => updateComplexName(e.detail.value)}/>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem>
            <IonLabel position="floating">Street 1</IonLabel>
            <IonInput value={enteredStreet1} disabled={props.isDisabled} onIonChange={e => updateStreet1(e.detail.value)}/>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem>
            <IonLabel position="floating">Street 2</IonLabel>
            <IonInput value={enteredStreet2} disabled={props.isDisabled} onIonChange={e => updateStreet2(e.detail.value)}/>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem>
            <IonLabel position="floating">City</IonLabel>
            <IonInput value={enteredCity} disabled={props.isDisabled} onIonChange={e => updateCity(e.detail.value)}/>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem>
            <IonLabel position="floating">Province</IonLabel>
            <IonInput value={enteredProvince} disabled={props.isDisabled} onIonChange={e => updateProvince(e.detail.value)}/>
          </IonItem>
        </IonCol>
        <IonCol>
          <IonItem>
            <IonLabel position="floating">Postal code</IonLabel>
            <IonInput value={enteredPostalCode} disabled={props.isDisabled} onIonChange={e => updatePostalCode(e.detail.value)}/>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem>
            <IonLabel position="floating">Telephone Number</IonLabel>
            <IonInput value={enteredTelNum} disabled={props.isDisabled} onIonChange={e => updateTelNum(e.detail.value)}/>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem>
            <IonLabel>Operational Start Time</IonLabel>
            <IonDatetime displayFormat="HH:mm" value={enteredStartTime} disabled={props.isDisabled} onIonChange={e => updateStartTime(e.detail.value)}/>
          </IonItem>
        </IonCol>
        <IonCol>
          <IonItem>
            <IonLabel>Operational End Time</IonLabel>
            <IonDatetime displayFormat="HH:mm" value={enteredEndTime} disabled={props.isDisabled} onIonChange={e => updateEndTime(e.detail.value)}/>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem>
            <IonLabel position="floating">Cell Number</IonLabel>
            <IonInput value={enteredCellNum} disabled={props.isDisabled} onIonChange={e => updateCellNum(e.detail.value)}/>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItemDivider>
            <IonLabel>Units</IonLabel>
          </IonItemDivider>
          {unitList.map((unit, index) => (
            <IonChip key = {index}>
              <IonLabel>{unit}</IonLabel>
              <IonIcon icon={trash} onClick={ e => removeUnit(unit)}/>
            </IonChip>
          ))}
          <IonItem>
            <IonInput onKeyUp={(e) => addUnit(e)} disabled={props.isDisabled}/>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonButton type="submit" expand="block" onClick={submitHandler}>
            {props.name}
          </IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default ComplexForm;
