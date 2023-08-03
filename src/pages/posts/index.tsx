import { Post } from '@/types/Post';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

export const getStaticProps: GetStaticProps<{
  posts: Post[];
}> = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await res.json();

  return {
    props: { posts },
    revalidate: 30, // value in seconds
  };
};

const Posts = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  // const [posts, setPostDetails] = React.useState<Post[]>([])

  // React.useEffect(() => {
  //   fetch('https://jsonplaceholder.typicode.com/posts').then(async (res) => {
  //     const postsList = await res.json();

  //     setPostDetails(postsList)
  //   })
  // }, [])

  return (
    <>
      <Head>
        <title>Posts</title>
      </Head>

      <div className='px-6 md:px-24 pb-6'>
        <h1 className='text-4xl font-semibold my-5 text-center'>Posts</h1>

        <ul className='flex flex-col gap-4'>
          {posts.map((post) => {
            return (
              <Link
                className='transition-all hover:scale-105'
                key={post.id}
                href={`/posts/${post.id}`}
                passHref
              >
                <li>{post.title}</li>
              </Link>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Posts;
