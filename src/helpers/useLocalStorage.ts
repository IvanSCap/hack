import { useState, useEffect } from 'react';

function getStorageValue(key: string | boolean , defaultValue: string | boolean ){
  // @ts-ignore

  const saved = localStorage.getItem(key);
  // @ts-ignore
  const initial = JSON.parse(saved);
  return initial || defaultValue;
}

export const useLocalStorage = (key: string | boolean, defaultValue: string | boolean) => {
  const [ value, setValue ] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
  // @ts-ignore

    localStorage.setItem(key, JSON.stringify(value));
  }, [ key, value ]);

  return [ value, setValue ];
};
