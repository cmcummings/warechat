import { ForumProps } from "@/src/pages/f/[...forum]";
import { Post } from "@/types/app-types";
import { ArrowLongLeftIcon } from "@heroicons/react/24/outline";
import Head from "next/head";
import { FormEvent, useState } from "react";
import { Button, TextLink, Container, Divider, TextArea } from '../common'
import AuthorLink from "./AuthorLink";
import ForumSidebarWrapper from "./ForumSidebarWrapper";
import { canDelete, replyRequest } from "@/src/client/requests";
import { useRouter } from "next/router";
import DeletePostLink from "./DeletePostLink";
import { useSession } from "next-auth/react";


export default function Thread({ forum, topic, thread, user }: ForumProps) {
  if (!(thread && topic && thread.posts)) {
    return <></>
  }

  const session = useSession()
  const router = useRouter()

  const op = thread.posts[0]

  const [replyContent, setReplyContent] = useState("")

  const linkToHere = "/f/" + forum.name + "/" + topic?.id + "/" + thread.id

  function reply(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!replyContent || !thread) return

    replyRequest(thread.id, replyContent).then(() => {
      router.push(linkToHere)
      setReplyContent("")
    }).catch(console.log)
  }

  return (
    <>
      <Head>
        <title>{forum.name + " - " + topic?.name + " - warechat"}</title>
      </Head>
      <ForumSidebarWrapper {...{forum, topic}}>
        <TextLink href={"/f/" + forum.name + "/" + topic.id}><ArrowLongLeftIcon className="w-5 h-5 inline"/> Back to {forum.name} / {topic.name}</TextLink>
        <div className="mt-2 flex flex-col gap-2">
          <Container className="relative p-3 group">
            <h1 className="text-3xl">{thread.title}</h1>
            <h3 className="text-xl text-slate-400"><AuthorLink {...op.author} /> | {new Date(op.timestampPosted).toDateString()}</h3>
            {canDelete(session.data, op, user)
              ? <DeletePostLink className="absolute top-3 right-3 invisible group-hover:visible" postId={op.id} redirectLink={"/f/" + forum.name + "/" + topic?.id} />
              : <></>}
            <Divider />
            <p>{op.content}</p>
          </Container>
          {
            thread.posts.filter((v, i) => i >= 1).map((post: Post, idx) => (
              <Container key={idx} className="relative p-3 group">
                <h3 className="text-slate-400"><AuthorLink {...post.author} /> | {new Date(post.timestampPosted).toDateString()}</h3>
                <p>{post.content}</p>
                {canDelete(session.data, op, user)
                  ? <DeletePostLink className="absolute top-3 right-3 invisible group-hover:visible" postId={post.id} redirectLink={linkToHere} />
                  : <></>}
              </Container>
            ))
          }
          <Container className="p-3">
            <form className="flex flex-col gap-3" onSubmit={reply}>
              <TextArea 
                value={replyContent} 
                onChange={(e: FormEvent<HTMLTextAreaElement>) => setReplyContent(e.currentTarget.value)} 
                placeholder="Reply to thread..."
                rows={3}
                className="grow" />
              <Button className="self-start" type="submit">Reply</Button>
            </form>
          </Container>
        </div>
      </ForumSidebarWrapper>
    </>
  )
}