import moment from 'moment';
import UserMenu from '../../components/Layout/UserMenu';

const OrdersPage = ({ orders }) => {
    return (
        <div className="container mx-auto mt-6 p-6 pt-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* User Menu */}
                <div>
                    <UserMenu />
                </div>

                {/* Orders Section */}
                <div className="col-span-2">
                    <h1 className="text-center text-2xl font-semibold mb-6">All Orders</h1>

                    {orders?.map((o, i) => (
                        <div key={i} className="border shadow-lg rounded-lg mb-6">
                            <table className="min-w-full table-auto text-left bg-white">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="py-2 px-4">#</th>
                                        <th className="py-2 px-4">Status</th>
                                        <th className="py-2 px-4">Buyer</th>
                                        <th className="py-2 px-4">Date</th>
                                        <th className="py-2 px-4">Payment</th>
                                        <th className="py-2 px-4">Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="py-2 px-4">{i + 1}</td>
                                        <td className="py-2 px-4">{o?.status}</td>
                                        <td className="py-2 px-4">{o?.buyer?.name}</td>
                                        <td className="py-2 px-4">{moment(o?.createdAt).fromNow()}</td>
                                        <td className="py-2 px-4">
                                            {o?.payment?.status === 'Pending' ? <span className='text-green-500'>Success</span>
                                                : o?.payment?.status}
                                        </td>
                                        <td className="py-2 px-4">{o?.products?.length}</td>
                                    </tr>
                                </tbody>
                            </table>

                            {/* Product details */}
                            <div className="p-4">
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
