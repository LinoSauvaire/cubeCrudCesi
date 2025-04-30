'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

export default function NavBar() {
    const { data: session, status } = useSession();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-indigo-600">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <Link href="/" className="text-xl font-bold text-white">
                                Mon E-Shop
                            </Link>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <Link href="/" className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700">
                                    Accueil
                                </Link>
                                <Link href="/products" className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700">
                                    Produits
                                </Link>
                                {session && session?.user?.role === 'admin' && (
                                    <Link href="/admin/dashboard" className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700">
                                        Admin
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                            {status === 'loading' ? (
                                <span className="text-sm text-white">Chargement...</span>
                            ) : session ? (
                                <div className="relative ml-3">
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm text-white">
                                            Bonjour, {session?.user?.name || session?.user?.email}
                                        </span>
                                        <button
                                            onClick={() => signOut({ callbackUrl: '/' })}
                                            className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                                        >
                                            Déconnexion
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center gap-4">
                                    <Link
                                        href="/auth/signin"
                                        className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                                    >
                                        Connexion
                                    </Link>
                                    <Link
                                        href="/auth/signup"
                                        className="rounded-md bg-indigo-800 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-900"
                                    >
                                        Inscription
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-indigo-700 focus:outline-none"
                        >
                            <span className="sr-only">Ouvrir le menu</span>
                            <svg
                                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                            <svg
                                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Menu mobile */}
            <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                    <Link
                        href="/"
                        className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-indigo-700"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Accueil
                    </Link>
                    <Link
                        href="/products"
                        className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-indigo-700"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Produits
                    </Link>
                    {session && session?.user?.role === 'admin' && (
                        <Link
                            href="/admin/dashboard"
                            className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-indigo-700"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Admin
                        </Link>
                    )}
                </div>
                <div className="border-t border-indigo-700 pb-3 pt-4">
                    {status === 'loading' ? (
                        <div className="px-5">
                            <span className="text-sm text-white">Chargement...</span>
                        </div>
                    ) : session ? (
                        <div className="space-y-3 px-5">
                            <div className="text-base font-medium text-white">
                                {session?.user?.name || session?.user?.email}
                            </div>
                            <button
                                onClick={() => {
                                    signOut({ callbackUrl: '/' });
                                    setIsMenuOpen(false);
                                }}
                                className="block w-full rounded-md bg-indigo-500 px-3 py-2 text-left text-base font-medium text-white hover:bg-indigo-700"
                            >
                                Déconnexion
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-3 px-5">
                            <Link
                                href="/auth/signin"
                                className="block w-full rounded-md bg-indigo-500 px-3 py-2 text-left text-base font-medium text-white hover:bg-indigo-700"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Connexion
                            </Link>
                            <Link
                                href="/auth/signup"
                                className="block w-full rounded-md bg-indigo-800 px-3 py-2 text-left text-base font-medium text-white hover:bg-indigo-900"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Inscription
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}