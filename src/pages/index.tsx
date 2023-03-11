import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Movies from "~/components/Movies";
import Navbar from "~/components/Navbar";

const Home: NextPage = () => {

  return (
    <>
      <Navbar />
      <AuthShowcase />
    </>
  );
};
export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="bg-[#F0A500] flex flex-col h-screen p-4">
      {sessionData && (
        <div className="flex flex-col gap-6 items-center rounded-xl text-white">
          <h3 className="text-2xl font-bold">Movies</h3>
          <div className="grid grid-cols-4 gap-10">
            <Movies />
          </div>
        </div>
      )}
    </div>
  );
};
