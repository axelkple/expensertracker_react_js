// src/pages/Users.jsx
import UserForm from "./UserForm"
import UsersList from "./UsersList"

function Users() {
    const userList = [
        { id: 1, firstName: 'John', lastName: 'Doe', Email: 'exemplr@gmail.com', Password: 'leaxe@225' },
        { id: 2, firstName: 'John 1', lastName: 'Doe 1', Email: 'exemplr@gmail.com', Password: 'leaxe@225' },
        { id: 3, firstName: 'John 2', lastName: 'Doe 2', Email: 'exemplr@gmail.com', Password: 'leaxe@225' },
    ];

    const handleUserEdit = (user) => {
        console.log(user);

    }

    const handleUserDelete = (user) => {
        if (!confirm(`are you sure to delete a user : ${user.firstName}`)) return;
        console.log(user);
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            {/* 1. Increased max-width to max-w-7xl */}
            <div className="max-w-7xl mx-auto space-y-6">

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Users Management
                    </h1>
                </div>

                {/* 2. Adjusted ratio: Form gets w-80/1-quarter, Table gets flex-1 */}
                <div className="flex flex-col lg:flex-row gap-6 items-start">
                    <div className="w-full lg:w-80 flex-shrink-0">
                        <UserForm />
                    </div>
                    <div className="w-full flex-1 min-w-0">
                        <UsersList userdata={userList} onUserEdit={handleUserEdit} onUserDelete={handleUserDelete} />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Users