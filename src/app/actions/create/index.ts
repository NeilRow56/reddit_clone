"use server";

import db from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";

export async function createCommunity(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  try {
    const name = formData.get("name") as string;

    const data = await db.subreddit.create({
      data: {
        name: name,
        userId: user.id,
      },
    });

    return redirect("/");
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return {
          message: "This Name is alredy used",
          status: "error",
        };
      }
    }
    throw e;
  }
}