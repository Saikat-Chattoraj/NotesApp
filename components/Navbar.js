import Link from "next/link"

const Navbar = () => {
    return (
        <div className="flex w-screen z-50">
            <div className="flex w-full bg-blue-200 py-4 justify-between px-14 shadow-lg rounded-sm">
                <div className=" bg-blue-600  -translate-y-0.5 hover:translate-y-0 text-white text-md rounded-md shadow-xl p-2 transform duration-500 ease-in-out  hover:bg-gradient-to-t from-blue-500 to-transparent  hover:shadow-none cursor-pointer">
                    <Link href="/">
                        <a>Note App</a>
                    </Link>
                </div>
                <div className=" text-white  -translate-y-0.5 hover:translate-y-0 bg-blue-600 text-md rounded-md shadow-xl p-2 transform duration-500 ease-in-out  hover:bg-gradient-to-t from-blue-500 to-transparent  hover:shadow-none cursor-pointer">
                    <Link href="/newpage">
                        <a>Create New</a>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar