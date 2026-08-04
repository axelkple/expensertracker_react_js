import { useEffect, useState } from "react";
import axios from 'axios';
import { data } from "react-router";
import toast from 'react-hot-toast';
import CategoryList from './categoryList';
import CategoryForm from "./CategoryForm";
import { useForm } from "react-hook-form"

const Category = () => {

    const BASE_URL = import.meta.env.VITE_BASE_API_URL + '/categories';

    const [loading, setLoading] = useState(true);
    const [categoryList, setCategory] = useState([]);
    const [editData, setEditData] = useState(null);
    const defaultFormValue = {
        id: 0,
        name: '',
        icon: '',
        color: '',

    }
    const methods = useForm({
        defaultValues: defaultFormValue
    });

    const handleFormReset = () => {
        methods.reset(defaultFormValue);
    }

    useEffect(() => {

        try {
            const getcategory = async () => {

                var categorydata = (await axios.get(BASE_URL)).data;
                setCategory(categorydata);
            }
            getcategory();

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

    const handleAccountDelete = async (category) => {
        if (!confirm(`Are you sure you want to delete category: ${category.name}?`)) return;

        setLoading(true);


        const categoryId = Number(category.id);

        try {

            await axios.delete(`${BASE_URL}/${categoryId}`);


            setCategory((prevCategory) => prevCategory.filter((item) => Number(item.id) !== categoryId));


            toast.success('Successfully deleted!');
        } catch (error) {
            console.error("Delete Error:", error.response?.data || error.message);
            toast.error('Failed to delete account!');
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryEdit = (category) => {
        setEditData(category);

    }


    const handleFormSubmit = async (category) => {
        setLoading(true);
        console.log(category);
        const categoryId = Number(category.id) || 0;

        try {
            if (categoryId <= 0) {

                const createdcategory = (await axios.post(BASE_URL, category)).data;
                setCategory((prevCategory) => [...prevCategory, createdcategory]);
                console.log("cat created", createdcategory);
                toast.success('Successfully created!');
            } else {
                await axios.put(`${BASE_URL}/${categoryId}`, { ...category, id: categoryId });

                setCategory((prevCategory) =>
                    prevCategory.map((item) =>
                        item.id === categoryId ? { ...category, id: categoryId } : item
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
                        Category Management
                    </h1>

                    {loading && <p>loading...</p>}

                </div>


                <div className="flex flex-col lg:flex-row gap-6 items-start">
                    <div className="w-full lg:w-80 flex-shrink-0">
                        <CategoryForm methods={methods} onFormSubmit={handleFormSubmit} onFormReset={handleFormReset} />
                    </div>
                    <div className="w-full flex-1 min-w-0">
                        <CategoryList categorydata={categoryList} onCategoryEdit={handleCategoryEdit} onCategoryDelete={handleAccountDelete} />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Category
