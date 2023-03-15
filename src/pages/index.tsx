import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import ModalAdd from "~/components/ModalAdd";
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
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => { setModalOpen(true) }

  return (
    <div className="bg-[#FFACAC] flex flex-col p-4">
      {sessionData && (
        <div className="flex flex-col gap-6 items-center rounded-xl text-white">
          <button onClick={openModal} className="w-28 h-12 text-md rounded-sm font-semibold bg-blue-500 hover:bg-blue-800 transition ease-in-out delay-75">Adicionar Filme</button>
          {modalOpen ?
            <div className="w-full h-full flex items-center justify-center gap-3">
              <ModalAdd />
              <button onClick={() => { setModalOpen(false) }} className="text-2xl text-white font-semibold w-10 h-10 rounded-sm bg-red-500 hover:bg-red-600 hover:text-3xl transition ease-linear delay-300">X</button>
            </div>
            :
            <div className="flex flex-col gap-6 items-center rounded-xl text-white">
              <h3 className="text-3xl font-bold font-mono">Lista de Filmes</h3>
              <div className="grid grid-cols-4 gap-10">
                <Movies />
              </div>
            </div>}
        </div>
      )}
    </div>
  )
};

