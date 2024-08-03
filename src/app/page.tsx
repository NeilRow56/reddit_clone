import { CreatePostCard } from "@/components/CreatePostCard";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Banner from "../../public/banner.png";
import HelloImage from "../../public/hero-image.png";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import db from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";
import { PostCard } from "@/components/PostCard";
import { Suspense } from "react";
import { SuspenseCard } from "@/components/SuspenseCard";
import Pagination from "@/components/Pagination";

async function getData(searchParam: string) {
  noStore();
  const [count, data] = await db.$transaction([
    db.post.count(),
    db.post.findMany({
      take: 2,
      skip: searchParam ? (Number(searchParam) - 1) * 2 : 0,
      select: {
        title: true,
        createdAt: true,
        textContent: true,
        id: true,
        imageString: true,

        Comment: {
          select: {
            id: true,
          },
        },
        User: {
          select: {
            userName: true,
          },
        },
        subName: true,

        Vote: {
          select: {
            userId: true,
            voteType: true,
            postId: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
  ]);

  return { data, count };
}

export default function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  return (
    <div className="max-w-[1000px] mx-auto flex gap-x-10 mt-4 mb-10">
      <div className="w-[65%] flex flex-col  gap-y-5">
        <CreatePostCard />
        <Suspense fallback={<SuspenseCard />} key={searchParams.page}>
          <ShowItems searchParams={searchParams} />
        </Suspense>
      </div>
      <div className="w-[35%]">
        <Card>
          <Image src={Banner} alt="Banner" />
          <div className="p-2">
            <div className="flex items-center">
              <Image
                src={HelloImage}
                alt="Hello Image"
                className="w-10 h-16 -mt-6"
              />
              <h1 className="font-medium pl-3">Home</h1>
            </div>
            <p className="text-sm text-muted-foreground pt-2">
              Your Home Reddit frontpage. Come here to check in with your
              favorite communites!
            </p>
            <Separator className="my-5" />

            <div className="flex flex-col gap-y-3">
              <Button asChild variant="secondary">
                <Link href="/r/football/create">Create Post</Link>
              </Button>
              <Button asChild>
                <Link href="/r/create">Create Community</Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

async function ShowItems({ searchParams }: { searchParams: { page: string } }) {
  const { count, data } = await getData(searchParams.page);
  return (
    <>
      {data.map((post) => (
        <PostCard
          id={post.id}
          jsonContent={post.textContent}
          title={post.title}
          subName={post.subName as string}
          userName={post.User?.userName as string}
          imageString={post.imageString}
          key={post.id}
          commentAmount={post.Comment.length}
          voteCount={post.Vote.reduce((acc, vote) => {
            if (vote.voteType === "UP") return acc + 1;
            if (vote.voteType === "DOWN") return acc - 1;

            return acc;
          }, 0)}
        />
      ))}
      <Pagination totalPages={Math.ceil(count / 2)} />
    </>
  );
}
