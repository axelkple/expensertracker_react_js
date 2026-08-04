import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

const CategoryList = ({ categorydata, onCategoryEdit, onCategoryDelete }) => {


  if (categorydata.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 bg-white rounded-xl shadow border border-gray-100">
        <p className="text-base font-medium">No Category found</p>
        <p className="text-sm text-gray-400">Add an Category using the form on the left.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden w-full">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
              <th className="px-3.5 py-3 text-xs font-semibold text-gray-700">Name</th>
              <th className="px-3.5 py-3 text-xs font-semibold text-gray-700">icon</th>
              <th className="px-3.5 py-3 text-xs font-semibold text-gray-700">color</th>
              {/* <th className="px-3.5 py-3 text-xs font-semibold text-gray-700">parentCategoryId</th> */}
              <th className="px-3.5 py-3 text-center text-xs font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {categorydata.map((category) => (
              <tr key={category.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-3.5 py-3 text-sm font-medium text-gray-900">
                  {category.name}
                </td>
                <td className="px-3.5 py-3 text-sm text-gray-700">
                  {category.icon}
                </td>
                <td className="px-3.5 py-3 text-sm text-gray-700">
                  {category.color}
                </td>
                {/* <td className="px-3.5 py-3 text-sm text-gray-700">
                  {category.currency}
                </td> */}

                <td className="px-3.5 py-3 text-center">
                  <div className="flex items-center justify-center space-x-1.5">
                    <button
                      type="button"
                      onClick={() => onCategoryEdit?.(category)}
                      className="inline-flex items-center px-2.5 py-1.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-lg hover:bg-blue-200 transition-all"
                    >
                      <Edit className="w-3.5 h-3.5 mr-1" />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onCategoryDelete?.(category)}
                      className="inline-flex items-center px-2.5 py-1.5 bg-red-100 text-red-700 text-xs font-medium rounded-lg hover:bg-red-200 transition-all"
                    >
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

export default CategoryList;