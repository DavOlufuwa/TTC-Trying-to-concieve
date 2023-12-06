"use client";

import { UserForm } from "@/types/users";
import Link from "next/link";

type StepFiveProps = Partial<UserForm> & {
  acceptTerms: boolean;
  setAcceptTerms: React.Dispatch<React.SetStateAction<boolean>>;
  hasPartner: string;
  hasMedHistory: string;
};

const StepFive = ({
  fullName,
  age,
  gender,
  dateOfBirth,
  country,
  email,
  address,
  phoneNumber,
  partnerFullName,
  partnerAge,
  partnerGender,
  partnerEmail,
  partnerPhoneNumber,
  medicalHistory,
  acceptTerms,
  setAcceptTerms,
  hasPartner,
  hasMedHistory,
}: StepFiveProps) => {
  return (
    <>
      <div>Summary of information you entered</div>
      <div>
        <p>
          <strong>Full Name:</strong> {fullName}
        </p>
        <p>
          <strong>Age:</strong> {age}
        </p>
        <p>
          <strong>Gender:</strong> {gender}
        </p>
        <p>
          <strong>Date of Birth:</strong> {dateOfBirth}
        </p>
        <p>
          <strong>Country:</strong> {country}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
        <p>
          <strong>Address:</strong> {address}
        </p>
        <p>
          <strong>Phone Number:</strong> {phoneNumber}
        </p>
        {
          hasPartner === "yes" && (
            <>
              <p>
                <strong>Partner Full Name:</strong> {partnerFullName}
              </p>
              <p>
                <strong>Partner Age:</strong> {partnerAge}
              </p>
              <p>
                <strong>Partner Gender:</strong> {partnerGender}
              </p>
              <p>
                <strong>Partner Email:</strong> {partnerEmail}
              </p>
              <p>
                <strong>Partner Phone Number:</strong> {partnerPhoneNumber}
              </p>
            </>
          )
        }
        {
          hasMedHistory === "yes" && (
            <>
              <p>
                <strong>Medical History:</strong>
              </p>
              <p>
                {medicalHistory}
              </p>
            </>
          )
        }
      </div>
      <div>
        <label>
          I accept the <Link href="/">Terms and Conditions</Link>
        </label>
        <input
          type="checkbox"
          id="acceptTerms"
          name="acceptTerms"
          required
          checked={acceptTerms}
          onChange={(e) => setAcceptTerms(e.target.checked)}
        />
      </div>
    </>
  );
};

export default StepFive;
