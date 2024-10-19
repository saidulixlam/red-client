import React from 'react';
import { useGetSubredditPostsQuery } from '../services/redditApi';
import './Lane.css';

const Lane = ({ subreddit, removeLane }) => {
    const { data, error, isLoading } = useGetSubredditPostsQuery(subreddit);

    return (
        <div className="lane">
            <h2>
                {subreddit}
                <button onClick={() => removeLane(subreddit)}>Remove</button>
            </h2>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error loading subreddit.</p>}
            {data && (
                <ul>
                    {data.data.children.map((post) => (
                        <li key={post.data.id}>
                            <h3>{post.data.title}</h3>
                            <p className='author'>Author: {post.data.author}</p>
                            <p>Upvotes: {post.data.ups}</p>
                            <div className="description-container">
                                <p
                                    id={`selftext-${post.data.id}`}
                                    className="description" // Removed the expanded logic
                                >
                                    {post.data.selftext}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Lane;
