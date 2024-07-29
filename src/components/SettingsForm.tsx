"use client";

import React, { useEffect } from "react";
import { Separator } from "./ui/separator";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";
import { SubmitButton } from "./SubmitButtons";
import { updateUsername } from "@/app/actions/settings";
import { useFormState } from "react-dom";
import { useToast } from "./ui/use-toast";

interface SettingsFormProps {
  username: string | undefined | null;
}

const initialState = {
  message: "",
  status: "",
};

export const SettingsForm = ({ username }: SettingsFormProps) => {
  const [state, formAction] = useFormState(updateUsername, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.status === "green") {
      toast({
        title: "Succesfull",
        description: state.message,
        variant: "success",
      });
    } else if (state?.status === "error") {
      toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast]);
  return (
    <form action={formAction}>
      <h1 className="text-3xl font-extrabold tracking-tight">Settings</h1>

      <Separator className="my-4" />
      <Label className="text-lg">Username</Label>
      <p className="text-muted-foreground">
        In this Settings page you can change your username!
      </p>

      <Input
        defaultValue={username ?? undefined}
        name="username"
        required
        className="mt-2"
        min={2}
        maxLength={21}
      />

      {state?.status === "error" && (
        <p className="text-destructive mt-1">{state.message}</p>
      )}

      <div className="w-full flex mt-5 gap-x-5 justify-end">
        <Button variant="secondary" asChild type="button">
          <Link href="/">Cancel</Link>
        </Button>
        <SubmitButton text="Change Username" />
      </div>
    </form>
  );
};
