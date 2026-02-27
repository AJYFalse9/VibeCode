"use client";

import { useTheme } from "next-themes";
import useSWR from "swr";
import { Sun, Moon, Database, X } from "lucide-react";
import { useState, useEffect } from "react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

    const { data, error, isLoading, mutate } = useSWR(`${API_URL}/api/products`, fetcher, {
        revalidateOnFocus: false,
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <main className="min-h-screen p-8 md:p-24 flex flex-col items-center justify-center bg-gradient-to-br from-brand-blue/10 via-brand-purple/10 to-brand-pink/10 dark:from-brand-blue/20 dark:via-brand-purple/20 dark:to-brand-pink/20 transition-colors duration-500">

            <div className="absolute top-6 right-6">
                <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:scale-110 transition-transform"
                >
                    {theme === "dark" ? <Sun size={24} className="text-yellow-400" /> : <Moon size={24} className="text-gray-600" />}
                </button>
            </div>

            <div className="max-w-3xl w-full flex flex-col items-center text-center space-y-8 bg-white/50 dark:bg-black/50 backdrop-blur-md p-12 rounded-3xl shadow-xl border border-white/20 dark:border-white/10">
                <h1 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-brand-blue via-brand-purple to-brand-pink">
                    Welcome to Vibecoding Workshop
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                    Your Monolith Monorepo boilerplate is ready. Build something amazing.
                </p>

                <div className="w-full pt-8 border-t border-gray-200 dark:border-gray-800">
                    <button
                        onClick={() => {
                            mutate();
                            setShowModal(true);
                        }}
                        className="group flex items-center justify-center gap-2 mx-auto px-6 py-3 bg-gradient-to-r from-brand-blue to-brand-purple text-white rounded-full font-medium shadow-md hover:shadow-lg hover:opacity-90 transition-all active:scale-95"
                    >
                        <Database size={20} className="group-hover:animate-bounce" />
                        Test API Connection
                    </button>
                </div>

                {isLoading && <div className="mt-4 animate-pulse text-gray-500">Connecting to Backend...</div>}

                {error && (
                    <div className="mt-4 p-4 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl w-full text-left">
                        Failed to load from API. Did you start the FastAPI backend?
                        <br />
                        <span className="text-sm opacity-80">(Checked API URL: {API_URL})</span>
                    </div>
                )}
            </div>

            {/* API Response Modal */}
            {showModal && data && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
                    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-2xl border border-gray-200 dark:border-gray-800 transform scale-100 transition-all">
                        <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-800">
                            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-brand-purple">
                                API Response Data
                            </h3>
                            <button
                                onClick={() => setShowModal(false)}
                                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-6">
                            <div className="bg-gray-50 dark:bg-black rounded-2xl p-0 overflow-hidden border border-gray-100 dark:border-gray-800">
                                <div className="overflow-x-auto max-h-[50vh]">
                                    <table className="w-full text-left border-collapse">
                                        <thead className="sticky top-0 bg-gray-100 dark:bg-gray-900 shadow-sm z-10">
                                            <tr>
                                                <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300">ID</th>
                                                <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300">Product Name</th>
                                                <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300">Price</th>
                                                <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300">Stock</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                                            {Array.isArray(data) && data.map((product: any) => (
                                                <tr key={product.id} className="hover:bg-brand-blue/5 transition-colors">
                                                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400 font-medium">#{product.id}</td>
                                                    <td className="px-6 py-4 text-gray-900 dark:text-gray-100">{product.name}</td>
                                                    <td className="px-6 py-4 text-brand-pink font-semibold">${product.price.toFixed(2)}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${product.stock > 20 ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400' : 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400'}`}>
                                                            {product.stock} items
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end p-6 border-t border-gray-100 dark:border-gray-800">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-6 py-2.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-xl font-medium transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
