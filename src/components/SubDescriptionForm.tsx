"use client";

import { Textarea } from "@/components/ui/textarea";
import { SaveButton } from "./SubmitButtons";

interface iAppProps {
  subName: string;
  description: string | null | undefined;
}

const initalState = {
  message: "",
  status: "",
};

export function SubDescriptionForm({ description, subName }: iAppProps) {
  return (
    <form className="mt-3" action={() => {}}>
      <input type="hidden" name="subName" value={subName} />
      <Textarea
        placeholder="Create your custom description for your subreddit"
        maxLength={100}
        name="description"
        defaultValue={description ?? undefined}
      />
      <SaveButton />
    </form>
  );
}
