"use client";

import React, { useState } from "react";
import { UserForm } from "@/types/users";

type StepFourProps = Partial<UserForm> & {
  updateFields: (fields: Partial<UserForm>) => void;
  hasMedHistory: string;
  setHasMedHistory: React.Dispatch<React.SetStateAction<string>>;
  hasPartner: string;
};

const StepFour = ({
  medicalHistory,
  password,
  hasMedHistory,
  setHasMedHistory,
  hasPartner,
  updateFields,

}: StepFourProps) => {

  const [error, setError] = useState<string>("");
  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (password !== e.target.value) {
      setError("Passwords do not match");
    }else{
      setError("");
    }
  }

  return (
    <>
      <div>
        <label htmlFor="med-history">
          Do you {hasPartner === "yes" ? "and your partner" : ""} have medical history of any terminal diseases
        </label>
        <select
          name="med-history"
          id="med-history"
          defaultValue={hasMedHistory}
          onChange={(e) => setHasMedHistory(e.target.value)}
        >
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
      {hasMedHistory === "yes" && (
        <div>
          <label htmlFor="medicalHistory">Please specify</label>
          <textarea
            name="medicalHistory"
            id="medicalHistory"
            defaultValue={medicalHistory}
            onChange={(e) => updateFields({ medicalHistory: e.target.value })}
          ></textarea>
        </div>
      )}
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => updateFields({ password: e.target.value })}
          required
        />
      </div>
      <div className="h-4">
        {
          error && (
            <p>{error}</p>
          )
        }
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input 
          type="password" 
          id="confirmPassword" 
          name="confirmPassword" 
          onChange={handleConfirmPassword}
          required
        />
      </div>
      
    </>
  );
};

export default StepFour;
