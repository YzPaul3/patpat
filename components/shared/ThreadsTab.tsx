import { redirect } from "next/navigation";

import { fetchUserPosts } from "@/lib/actions/user.actions";

import ThreadCard from "../cards/ThreadCard";

interface Result {
  name: string;
  image: string;
  id: string;
  threads: {
    _id: string;
    text: string;
    parentId: string | null;
    authorId: {
      name: string;
      image: string;
      id: string;
    };
    createdAt: string;
    children: {
      authorId: {
        image: string;
      };
    }[];
  }[];
}

interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
}

async function ThreadsTab({ currentUserId, accountId, accountType }: Props) {
  let result: Result;

  result = await fetchUserPosts(accountId);

  if (!result) {
    redirect("/");
  }

  return (
    <section className='mt-9 flex flex-col gap-10'>
      {result.threads.map((thread) => (
        <ThreadCard
          key={thread._id}
          id={thread._id}
          currentUserId={currentUserId}
          parentId={thread.parentId}
          content={thread.text}
          authorId={
            accountType === "User"
              ? { name: result.name, image: result.image, id: result.id }
              : {
                  name: thread.authorId.name,
                  image: thread.authorId.image,
                  id: thread.authorId.id,
                }
          }
          createdAt={thread.createdAt}
          comments={thread.children}
        />
      ))}
    </section>
  );
}

export default ThreadsTab;
