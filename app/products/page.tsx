'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import {ProductUtils} from "@/app/utils/ProductUtils";

export default function ProductsPage() {
    const [products, setProducts] = useState<ProductUtils[]>([]);
    const [loading, setLoading] = useState(true);
    const { data: session } = useSession();
    const isAdmin = session?.user?.role === 'admin';

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch('/api/products');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des produits:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">Chargement...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Nos Produits</h1>

            {isAdmin && (
                <div className="mb-6">
                    <Link
                        href="/admin/products/new"
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Ajouter un produit
                    </Link>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div key={product.id} className="border rounded-lg overflow-hidden shadow-lg">
                        {product.imageUrl && (
                            <div className="relative h-48 w-full">
                                <Image
                                    src={product.imageUrl}
                                    alt={product.name}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                        )}
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                            <p className="text-gray-600 mb-2">{product.description}</p>
                            <p className="text-lg font-bold mb-2">{product.price.toFixed(2)} €</p>
                            <p className="text-sm text-gray-500">En stock: {product.stock}</p>

                            {isAdmin && (
                                <div className="mt-4 flex space-x-2">
                                    <Link
                                        href={`/admin/products/edit/${product.id}`}
                                        className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded text-sm"
                                    >
                                        Modifier
                                    </Link>
                                    <Link
                                        href={`/admin/products/delete/${product.id}`}
                                        className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded text-sm"
                                    >
                                        Supprimer
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}