import { apiSlice } from "./apiSlice";
import { DELIVERY_URL } from "../features/constants";

export const deliveryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDeliveries: builder.query({
      query: () => DELIVERY_URL,
      providesTags: ['Delivery'],
    }),

    getDeliveryById: builder.query({
      query: (id) => `${DELIVERY_URL}/${id}`,
    }),

    createDelivery: builder.mutation({
      query: (data) => ({
        url: DELIVERY_URL,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Delivery'],
    }),

    updateDelivery: builder.mutation({
      query: ({ id, data }) => ({
        url: `${DELIVERY_URL}/${id}`,
        method: 'PUT',
        body: data,
        formData: true, // Add this to handle formidable
      }),
      invalidatesTags: ['Delivery'],
    }),

    deleteDelivery: builder.mutation({
      query: (id) => ({
        url: `${DELIVERY_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Delivery'],
    }),
  }),
});

export const {
  useGetDeliveriesQuery,
  useGetDeliveryByIdQuery,
  useCreateDeliveryMutation,
  useUpdateDeliveryMutation,
  useDeleteDeliveryMutation,
} = deliveryApiSlice;
