"use client";

import { SubmitButton } from "@/components/SubmitButtons";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Text, Video } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const rules = [
  {
    id: 1,
    text: "Remember the human",
  },
  {
    id: 2,
    text: "Behave like you would in real life",
  },
  {
    id: 3,
    text: "Look for the original source of content",
  },
  {
    id: 4,
    text: "Search for duplication before posting",
  },
  {
    id: 5,
    text: "Read the community guidlines",
  },
];

export default function CreatePostRoute({
  params,
}: {
  params: { id: string };
}) {
  const [imageUrl, setImageUrl] = useState<null | string>(null);
  const [title, setTitle] = useState<null | string>(null);

  return (
    <div className="max-w-[1000px] mx-auto grid grid-cols-3 gap-x-10 mt-4">
      <div className="grid grid-cols2 flex-col gap-y-5">
        <h1 className="font-semibold">
          Subreddit:{" "}
          <Link href={`/r/${params.id}`} className="text-primary">
            r/{params.id}
          </Link>
        </h1>
        <Tabs defaultValue="post" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="post">
              <Text className="h-4 w-4 mr-2" /> Post
            </TabsTrigger>
            <TabsTrigger value="image">
              <Video className="h-4 w-4 mr-2" />
              Image & Video
            </TabsTrigger>
          </TabsList>
          <TabsContent value="post">
            <Card>
              <form action={() => {}}>
                <input
                  type="hidden"
                  name="imageUrl"
                  value={imageUrl ?? undefined}
                />
                <input type="hidden" name="subName" value={params.id} />
                <CardHeader>
                  <Label>Title</Label>
                  <Input
                    required
                    name="title"
                    placeholder="Title"
                    value={title ?? ""}
                    onChange={() => {}}
                  />
                </CardHeader>
                <CardFooter>
                  <SubmitButton text="Create Post" />
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          <TabsContent value="image">
            <Card>
              <CardHeader>Upload component</CardHeader>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <div className="w-grid grid-cols-1">
        <Card className="flex flex-col p-4">
          <div className="flex items-center gap-x-2">
            <Image
              className="h-10 w-10"
              src="/pfp.png"
              alt="pfp"
              width={40}
              height={40}
            />
            <h1 className="font-medium">Posting to Reddit</h1>
          </div>
          <Separator className="mt-2" />

          <div className="flex flex-col gap-y-5 mt-5">
            {rules.map((item) => (
              <div key={item.id}>
                <p className="text-sm font-medium">
                  {item.id}. {item.text}
                </p>
                <Separator className="mt-2" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
