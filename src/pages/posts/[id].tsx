import { PostDetails } from '@/types/Post';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import Image from 'next/image';
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
        <meta name="description" content={postDetails.body} />
        <meta name="og:image" content="/header-image-2560x1080.jpg" />
      </Head>

      <div className='h-60 w-full relative mb-8'>
        <Image
          src='/header-image-2560x1080.jpg'
          alt='Header image'
          priority
          style={{
            objectFit: 'cover',
          }}
          fill
        />
      </div>

      <div className='px-6 md:px-24'>
        <h1 className='text-4xl font-semibold mb-8'>{postDetails.title}</h1>

        <p className='mb-4'>{postDetails.body}</p>

        <h2 className='text-2xl font-semibold mb-5'>Comments</h2>

        <ul className='mb-5'>
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
      </div>

      <div className='h-32 w-full relative'>
        <Image
          src='/footer-2560x1080-grayscale.jpg'
          alt='Footer image'
          style={{
            objectFit: 'cover',
          }}
          fill
        />
      </div>
    </>
  );
};

export default PostDetail;
