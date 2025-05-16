"use client"

import * as React from "react"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { cn } from "@/lib/utils";


interface Props {
  className?:string;
  onChange?: (value: string) => void,
}

export function InputOTPControlled({ className, onChange }: Props) {
  const [valueOTP, setValueOTP] = React.useState("")

  return (
    <div className={cn("flex flex-col justify-center items-center w-full", className)}>
      <InputOTP
        className=""
        maxLength={6}
        value={valueOTP}
        onChange={(value:string) => {
          const normalizeValue = value.trim()
                                      .split('')
                                      .filter( v=> !isNaN(Number(v) ))
                                      .join('');
          if (onChange) onChange(normalizeValue);
          setValueOTP(normalizeValue)
        }}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <div className="text-center text-sm">
      </div>
    </div>
  )
}
