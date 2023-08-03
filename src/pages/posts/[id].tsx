import { PostDetails } from '@/types/Post';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import React from 'react';

export const getServerSideProps: GetServerSideProps<{
  postDetails: PostDetails;
}> = async (props) => {
  const postId = props.query.id; // [id].tsx

  const resPost = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );
  const post = await resPost.json();

  const resComments = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  const comments = await resComments.json();

  const postDetails = {
    ...post,
    comments,
  };

  return {
    props: { postDetails },
  };
};

const PostDetail = ({
  postDetails,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        <title>{postDetails.title}</title>
      </Head>

      <main
        className={`flex min-h-screen flex-col items-center justify-between p-24`}
      >
        <h1 className='text-4xl font-semibold mb-5'>{postDetails.title}</h1>

        <h2 className='text-2xl font-semibold'>Comments</h2>

        <ul>
          {postDetails.comments.map((comment) => {
            return (
              <li key={comment.id} className='mb-3'>
                <div>
                  <p>{comment.name}</p>
                  <a href={`mailTo:${comment.email}`}>{comment.email}</a>
                  <p>{comment.body}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </main>
    </>
  );
};

export default PostDetail;
