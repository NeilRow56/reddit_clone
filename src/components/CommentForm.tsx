"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "./SubmitButtons";

import { useRef } from "react";
import { createComment } from "@/app/actions/comment";

interface iAppPorps {
  postId: string;
}

export function CommentForm({ postId }: iAppPorps) {
  //UseRef resets the form to empty whrn combined with the action as below
  const ref = useRef<HTMLFormElement>(null);
  return (
    <form
      className="mt-5"
      //See note above regarding useRef
      action={async (formData) => {
        await createComment(formData);
        ref.current?.reset();
      }}
      ref={ref}
    >
      <input type="hidden" name="postId" value={postId} />
      <Label>Comment right here</Label>
      <Textarea
        placeholder="What are your thoughts?"
        className="w-full mt-1 mb-2"
        name="comment"
      />
      <SubmitButton text="Comment" />
    </form>
  );
}
