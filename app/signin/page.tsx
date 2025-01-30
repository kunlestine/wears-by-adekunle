import { redirect } from 'next/navigation'
import { signIn } from '@/auth'
import { providerMap } from '@/auth.config'
import { AuthError } from 'next-auth'
import { env } from '@/lib/env'
import Image from 'next/image'
import Link from 'next/link'
import logo from '../../public/assets/adekunle_logo.jpeg'
import React from 'react'



export default async function SignInPage(props: {
    searchParams: { callbackUrl: string | undefined }
}) {

    const providerLogos: Record<string, React.JSX.Element> = {
    Google: (
        <div className="bg-white p-2 rounded-full">
            <svg className="w-4" viewBox="0 0 533.5 544.3">
                <path
                    d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                    fill="#4285f4"
                />
                <path
                    d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                    fill="#34a853"
                />
                <path
                    d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                    fill="#fbbc04"
                />
                <path
                    d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                    fill="#ea4335"
                />
            </svg>
        </div>
    ),
};

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
            <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                <div className="lg:w-auto xl:w-auto p-6 sm:p-12">
                    <div>
                        <Image src={logo}
                                alt="photo"
                                className="w-auto mx-auto"
                                width={1000} 
                                height={2000}/>
                    </div>
                    <div className="mt-12 flex flex-col items-center">
                        <h1 className="text-2xl xl:text-3xl font-extrabold ">
                            Sign In
                        </h1>
                        <div className="w-full flex-1 mt-8">
                            <div className="flex flex-col items-center"></div>
                                {Object.values(providerMap).map(provider => (
                                    <form
                                        action={async () => {
                                            'use server'
                                            try {
                                                await signIn(provider.id, {
                                                    redirectTo:
                                                        props.searchParams?.callbackUrl ?? '',
                                                })
                                            } catch (error) {
                                                if (error instanceof AuthError) {
                                                    return redirect(
                                                        `${env.NEXTAUTH_URL}?error=${error.type}`,
                                                    )
                                                }

                                            throw error
                                            }
                                        }}
                                    >
                                        <button 
                                            className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline' 
                                            type="submit"
                                            >
                                            {providerLogos[provider.name] && (
                                                <div className="me-2">{providerLogos[provider.name]}</div>
                                            )}
                                            <span className="fill-white [&>svg]:mx-auto [&>svg]:h-3.5 [&>svg]:w-3.5">
                                                Sign in with {provider.name}
                                            </span>
                                        </button>
                                    </form>
                                ))}
                            </div>
                        </div>
                        <div className="w-full flex-1 mt-8">
                            <div className="my-12 border-b text-center">
                                <div
                                    className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                    Or sign in with e-mail
                                </div>
                            </div>
                            <div className="mx-auto max-w-xs">
                                 <form
                                    action={async formData => {
                                        'use server'
                                        try {
                                            await signIn('credentials', formData)
                                        } catch (error) {
                                            if (error instanceof AuthError) {
                                                return redirect(
                                                    `${env.NEXTAUTH_URL}?error=${error.type}`,
                                                )
                                            }
                                            throw error
                                        }
                                    }}
                                >
                                <input
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type="email" placeholder="Email" required />
                                <input
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    type="password" placeholder="Password" required />
                                <button
                                    className="mt-5 tracking-wide font-semibold bg-[#002D74] text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                    <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2"
                                        strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                        <circle cx="8.5" cy="7" r="4" />
                                        <path d="M20 8v6M23 11h-6" />
                                    </svg>
                                    <span className="ml-3">
                                        Log in
                                    </span>
                                </button>
                                </form>
                                <div className="my-2 flex justify-between gap-2">
                                    <div className="grow">
                                        <div className="relative">
                                            <label className="flex cursor-pointer items-center gap-2 text-xs font-medium leading-none text-gray-700 dark:text-gray-200" htmlFor="remember">
                                                <input id="remember" className="peer rounded border-gray-300 dark:border-gray-600 focus:ring focus:ring-indigo-200 dark:focus:ring-indigo-500" name="remember" type="checkbox" />
                                                <span className="">Remember me</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <Link className="text-[#002D74] text-sm dark:text-indigo-400" href="/forgot-password">Forgot Password?</Link>
                                    </div>
                                </div>
                                <div className="mt-4 text-sm flex justify-between items-center container-mr">
                                    <p className="mr-3 md:mr-0 ">If you don't have an account..</p>
                                    <Link href={'/signup'} className="hover:border register text-white bg-[#002D74] hover:border-gray-400 rounded-xl py-2 px-5 hover:scale-110 hover:bg-[#002c7424] font-semibold duration-300">Register</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
                    <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                    style={{
                            backgroundImage:
                                "url('https://images.unsplash.com/photo-1536866466683-719c280a6944?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHRhaWxvcnxlbnwwfHwwfHx8MA%3D%3D')",
                        }}>
                    </div>
                </div>
            </div>
    )
}
