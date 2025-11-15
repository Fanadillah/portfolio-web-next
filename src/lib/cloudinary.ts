export async function uploadToCloudinary(file: File): Promise<string> {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if(!cloudName || !uploadPreset) {
        throw new Error("Cloudinary configuration is missing");
    }

    const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
    const form = new FormData();
    form.append('file', file);
    form.append('upload_preset', uploadPreset);

    const res = await fetch(url, { method: "POST", body: form});
    if(!res.ok) {
        const text = await res.text();
        throw new Error(`Cloudinary upload failed: ${text}`);
    }

    const data = await res.json();
    return data.secure_url as string;
}