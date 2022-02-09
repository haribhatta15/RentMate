import React, { useState, useContext, useReducer } from 'react';
import reducer from './reducer';
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [data, setData] = useState([]);

  const [cart, setCart] = useState([{}]);
  const [empty, setisEmpty] = useState(true);
  const [count, setCount] = useState(1);
  const [total, setTotal] = useState(0);
  //   const initialState = {
  //     cartItems: cart,
  //     total: 0,
  //     amount: 0,
  //   };
  //   const [state, dispatch] = useReducer(reducer, initialState);

  const createProduct = async (url) => {
    try {
      const response = await fetch(url);
      const resData = await response.json();
      const result = Object.values(resData);

      if (result) {
        setData(result);
      } else {
        new Error('The result is empty cant trigger rerender');
      }
    } catch (err) {
      console.log(err);
    }
  };
  const remove = (id) => {
    dispatch({ type: 'REMOVE', payload: id });
  };

  return (
    <AppContext.Provider
      value={{
        data,
        cart,
        createProduct,
        setCart,
        empty,
        setisEmpty,
        count,
        setCount,
        remove,
        total,
        setTotal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppContext, AppProvider };
