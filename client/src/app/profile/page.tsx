'use client';

import {
  AnimalCreationModal,
  AreaCreationModal,
  Register,
  UserCreationModal,
  VisitorCreationModal,
} from '@/components';
import SpecieCreationModal from '@/components/modals/SpecieCreationModal';
import { getUserInfo } from '@/context/fetch';
import { sessionAtom, userInfoAtom } from '@/context/store';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

const Page = () => {
  const [session, setSession] = useAtom(sessionAtom);
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);

  useEffect(() => {
    getUserInfo(userInfo, session).then((data) => {
      if (data) setUserInfo(data);
    });
  }, [session, userInfo, setUserInfo, setSession]);

  return (
    <div className='p-4'>
      {session === null ? (
        <Register />
      ) : (
        <div className='flex-1 padding-x'>
          <Toaster />
          <div className='home__text-container'>
            <h1 className='text-4xl font-extrabold'>Compte</h1>
            <p>
              <span className='font-bold'>
                {userInfo?.firstName} {userInfo?.lastName}
              </span>
              , {userInfo?.email} vous êtes connecté
            </p>
          </div>

          <div className='mt-12 flex flex-col md:flex-row gap-24'>
            <div className='flex flex-col'>
              <div
                className='flex shadow-xl rounded-xl border border-black justify-center items-center w-[240px] md:w-auto
                py-2 px-8 gap-8 h-[200px]'
              >
                <div className='flex flex-col items-center justify-center'>
                  <div className='rounded-full bg-gray-900 text-white font-bold text-2xl py-4 px-6 uppercase'>
                    {userInfo?.firstName.slice(0, 1)}
                  </div>
                  <h4 className='font-bold text-xl mt-4 capitalize'>
                    {userInfo?.firstName}
                  </h4>
                  <span className='text-sm italic'>{userInfo?.role}</span>
                </div>

                <div>
                  <div className='flex flex-col'>
                    3 <br />
                    <span className='text-sm italic'>évaluations</span>
                    <div className='border border-black w-full my-2' />
                    2 <br />
                    <span className='text-sm italic'>mois sur Zoo</span>
                  </div>
                </div>
              </div>

              {userInfo?.role === 'admin' && (
                <>
                  {' '}
                  <button
                    className='px-4 py-2 border border-black rounded-lg hover:bg-slate-600 hover:text-white mt-6'
                    onClick={() =>
                      document &&
                      (
                        document.getElementById('my_modal_1') as HTMLFormElement
                      ).showModal()
                    }
                  >
                    Créer un espace
                  </button>
                  <AreaCreationModal area={false} />
                  <button
                    className='px-4 py-2 border border-black rounded-lg hover:bg-slate-600 hover:text-white mt-2'
                    onClick={() =>
                      document &&
                      (
                        document.getElementById('my_modal_2') as HTMLFormElement
                      ).showModal()
                    }
                  >
                    Ajouter une espèce
                  </button>
                  <SpecieCreationModal specie={false} />
                  <button
                    className='px-4 py-2 border border-black rounded-lg hover:bg-slate-600 hover:text-white mt-2'
                    onClick={() =>
                      document &&
                      (
                        document.getElementById('my_modal_3') as HTMLFormElement
                      ).showModal()
                    }
                  >
                    Ajouter un animal
                  </button>
                  <AnimalCreationModal animal={false} />
                  <button
                    className='px-4 py-2 border border-black rounded-lg hover:bg-slate-600 hover:text-white mt-2'
                    onClick={() =>
                      document &&
                      (
                        document.getElementById('my_modal_4') as HTMLFormElement
                      ).showModal()
                    }
                  >
                    Créer un utilisateur
                  </button>
                  <VisitorCreationModal visitor={false} />
                  <button
                    className='px-4 py-2 border border-black rounded-lg hover:bg-slate-600 hover:text-white mt-2'
                    onClick={() =>
                      document &&
                      (
                        document.getElementById('my_modal_5') as HTMLFormElement
                      ).showModal()
                    }
                  >
                    Nouveau visiteur
                  </button>
                  <UserCreationModal user={false} />
                </>
              )}
            </div>

            <div>
              <div className='border border-slate-200 w-full mb-12' />
              <h2 className='font-bold text-xl'>
                Il est temps de créer votre profil
              </h2>
              <p className='mt-4 text-gray-500 text-sm'>
                Votre profil Zoo joue un rôle important dans toute
                l&apos;administration. Créez le vôtre pour aider les
                utilisateurs à mieux vous connaître.
              </p>
              <button className='px-4 py-2 border border-black rounded-lg hover:bg-slate-600 hover:text-white mt-6'>
                Créer un profil
              </button>
              <div className='border border-slate-200 w-full my-12' />
              <h2 className='font-bold text-xl'>
                Commentaires et évaluations reçus
              </h2>
              <p className='mt-4 text-gray-500 text-sm'>
                Aucune évalution pour le moment !
              </p>
              <div className='border border-slate-200 w-full my-12' />
              <h2 className='font-bold text-xl'>
                Réservations en cours et passées
              </h2>
              <p className='mt-4 text-gray-500 text-sm'>
                Aucune réservation pour le moment !
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
