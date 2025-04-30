import { PrismaClient } from '@prisma/client';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import {compare, hash} from "bcrypt";

const prisma = new PrismaClient();

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Mot de passe", type: "password" },
                role: {label: "Role", type: "text"}
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    console.log("Identifiants manquants");
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                    include: { role: true },
                });

                if (!user) {
                    console.log("Utilisateur non trouvé");
                    return null;
                }

                console.log("Tentative de connexion pour:", credentials.email);
                console.log("Mot de passe soumis:", credentials.password);
                console.log("Mot de passe stocké (hashé):", user.password);

                // Approche alternative pour vérifier le mot de passe
                try {
                    // Fonction de comparaison manuelle
                    const isValid = await manualCompare(credentials.password, user.password);

                    if (!isValid) {
                        console.log("Échec de l'authentification manuelle");
                        return null;
                    }

                    return {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        role: user.role.name,
                    };
                } catch (error) {
                    console.error("Erreur lors de la comparaison manuelle:", error);
                    return null;
                }
            }
        })
    ],
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/auth/signin',
    },
};

async function manualCompare(plainPassword: any, hashedPassword: any) {
    try {
        const isPasswordValid = await compare(plainPassword, hashedPassword);
        console.log("Résultat bcrypt standard:", isPasswordValid);
        if (isPasswordValid) {
            return true;
        }
    } catch (e) {
        console.error("Erreur avec bcrypt standard:", e);
    }

    try {
        const salt = hashedPassword.substring(0, 29);

        const newHash = await hash(plainPassword, salt);

        const isMatch = newHash === hashedPassword;
        console.log("Résultat avec rehashage:", isMatch);
        return isMatch;
    } catch (e) {
        console.error("Erreur avec rehashage:", e);
        return false;
    }
}


// @ts-ignore
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };