import React, { useEffect, useState } from 'react';
import { getAllMembers } from '../services/api';
import InputSelect from './Inputselect';

const levels = [
  { id: 1, name: 'Tous les niveaux' },
  { id: 2, name: 'Éveil/Initiation' },
  { id: 3, name: 'Débutant' },
  { id: 4, name: 'Intermédiaire' },
  { id: 5, name: 'Confirmé' },
  { id: 6, name: 'Avancé' },
];

const types = [
  { id: 1, name: 'Tous les types de pratique' },
  { id: 2, name: 'Classique' },
  { id: 3, name: 'Modern Jazz' },
  { id: 4, name: 'Contemporain' },
  { id: 5, name: 'Hip-Hop' },
];

const ageCategories = [
  { id: 1, name: 'Toutes les catégories d\'âge' },
  { id: 2, name: 'Mineur' },
  { id: 3, name: 'Majeur' },
];

const MemberList = () => {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState(levels[0]);
  const [filterType, setFilterType] = useState(types[0]);
  const [filterAgeCategory, setFilterAgeCategory] = useState(ageCategories[0]);

  useEffect(() => {
    const fetchMembers = async () => {
      const membersResult = await getAllMembers();
      setMembers(membersResult);
    };

    fetchMembers();
  }, []);

  const filteredMembers = members.filter(member => {
    return (
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterLevel.name === 'Tous les niveaux' || member.level === filterLevel.name) &&
      (filterType.name === 'Tous les types de pratique' || member.membershipType === filterType.name) &&
      (filterAgeCategory.name === 'Toutes les catégories d\'âge' || member.ageCategory === filterAgeCategory.name)
    );
  });

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div>
        <div className="mb-4 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          <input
            type="text"
            placeholder="Rechercher par nom"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <InputSelect
            options={levels}
            selected={filterLevel}
            setSelected={setFilterLevel}
            label="Niveau"
          />
          <InputSelect
            options={types}
            selected={filterType}
            setSelected={setFilterType}
            label="Type de Pratique"
          />
          <InputSelect
            options={ageCategories}
            selected={filterAgeCategory}
            setSelected={setFilterAgeCategory}
            label="Catégorie d'Âge"
          />
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8">Nom</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Téléphone</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Niveau</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Pratique</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Âge</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {filteredMembers.map((member) => (
                  <tr key={member.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">{member.name}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{member.phone}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{member.email}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{member.level}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{member.membershipType}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{member.ageCategory}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberList;
