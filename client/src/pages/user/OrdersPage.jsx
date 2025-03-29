import moment from 'moment';
import UserMenu from '../../components/Layout/UserMenu';

const OrdersPage = ({ orders }) => {
    return (
        <div className="container mx-auto p-6 ">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* User Menu */}
                <div>
                    <UserMenu />
                </div>

                {/* Orders Section */}
                <div className="col-span-2">
                    <h1 className="text-center text-3xl font-semibold mb-6 text-gray-800">All Orders</h1>

                    {orders?.map((o, i) => (
                        <div key={i} className="border shadow-lg rounded-lg mb-6 bg-white">
                            <table className="min-w-full table-auto text-left">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="py-3 px-4 text-gray-700">#</th>
                                        <th className="py-3 px-4 text-gray-700">Status</th>
                                        <th className="py-3 px-4 text-gray-700">Buyer</th>
                                        <th className="py-3 px-4 text-gray-700">Date</th>
                                        <th className="py-3 px-4 text-gray-700">Payment</th>
                                        <th className="py-3 px-4 text-gray-700">Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="hover:bg-gray-50 transition duration-200">
                                        <td className="py-2 px-4">{i + 1}</td>
                                        <td className="py-2 px-4">{o?.status}</td>
                                        <td className="py-2 px-4">{o?.buyer?.name}</td>
                                        <td className="py-2 px-4">{moment(o?.createdAt).fromNow()}</td>
                                        <td className="py-2 px-4">
                                            {o?.payment?.status === 'Pending' ? (
                                                <span className='text-yellow-500'>Pending</span>
                                            ) : (
                                                <span className='text-green-500'>Success</span>
                                            )}
                                        </td>
                                        <td className="py-2 px-4">{o?.products?.length}</td>
                                    </tr>
                                </tbody>
                            </table>

                            {/* Product details */}
                            <div className="p-4 border-t">
                                {o?.products?.map((p) => (
                                    <div
                                        key={p._id}
                                        className="flex items-center bg-gray-50 shadow-sm p-4 mb-4 rounded-lg"
                                    >
                                        <div className="flex-shrink-0">
                                            <img
                                                src={`/api/v1/product/product-photo/${p._id}`}
                                                alt={p.name}
                                                className="w-24 h-24 object-cover rounded"
                                            />
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-lg font-semibold">{p.name}</p>
                                            <p className="text-gray-600">{p.description.substring(0, 30)}...</p>
                                            <p className="text-blue-600 font-semibold">Price: ₹{p.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OrdersPage;
