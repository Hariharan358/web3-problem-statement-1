import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [wallet, setWallet] = useState(null);
    const [account, setAccount] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // For navigation

    // Dynamically import Martian Wallet Adapter if available
    useEffect(() => {
        (async () => {
            try {
                const { default: MartianWalletAdapter } = await import('@martianwallet/aptos-wallet-adapter');
                const adapter = new MartianWalletAdapter();
                setWallet(adapter);
            } catch (error) {
                console.error("Failed to load Martian Wallet Adapter:", error);
            }
        })();
    }, []);

    // Function to handle Aptos wallet login
    const handleAptosLogin = async () => {
        setLoading(true);

        // Use the adapter if available
        if (wallet) {
            try {
                await wallet.connect();
                const accountInfo = await wallet.account();
                if (accountInfo && accountInfo.address) {
                    setAccount(accountInfo.address);
                    alert(`Connected to Martian Wallet! Address: ${accountInfo.address}`);
                    navigate("/dashboard"); // Redirect to Dashboard after successful connection
                } else {
                    alert("Failed to retrieve account address.");
                }
            } catch (error) {
                console.error("Error connecting to Martian Wallet Adapter:", error);
                alert("Failed to connect using the Martian Wallet Adapter.");
            } finally {
                setLoading(false);
            }
            return;
        }

        // Fallback to window.martian if the adapter isn't available
        if (window.martian) {
            try {
                const accountInfo = await window.martian.connect();
                if (accountInfo && accountInfo.address) {
                    setAccount(accountInfo.address);
                    alert(`Connected to Martian Wallet! Address: ${accountInfo.address}`);
                    navigate("/dashboard"); // Redirect to Dashboard after successful connection
                } else {
                    alert("Failed to retrieve account address.");
                }
            } catch (error) {
                console.error("Error connecting to Martian Wallet:", error);
                alert("Failed to connect using the Martian Wallet.");
            } finally {
                setLoading(false);
            }
        } else {
            alert("Martian Wallet is not initialized. Please install the wallet extension.");
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md p-9 space-y-5 rounded-xl bg-slate-200 dark:bg-gray-50 dark:text-gray-800">
            <h1 className="text-2xl font-bold text-center">Login</h1>
            <form noValidate="" action="" className="space-y-6">
                <div className="space-y-5 text-sm">
                    <label htmlFor="username" className="block dark:text-gray-600">Username</label>
                    <input type="text" name="username" id="username" required placeholder="Username" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" />
                </div>
                <div className="space-y-1 text-sm">
                    <label htmlFor="password" className="block dark:text-gray-600">Password</label>
                    <input type="password" name="password" id="password" required placeholder="Password" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" />
                    <div className="flex justify-end text-xs dark:text-gray-600">
                        <a rel="noopener noreferrer" href="#">Forgot Password?</a>
                    </div>
                </div>
                <div className="flex justify-center space-x-4 pt-4">
                <button onClick={handleAptosLogin} className="p-3 rounded-sm bg-blue-600 text-white" disabled={loading}>
                    {loading ? "Connecting..." : "Login with Aptos Wallet"}
                </button>
            </div>          </form>

            {/* Divider */}
            <div className="flex items-center pt-4 space-x-1">
                <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
                <p className="px-3 text-sm dark:text-gray-600">Login with social accounts</p>
                <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
            </div>

            {/* Social Login Buttons */}
            <div className="flex justify-center space-x-4">
                <button aria-label="Log in with Google" className="p-3 rounded-sm bg-red-500 text-white">
                    {/* Google Icon */}
                    <i className="fab fa-google"></i>
                </button>
                <button aria-label="Log in with Twitter" className="p-3 rounded-sm bg-blue-400 text-white">
                    {/* Twitter Icon */}
                    <i className="fab fa-twitter"></i>
                </button>
                <button aria-label="Log in with GitHub" className="p-3 rounded-sm bg-gray-800 text-white">
                    {/* GitHub Icon */}
                    <i className="fab fa-github"></i>
                </button>
            </div>

            {/* New Section for Aptos Wallet Login */}
          

            {account && (
                <p className="text-center text-sm pt-4">
                    Successfully connected to Aptos Wallet!
                </p>
            )}

            <p className="text-xs text-center sm:px-6 dark:text-gray-600">
                Don't have an account? <a rel="noopener noreferrer" href="/register" className="">Sign up</a>
            </p>
        </div>
    );
}

export default Login;
