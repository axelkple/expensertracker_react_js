import { useEffect, useState } from "react";
import axios from 'axios';
import { data } from "react-router";
import toast from 'react-hot-toast';
import AccountList from './AccountList';
import AccountForm from "./AccountForm";
import { useForm } from "react-hook-form"
function Accounts() {

    const BASE_URL = import.meta.env.VITE_BASE_API_URL + '/accounts';

    const [loading, setLoading] = useState(true);
    const [accountList, setAccount] = useState([]);
    const [editData, setEditData] = useState(null);

    useEffect(() => {

        try {
            const getaccount = async () => {

                var accountdata = (await axios.get(BASE_URL)).data;
                setAccount(accountdata);
            }
            getaccount();

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
        name: '',
        type: '',
        balance: '',
        currency: '',
    }
    const methods = useForm({
        defaultValues: defaultFormValue
    });

    const handleFormReset = () => {
        methods.reset(defaultFormValue);
    }

    const handleAccountEdit = (account) => {
        setEditData(account);

    }

    const handleAccountDelete = async (account) => {
        if (!confirm(`Are you sure you want to delete Account: ${account.name}?`)) return;

        setLoading(true);


        const accountId = Number(account.id);

        try {

            await axios.delete(`${BASE_URL}/${accountId}`);


            setAccount((prevAccount) => prevAccount.filter((item) => Number(item.id) !== accountId));


            toast.success('Successfully deleted!');
        } catch (error) {
            console.error("Delete Error:", error.response?.data || error.message);
            toast.error('Failed to delete account!');
        } finally {
            setLoading(false);
        }
    };

    const handleFormSubmit = async (account) => {
        setLoading(true);
        console.log(account);
        const accountId = Number(account.id) || 0;

        try {
            if (accountId <= 0) {

                const createdaccount = (await axios.post(BASE_URL, account)).data;
                setAccount((prevAccounts) => [...prevAccounts, createdaccount]);
                console.log(createdaccount);
                toast.success('Successfully created!');
            } else {
                await axios.put(`${BASE_URL}/${accountId}`, { ...account, id: accountId });

                setAccount((prevAccounts) =>
                    prevAccounts.map((item) =>
                        item.id === accountId ? { ...account, id: accountId } : item
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

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            {/* 1. Increased max-width to max-w-7xl */}
            <div className="max-w-7xl mx-auto space-y-6">

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Account Management
                    </h1>

                    {loading && <p>loading...</p>}

                </div>


                <div className="flex flex-col lg:flex-row gap-6 items-start">
                    <div className="w-full lg:w-80 flex-shrink-0">
                        <AccountForm methods={methods} onFormSubmit={handleFormSubmit} onFormReset={handleFormReset} />
                    </div>
                    <div className="w-full flex-1 min-w-0">
                        <AccountList accountdata={accountList} onAccountEdit={handleAccountEdit} onAccountDelete={handleAccountDelete} />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Accounts