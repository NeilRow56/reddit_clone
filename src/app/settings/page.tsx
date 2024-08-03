import { SettingsForm } from "@/components/SettingsForm";
import db from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import { unstable_noStore as noStore } from "next/cache";

async function getData(userId: string) {
  noStore();
  const data = await db.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      userName: true,
    },
  });

  return data;
}

const SettingsPage = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect("/api/auth/login");
  }
  const data = await getData(user.id);
  return (
    <div className="max-w-[1000px] mx-auto flex flex-col mt-4">
      <SettingsForm username={data?.userName} />
    </div>
  );
};

export default SettingsPage;
