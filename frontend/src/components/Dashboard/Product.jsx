import React, { useEffect, useState } from 'react';
import { fetchProduct, deleteProduct } from '../../redux/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { FiEdit2 } from 'react-icons/fi';
import { MdDeleteOutline } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { createProduct } from '../../redux/productSlice';

function Product() {
  const { handleSubmit, register } = useForm();
  const [isEdit, setIsEdit] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null); // Track selected product for delete/edit

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  const { product } = useSelector((state) => state.product);

  const handleEdit = (id) => {
    setSelectedProductId(id); // Store the product ID
    setIsEdit(true);
    setOpen(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id)) // Pass the product ID to deleteProduct action
      .then(() => {
        dispatch(fetchProduct()); // Fetch updated product list after deletion
      });
  };

  const columns = [
    {
      field: 'image',
      headerName: 'Image',
      width: 100,
      renderCell: (params) => (
        <div>
          <img
            className="object-contain w-14"
            src={`http://localhost:3000/${params.value}`}
            alt="Product"
          />
        </div>
      ),
    },
    { field: 'name', headerName: 'Name', width: 100 },
    {
      field: 'price',
      headerName: 'Price(Rs.)',
      width: 150,
    },
    {
      field: 'category',
      headerName: 'Category',
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 250,
    },
    {
      field: 'discountPrice',
      headerName: 'Discount Price(Rs.)',
    },
    {
      field: 'stock',
      headerName: 'Stock Avail.',
    },
    {
      field: 'actions',
      headerName: 'Actions',
      renderCell: (params) => (
        <div className="flex m-2 gap-2 cursor-pointer">
          <FiEdit2 size={26} onClick={() => handleEdit(params.row.id)} className="text-blue-500" />
          <MdDeleteOutline
            size={26}
            onClick={() => handleDelete(params.row.id)} // Pass product ID to handleDelete
            className="text-red-500"
          />
        </div>
      ),
    },
  ];

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
    setOpen(false);
  };

  const handleButtonClick = () => {
    setIsEdit(false);
    setOpen(true);
  };

  return (
    <div className="m-10">
      <button
        onClick={handleButtonClick}
        className="bg-blue-500 px-6 py-2 rounded-sm my-4 text-white font-semibold"
      >
        Add Product
      </button>
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
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Add your form fields here */}
            <button
              className="bg-gradient-to-r from-yellow-400 to-orange-500 px-6 py-3 rounded-lg text-white font-bold shadow-lg hover:bg-gradient-to-l hover:from-orange-500 hover:to-yellow-400 transition-all duration-300 mt-6 w-full"
              type="submit"
            >
              {isEdit ? 'Update Product' : 'Add Product'}
            </button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default Product;
