import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://elredtest.s3.amazonaws.com/reactAssignment' }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => `/getCategories.json`,
    }),
    getSubCategoriesById: builder.mutation({
      query: (id) => `/getSubCategory_${id}.json`,
    }),
    getProductDetailsById: builder.mutation({
      query: (id) => `/getProduct_${id}.json`,
    }),
  }),
})

export const { useGetCategoriesQuery, useGetSubCategoriesByIdMutation, useGetProductDetailsByIdMutation } = productApi