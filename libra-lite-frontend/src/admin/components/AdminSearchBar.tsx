import React, { useState } from 'react';
import { Input } from '@nextui-org/react';
import { SearchIcon } from '../../components/SearchIcon';
import { AdminSearchResult } from './../components/AdminSearchResult';

export const AdminSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowResults(value.trim() !== '');
  };

  return (
    <div className="w-full flex flex-col items-center justify-center animate__animated animate__fadeIn relative mb-10">
      <div className="w-[340px] h-[140px] flex justify-center items-center text-white relative">
        <Input
          isClearable
          radius="full"
          classNames={{
            label: 'text-black/50 dark:text-white/90',
            input: [
              'bg-transparent',
              'text-black/90 dark:text-white/90',
              'placeholder:text-default-700/50 dark:placeholder:text-white/60',
            ],
            innerWrapper: 'bg-transparent',
            inputWrapper: [
              'shadow-xl',
              'bg-default-200/80',
              'dark:bg-default/60',
              'backdrop-blur-xl',
              'backdrop-saturate-200',
              'hover:bg-default-200/70',
              'dark:hover:bg-default/70',
              'group-data-[focused=true]:bg-default-200/50',
              'dark:group-data-[focused=true]:bg-default/60',
              '!cursor-text',
            ],
          }}
          placeholder="Buscar libro..."
          startContent={
            <SearchIcon className="text-black/30 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
          }
          className="search-input"
          value={searchTerm}
          onChange={handleInputChange}
        />
        {showResults && (
          <div className="absolute top-full left-0 w-full z-50">
            <AdminSearchResult searchTerm={searchTerm} />
          </div>
        )}
      </div>
    </div>
  );
};