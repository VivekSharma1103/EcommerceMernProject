import React, { useEffect ,useState } from 'react';
import { fetchProduct , deleteProduct } from '../../redux/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FiEdit2 } from 'react-icons/fi';
import { MdDeleteOutline } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { createProduct } from '../../redux/productSlice';
function Product() {
  const { handleSubmit, register } = useForm();
  const [isEdit , setIsEdit] = useState(false) ;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProduct());
  }, []);

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

  const handleEdit = () => {
    setIsEdit(true)
    handleOpen()
  }
  const handleDelete = ()=>{
      dispatch(deleteProduct());
  }
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
          <FiEdit2 size={26} onClick={handleEdit} className="text-blue-500" />

          <MdDeleteOutline size={26} onClick={handleDelete}className="text-red-500" />
        </div>
      ),
    },
  ];

  const onSubmit = async (data) => {
    console.log(data.discountPercentage);
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('price', data.price);
    formData.append('image', data.image[0]);
    formData.append('category', data.category);
    formData.append('stock', data.stock);
    formData.append('description', data.description);
    formData.append('discountPercentage', data.discountPercentage);
    console.log('formdata', formData);
    await dispatch(createProduct(formData));
    dispatch(fetchProduct());
    handleClose();
  };
  
  const handleButtonClick = () => {
    setIsEdit(false);
    handleOpen()
  }

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
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box
    sx={{
      backgroundColor: '#fff7f0',
      padding: '2rem',
      borderRadius: '12px',
      boxShadow: '0px 4px 20px rgba(0, 0, 0, 1)',
      maxWidth: '800px',
      margin: 'auto',
      position:'relative',
      top:'20vh'
      
    }}
  >
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Name */}
      <div className="flex flex-col">
        <label className="text-gray-800 font-bold mb-2">Name</label>
        <input
          className="input_field px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          type="text"
          {...register('name')}
          placeholder="Enter name"
        />
      </div>

      {/* Price */}
      <div className="flex flex-col">
        <label className="text-gray-800 font-bold mb-2">Price</label>
        <input
          className="input_field px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          type="number"
          {...register('price')}
          placeholder="Enter price"
        />
      </div>

      {/* Image */}
      <div className="flex flex-col">
        <label className="text-gray-800 font-bold mb-2">Image</label>
        <input
          className="input_field px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          type="file"
          {...register('image')}
        />
      </div>

      {/* Category */}
      <div className="flex flex-col">
        <label className="text-gray-800 font-bold mb-2">Category</label>
        <input
          className="input_field px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          type="text"
          {...register('category')}
          placeholder="Enter category"
        />
      </div>

      {/* Description */}
      <div className="flex flex-col">
        <label className="text-gray-800 font-bold mb-2">Description</label>
        <input
          type="text"
          className="input_field px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          {...register('description')}
          placeholder="Enter description"
        />
      </div>

      {/* Stock */}
      <div className="flex flex-col">
        <label className="text-gray-800 font-bold mb-2">Stock</label>
        <input
          type="text"
          className="input_field px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          {...register('stock')}
          placeholder="Enter stock"
        />
      </div>

      {/* Discount Percentage */}
      <div className="flex flex-col">
        <label className="text-gray-800 font-bold mb-2">Discount Percentage</label>
        <input
          type="number"
          className="input_field px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          {...register('discountPercentage')}
          placeholder="Enter discount percentage"
        />
      </div>
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