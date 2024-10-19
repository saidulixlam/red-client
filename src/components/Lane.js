import React from 'react';
import { useGetSubredditPostsQuery } from '../services/redditApi';

const Lane = ({ subreddit, removeLane }) => {
  const { data, error, isLoading } = useGetSubredditPostsQuery(subreddit);
console.log(data);

  return (
    <div className="lane">
      <h2>{subreddit} <button onClick={() => removeLane(subreddit)}>Remove</button></h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading subreddit.</p>}
      {data && (
        <ul>
          {data.data.children.map((post) => (
            <li key={post.data.id}>
              <h3>{post.data.title}</h3>
              <p>Author: {post.data.author}</p>
              <p>Upvotes: {post.data.ups}</p>
              <p>{post.data.selftext}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Lane;
