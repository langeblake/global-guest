'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
    const router = useRouter();

    return (
        <>
            <Image
                onClick={() => router.push('/')}
                alt="Logo"
                className="hidden md:block cursor-pointer"
                height="250"
                width="250"
                src="/images/logo.png"
                />
            <Image
                onClick={() => router.push('/')}
                alt="Logo-icon"
                className="block md:hidden cursor-pointer"
                height="40"
                width="40"
                src="/images/logo-icon.png"
                />
        </>
    )
}

export default Logo;