"use client";
import useMultiStep from "@/app/hooks/useMultiStep";
import { UserForm } from "@/types/users";
import Link from "next/link";
import React, { FormEvent, ReactNode, useState } from "react";
import StepOne from "../components/StepOne";
import StepTwo from "../components/StepTwo";
import StepThree from "../components/StepThree";
import StepFour from "../components/StepFour";
import StepFive from "../components/StepFive";

const page = () => {
  const [initialData, setInitialData] = useState<UserForm>({
    fullName: "",
    age: "",
    gender: "female",
    dateOfBirth: "",
    country: "Nigeria",
    email: "",
    address: "",
    phoneNumber: "",
    partnerFullName: "",
    partnerAge: "",
    partnerGender: "Male",
    partnerEmail: "",
    partnerPhoneNumber: "",
    medicalHistory: "",
    password: "",
  });

  const [hasPartner, setHasPartner] = useState<string>("no");
  const [hasMedHistory, setHasMedHistory] = useState<string>("no");
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);

  const handleChange = (fields: Partial<UserForm>) => {
    setInitialData((prev) => ({
      ...prev,
      ...fields,
    }));
  };

  const {
    steps,
    currentStepIndex,
    nextStep,
    prevStep,
    goToStep,
    isFirstStep,
    isLastStep,
  } = useMultiStep([
    <StepOne {...initialData} updateFields={handleChange} />,
    <StepTwo
      {...initialData}
      updateFields={handleChange}
      setHasPartner={setHasPartner}
      hasPartner={hasPartner}
    />,
    <StepThree {...initialData} updateFields={handleChange} />,
    <StepFour
      {...initialData}
      updateFields={handleChange}
      setHasMedHistory={setHasMedHistory}
      hasMedHistory={hasMedHistory}
      hasPartner={hasPartner}
    />,
    <StepFive
      {...initialData}
      acceptTerms={acceptTerms}
      setAcceptTerms={setAcceptTerms}
      hasMedHistory={hasMedHistory}
      hasPartner={hasPartner}
    />,
  ]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (currentStepIndex + 1 === 2 && hasPartner === "yes") {
      return nextStep();
    }
    else if (currentStepIndex + 1 === 2 && hasPartner === "no") {
      return goToStep(3);
    }
    else if(!isLastStep){
      return nextStep();
    }
    else if (isLastStep && acceptTerms) {
      alert("Yay You made It")
    }
  };

  const handleReturn = () => {
    if (currentStepIndex + 1 === 3 && hasPartner === "yes") {
      return prevStep();
    }
    else if (currentStepIndex + 1 === 4 && hasPartner === "no") {
      return goToStep(currentStepIndex - 2);
      
    }else {
      return prevStep()
    }
  }


  return (
    <div>
      <h1>Sign Up</h1>
      <div>
        Step {currentStepIndex + 1} of {steps.length}
      </div>
      <form onSubmit={handleSubmit}>
        <div>{steps[currentStepIndex]}</div>
        <div className="flex justify-between">
          {!isFirstStep && (
            <button type="button" onClick={handleReturn}>
              Back
            </button>
          )}
          <button type="submit">{isLastStep ? "Finish" : "Next"}</button>
        </div>
      </form>
    </div>
  );
};

export default page;
