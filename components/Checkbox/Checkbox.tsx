'use client'
import { websiteConfig } from "@/config/websiteConfig";
import { Check } from "lucide-react";
import { useState } from "react";

type CheckboxProps = {
   label: React.ReactNode | string;
   defaultChecked?: boolean;
   onChange: (value: boolean) => void;
}

export default function Checkbox ({ label, onChange, defaultChecked }: CheckboxProps) {
   const [checked, setChecked] = useState(defaultChecked || false)

   const onToggleCheck = () => {
      onChange(!checked);
      setChecked(c => !c);
   }

   function CheckMark ({ checked }: { checked: boolean }) {
      return <div
         className="box fit h-fit pd-05 pdx-05 dfb align-center justify-center"
         style={{
            backgroundColor: checked ? websiteConfig.accentColor : "white",
            border: `1px solid ${checked ? websiteConfig.accentColor : "#e0e0e0"}`,
            color: "white", borderRadius: "100%"
         }}
      ><Check size={15} /></div>
   }

   return (
      <div className="box fit dfb gap-10 pd-05 cursor-pointer" onClick={onToggleCheck}>
         <div className="box fit dfb align-center">
            <CheckMark checked={checked} />
         </div>
         <div className="text-xs full dfb align-center no-select">{label}</div>
      </div>
   )
}

type SingleChoiceCheckboxProps = {
   options: React.ReactNode[] | string[];
   onCheck: (optionIndex: number) => void;
   addBorder?: string;
}

export function SingleChoiceCheckbox ({ options, onCheck, addBorder }: SingleChoiceCheckboxProps) {
   const [checkedIndex, setCheckedIndex] = useState(-1)

   const onCheckItem = (index: number) => {
      onCheck(index);
      setCheckedIndex(index);
   }

   function CheckMark ({ checked }: { checked: boolean }) {
      return <div
         className="box fit h-fit pd-05 pdx-05 dfb align-center justify-center"
         style={{
            backgroundColor: checked ? websiteConfig.accentColor : "white",
            border: `1px solid ${checked ? websiteConfig.accentColor : addBorder ? addBorder : "white"}`,
            color: "white", borderRadius: "100%"
         }}
      ><Check size={15} /></div>
   }

   return (
      <div className="box full dfb column gap-10">
         {options.map((option, index) => (
            <div key={index} className="box fit dfb gap-10 pd-05 cursor-pointer" onClick={() => onCheckItem(index)}>
               <div className="box fit h-full dfb align-center">
                  <CheckMark checked={(checkedIndex === index)} />
               </div>
               <div className="text-xs fit dfb no-select">{option}</div>
            </div>
         ))}
      </div>
   )
}
