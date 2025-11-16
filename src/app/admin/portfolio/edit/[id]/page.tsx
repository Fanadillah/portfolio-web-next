"use client"

import React, { useEffect, useRef, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {getPortfolio, updatePortfolio} from "../../../../../lib/posts";
import { Portfolio } from "@/types/portfolio";
import { uploadToCloudinary } from "@/lib/cloudinary";
import Link from "next/link";
import { ArrowLeft, Save, X, Search, Loader } from "lucide-react";
import { TECHNOLOGIES } from "@/lib/constantsTechnologies";

export default function portfolioEditPage() {
    const route = useRouter();
    const params = useParams();
    const id = params.id;
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
    const [loading, setLoading] = useState(true);
    const [fetching, setFetching] = useState(true);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewSrc, setPreviewSrc] = useState<string | null>(null);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [searchTech, setSearchTech] = useState("");
    const [selectedTech, setSelectedTech] = useState<string[]>([]);
    const [showTechDropdown, setShowTechDropdown] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image: "",
        link: "",
        github: "",
        order: 0,
    })

    useEffect(() => {
        if (id) loadPortfolio(id as string);
    }, [id, route]);

    const loadPortfolio = async (portfolioId: string) => {
        try {
            const data = await getPortfolio(portfolioId);
            setPortfolio(data);
            if(data) {
                setFormData({
                        title: data.title || "",
                        description: data.description || "",
                        image: data.image || "",
                        link: data.link || "",
                        github: data.github || "",
                        order: data.order || 0,
                    });
                    setPreviewSrc(data?.image ?? null);
        
                    if (data?.technologies && Array.isArray(data.technologies)) {
                        const techIds = data.technologies
                        .map((label: string) => {
                            const tech = TECHNOLOGIES.find(
                                (t) => t.label.toLowerCase() === label.toLowerCase()
                            );
                            return tech?.id;
                        })
                        .filter((id): id is NonNullable<typeof id> => id !== undefined);
        
                        setSelectedTech(techIds);
                    }
            }else {
                alert("Portfolio not Found");
                route.push("/admin/portfolio")
            }
        }catch (error) {
            console.error("Error Get Portfoliio:", error);
            alert("Failed to load portfolio");
        } finally{
            setFetching(false);
            setLoading(false);
        }
    };
    

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setSelectedFile(file);
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewSrc(String(reader.result));
            };
            reader.readAsDataURL(file);
        }else {
            // revert preview to existing image if any
            setPreviewSrc(portfolio?.image ?? null)
        }
    };

    const toggleTech = (techId: string) => {
        setSelectedTech((prev) =>
            prev.includes(techId)
                ? prev.filter((id) => id !== techId)
                : [...prev, techId]
        );
    };

    const removeTech = (techId: string) => {
        setSelectedTech((prev) => prev.filter((id) => id !== techId));
    };

    const filteredTech = TECHNOLOGIES.filter((tech) =>
        tech.label.toLowerCase().includes(searchTech.toLowerCase())
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!portfolio) return;
        if(selectedTech.length === 0) {
            alert("Please select at least one tecnology");
            return;
        }

        try {
            let image = portfolio.image ?? null;

            const techLabels = selectedTech.map(
                (id) => TECHNOLOGIES.find((t) => t.id === id)?.label || id
            );

            if (selectedFile) {
                setUploadingImage(true);
                image = await uploadToCloudinary(selectedFile);
                setUploadingImage(false);
            }

            console.log("🔍 DEBUG - Selected Tech IDs:", selectedTech);
            console.log("🔍 DEBUG - Tech Labels:", techLabels);

            const portfolioData = {
                title: formData.title,
                description: formData.description,
                image: image,
                technologies: techLabels,
                link: formData.link,
                github: formData.github,
                order: Number(formData.order),
            }

            await updatePortfolio(portfolio.id, portfolioData)
            alert("Portfolio updated successfully!");
            route.push("/admin/portfolio");
        }catch(error) {
            console.error("Error Update Portfolio:", error)
            alert("Failed to update portfolio");
        }finally {
            setLoading(false);
        }
    }

    if(fetching) {
        return (
            <div className="max-w-4x1 mx-auto">
                <div className="flex items-center justify-center h-96">
                    <div className="text-center">
                        <Loader className="animate-spin mx-auto  mb-4 text-cyan-500" size={48}/>
                        <p className="text-gray-600">Loading Portfolio data...</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
         <div className="max-w-4xl mx-auto text-gray-500">
            {/* Header */}
            <div className="mb-8">
                <Link
                    href="/admin/portfolio"
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
                >
                    <ArrowLeft size={20} />
                    Back to Portfolio
                </Link>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Portfolio</h1>
                <p className="text-gray-600">Update your project details</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Main Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">Project Information</h2>
                    </div>

                    <div className="p-6 space-y-6">
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Project Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                placeholder="e.g., E-Commerce Platform"
                                required
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
                                rows={4}
                                placeholder="Brief description of your project..."
                                required
                            />
                            <p className="text-sm text-gray-500 mt-1">
                                {formData.description.length}/200 characters
                            </p>
                        </div>

                        {/* Image Upload */}
        <div className="my-4">
          <label className="block text-sm font-medium mb-2">Featured Image</label>

          {previewSrc ? (
            <img src={previewSrc} alt="Preview" className="w-64 h-auto mb-2 rounded" />
          ) : (
            <div className="w-64 h-40 bg-gray-100 flex items-center justify-center mb-2 text-gray-500">
              No image
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block"
          />

          <div className="text-sm text-gray-600 mt-2">
            Select a new image to replace the featured image. Current image will be kept if none selected.
          </div>
        </div>

                        {/* Technologies */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Technologies <span className="text-red-500">*</span>
                            </label>

                            {/* Selected Technologies (Chips) */}
                            {selectedTech.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                                    {selectedTech.map((techId) => {
                                        const tech = TECHNOLOGIES.find((t) => t.id === techId);
                                        if (!tech) return null;
                                        return (
                                            <span
                                                key={techId}
                                                className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-3 py-1.5 rounded-full text-sm font-medium shadow-sm"
                                            >
                                                <tech.icon/>
                                                <span>{tech.label}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => removeTech(techId)}
                                                    className="ml-1 hover:bg-white/20 rounded-full p-0.5 transition-colors"
                                                >
                                                    <X size={14} />
                                                </button>
                                            </span>
                                        );
                                    })}
                                </div>
                            )}

                            {/* Dropdown Button */}
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setShowTechDropdown(!showTechDropdown)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-left focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white hover:bg-gray-50 transition-colors"
                                >
                                    <span className="text-gray-500">
                                        {selectedTech.length === 0
                                            ? "Select technologies..."
                                            : `${selectedTech.length} selected`}
                                    </span>
                                </button>

                                {/* Dropdown */}
                                {showTechDropdown && (
                                    <>
                                        {/* Backdrop */}
                                        <div
                                            className="fixed inset-0 z-10"
                                            onClick={() => setShowTechDropdown(false)}
                                        />

                                        {/* Dropdown Menu */}
                                        <div className="absolute z-20 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-xl max-h-80 overflow-hidden">
                                            {/* Search */}
                                            <div className="p-3 border-b border-gray-200 sticky top-0 bg-white">
                                                <div className="relative">
                                                    <Search
                                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                                        size={18}
                                                    />
                                                    <input
                                                        type="text"
                                                        placeholder="Search technologies..."
                                                        value={searchTech}
                                                        onChange={(e) => setSearchTech(e.target.value)}
                                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm"
                                                        onClick={(e) => e.stopPropagation()}
                                                    />
                                                </div>
                                            </div>

                                            {/* Options */}
                                            <div className="max-h-64 overflow-y-auto">
                                                {filteredTech.length === 0 ? (
                                                    <div className="p-4 text-center text-gray-500 text-sm">
                                                        No technologies found
                                                    </div>
                                                ) : (
                                                    filteredTech.map((tech) => (
                                                        <label
                                                            key={tech.id}
                                                            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                checked={selectedTech.includes(tech.id)}
                                                                onChange={() => toggleTech(tech.id)}
                                                                className="w-4 h-4 text-cyan-500 border-gray-300 rounded focus:ring-cyan-500"
                                                            />
                                                            <tech.icon className="text-2xl" />
                                                            <span className="text-gray-700 font-medium">
                                                                {tech.label}
                                                            </span>
                                                        </label>
                                                    ))
                                                )}
                                            </div>

                                            {/* Footer */}
                                            <div className="p-3 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
                                                <span className="text-sm text-gray-600">
                                                    {selectedTech.length} selected
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => setShowTechDropdown(false)}
                                                    className="text-sm text-cyan-600 hover:text-cyan-700 font-medium"
                                                >
                                                    Done
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                            <p className="text-sm text-gray-500 mt-1">
                                Select the technologies used in this project
                            </p>
                        </div>
                    </div>
                </div>

                {/* Links Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">Project Links</h2>
                        <p className="text-sm text-gray-500 mt-1">Optional - Leave empty if not available</p>
                    </div>

                    <div className="p-6 space-y-6">
                        {/* Demo Link */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Live Demo URL
                            </label>
                            <input
                                type="url"
                                value={formData.link}
                                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                placeholder="https://your-project.vercel.app"
                            />
                            <p className="text-sm text-gray-500 mt-1">
                                {formData.link ? "✅ Demo link will be displayed" : "Will show 'No Demo' if empty"}
                            </p>
                        </div>

                        {/* GitHub Link */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                GitHub Repository
                            </label>
                            <input
                                type="url"
                                value={formData.github}
                                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                placeholder="https://github.com/username/repo"
                            />
                            <p className="text-sm text-gray-500 mt-1">
                                {formData.github ? "✅ GitHub link will be displayed" : "Will show 'Private' if empty"}
                            </p>
                        </div>

                        {/* Order */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Display Order <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                value={formData.order}
                                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                min="0"
                                required
                            />
                            <p className="text-sm text-gray-500 mt-1">
                                Lower numbers appear first (0 = top position)
                            </p>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 rounded-lg shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        fill="none"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    />
                                </svg>
                                Updating...
                            </>
                        ) : (
                            <>
                                <Save size={20} />
                                Update Portfolio
                            </>
                        )}
                    </button>
                    <Link
                        href="/admin/portfolio"
                        className="px-8 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors text-center"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );

}