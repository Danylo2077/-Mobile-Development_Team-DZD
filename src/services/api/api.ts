import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { NewsApiResponse } from './types';

export const mediaStackApi = createApi({
  reducerPath: 'mediaStackApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://api.mediastack.com/v1' }),
  endpoints: builder => ({
    getAllPosts: builder.query<NewsApiResponse, { offset: number; searchQuery: string; category: string }>( {
      query: ({ offset, searchQuery, category }) => {
        let params = `access_key=a4362c296fcbc98230fa5c5441df6e3c&offset=${offset}&keywords=${searchQuery}`;
        if (category) params += `&categories=${category}`;
        return `/news?${params}`;
      },
    }),
  }),
});

export const { useGetAllPostsQuery } = mediaStackApi;
