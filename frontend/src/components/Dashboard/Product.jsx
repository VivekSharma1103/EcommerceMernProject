import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Modal } from '@mui/material';
import { FiEdit2 } from 'react-icons/fi';
import { MdDeleteOutline } from 'react-icons/md';
import { createProduct, fetchProduct, deleteProduct } from '../../redux/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';

function Product() {
  const { handleSubmit, register } = useForm();
  const [isEdit, setIsEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleEdit = () => {
    setIsEdit(true);
    handleOpen();
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id))
      .then(() => {
        dispatch(fetchProduct());
      })
      .catch((error) => {
        console.error('Failed to delete product:', error);
      });
  };
  

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('price', data.price);
    formData.append('image', data.image[0]);
    formData.append('category', data.category);
    formData.append('stock', data.stock);
    formData.append('description', data.description);
    formData.append('discountPercentage', data.discountPercentage);

    await dispatch(createProduct(formData));
    dispatch(fetchProduct());
    handleClose();
  };

  const formStyle = {
    background: "#1a1a1a",
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
    maxWidth: '800px',
    margin: 'auto',
    position: 'relative',
    top: '10vh',
    left: '5vw',
    
  };

  const columns = [
    {
      field: 'image',
      headerName: 'Image',
      width: 100,
      renderCell: (params) => (
        <div>
          <img className="object-contain w-14" src={`http://localhost:3000/${params.value}`} />
        </div>
      ),
    },
    { field: 'name', headerName: 'Name', width: 100 },
    { field: 'price', headerName: 'Price(Rs.)', width: 150 },
    { field: 'category', headerName: 'Category' },
    { field: 'description', headerName: 'Description', width: 250 },
    { field: 'discountPrice', headerName: 'Discount Price(Rs.)' },
    { field: 'stock', headerName: 'Stock Avail.' },
    {
      field: 'actions',
      headerName: 'Actions',
      renderCell: (params) => (
        <div className="flex m-2 gap-2 cursor-pointer">
          <FiEdit2 size={26} onClick={handleEdit} className="text-blue-500" />
          <button onClick={() => handleDelete(params.id)}>
            <MdDeleteOutline size={26} className="text-red-500" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="m-10">
      <button
        onClick={() => {
          setIsEdit(false);
          handleOpen();
        }}
        className="bg-blue-500 px-6 py-2 rounded-sm my-4 text-white font-semibold"
      >
        Add Product
      </button>

      {/* DataGrid for displaying products */}
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={product}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
        />
      </Box>

      {/* Modal for Add/Edit Product */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={formStyle}>
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-6">
            {/* Name and Price (two inputs in one row) */}
            <div className="col-span-1">
              <label className="text-gray-400 font-bold mb-2">Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 text-white bg-gray-600 border  rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                {...register('name')}
                placeholder="Enter product name"
              />
            </div>

            <div className="col-span-1">
              <label className="text-gray-400 font-bold mb-2">Price</label>
              <input
                type="number"
                className="w-full px-4 py-3 bg-gray-600 text-white border  rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                {...register('price')}
                placeholder="Enter price"
              />
            </div>

            {/* Image and Category */}
            <div className="col-span-1">
              <label className="text-gray-400 font-bold mb-2">Image</label>
              <input
                type="file"
                className="w-full px-4 py-3 bg-gray-600  border text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                {...register('image')}
              />
            </div>

            <div className="col-span-1">
              <label className="text-gray-400 font-bold mb-2">Category</label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-gray-600 border  text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                {...register('category')}
                placeholder="Enter category"
              />
            </div>

            {/* Stock and Discount Percentage */}
            <div className="col-span-1">
              <label className="text-gray-400 font-bold mb-2">Stock</label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-gray-600 border text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                {...register('stock')}
                placeholder="Enter stock availability"
              />
            </div>

            <div className="col-span-1">
              <label className="text-gray-400 font-bold mb-2">Discount Percentage</label>
              <input
                type="number"
                className="w-full px-4 py-3 bg-gray-600 border text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                {...register('discountPercentage')}
                placeholder="Enter discount percentage"
              />
            </div>

            {/* Description (full width) */}
            <div className="col-span-2">
              <label className="text-gray-400 font-bold mb-2">Description</label>
              <textarea
                className="  w-full px-4 py-3 bg-gray-600 border text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                {...register('description')}
                placeholder="Enter product description"
              />
            </div>

            {/* Submit Button (full width at the bottom) */}
            <div className="col-span-2">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 px-6 py-3 rounded-lg text-white font-bold shadow-lg hover:bg-gradient-to-l hover:from-orange-500 hover:to-yellow-400 transition-all duration-300 mt-6"
              >
                {isEdit ? 'Update Product' : 'Add Product'}
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default Product;
