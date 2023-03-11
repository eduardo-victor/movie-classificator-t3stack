import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
    const { data: sessionData } = useSession();
    return (
        <div className="w-full h-20 items-center justify-between p-6 bg-[#1B1A17] flex">
            <p className="text-center text-lg text-white">
                {sessionData && <span>Logged as: {sessionData.user?.email}</span>}
            </p>
            <button
                className="rounded-sm bg-red-500 w-24 h-10 text-white no-underline transition hover:bg-red-700"
                onClick={sessionData ? () => void signOut() : () => void signIn()}
            >
                {sessionData ? "Sign out" : "Sign in"}
            </button>
        </div>
    )
}