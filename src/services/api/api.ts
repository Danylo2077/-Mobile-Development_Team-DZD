import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// Need to use the React-specific entry point to import createApi
import type { NewsApiResponse } from './types';

// Define a service using a base URL and expected endpoints
export const mediaStackApi = createApi({
  reducerPath: 'mediaStackApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://api.mediastack.com/v1' }),
  endpoints: (builder) => ({
    getAllPosts: builder.query<NewsApiResponse, number>({
      query: (offset) => `/news?access_key=a4362c296fcbc98230fa5c5441df6e3c&offset=${offset}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllPostsQuery } = mediaStackApi;