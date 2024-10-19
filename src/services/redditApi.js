import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const redditApi = createApi({
  reducerPath: 'redditApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://www.reddit.com/' }),
  endpoints: (builder) => ({
    getSubredditPosts: builder.query({
      query: (subreddit) => `r/${subreddit}.json`,
    }),
  }),
});

export const { useGetSubredditPostsQuery } = redditApi;
