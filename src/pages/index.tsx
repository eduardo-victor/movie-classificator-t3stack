import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import Movies from "~/components/Movies";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
    <div className="w-screen h-screen bg-gray-500">

        <AuthShowcase /> 
    </div>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">

      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.email}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-black px-10 py-3 font-semibold text-white no-underline transition hover:bg-gray-500"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
      {sessionData && (
          <div className="grid grid-cols-4 gap-4 md:gap-8">
            <div className="flex flex-col gap-6 items-center justify-center rounded-xl bg-white/10 p-4 w-screen text-white">
              <h3 className="text-xl font-bold">Movies</h3>
              <div className="w-full h-full grid grid-cols-3">
                <Movies />
              </div>
            </div>
          </div>
        )}
    </div>
  );
};
