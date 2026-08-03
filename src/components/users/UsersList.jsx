import { Edit, Trash2 } from 'lucide-react';

const UsersList = ({ userdata, onUserEdit, onUserDelete }) => {


    if (!userdata || userdata.length === 0) {
        return (<div className="text-center py-8 text-gray-500">
            <p className="text-base font-medium">No user found</p>
            <p className="text-sm">Add some users using the form on the left.</p>
        </div>)

    }

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden w-full">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
                            <th className="px-3.5 py-3 text-xs font-semibold text-gray-700">First Name</th>
                            <th className="px-3.5 py-3 text-xs font-semibold text-gray-700">Last Name</th>
                            <th className="px-3.5 py-3 text-xs font-semibold text-gray-700">Email</th>
                            {/* <th className="px-3.5 py-3 text-xs font-semibold text-gray-700">Password</th> */}
                            <th className="px-3.5 py-3 text-center text-xs font-semibold text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {userdata.map((user) => (
                            
                            <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-3.5 py-3 text-sm font-medium text-gray-900">{user.firstName}</td>
                                <td className="px-3.5 py-3 text-sm font-medium text-gray-900">{user.lastName}</td>
                                <td className="px-3.5 py-3 text-sm text-gray-700">{user.Email || user.email}</td>
                                {/* <td className="px-3.5 py-3 text-sm text-gray-700">{user.Password || user.password}</td> */}

                                <td className="px-3.5 py-3 text-center">
                                    <div className="flex items-center justify-center space-x-1.5">
                                        <button onClick={() => onUserEdit(user)} className="inline-flex items-center px-2.5 py-1.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-lg hover:bg-blue-200 transition-all">
                                            <Edit className="w-3.5 h-3.5 mr-1" />
                                            Edit
                                        </button>
                                        <button onClick={() => onUserDelete(user)} className="inline-flex items-center px-2.5 py-1.5 bg-red-100 text-red-700 text-xs font-medium rounded-lg hover:bg-red-200 transition-all">
                                            <Trash2 className="w-3.5 h-3.5 mr-1" />
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>



            </div>
        </div>
    );
};

export default UsersList;