
import { useEffect, useState } from "react";
import UserForm from "./UserForm"
import UsersList from "./UsersList"
import { useForm } from "react-hook-form"
import { User } from "lucide-react";
import toast from 'react-hot-toast';
import axios from 'axios';
import { data } from "react-router";
function Users() {

    const BASE_URL = import.meta.env.VITE_BASE_API_URL + '/users';

    const [userList, setUser] = useState([
        // { id: 1, firstName: 'John', lastName: 'Doe', Email: 'exemplr@gmail.com', Password: 'leaxe@225' },
        // { id: 2, firstName: 'John 1', lastName: 'Doe 1', Email: 'exemplr@gmail.com', Password: 'leaxe@225' },
        // { id: 3, firstName: 'John 2', lastName: 'Doe 2', Email: 'exemplr@gmail.com', Password: 'leaxe@225' },
    ]);
    const [loading, setLoading] = useState(true);
    const [editData, setEditData] = useState(null);

    useEffect(() => {

        try {
            const getuser = async () => {

                var userdata = (await axios.get(BASE_URL)).data;
                setUser(userdata);
            }
            getuser();
        } catch (error) {
            console.log(error);
            toast.error('This is an error!');
        }
        finally {
            setLoading(false);
        }

    }, []);

    useEffect(() => {
        methods.reset(editData);
    }, [editData])

    const defaultFormValue = {
        id: 0,
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    }
    const methods = useForm({
        defaultValues: defaultFormValue
    });


    const handleFormSubmit = async (user) => {
        setLoading(true);

        // Parse ID safely so "0" becomes 0, and undefined becomes 0
        const userId = Number(user.id) || 0;

        try {
            if (userId <= 0) {

                const createdUser = (await axios.post(BASE_URL, user)).data;
                setUser((prevUsers) => [...prevUsers, createdUser]);
                toast.success('Successfully created!');
            } else {
                await axios.put(`${BASE_URL}/${userId}`, { ...user, id: userId });

                setUser((prevUsers) =>
                    prevUsers.map((item) =>
                        item.id === userId ? { ...user, id: userId } : item
                    )
                );
                toast.success('Successfully updated!');
            }

            methods.reset(defaultFormValue);
        } catch (error) {

            toast.error('This is an error!');

        } finally {
            setLoading(false);
        }
    };

    const handleFormReset = () => {
        methods.reset(defaultFormValue);
    }

    const handleUserEdit = (user) => {
        setEditData(user);

    }

    const handleUserDelete = async (user) => {
        if (!confirm(`Are you sure you want to delete user: ${user.firstName}?`)) return;

        setLoading(true);

        
        const userId = Number(user.id);

        try {
            
            await axios.delete(`${BASE_URL}/${userId}`);

          
            setUser((prevUsers) => prevUsers.filter((item) => Number(item.id) !== userId));

            console.log("Deleted user:", user);
            toast.success('Successfully deleted!');
        } catch (error) {
            console.error("Delete Error:", error.response?.data || error.message);
            toast.error('Failed to delete user!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            {/* 1. Increased max-width to max-w-7xl */}
            <div className="max-w-7xl mx-auto space-y-6">

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Users Management
                    </h1>

                    {loading && <p>loading...</p>}

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