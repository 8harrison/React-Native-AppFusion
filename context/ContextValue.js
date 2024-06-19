import { createContext, useState, useEffect, useContext } from 'react';
import { getModelos } from '../connection';

export const ContextValue = createContext();

export default function Context({ children }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modelos, setModelos] = useState([]);
  const [data, setData] = useState({ fazendo: 0, feito: 0 });
  const [modelo, setModelo] = useState({
    nome: '',
    motor: '',
    tipoCombustivel: '',
    anoModelo: '',
    imagem: '',
    fazendo: [],
    feito: [],
  });

  useEffect(() => {
    getModelos(setModelos, setData);
  }, []);

  return (
    <ContextValue.Provider
      value={{
        modalVisible, 
        setModalVisible,
        modelos,
        setModelos,
        modelo,
        setModelo,
        data,
        setData,
      }}>
      {children}
    </ContextValue.Provider>
  );
}

export function useContextFactory() { 
  return useContext(ContextValue);
}
