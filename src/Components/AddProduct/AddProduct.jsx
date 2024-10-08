import { Button } from "@mui/material";
import React, { useContext, useRef, useState } from "react";
import axios from "axios"
import { ContextSource } from "../ContextAPI/ContextAPI";
import useAxios, { AxiosSource } from "../Hooks/useAxios";
import Swal from 'sweetalert2'
import  "./AddProduct.css";

const AddProduct = () => {
  const [imagePreview, setImagePreview] = useState([]);
  const {user} = useContext(ContextSource)
  const axiosLink = useAxios(AxiosSource)
  // const [imageArray, setImageArray] = useState();
  const image = useRef();
  let hostImageArray = []
  const handleImage = (e) => {
    e.preventDefault();
    const img = Array.from(image.current.files);
    const imageURL = img?.map((e) => URL.createObjectURL(e));
    setImagePreview(imageURL);
    // setImageArray(img)

    console.log(imageURL);
  };

  const handleProduct = (e) => {
    e.preventDefault();
    // console.log('pukki');
    const from = e.target
    // const image = from.image.files
    const image = Array.from(from.image.files)
    const name = from.name.value
    const brand = from.brand.value
    const price = from.price.value
    const type = from.type.value
    const quantity = from.quantity.value
    const details = from.details.value
    const email = user?.email

    console.log(image);


    // axios.post('https://api.imgbb.com/1/upload?key=18fb354e6b4e44c25c7b877a072a961d', { image },
    //   {
    //     headers: {
    //       "content-type": "multipart/form-data"
    //     }
    //   }
    // )
    //   .then(res => {
    //     console.log(res);

    //   })
    //   .catch(err => {
    //     console.log(err);

    //   })


    if (image) {

      image.map(e => {
        console.log(e);
        const formData = new FormData();
        formData.append('image', e);
        console.log(formData);

        if (user) {
          axios.post('https://api.imgbb.com/1/upload?key=18fb354e6b4e44c25c7b877a072a961d', formData,
            {
              headers: {
                "content-type": "multipart/form-data"
              }
            })
            .then(res => {
              console.log(res);
              hostImageArray.push(res?.data?.data?.display_url)
              if (hostImageArray?.length == image?.length) {
                const AddProduct = {name,brand,price,quantity,type,details,hostImageArray, email}
                console.log(AddProduct);
                
                axiosLink.post('/addproducts', AddProduct)
                .then(res=>{
                  console.log(res);
                  Swal.fire("Your product is successfully added");
                  from.reset()
                  setImagePreview([])
                })
                .catch(err=>{
                  console.log(err);
                  Swal.fire("Your product is unsuccessfully to added");
                })
              }
            })
            .catch(err => {
              console.log(err);
  
            })
        }
        else{
          alert('Please login to add product')
        }

      })
    }
  }


  return (
    <section className="top-20 relative">
      <h1 className="text-4xl text-center font-bold mb-5">Add Your Products</h1>
      <div className="flex justify-around">
        <div>
          <h1 className="text-2xl text-center underline font-semibold">
            Image Preview Section
            <div className="flex gap-5">
              {
                imagePreview?.map((e, idx) =>
                  <img className="w-32" key={idx} src={e} alt="" />

                )
              }
            </div>
          </h1>
        </div>
        <div className="w-2/4">
          <div className="w-10/12 space-y-5">
            <form onSubmit={handleProduct} action="" className="space-y-2">
              <div className="flex justify-between">
                <div>
                  <label className="text-lg font-semibold" htmlFor="">
                    Name
                  </label>{" "}
                  <br />
                  <input
                    type="text"
                    name="name"
                    className="border-2 p-2 rounded-xl w-72 border-black"
                  />
                </div>
                <div>
                  <label className="text-lg font-semibold" htmlFor="">
                    Price
                  </label>{" "}
                  <br />
                  <input
                    type="number"
                    name="price"
                    className="border-2 p-2 rounded-xl w-72 border-black"
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <div>
                  <label className="text-lg font-semibold" htmlFor="">
                    Brand
                  </label>{" "}
                  <br />
                  <input
                    type="text"
                    name="brand"
                    className="border-2 p-2 rounded-xl w-72 border-black"
                  />
                </div>
                <div>
                  <label className="text-lg font-semibold" htmlFor="">
                    Quantity
                  </label>{" "}
                  <br />
                  <input
                    type="number"
                    name="quantity"
                    className="border-2 p-2 rounded-xl w-72 border-black"
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <div>
                  <label className="text-lg font-semibold" htmlFor="">
                    Upload Image
                  </label>{" "}
                  <br />
                  <input
                    type="file"
                    onChange={handleImage}
                    ref={image}
                    multiple
                    name="image"
                    className="border-2 p-2 rounded-xl w-72 border-black"
                  />
                </div>
                <div>
                  <label className="text-lg font-semibold" htmlFor="">
                    Type of Product
                  </label>{" "}
                  <br />
                  <input
                    type="text"
                    name="type"
                    className="border-2 p-2 rounded-xl w-72 border-black"
                  />
                </div>
              </div>
              <div>
                <label className="text-lg font-semibold" htmlFor="">
                  Description
                </label>
                <textarea
                  name="details"
                  className="w-full border-2 border-black rounded-xl p-2 h-36"
                  id=""
                ></textarea>
              </div>
              <div>
                {/* <Button type="submit" className="w-full font-semibold" variant="contained">
                  Submit
                </Button> */}
                <button className="border-2 w-full bg-blue-600 text-white font-semibold p-2 rounded-2xl text-lg">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddProduct;
