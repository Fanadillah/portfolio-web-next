// app/components/admin/AdminNavbar.tsx
"use client";

import { Bell, Search, User } from "lucide-react";
import { useAuth } from "@/app/api/AuthContext";
import { useState } from "react";

export default function AdminNavbar() {
    const { user } = useAuth();
    const [showProfile, setShowProfile] = useState(false);

    return (
        <nav className="h-20 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30">
            <div className="h-full px-6 flex items-center justify-between">
                {/* Search Bar */}
                <div className="flex-1 max-w-xl">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                        />
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-4">
                    {/* Notifications */}
                    <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <Bell size={20} />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>

                    {/* User Profile */}
                    <div className="relative">
                        <button
                            onClick={() => setShowProfile(!showProfile)}
                            className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                                {user?.photoURL ? (
                                    <img
                                        src={user.photoURL}
                                        alt="Profile"
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                ) : (
                                    <User className="text-white" size={20} />
                                )}
                            </div>
                            <div className="text-left hidden md:block">
                                <p className="text-sm font-semibold text-gray-800">
                                    {user?.displayName || 'Admin'}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {user?.email || 'admin@example.com'}
                                </p>
                            </div>
                        </button>

                        {/* Profile Dropdown */}
                        {showProfile && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                                <a href="/admin/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    Settings
                                </a>
                                <a href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    View Site
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}