
import { useEffect, useState } from "react";
import UserForm from "./UserForm"
import UsersList from "./UsersList"
import { useForm } from "react-hook-form"
import { User } from "lucide-react";
import toast from 'react-hot-toast';
function Users() {

    const [userList, setUser] = useState([
        { id: 1, firstName: 'John', lastName: 'Doe', Email: 'exemplr@gmail.com', Password: 'leaxe@225' },
        { id: 2, firstName: 'John 1', lastName: 'Doe 1', Email: 'exemplr@gmail.com', Password: 'leaxe@225' },
        { id: 3, firstName: 'John 2', lastName: 'Doe 2', Email: 'exemplr@gmail.com', Password: 'leaxe@225' },
    ])

    const [editData, setEditData] = useState(null);

    useEffect(() => {
        methods.reset(editData);
    }, [editData])

    const defaultFormValue = {
        id: 0,
        firstName: '',
        lastName: '',
        Email: '',
        Password: '',
    }
    const methods = useForm({
        defaultValues: defaultFormValue
    });


    const handleFormSubmit = (user) => {


        try {
            if (user.id <= 0) {
                console.log("add");

                setUser((prevUsers) => [...prevUsers, user]);
            } else {
                console.log("edit");
                setUser((prevUsers) =>
                    prevUsers.map((item) =>
                        item.id === user.id ? { ...user, id: user.id } : item
                    )
                );
            }
            methods.reset(defaultFormValue);
            toast.success('Successfully created!');
        } catch (error) {
            toast.error('This is an error!');
        } finally {

        }
    };

    const handleFormReset = () => {
        methods.reset(defaultFormValue);
    }

    const handleUserEdit = (user) => {
        setEditData(user);

    }

    const handleUserDelete = (user) => {
        if (!confirm(`are you sure to delete a user : ${user.firstName}`)) return;
        try {
            setUser((prevUsers) => prevUsers.filter((item) => item.id !== user.id));
            console.log(user);
            toast.success('Successfully deleted!');
        } catch (error) {
            toast.error('This is an error!');
        }
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
                        <UserForm methods={methods} onFormSubmit={handleFormSubmit} onFormReset={handleFormReset} />
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