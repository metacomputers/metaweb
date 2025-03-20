import { useState } from 'react';
import { FaTruck, FaBox, FaTruckLoading, FaCheckCircle, FaClock } from 'react-icons/fa';
import {
  useGetDeliveriesQuery,
  useUpdateDeliveryMutation,
} from '../../redux/api/deliveryApiSlice';
import moment from 'moment';

const DeliveryList = () => {
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const { data: deliveries, isLoading, refetch } = useGetDeliveriesQuery();
  const [updateDelivery] = useUpdateDeliveryMutation();

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const formData = new FormData();
      formData.append('status', newStatus);
      
      await updateDelivery({
        id,
        data: formData
      }).unwrap();
      
      setShowStatusModal(false);
      refetch();
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Section */}
      <div className="px-6 py-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-extrabold text-gray-900 flex items-center gap-3">
            <FaBox className="text-blue-600" />
            Delivery Dashboard
          </h1>
          <p className="mt-2 text-gray-600">Track and manage deliveries in real-time</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Deliveries</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{deliveries?.length || 0}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-full">
                <FaBox className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">In Transit</p>
                <p className="text-3xl font-bold text-yellow-600 mt-1">
                  {deliveries?.filter(d => d.status === 'In Transit').length || 0}
                </p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-full">
                <FaTruckLoading className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Delivered</p>
                <p className="text-3xl font-bold text-green-600 mt-1">
                  {deliveries?.filter(d => d.status === 'Delivered').length || 0}
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-full">
                <FaCheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Deliveries Table */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Order Info
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {deliveries?.map((delivery) => (
                    <tr key={delivery._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">#{delivery.orderNo}</div>
                          <div className="text-sm text-gray-500">Order ID: {delivery._id.slice(-6)}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{moment(delivery.deliveryDate).format('MMM DD, YYYY')}</div>
                        <div className="text-sm text-gray-500">{moment(delivery.deliveryDate).fromNow()}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">${delivery.totalPrice}</div>
                        <div className="text-sm text-gray-500">Delivery: ${delivery.deliveryPrice}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                          ${delivery.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                          delivery.status === 'In Transit' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'}`}>
                          <span className={`w-2 h-2 mr-2 rounded-full 
                            ${delivery.status === 'Delivered' ? 'bg-green-400' :
                            delivery.status === 'In Transit' ? 'bg-yellow-400' :
                            'bg-gray-400'}`}></span>
                          {delivery.status || 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => {
                            setSelectedDelivery(delivery);
                            setShowStatusModal(true);
                          }}
                          className="inline-flex items-center px-3 py-1 border border-transparent rounded-md text-sm font-medium text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <FaTruck className="mr-2" /> Update Status
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Status Modal - More Modern Design */}
      {showStatusModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-96 transform transition-all max-w-lg mx-4">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-blue-50 rounded-full mr-4">
                <FaTruck className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Update Status</h2>
            </div>
            <div className="space-y-4">
              {['Pending', 'In Transit', 'Delivered'].map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusUpdate(selectedDelivery._id, status)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200
                    ${selectedDelivery?.status === status
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700'}`}
                >
                  <span className="flex items-center">
                    {status === 'Pending' && <FaClock className="mr-2" />}
                    {status === 'In Transit' && <FaTruckLoading className="mr-2" />}
                    {status === 'Delivered' && <FaCheckCircle className="mr-2" />}
                    {status}
                  </span>
                  {selectedDelivery?.status === status && (
                    <span className="w-2 h-2 rounded-full bg-white"></span>
                  )}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowStatusModal(false)}
              className="mt-6 w-full p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200 text-gray-600 font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryList;
