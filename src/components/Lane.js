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
                        <a style={{ textDecoration: 'none', color: 'inherit' }}
                        href={`https://www.reddit.com${post.data.permalink}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <li key={post.data.id}>
                            
                                <h3>{post.data.title}</h3>
                            
                            <p className='author'>Author: {post.data.author}</p>
                            <p>Upvotes: {post.data.ups}</p>
                            <div className="description-container">
                                <p
                                    id={`selftext-${post.data.id}`}
                                    className="description"
                                >
                                    {post.data.selftext}
                                </p>
                            </div>
                        </li>
                        </a>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Lane;
