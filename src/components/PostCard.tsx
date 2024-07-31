import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowDown, ArrowUp, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function PostCard() {
  return (
    <Card className="flex relative overflow-hidden">
      <div className="flex flex-col items-center gap-y-2 bg-muted p-2">
        <form>
          <Button variant="outline" size="sm">
            <ArrowUp className="h-4 w-4" />
          </Button>
        </form>
        0
        <form>
          <Button variant="outline" size="sm">
            <ArrowDown className="w-4 h-4" />
          </Button>
        </form>
      </div>
      <div>
        <div className="flex items-center gap-x-2 p-2">
          <Link className="font-semibold text-xs" href="/">
            f/football
          </Link>

          <p className="text-xs text-muted-foreground">
            PostedBy: <span className="hover:text-primary">u/ben</span>
          </p>
        </div>
      </div>
      <div>
        <Link href="/">
          <h1 className="font-medium mt-1 text-lg">Hello from this post...</h1>
        </Link>
      </div>
    </Card>
  );
}
