'use client'

import { Session } from 'next-auth'
import Image from 'next/image'
import profilePicPlaceholder from '@/public/assets/profile-pic-placeholder.png'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation';
interface UserMenuButtonProps {
    session: Session | null
}

export default function UserMenuButton({ session }: UserMenuButtonProps) {
    const router = useRouter();
    const user = session?.user?.email
    return (
        <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-circle btn-ghost">
                {user ? (
                    <Image
                        src={profilePicPlaceholder}
                        alt="profile picture"
                        width={24}
                        height={24}
                        className="w-10 rounded-full"
                    />
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        width="24"
                        height="24"
                    >
                        <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z" />
                    </svg>
                )}
            </label>
            <ul
                tabIndex={0}
                className="menu dropdown-content menu-sm z-30 mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
            >
                <li>
                    {user ? (
                        <>
                            <p className='flex px-2'>Welcome <span className='text-blue-700'>{session?.user?.name}!</span></p>
                            <button className='btn btn-primary' onClick={() => signOut({ callbackUrl: '/' })}>
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <button className='btn btn-primary' onClick={() => router.push('/signin')}>
                            Sign In
                        </button>
                    )}
                </li>
            </ul>
        </div>
    )
}
