import { useEffect, useState } from "react";
import axios from 'axios';
import { data } from "react-router";
import toast from 'react-hot-toast';
import PaymentMethodList from "./PaymentMethodList";
import PaymentMethodForm from "./PaymentMethodForm";
import { useForm } from "react-hook-form"

const PaymentMethod = () => {

    const BASE_URL = import.meta.env.VITE_BASE_API_URL + '/paymentmethod';

    const [loading, setLoading] = useState(true);
    const [paymentmethodList, setPaymentMethod] = useState([]);
    const [editData, setEditData] = useState(null);

    const defaultFormValue = {
        id: 0,
        name: '',

    }

    useEffect(() => {

        try {
            const getpaymentmethod = async () => {

                var paymentmethoddata = (await axios.get(BASE_URL)).data;
                setPaymentMethod(paymentmethoddata);
            }
            getpaymentmethod();

        } catch (error) {
            console.log(error);
            toast.error('This is an error!');
        }
        finally {
            setLoading(false);
        }

    }, []);

    const handleFormReset = () => {
        methods.reset(defaultFormValue);
    }

    useEffect(() => {
        methods.reset(editData);
    }, [editData])

    const methods = useForm({
        defaultValues: defaultFormValue
    });

    const handlePaymentmethodEdit = (paymentmethod) => {
        setEditData(paymentmethod);
        console.log(paymentmethod)

    }

    const handlePaymentmethodDelete = async (paymentmethod) => {
        if (!confirm(`Are you sure you want to delete Paymentmethod: ${paymentmethod.name}?`)) return;

        setLoading(true);

        const paymentmethodId = Number(paymentmethod.id);

        try {

            await axios.delete(`${BASE_URL}/${paymentmethodId}`);

            setPaymentMethod((prevPaymentmethod) => prevPaymentmethod.filter((item) => Number(item.id) !== paymentmethodId));

            toast.success('Successfully deleted!');
        } catch (error) {
            console.error("Delete Error:", error.response?.data || error.message);
            toast.error('Failed to delete account!');
        } finally {
            setLoading(false);
        }
    };

    const handleFormSubmit = async (paymentmethod) => {
        setLoading(true);
        console.log(paymentmethod);
        const paymentmethodId = Number(paymentmethod.id) || 0;

        try {
            if (paymentmethodId <= 0) {

                const createpaymentmethod = (await axios.post(BASE_URL, paymentmethod)).data;
                setPaymentMethod((prevPaymentmethod) => [...prevPaymentmethod, createpaymentmethod]);
                console.log("cat created", createpaymentmethod);
                toast.success('Successfully created!');
            } else {
                await axios.put(`${BASE_URL}/${paymentmethodId}`, { ...paymentmethod, id: paymentmethodId });

                setPaymentMethod((prevPaymentmethod) =>
                    prevPaymentmethod.map((item) =>
                        item.id === paymentmethodId ? { ...paymentmethod, id: paymentmethodId } : item
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
                        Payment Method Management
                    </h1>

                    {loading && <p>loading...</p>}

                </div>


                <div className="flex flex-col lg:flex-row gap-6 items-start">
                    <div className="w-full lg:w-80 flex-shrink-0">
                        <PaymentMethodForm methods={methods} onFormSubmit={handleFormSubmit} onFormReset={handleFormReset} />
                    </div>
                    <div className="w-full flex-1 min-w-0">
                        <PaymentMethodList paymentmethoddata={paymentmethodList} onPaymentmethodEdit={handlePaymentmethodEdit} onPaymentmethodDelete={handlePaymentmethodDelete} />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default PaymentMethod
