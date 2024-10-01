import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
function ProductCard({ product}) {

  const dispatch = useDispatch();

    const handleAddToCart = () => {

  dispatch(addToCart({
      id : product.id,
      name : product.name,
      price : product.price ,
      image : product.image,
      discountPrice  : product.discountPrice

  }))
    }
  return (
    <div className=''>
      <div className="relative  group ">
        <div className="absolute top-1 left-2 bg-red-500 text-white font-semibold text-xl p-2">
          {`${product.discountPercentage}% off`}
        </div>
        
        <img
          className="h-[80vh] w-full object-cover"
          src={`http://localhost:3000/${product.image}`}
        />
        <div
          className=" absolute 
          bottom-0
          opacity-0 w-full  translate-y-full  group-hover:opacity-100 transition-all duration-200 ease-in-out group-hover:-translate-y-0"
        >
          <div className="mt-auto">
            <button onClick={handleAddToCart} className="bg-black bg-opacity-50 px-6 py-4 w-full text-white">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <div className="mt-3 p-3">
        <h1 className='font-bold text-xl '>{product.name}</h1>
        <div className="flex gap-3">
          <span className=" text-red-500 line-through">Rs.{product.price}</span>
          <span className="font-semibold">Rs.{product.discountPrice}</span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;