'use client';
import React, {useCallback, useState, useEffect, useRef } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import Avatar from '../Avatar';
import MenuItem from './MenuItem';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import useRentModal from '@/app/hooks/useRentModal';
import { signOut } from 'next-auth/react';
import { SafeUser } from '@/app/types';

interface UserMenuProps {
    currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({
    currentUser 
}) => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const rentModal = useRentModal();
    const[isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);


// Created functionality to close the menu with an Outside Click
    const menuRef = useRef<HTMLDivElement | null>(null);


    useEffect(() => {
        function handleOutsideClick(event: any) {
            // If there's a menuRef and the target click is not inside of the UserMenu, then close the menu.
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        // If the menu is open, then listen for clicks.
        if (isOpen) {
            document.addEventListener('mousedown', handleOutsideClick);
        }

        // Cleanup the event listener on component unmount or when the menu is closed.
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isOpen]);
///

    const onRent = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen();
        }

        rentModal.onOpen();
    }, [currentUser, loginModal, rentModal])

  return (
    <div className='relative' ref={menuRef}>
        <div className='flex flex-row items-center gap-3'>
            <div 
                onClick={onRent}
                className='
                    hidden
                    md:block
                    text-sm
                    font-semibold
                    py-3
                    px-4
                    rounded-full
                    hover:bg-neutral-100
                    transition
                    cursor-pointer
                '
            >
                Airbnb your home
            </div>
            <div
                onClick={toggleOpen}
                className='
                    p-4
                    md:py-1
                    md:px-2
                    border-[1px]
                    border-neutral-200
                    flex
                    flex-row
                    items-center
                    gap-3
                    rounded-full
                    cursor-pointer
                    hover:shadow-md
                    transition
                '
            >
                <AiOutlineMenu />
                <div className='hidden md:block'>
                    <Avatar src={currentUser?.image}/>
                </div>
            </div>
        </div>

        {isOpen && (
            <div
                className='
                    absolute
                    rounded-xl
                    shadow-md
                    w-[40vw]
                    md:w-3/4
                    bg-white
                    overflow-hidden
                    right-0
                    top-12
                    text-sm
                '
            >
                <div className='flex flex-col cursor-pointer'>
                    {currentUser ? (
                        <>
                            <MenuItem
                                onClick={() => {}}
                                label="My trips"
                            />
                            <MenuItem
                                onClick={() => {}}
                                label="My Favorite"
                            />
                            <MenuItem
                                onClick={() => {}}
                                label="My Reservations"
                            />
                            <MenuItem
                                onClick={() => {}}
                                label="My Properties"
                            />
                            <MenuItem
                                onClick={() => {}}
                                label="Airbnb my home"
                            />
                            <MenuItem
                                onClick={() => signOut()}
                                label="Logout"
                            />
                        </>
                    ) : ( 
                        <>
                            <MenuItem
                                onClick={loginModal.onOpen}
                                label="Login"
                            />
                            <MenuItem
                                onClick={registerModal.onOpen}
                                label="Sign up"
                            />
                        </>
                    )}
                </div>

            </div>
        )}

    </div>
  )
}


export default UserMenu;