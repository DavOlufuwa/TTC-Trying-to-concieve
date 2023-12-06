"use client";
import { UserForm } from "@/types/users";
import allCountries from "@/lib/allCountries.json"

type StepTwoProps = Partial<UserForm> & {
  updateFields: (fields: Partial<UserForm>) => void;
  hasPartner: string;
  setHasPartner: React.Dispatch<React.SetStateAction<string>>;
};

const StepTwo = ({
  country,
  address,
  phoneNumber,
  updateFields,
  hasPartner,
  setHasPartner,
}: StepTwoProps) => {

  return (
    <>
      <div>
        <label htmlFor="country">Country</label>
        <select
          name="country"
          id="country"
          defaultValue={country}
          required
          onChange={(e) => {
            updateFields({ country: e.target.value });
          }}
        >
          {
            allCountries.map((country) => (
              <option key={country.code} value={country.name}>{country.name}</option>
            ))
          }
        </select>
      </div>
      <div>
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          value={address}
          onChange={(e) => updateFields({ address: e.target.value })}
          required
        />
      </div>
      <div>
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          type="tel"
          min={0}
          maxLength={11}
          id="phoneNumber"
          name="phoneNumber"
          value={phoneNumber}
          onChange={(e) => updateFields({ phoneNumber: e.target.value })}
          required
        />
      </div>
      <div>
        <label htmlFor="partner">Do you have a Partner</label>
        <select name="partner" id="partner" defaultValue={hasPartner} onChange={(e) => setHasPartner(e.target.value)} required>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
    </>
  );
};

export default StepTwo;
