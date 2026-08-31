'use client'
import './Spinner.css'
import { Loader2 } from 'lucide-react';

type SpinnerProps = {
   color?: string;
   size?: number;
   strokeWidth?: string;
}

export default function Spinner ({ size, color, strokeWidth }: SpinnerProps) {
   return <div className="loader-circle" style={{width:`${size}px`,height:`${size}px`}}>
      <Loader2 size={size} color={color || '#000'} strokeWidth={strokeWidth || 2.5} />
   </div>;
}