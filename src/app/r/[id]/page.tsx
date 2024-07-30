import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Cake, FileQuestion } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import db from "@/lib/db";
import { SubDescriptionForm } from "@/components/SubDescriptionForm";

async function getData(name: string) {
  const data = await db.subreddit.findUnique({
    where: {
      name: name,
    },

    select: {
      name: true,
      createdAt: true,
      description: true,
      userId: true,
    },
  });

  return data;
}

export default async function SubRedditRoute({
  params,
}: {
  params: { id: string };
}) {
  const data = await getData(params.id);
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  let posts = 0;
  return (
    <div className=" flex lg:w-[1000px] md:w-[600px] sm:w-[450px]  mx-auto  gap-x-10 mt-4 mb-10">
      <div className="flex w-[65%] flex-col gap-y-5 ">
        Create Post Card
        {posts === 0 ? (
          <div className="flex min-h-[300px] flex-col justify-center items-center rounded-md border border-dashed p-8 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <FileQuestion className="h-10 w-10 text-primary" />
            </div>

            <h2 className="mt-6 text-xl font-semibold">
              No post have been created
            </h2>
          </div>
        ) : (
          <>
            <div>Map Posts</div>
          </>
        )}
      </div>

      <div className="flex flex-col w-[35%] ">
        <Card className="">
          <div className="bg-muted p-4 font-semibold">About Community</div>
          <div className="p-4">
            <div className="flex items-center gap-x-3">
              <Image
                src={`https://avatar.vercel.sh/${data?.name}`}
                alt="Image of subreddit"
                width={60}
                height={60}
                className="rounded-full h-16 w-16"
              />
              <Link href={`/r/${data?.name}`} className="font-medium">
                r/{data?.name}
              </Link>
            </div>
            {user?.id === data?.userId ? (
              <SubDescriptionForm
                description={data?.description}
                subName={params.id}
              />
            ) : (
              <p className="text-sm font-normal text-secondary-foreground mt-2">
                {data?.description}
              </p>
            )}

            <div className="flex items-center gap-x-2 mt-4">
              <Cake className="h-5 w-5 text-muted-foreground" />

              <p className="text-muted-foreground font-medium text-sm">
                Created:{" "}
                {new Date(data?.createdAt as Date).toLocaleDateString("en-GB", {
                  weekday: "long",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>

            <Separator className="my-5" />
            <Button asChild className="rounded-full w-full">
              <Link
                href={user?.id ? `/r/${data?.name}/create` : "/api/auth/login"}
              >
                Create Post
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}