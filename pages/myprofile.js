import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const myprofile = (props) => {
    const router = useRouter();
    const [user, setUser] = useState({});
    const [image, setImage] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [pincode, setPincode] = useState('');
    const { Toast } = props;

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            router.push('/');
        } else {
            const userData = JSON.parse(localStorage.getItem('user')) || {};
            setUser(userData);
        }
    }, []); // Add an empty dependency array to run the effect only once

    // Log user.name after the user state is set
    useEffect(() => {
        setName(user.name);
        setEmail(user.email)
        setAddress(user.address)
        setPincode(user.pincode)
        setPhone(user.phone)
    }, [user]);


    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    }



    const handleChange = async (e) => {




        if (e.target.name == "name") {
            setName(e.target.value);
        }

        else if (e.target.name == "email") {
            setEmail(e.target.value);
        }

        else if (e.target.name == "address") {
            setAddress(e.target.value);
        }

        else if (e.target.name == "phone") {
            setPhone(e.target.value);
        }


        else if (e.target.name == "pincode") {
            setPincode(e.target.value);
        }

        else {

        }



    }

    const handleUpdate = async (e) => {

        e.preventDefault();

        let data = { id: `${user._id}`, name, address, pincode, phone };
        let res = await fetch("/api/user/updateuser",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(data)
            })
        let response = await res.json();
        if (response.success) {
            localStorage.setItem("user", JSON.stringify(response.user))
            Toast("success", "Details Updated")
        }
        else {
            Toast("error", "Something went Wrong")
        }

    }





    return (


        <div className='w-full h-full mt-8 mb-96'>
            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
                theme="light"
            />
            <div className='flex justify-center items-center flex-col'>

                <div className='flex w-5/6 flex-col md:flex-row items-center'>

                    <div className='w-3/5 text flex flex-col items-center '>
                        <img src="boy.jpg" className='w-24 h-24 rounded-full' alt='img' />
                        <p className='bold text-xl border-none hover:border-none text-center' >{name}</p>
                        <div>
                            <input type="image" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mt-5" alt='Upload an image' />
                        </div>
                    </div>

                    <div className='w-full '>

                        <div className='mt-10'>
                            <h2 className='text-md text-xl  mt-4 font-semibold mb-3'>My Details</h2>

                            <div className='grid sm:grid-cols-2 gap-4'>



                                <div className='flex flex-col gap-2 '>
                                    <label>Name</label>
                                    <input onChange={handleChange} value={name} name="name" className='pl-2 h-10 border border-gray -300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800' />
                                </div>

                                <div className='flex flex-col gap-2'>
                                    <label>Email</label>
                                    <input onChange={handleChange} disabled value={email} name="email" type="email" className='disabled:bg-gray-200 pl-2 h-10 border border-gray -300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800' />
                                </div>

                                <div className='flex flex-col gap-2 sm:col-span-2'>
                                    <label>Address</label>
                                    <textarea onChange={handleChange} value={address} name="address" className='pt-2 pl-2 h-16 border border-gray -300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800' ></textarea>
                                </div>

                                <div className='flex flex-col gap-2'>
                                    <label>Phone</label>
                                    <input onChange={handleChange} value={phone == 0 ? " " : phone} name="phone" type='number' className='pl-2 h-10 border border-gray -300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800' />
                                </div>

                                <div className='flex flex-col gap-2'>
                                    <label>Pincode</label>
                                    <input onChange={handleChange} value={pincode == 0 ? " " : pincode} name="pincode" type="number" className='pl-2 h-10 border border-gray -300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800' />
                                </div>

                                <button type="image" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mt-5 w-36" onClick={handleUpdate}>Update</button>






                            </div>

                        </div>

                    </div>



                </div>





                {/* <div className='grid sm:grid-cols-2 gap-4 mt-10'>



                    <div className='flex flex-col gap-2 '>
                        <label>Name</label>
                        <input className='pl-2 h-10 border border-gray -300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800' />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label>Email</label>
                        <input type="email" className='pl-2 h-10 border border-gray -300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800' />
                    </div>

                    <div className='flex flex-col gap-2 sm:col-span-2'>
                        <label>Address</label>
                        <textarea className='pt-2 pl-2 h-16 border border-gray -300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800' ></textarea>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label>Phone</label>
                        <input type='number' className='pl-2 h-10 border border-gray -300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800' />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label>Pincode</label>
                        <input type="number" className='pl-2 h-10 border border-gray -300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800' />
                    </div>


                    <div className='flex flex-col gap-2'>
                        <label>Province</label>
                        <input readOnly className='pl-2 h-10 border border-gray -300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800' />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label>City</label>
                        <input readOnly className='pl-2 h-10 border border-gray -300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800' />
                    </div>



                </div> */}

            </div>










        </div>





















    )
}

export default myprofile




// export async function getServerSideProps(context) {
//     if (!mongoose.connections[0].readyState) {
//         await mongoose.connect(process.env.MONGO_URL)
//     }


//     return {
//         props: { tshirts }
//     }


// }