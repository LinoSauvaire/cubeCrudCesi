import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
    /**
     * Étendre l'interface Session par défaut
     */
    interface Session {
        user: {
            id?: string;
            role?: string;
        } & DefaultSession["user"];
    }

    /**
     * Étendre l'interface User par défaut
     */
    interface User {
        id?: string;
        role?: string;
    }
}

declare module "next-auth/jwt" {
    /**
     * Étendre l'interface JWT par défaut
     */
    interface JWT {
        id?: string;
        role?: string;
    }
}