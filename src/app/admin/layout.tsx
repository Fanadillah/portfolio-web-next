'use client';

// ...existing code...
import React, { ReactNode, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Navbar from '../components/navbarAdmin';
import Sidebar from '../components/sidebar';
import { AuthProvider, useAuth } from '@/app/api/AuthContext';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AdminShell>{children}</AdminShell>
      </body>
    </html>
  );
}

function AdminShell({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <ShellInner>{children}</ShellInner>
    </AuthProvider>
  );
}

function Protected({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';
  
  useEffect(() => {
    // Jika bukan di halaman login dan user null, redirect ke login
    if (!isLoginPage && user === null) {
      router.replace('/admin/login');
    }
  }, [user, router, isLoginPage]);
    
  // Jika di halaman login, langsung render children
  if (isLoginPage) return <>{children}</>;
  
  // Jika bukan halaman login dan tidak ada user, tampilkan loading
  if (!user) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    
  return <>{children}</>;
}

function ShellInner({ children }: { children: ReactNode }) {
    const { user, logOut } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const isLoginPage = pathname === '/admin/login';

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (err) {
      // tetap redirect walau error signOut agar tidak terjebak
    } finally {
      router.replace('/admin/login');
    }
  };

  return (
        <div className="min-h-screen">
            {user && !isLoginPage && (
                <>
                    {/* Sidebar fixed at left */}
                    <div className="fixed top-0 left-0 h-[calc(100vh-4rem)] w-64">
                        <Sidebar />
                    </div>

                    {/* Navbar fixed at top */}
                    <div className="fixed top-0 left-64 right-0 ">
                        <Navbar />
                    </div>


                    {/* Main content with proper margins */}
                    <div className="pt-16 pl-64">
                        <main className="p-6 bg-gray-100 min-h-[calc(100vh-4rem)]">
                            <Protected>{children}</Protected>
                        </main>
                    </div>
                </>
            )}

            {/* Show content without navbar/sidebar on login page */}
            {(!user || isLoginPage) && (
                <main className="bg-gray-100 min-h-screen">
                    <Protected>{children}</Protected>
                </main>
            )}
        </div>
    );
}
// ...existing code...