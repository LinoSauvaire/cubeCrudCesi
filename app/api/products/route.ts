import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const products = await prisma.product.findMany({
            where: { isActive: true },
        });
        return NextResponse.json(products);
    } catch (error) {
        return NextResponse.json({ error: 'Erreur lors de la récupération des produits' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        // @ts-ignore
        const session = await getServerSession(authOptions);

        if (!session || session.user?.role !== 'admin') {
            return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
        }

        const data = await request.json();
        const product = await prisma.product.create({ data });
        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Erreur lors de la création du produit' }, { status: 500 });
    }
}