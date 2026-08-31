'use client'
import { useState } from "react";

type PhoneInputProps = {
   value: string;
   onChange: (phoneNumber: string) => void;
   placeholder?: string;
   className?: string;
   readOnly?: boolean;
}

export function isValidUKMobile(number: string) {
   const cleaned = number.replace(/[\s-]/g, '');
   return /^(?:\+44|0)7\d{9}$/.test(cleaned);
}

export default function PhoneInput ({ value, onChange, className, placeholder, readOnly }: PhoneInputProps) {
   const [phoneNumber, setPhoneNumber] = useState(value);
   const [errorMessage, setErrorMessage] = useState<string | null>(null);

   function handlePNChanges (value: string) {
      setPhoneNumber(value);
      if (isValidUKMobile(`+44${value}`)) {
         setErrorMessage(null);
         onChange(`+44${value}`);
      } else {
         setErrorMessage("Invalid Phone Number");
         onChange(value);
      }
   }

   return (
      <div className="box full dfb column gap-5">
         <div className={"box dfb align-center radius-15 bg-white pdx-15"}>
            <div className="box fit pdx-05">
               <span className="text-s bold-600">+44</span>
            </div>
            <input
               type="text"
               id="phone-number" name="phone-number"
               className={className + " no-focus"}
               placeholder={placeholder}
               value={phoneNumber}
               onChange={e => handlePNChanges(e.target.value)}
               style={{ borderColor: "white" }}
               maxLength={10}
               readOnly={readOnly}
            />
         </div>
         {(errorMessage !== null) && (
            <div className="text-xs error-text">{errorMessage}</div>
         )}
      </div>
   )
}
