import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { NewsApiResponse } from './types';

export const mediaStackApi = createApi({
  reducerPath: 'mediaStackApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://api.mediastack.com/v1' }),
  endpoints: builder => ({
    getAllPosts: builder.query<NewsApiResponse, { offset: number; searchQuery: string; category: string }>( {
      query: ({ offset, searchQuery, category }) => {
        let params = `access_key=f16ed1cb8a58f9654bb11522e880f345&offset=${offset}&keywords=${searchQuery}`;
        if (category) params += `&categories=${category}`;
        return `/news?${params}`;
      },
    }),
  }),
});

export const { useGetAllPostsQuery } = mediaStackApi;
