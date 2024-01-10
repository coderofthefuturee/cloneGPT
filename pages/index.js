import Head from "next/head";
import Link from "next/link";
import {useUser} from '@auth0/nextjs-auth0/client';

export default function Home() {
  const {isLoading, error, user} = useUser();

  if(isLoading) return <div>Loading..</div>
  if(error) return <div>{error.message}</div>

  return (
    <div>
      <Head>
        <title>CloneGPT - Login/SignUp</title>
      </Head>
      <div className="fixed top-0 left-0 h-full w-full bg-[rgb(0,7,48)] bg-cover -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[200px] z-10 cursor-pointer" style={{ marginTop: '5%', marginLeft: '5%' }}>
          {!!user && (
            <Link 
            href="/api/auth/logout"
            className="m-10 hover:bg-slate-500 rounded-md p-2 text-white border-white border-2"
            >Logout
            </Link>
          )}
          {!user && (
            <>
              <Link href="/api/auth/login" className="rounded-md bg-emerald-500 px-4 py-2 font-bold text-black hover:bg-emerald-600"
              >Login
              </Link>
              <Link href="/api/auth/signup" className="m-10 rounded-md p-2 text-white border-white border-2 hover:bg-slate-500"
              style={{ outlineColor: 'white', outlineWidth: '4px' }}
              >SignUp 
              </Link>
            </>
          )}
        </div>
      </div>
    </div>

  );
}

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx.req, ctx.res);
  if (!!session) {
    return {
      redirect: {
        destination: "/chat",
      }
    }
  }
}