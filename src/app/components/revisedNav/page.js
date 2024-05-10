import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useStoreContext } from '@/app/context/storecontext';

const Navbar = () => {
    const [cartData, setCartData] = useState([]);
    const ctx = useStoreContext();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const userData = JSON.parse(localStorage.getItem('cartid'));
        setCartData(userData);
    };

    const handlePurchase = async (e) => {
        e.preventDefault();
        const { data } = await axios.post('/api/payment', {
            body: JSON.stringify(cartData)
        }, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        window.location.assign(data);
    };

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900 z-auto flex  md:col-start-2 md:row-start-1  md:pb-40 justify-center w-full">
            <div className="max-w-screen-xl flex justify-between items-center mx-auto p-4 z-60">
                <Link href="/" className="flex items-center space-x-3 z-60 ">
                    <span className="text-5xl max-sm:text-2xl font-semibold whitespace-nowrap dark:text-white">NuThread By Julian</span>
                </Link>
                <div className="w-full md:block md:w-auto z-60" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <Link href="/inventory" className="block py-2 z-60 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</Link>
                        </li>
                        <li>
                            <Link href='/testCart' className="block py-2 px-3 text-gray-900 z-60 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Cart</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;