import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { User } from "@prisma/client";
import { ArrowDown, ArrowUp, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CopyLink } from "./CopyLink";
import { handleVote } from "@/app/actions/vote";

interface iAppProps {
  title: string;
  jsonContent: any;
  id: string;
  subName: string;
  userName: string;
  imageString: string | null;
  voteCount: number;
}

export function PostCard({
  title,
  jsonContent,
  id,
  subName,
  userName,
  imageString,
  voteCount,
}: iAppProps) {
  return (
    <Card className="flex relative overflow-hidden">
      <div className="flex  flex-col items-center gap-y-2 bg-muted p-2">
        <form action={handleVote}>
          <input type="hidden" name="voteDirection" value="UP" />
          <input type="hidden" name="postId" value={id} />
          <Button variant="outline" size="sm" type="submit">
            <ArrowUp className="h-4 w-4" />
          </Button>
        </form>
        {voteCount}
        <form action={handleVote}>
          <input type="hidden" name="voteDirection" value="DOWN" />
          <input type="hidden" name="postId" value={id} />
          <Button variant="outline" size="sm" type="submit">
            <ArrowDown className="w-4 h-4" />
          </Button>
        </form>
      </div>

      <div className="flex flex-col w-full">
        <div className="flex items-center gap-x-2 p-2">
          <Link className="font-semibold text-xs" href={`/r/${subName}`}>
            f/{subName}
          </Link>

          <p className="text-xs text-muted-foreground">
            PostedBy: <span className="hover:text-primary">u/{userName}</span>
          </p>
        </div>
        <Link href="/">
          <h1 className="font-medium mt-1 text-lg">{title}</h1>
        </Link>

        <div className="max-h-[300px]  overflow-hidden">
          {imageString && (
            <Image
              src={imageString}
              alt="Post Image"
              width={600}
              height={300}
              className="w-full h-full mt-2 object-scale-down"
            />
          )}
        </div>
        <div className="m-3 flex items-center gap-x-5">
          <div className="flex items-center gap-x-1">
            <MessageCircle className="text-muted-foreground h-4 w-4" />
            <p className="text-muted-foreground font-medium text-xs">
              31 comments
            </p>
          </div>
          <CopyLink id={id} />
        </div>
      </div>
    </Card>
  );
}
