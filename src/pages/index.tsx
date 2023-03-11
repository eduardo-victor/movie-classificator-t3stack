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
    <div className="bg-[#FFACAC] flex flex-col p-4">
      {sessionData && (
        <div className="flex flex-col gap-6 items-center rounded-xl text-white">
          <button className="w-28 h-12 text-md rounded-sm font-semibold bg-blue-500 hover:bg-blue-800 transition ease-in-out delay-75">Adicionar Filme</button>
          <h3 className="text-3xl font-bold font-mono">Lista de Filmes</h3>
          <div className="grid grid-cols-4 gap-10">
            <Movies />
          </div>
        </div>
      )}
    </div>
  );
};
