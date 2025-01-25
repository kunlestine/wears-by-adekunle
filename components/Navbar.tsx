import Link from "next/link";
import Image from "next/image";


export default function Navbar () {
    let session = await auth();
    let user = session?.user?.email;
    const { data: session, status } = useSession()

    return (
        <div className="bg-base-100">
        <div className="navbar m-auto max-w-7xl flex-col gap-2 sm:flex-row">
            <div className="flex-1">
                <Link
                    href="/"
                    className="btn btn-ghost text-xl normal-case"
                >
                    <Image
                        src={logo}
                        alt="Wears_by_Adekunle logo"
                        height={40}
                        width={40}
                    />
                    KC
                </Link>
            </div>
            <div className="flex-none gap-2">
                <form action={searchProducts}>
                    <div className="form-control">
                        <input
                            name="SearchQuery"
                            placeholder="Search"
                            className="input input-bordered w-full min-w-[100px]"
                        />
                    </div>
                </form>
                <ShoppingCartButton cart={cart} />
                <UserMenuButton session={session} />
                
            </div>
        </div>
    </div>
    )
}