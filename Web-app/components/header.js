import { getSession, signIn, signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import Link from "next/link"
import Image from "next/image";
function Header() {
    const [session] = useSession();
    const router = useRouter();
    return (
      <div className="sticky bg-[#040714] top-0 z-[1000] flex items-center px-10 md:px-12 h-[72px]">
        <Image
          src="/logo.png"
          alt=""
          width={130}
          height={80}
          className="cursor-pointer"
          onClick={() => router.push("/")}
        />
        {session && (
          <div className=" justify-items-center font-semibold   mx-auto md:flex items-center space-x-6 pr-6 ">
            <a className="header-link group text-green-400">
              <Link href="start" className="span ">start</Link>
            </a>
            <a className="header-link group text-green-400">
              <Link href="show" className="span">show</Link>
            </a>
            <a className="header-link group text-green-400">
              <Link href="upload" className="span">upload</Link>
            </a>
            <a className="header-link group text-green-400">
              <Link href="find" className="span">find</Link>
            </a>
            <a className="header-link group text-red-500">
              <Link href="random" className="span">random</Link>
            </a>
           
          </div>
        )}
        {!session ? (
          <div className="pl-7 ml-auto">
            <button
              className=" ml-auto uppercase border px-4 py-1.5 rounded font-medium tracking-wide hover:bg-white hover:text-black transition duration-200"
              onClick={signIn}
            >
              Login
            </button>
          </div>
        ) : (
            <img
              src={session.user.image}
              alt="wah"
              className="ml-auto h-12 w-12  rounded-full object-cover cursor-pointer"
              onClick={signOut}
            />
         
        )}
      </div>
    );
  }
  
  export default Header;