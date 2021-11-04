import React from "react";
import AgentForm from "../Forms/AgentForm";
import ComplexForm from "../Forms/ComplexForm";
import PackageForm from "../Forms/PackageForm";
import PromotionForm from "../Forms/PromotionForm";

interface Pack {
  packageId: string;
  promotionId: string;
  packageName: string;
  minutes: number;
  standardPrice: string;
  suvPrice: string;
  description: string;
  onPromotion: boolean;
}

interface Promotion {
  promotionId: string;
  promotionName: string;
  packageName: string;
  standardPrice: string;
  suvPrice: string;
  isEnabled: boolean;
}
interface Complex {
  complexId: string;
  complexName: string;
  street1: string;
  street2: string;
  city: string;
  province: string;
  postalCode: string;
  telephoneNum: string;
  startTime: Date;
  endTime: Date;
  cellNum: string;
  units: string[];
  agents: string[];
}
interface Agent {
  agentId: string;
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

const MultiForm: React.FC<{
  buttonName: string;
  type: "agent" | "complex" | "package" | "promotion";
  isDisabled: boolean;
  content: any;
}> = (props) => {
  let form;

  if (props.type === "agent") {
    form = (
      <AgentForm
        name={props.buttonName}
        isDisabled={props.isDisabled}
        content={props.content}
      />
    );
  } else if (props.type === "complex") {
    form = (
      <ComplexForm
        name={props.buttonName}
        isDisabled={props.isDisabled}
        content={props.content}
      />
    );
  } else if (props.type === "package") {
    form = (
      <PackageForm
        name={props.buttonName}
        isDisabled={props.isDisabled}
        content={props.content}
      />
    );
  } else {
    form = (
      <PromotionForm
        name={props.buttonName}
        isDisabled={props.isDisabled}
        content={props.content}
      />
    );
  }

  return <>{form}</>;
};

export default MultiForm;
