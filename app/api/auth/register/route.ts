import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const { name, email, password } = await request.json();

        if (!name || !email || !password) {
            return NextResponse.json(
                { error: 'Veuillez fournir un nom, un email et un mot de passe' },
                { status: 400 }
            );
        }

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: 'Cet email est déjà utilisé' },
                { status: 400 }
            );
        }

        const userRole = await prisma.role.findUnique({
            where: { name: 'user' },
        });

        if (!userRole) {
            return NextResponse.json(
                { error: 'Rôle utilisateur non trouvé. Veuillez exécuter le seed.' },
                { status: 500 }
            );
        }

        const hashedPassword = await hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                roleId: userRole.id,
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: {
                    select: {
                        name: true,
                    },
                },
                createdAt: true,
            },
        });

        return NextResponse.json({
            message: 'Inscription réussie',
            user,
        }, { status: 201 });
    } catch (error) {
        console.error('Erreur lors de l\'inscription:', error);
        return NextResponse.json(
            { error: 'Une erreur est survenue lors de l\'inscription' },
            { status: 500 }
        );
    }
}