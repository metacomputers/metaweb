import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../features/constants";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
        query: (data) => ({
          url: '${USERS_URL}/auth',
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["User"], // Refresh the list after adding
      }),

    getUsers: builder.query({
      query: () => "/users",
      providesTags: ["User"], // Helps automatically refresh data after changes
    }),

    addUser: builder.mutation({
      query: (newUser) => ({
        url: "/users",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["User"], // Refresh the list after adding
    }),

    updateUser: builder.mutation({
      query: ({ id, userData }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
    useLoginMutation,
    useGetUsersQuery,
    useAddUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = usersApiSlice;
