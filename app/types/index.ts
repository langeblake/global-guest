import { Listing, User } from "@prisma/client";

export type SafeListing = Omit<
    Listing,
    "createdAt"
> & {
    createdAt: string;
}

export type SafeUser = Omit<
    User, 
    "createdAt" | "updatedAt" | "emailVerified"
> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
}; 

// Omit<T, K>: This utility type creates a new type by taking an existing type T and omitting properties specified by K.
// The & then adds back the createdAt property, but this time as a string type.
// The reason for this is that the createdAt in the original Listing type is a Date object, but for the purposes of safeListing, it's represented as a string.