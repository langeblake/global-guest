import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import prisma from "@/app/livs/prismadb"

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma)
    providers: [
        GithubProvider
    ]
}