"use client";
import React from "react";
import { UserForm } from "@/types/users";

type StepOneProps = Partial<UserForm> & {
  updateFields: (fields: Partial<UserForm>) => void;
};

const StepOne = ({
  fullName,
  age,
  dateOfBirth,
  gender,
  email,
  updateFields,
}: StepOneProps) => {

  return (
    <div>
      <div>
        <label htmlFor="fullName">Full Name</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={fullName}
          onChange={(e) => updateFields({ fullName: e.target.value })}
          required
        />
      </div>
      <div>
        <label htmlFor="age">Age</label>
        <input
          type="number"
          id="age"
          name="age"
          value={age}
          onChange={(e) => updateFields({ age: e.target.value })}
          required
          />
      </div>
      <div>
        <label htmlFor="dateOfBirth">Date of Birth</label>
        <input
          type="date"
          id="dateOfBirth"
          name="dateOfBirth"
          value={dateOfBirth}
          onChange={(e) => updateFields({ dateOfBirth: e.target.value })}
          required
        />
      </div>
      <div>
        <label htmlFor="gender">Gender</label>
        <select
          name="gender"
          id="gender"
          defaultValue={gender}
          onChange={(e) => updateFields({ gender: e.target.value })}
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="non-binary">Non-Binary</option>
          <option value="prefer not to say">Prefer not to say</option>
        </select>
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => updateFields({ email: e.target.value })}
          required
        />
      </div>
    </div>
  );
};

export default StepOne;
