"use server";

import db from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createComment(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  const comment = formData.get("comment") as string;
  const postId = formData.get("postId") as string;

  const data = await db.comemnt.create({
    data: {
      text: comment,
      userId: user.id,
      postId: postId,
    },
  });

  revalidatePath(`/post/${postId}`);
}
