// app/admin/portfolio/page.tsx
"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { Portfolio } from "../../../types/portfolio";
import { Plus, Edit, Trash2, ExternalLink, Github, Search } from "lucide-react";
import Link from "next/link";
import { getAllPortfolio, deletePortfolio } from "@/lib/posts";

export default function PortfolioListPage() {
    const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

    useEffect(() => {
        loadPosts();
    }, []);

  async function loadPosts() {
    try {
      const data = await getAllPortfolio();
      setPortfolios(data as Portfolio[]);
    } catch (error) {
      console.error("Error loading posts:", error);
    } finally {
      setLoading(false);
    }
  }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this portfolio?")) return;

        setDeleteLoading(id);
        try {
            await deletePortfolio(id);
            setPortfolios(portfolios.filter((p) => p.id !== id));
            alert("Portfolio deleted successfully!");
        } catch (error) {
            console.error("Error deleting portfolio:", error);
            alert("Failed to delete portfolio");
        } finally {
            setDeleteLoading(null);
        }
    };

    const filteredPortfolios = portfolios.filter((portfolio) =>
        portfolio.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        portfolio.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-gray-500">Loading portfolios...</div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Portfolio Management</h1>
                    <p className="text-gray-600 mt-1">
                        Manage your portfolio projects ({portfolios.length} total)
                    </p>
                </div>
                <Link
                    href="/admin/portfolio/add"
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-all"
                >
                    <Plus size={20} />
                    Add Portfolio
                </Link>
            </div>

            {/* Search Bar */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search portfolios..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                </div>
            </div>

            {/* Portfolio Grid */}
            {filteredPortfolios.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                    <div className="text-gray-400 mb-4">
                        <Plus className="mx-auto" size={48} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No portfolios found</h3>
                    <p className="text-gray-500 mb-6">
                        {searchTerm ? "Try adjusting your search" : "Get started by adding your first portfolio"}
                    </p>
                    {!searchTerm && (
                        <Link
                            href="/admin/portfolio/add"
                            className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg transition-colors"
                        >
                            <Plus size={20} />
                            Add Your First Portfolio
                        </Link>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPortfolios.map((portfolio) => (
                        <div
                            key={portfolio.id}
                            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group"
                        >
                            {/* Image */}
                            <div className="relative h-48 bg-gray-100 overflow-hidden">
                                <img
                                    src={portfolio.image}
                                    alt={portfolio.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700">
                                    Order: {portfolio.order}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
                                    {portfolio.title}
                                </h3>
                                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                    {portfolio.description}
                                </p>

                                {/* Technologies */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {portfolio.technologies.slice(0, 3).map((tech, index) => (
                                        <span
                                            key={index}
                                            className="px-2 py-1 bg-cyan-50 text-cyan-600 text-xs rounded-full"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                    {portfolio.technologies.length > 3 && (
                                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                            +{portfolio.technologies.length - 3}
                                        </span>
                                    )}
                                </div>

                                {/* Links */}
                                <div className="flex items-center gap-3 mb-4 text-sm">
                                    {portfolio.link ? (
                                        <a
                                            href={portfolio.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1 text-cyan-600 hover:text-cyan-700"
                                        >
                                            <ExternalLink size={14} /> Demo
                                        </a>
                                    ) : (
                                        <span className="text-gray-400 text-xs">No Demo</span>
                                    )}
                                    <span className="text-gray-300">|</span>
                                    {portfolio.github ? (
                                        <a
                                            href={portfolio.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1 text-gray-700 hover:text-gray-900"
                                        >
                                            <Github size={14} /> GitHub
                                        </a>
                                    ) : (
                                        <span className="text-gray-400 text-xs">Private</span>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2">
                                    <Link
                                        href={`/admin/portfolio/edit/${portfolio.id}`}
                                        className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                                    >
                                        <Edit size={16} /> Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(portfolio.id)}
                                        disabled={deleteLoading === portfolio.id}
                                        className="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium disabled:opacity-50"
                                    >
                                        <Trash2 size={16} />
                                        {deleteLoading === portfolio.id ? "..." : "Delete"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}