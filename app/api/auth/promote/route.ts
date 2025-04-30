import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        // @ts-ignore
        const session = await getServerSession(authOptions);

        if (!session || session?.user?.role !== 'admin') {
            return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
        }

        const { userId, roleName } = await request.json();

        if (!userId || !roleName) {
            return NextResponse.json(
                { error: 'L\'ID utilisateur et le nom du rôle sont requis' },
                { status: 400 }
            );
        }

        const role = await prisma.role.findUnique({
            where: { name: roleName },
        });

        if (!role) {
            return NextResponse.json(
                { error: 'Rôle non trouvé' },
                { status: 404 }
            );
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { roleId: role.id },
            select: {
                id: true,
                name: true,
                email: true,
                role: {
                    select: {
                        name: true,
                    },
                },
            },
        });

        return NextResponse.json({
            message: `L'utilisateur a été promu au rôle ${roleName}`,
            user: updatedUser,
        });
    } catch (error) {
        console.error('Erreur lors de la promotion de l\'utilisateur:', error);
        return NextResponse.json(
            { error: 'Une erreur est survenue lors de la promotion de l\'utilisateur' },
            { status: 500 }
        );
    }
}