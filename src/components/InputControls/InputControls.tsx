import { IonLabel, IonSegment, IonSegmentButton } from "@ionic/react";
import React from "react";

const InputControls: React.FC<{selectedValue: "Update" | "Delete"; onSelectedValue: (value: "Update" | "Delete")=> void;}> = (props) => {
    const inputChangeHandler = (event: CustomEvent) => {
        props.onSelectedValue(event.detail.value);
    }

    return(
        <IonSegment value ={props.selectedValue} onIonChange={inputChangeHandler}>
            <IonSegmentButton value = "Update">
                <IonLabel>Update</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value = "Delete">
                <IonLabel>Delete</IonLabel>
            </IonSegmentButton>
        </IonSegment>
    );
};

export default InputControls;