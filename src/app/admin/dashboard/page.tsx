// app/admin/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { Portfolio } from "../../../types/portfolio";
import { Briefcase, Eye, GitBranch, TrendingUp } from "lucide-react";
import Link from "next/link";
import { getAllPortfolio } from "@/lib/posts";

export default function AdminDashboardPage() {
    const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        total: 0,
        withDemo: 0,
        withGithub: 0,
        views: 0,
    });

    useEffect(() => {
        loadPosts();
    }, []);

    async function loadPosts() {
        try {
            const data = await getAllPortfolio();
            setPortfolios(data)
            setStats({
                total: data.length,
                withDemo: data.filter((p)=> p.link).length,
                withGithub: data.filter((p) => p.github !== "").length,
                views: Math.floor(Math.random() * 1000) + 500
            })
        }catch(error) {
            console.error("Error Get Data:", error)
        } finally {
            setLoading(false);
        }
    }

    const StatCard = ({ icon: Icon, label, value, color }: any) => (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-600 mb-1">{label}</p>
                    <p className="text-3xl font-bold text-gray-900">{value}</p>
                </div>
                <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center`}>
                    <Icon className="text-white" size={24} />
                </div>
            </div>
        </div>
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-gray-500">Loading...</div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
                <p className="text-gray-600">Welcome back! Here's your portfolio overview.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    icon={Briefcase}
                    label="Total Projects"
                    value={stats.total}
                    color="bg-gradient-to-br from-cyan-500 to-blue-600"
                />
                <StatCard
                    icon={Eye}
                    label="Total Views"
                    value={stats.views}
                    color="bg-gradient-to-br from-purple-500 to-pink-600"
                />
                <StatCard
                    icon={TrendingUp}
                    label="Live Demos"
                    value={stats.withDemo}
                    color="bg-gradient-to-br from-green-500 to-emerald-600"
                />
                <StatCard
                    icon={GitBranch}
                    label="GitHub Repos"
                    value={stats.withGithub}
                    color="bg-gradient-to-br from-orange-500 to-red-600"
                />
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link
                        href="/admin/portfolio/add"
                        className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-cyan-500 hover:bg-cyan-50 transition-all text-center group"
                    >
                        <div className="text-gray-400 group-hover:text-cyan-500 mb-2">
                            <Briefcase className="mx-auto" size={32} />
                        </div>
                        <p className="font-semibold text-gray-700 group-hover:text-cyan-600">
                            Add New Portfolio
                        </p>
                    </Link>

                    <Link
                        href="/admin/portfolio"
                        className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-center group"
                    >
                        <div className="text-gray-400 group-hover:text-blue-500 mb-2">
                            <Eye className="mx-auto" size={32} />
                        </div>
                        <p className="font-semibold text-gray-700 group-hover:text-blue-600">
                            View All Projects
                        </p>
                    </Link>

                    <Link
                        href="/"
                        target="_blank"
                        className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all text-center group"
                    >
                        <div className="text-gray-400 group-hover:text-green-500 mb-2">
                            <TrendingUp className="mx-auto" size={32} />
                        </div>
                        <p className="font-semibold text-gray-700 group-hover:text-green-600">
                            View Live Site
                        </p>
                    </Link>
                </div>
            </div>

            {/* Recent Projects */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900">Recent Projects</h2>
                </div>
                <div className="p-6">
                    {portfolios.length === 0 ? (
                        <p className="text-center text-gray-500 py-8">
                            No projects yet. Add your first portfolio!
                        </p>
                    ) : (
                        <div className="space-y-4">
                            {portfolios.slice(0, 5).map((project) => (
                                <div
                                    key={project.id}
                                    className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors"
                                >
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-16 h-16 rounded-lg object-cover"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900">{project.title}</h3>
                                        <p className="text-sm text-gray-500 line-clamp-1">
                                            {project.description}
                                        </p>
                                    </div>
                                    <Link
                                        href={`/admin/portfolio/edit/${project.id}`}
                                        className="px-4 py-2 text-sm bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors"
                                    >
                                        Edit
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}