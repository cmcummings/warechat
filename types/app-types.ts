interface ParentProps {
  children?: React.ReactNode | React.ReactNode[],
  className?: string,
  [key: string]: any,
}

/*  */

interface BasicUser {
  id: number,
  name: string
}

interface User extends BasicUser {
  email: string,
  dateRegistered: Date | number,
}

interface Forum {
  id: number,
  name: string,
  description?: string | null,
  dateCreated: Date | number,
  topics?: Topic[]
}

interface Topic {
  id: number,
  name: string,
  description?: string | null
}

interface Thread {
  id: number,
  title: string,
  posts?: Post[] // list of posts in order of timestamPosted
}

interface Post {
  id: number,
  content: string,
  author: BasicUser,
  timestampPosted: Date | number,
  replyPost?: Post
}


export type { User, Forum, Topic, Post, Thread, ParentProps }