// app/components/Contact.tsx
'use client';
import { useState, FormEvent, ChangeEvent } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { ContactFormData } from '../../types/portfolio';

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Implementasi pengiriman form (bisa menggunakan EmailJS atau API lainnya)
      console.log('Form submitted:', formData);
      
      // Simulasi delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Terima kasih! Pesan Anda telah dikirim.');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Maaf, terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          Hubungi Saya
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold text-cyan-400 mb-6">
              Mari Bekerja Sama!
            </h3>
            <p className="text-gray-300 mb-8">
              Punya project atau ide menarik? Jangan ragu untuk menghubungi saya.
              Saya selalu terbuka untuk diskusi dan kolaborasi baru.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-gray-300">
                <FaEnvelope className="text-cyan-400" size={24} />
                <span>your.email@example.com</span>
              </div>
              <div className="flex items-center gap-4 text-gray-300">
                <FaPhone className="text-cyan-400" size={24} />
                <span>+62 812-3456-7890</span>
              </div>
              <div className="flex items-center gap-4 text-gray-300">
                <FaMapMarkerAlt className="text-cyan-400" size={24} />
                <span>Jakarta, Indonesia</span>
              </div>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Nama Anda"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 bg-slate-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-50"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Anda"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 bg-slate-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-50"
                />
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="Pesan Anda"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  rows={5}
                  className="w-full px-4 py-3 bg-slate-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none disabled:opacity-50"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
              </button>
            </form>
          </div>
        </div>
      </div>
      
      <footer className="text-center text-gray-400 mt-20">
        <p>&copy; 2025 Portfolio. All rights reserved.</p>
      </footer>
    </section>
  );
}