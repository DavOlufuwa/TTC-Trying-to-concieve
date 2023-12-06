import React from "react";

import { UserForm } from "@/types/users";

type StepThreeProps = Partial<UserForm> & {
  updateFields: (fields: Partial<UserForm>) => void;
};

const StepThree = ({
  partnerFullName,
  partnerAge,
  partnerGender,
  partnerEmail,
  partnerPhoneNumber,
  updateFields,
}: StepThreeProps) => {

  return (
    <>
      <div>
        <label htmlFor="partnerFullName">Partner Full Name</label>
        <input
          type="text"
          id="partnerFullName"
          name="partnerFullName"
          value={partnerFullName}
          onChange={(e) => updateFields({ partnerFullName: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="partnerAge">Partner Age</label>
        <input
          type="text"
          id="partnerAge"
          name="partnerAge"
          value={partnerAge}
          onChange={(e) => updateFields({ partnerAge: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="partnerGender">Partner Gender</label>
        <select name="partnerGender" id="partnerGender" defaultValue={partnerGender} onChange={(e) => updateFields({ partnerGender: e.target.value })}>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="non-binary">Non-Binary</option>
          <option value="prefer not to say">Prefer not to say</option>
        </select>
      </div>
      <div>
        <label htmlFor="partnerEmail">Partner Email</label>
        <input type="text" id="partnerEmail" name="partnerEmail" value={partnerEmail} onChange={(e) => updateFields({ partnerEmail: e.target.value })}/>
      </div>
      <div>
        <label htmlFor="partnerPhoneNumber">Partner Phone Number</label>
        <input type="tel" maxLength={11} id="partnerPhoneNumber" name="partnerPhoneNumber" value={partnerPhoneNumber} onChange={(e) => updateFields({ partnerPhoneNumber: e.target.value })} />
      </div>
    </>
  );
};

export default StepThree;
