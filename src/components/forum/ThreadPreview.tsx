import { BarsArrowDownIcon, ArrowLongRightIcon } from "@heroicons/react/24/outline"
import { useState } from "react";
import { IconButton, TextLink, Container } from "../common";
import AuthorLink from "./AuthorLink";
import Link from "next/link";
import { canDelete } from "@/src/client/requests";
import { ForumProps } from "@/src/pages/f/[...forum]";
import DeletePostLink from "./DeletePostLink";
import { useSession } from "next-auth/react";

export default function ThreadPreview({ forum, topic, thread, link, user }: ForumProps & { link: string }) {  
  if (!thread || !thread.posts) {
    return <div>Failed to load</div>
  }

  const session = useSession()

  const op = thread.posts[0]
  const time = new Date(op.timestampPosted)

  const [expanded, setExpanded] = useState(false);
  
  return (
    <Container className="group p-3 bg-slate-900 hover:border-slate-500">
      <div className="flex justify-between content-center items-center">
        <div className="flex flex-1 self-start min-w-0 items-center">
          <IconButton className="inline" onClick={() => setExpanded(ex => !ex)}>
            <BarsArrowDownIcon className="h-5 w-5"/>
          </IconButton> 
          <h3 className="ml-1 inline text-xl truncate"><Link href={link}>{thread.title}</Link></h3>
          {canDelete(session.data, op, user)
            ? <DeletePostLink className="inline ml-2 invisible group-hover:visible" postId={op.id} redirectLink={"/f/" + forum.name + "/" + topic?.id} />
            : <></>}
        </div>
        <p className="flex-none self-end text-slate-400"><AuthorLink {...op.author} /> | {time.toDateString()}</p>
      </div>
      {expanded 
        ? <>
            <p className="text-slate-200 break-words">{op.content}</p>
            <TextLink href={link}>View full thread <ArrowLongRightIcon className="inline h-5 w-5" /></TextLink>
          </>
        : <></>}
    </Container>
  )
}