'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {Input} from "@heroui/input";
import {Button} from "@heroui/button";

export default function SignUp() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Les mots de passe ne correspondent pas');
            setLoading(false);
            return;
        }

        if (formData.password.length < 8) {
            setError('Le mot de passe doit contenir au moins 8 caractères');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                new Error(data.error || 'Une erreur est survenue lors de l\'inscription');
            }

            router.push('/');
        } catch (e) {
            // @ts-ignore
            setError(e.message);
            console.error('Erreur d\'inscription:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg">
                <div className="text-center">
                    <Image
                        className="mx-auto h-12 w-auto"
                        src="/next.svg"
                        alt="Logo"
                        width={180}
                        height={38}
                        priority
                    />
                    <h2 className="mt-6 text-3xl font-bold text-gray-900">
                        Créer un compte
                    </h2>
                </div>

                {error && (
                    <div className="rounded-md bg-red-50 p-4">
                        <div className="flex">
                            <div className="text-sm text-red-700">{error}</div>
                        </div>
                    </div>
                )}
                <div className="rounded-md flex flex-col shadow-sm w-full mt-8 space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom</label>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            classNames={{
                                input: "w-full",
                                inputWrapper: "w-full"
                            }}
                            className="mt-1 text-black"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            classNames={{
                                input: "w-full",
                                inputWrapper: "w-full"
                            }}
                            className="mt-1 text-black"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de
                            passe</label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            classNames={{
                                input: "w-full",
                                inputWrapper: "w-full"
                            }}
                            className="mt-1 text-black"
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirmer
                            le mot de passe</label>
                        <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            autoComplete="new-password"
                            required
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            classNames={{
                                input: "w-full",
                                inputWrapper: "w-full"
                            }}
                            className="mt-1 text-black"
                        />
                    </div>
                </div>
                <div>
                    <Button
                        type="submit"
                        disabled={loading}
                        className="group relative cursor-pointer flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-300"
                        onPress={() => handleSubmit()}
                    >
                        {loading ? 'Inscription en cours...' : 'S\'inscrire'}
                    </Button>
                </div>

                <div className="text-center  text-sm">
                    <p className={"text-gray-950"}>
                        Vous avez déjà un compte?{' '}
                        <Link href="/auth/login/" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Connectez-vous
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}