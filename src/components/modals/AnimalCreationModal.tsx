'use client';

import { Animal, Area, Specie } from '@/context/interface';
import { sessionAtom, areasAtom } from '@/context/store';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { getAllSpecies } from '../TopCard';
import { getAllAreas } from '../AreasView';

const AnimalCreationModal = () => {
  const [session] = useAtom(sessionAtom);
  const [animalForm, setAnimalForm] = useState<Animal>({
    id: '',
    name: '',
    specieId: '',
    areaId: '',
  });
  const [areas, setAreas] = useState<Area[]>([]);
  const [species, setSpecies] = useState<Specie[]>([]);

  const handleClick = async () => {
    if (
      animalForm.name === '' ||
      animalForm.specieId === '' ||
      animalForm.areaId === ''
    )
      return toast.error('Veuillez remplir tous les champs');
    const res = await fetch(`${'http://localhost:3000'}/animal`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.accessToken}`,
      },
      body: JSON.stringify(animalForm),
    });
    const notification = toast.loading("Ajout de l'animal en cours...");
    if (res.status === 200) {
      toast.success('Animal ajouté avec succès', { id: notification });
    } else {
      toast.error('Une erreur est survenue', { id: notification });
    }
  };

  useEffect(() => {
    getAllSpecies().then((species: Specie[]) => {
      setSpecies(species);
    });
    getAllAreas().then((areas: Area[]) => {
      setAreas(areas);
    });
    console.log(animalForm);
  }, [animalForm]);

  return (
    <dialog id='my_modal_3' className='modal'>
      <form method='dialog' className='modal-box w-11/12 max-w-5xl'>
        <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
          ✕
        </button>
        <h3 className='font-bold text-xl'>Ajout d&apos;un animal</h3>

        <form action='#' className='mt-8 grid grid-cols-6 gap-6'>
          <div className='col-span-6 sm:col-span-3'>
            <label
              htmlFor='Name'
              className='block text-sm font-medium text-gray-700'
            >
              Nom de l&apos;animal
            </label>

            <input
              type='text'
              id='FirstName'
              name='first_name'
              className='mt-1 w-full rounded-md border-gray-200 bg-white text-sm h-8 border px-2 text-gray-700 shadow-sm'
              onChange={(e) => {
                setAnimalForm({ ...animalForm, name: e.target.value });
              }}
              value={animalForm.name}
              placeholder='Ex: Tigrou | Simba'
            />
          </div>
        </form>
        <div className='mt-4 flex flex-wrap gap-4'>
          <select
            className='select select-bordered w-full max-w-xs focus:outline-none'
            defaultValue={species[0] && species[0].id}
            onChange={(e) =>
              setAnimalForm({ ...animalForm, specieId: e.target.value })
            }
          >
            {species &&
              species.length > 0 &&
              species.map((specie) => (
                <option key={specie.id} value={specie.id}>
                  {specie.name}
                </option>
              ))}
          </select>
          <select
            className='select select-bordered w-full max-w-xs focus:outline-none'
            defaultValue={areas[0] && areas[0].id}
            onChange={(e) =>
              setAnimalForm({ ...animalForm, areaId: e.target.value })
            }
          >
            {areas &&
              areas.length > 0 &&
              areas.map((area: Area) => (
                <option key={area.id} value={area.id}>
                  {area.name}
                </option>
              ))}
          </select>
        </div>
        <button className='btn btn-success mt-4' onClick={handleClick}>
          Confirmer
        </button>
      </form>
    </dialog>
  );
};

export default AnimalCreationModal;