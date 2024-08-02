import db from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";
import { notFound } from "next/navigation";
import React from "react";

async function getData(id: string) {
  noStore();
  const data = await db.post.findUnique({
    where: {
      id: id,
    },
    select: {
      createdAt: true,
      title: true,
      imageString: true,
      textContent: true,
      subName: true,
      id: true,
      Vote: {
        select: {
          voteType: true,
        },
      },
      Subreddit: {
        select: {
          name: true,
          createdAt: true,
          description: true,
        },
      },
      User: {
        select: {
          userName: true,
        },
      },
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

const IndividualPostPage = async ({ params }: { params: { id: string } }) => {
  const data = await getData(params.id);
  return <div>{data.User?.userName}</div>;
};

export default IndividualPostPage;
