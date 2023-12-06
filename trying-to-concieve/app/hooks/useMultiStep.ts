"use client"

import { ReactElement, useState } from "react"

export default function useMultiStep(steps: ReactElement[]) {

  const [currentStepIndex, setCurrentStepIndex] = useState(0)

  function nextStep(){
    setCurrentStepIndex(i => {
      if(i > steps.length - 1) return i
      return i + 1
    })
  }

  function prevStep(){
    setCurrentStepIndex(i => {
      if(i <= 0) return i
      return i - 1
    })  

  }

  function goToStep(index: number){
    setCurrentStepIndex(index)
  }


  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    steps,
    goToStep,
    nextStep,
    prevStep,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1
  }
  
}