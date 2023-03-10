import { Topic } from "@/types/app-types";
import Head from "next/head";
import { ForumProps } from "../../pages/f/[...forum]";
import { PageContents, Container, Button } from "../common";
import Link from "next/link";
import FollowButton from "./FollowButton";

export default function ForumHome({ forum, user }: ForumProps) {
  return (
    <>
      <Head>
        <title>{forum.name + " - warechat"}</title>
      </Head>
      <PageContents>
        <div className="flex flex-row justify-between">
          <div className="self-start">
            <h1 className="text-5xl mb-2">/{forum.name}/</h1>
            <h3 className="text-xl">{forum.description}</h3>
          </div>
          <div className="self-end">
            <FollowButton forumId={forum.id} initFollowing={user?.follows}/>
          </div>
        </div>
        <div className="mt-5 pt-5 border-t border-slate-500">
          <h3 className="text-2xl">Topics</h3>

          <div className="">
            {forum.topics?.map((topic: Topic) => (
              <Link key={topic.id} href={"/f/" + forum.name + "/" + topic.id}>
                <Container className="my-2 p-2 border hover:border-slate-500 hover:cursor-pointer text-left w-full">
                  <h3 className="text-xl">{topic.name}</h3>
                  <p className="text-slate-400">{topic.description}</p>
                </Container>
              </Link>
            ))}
          </div>
        </div>
      </PageContents>
    </>
  )
}