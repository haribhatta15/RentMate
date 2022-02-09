const reducer = (state, action) => {
  if (action.type === 'REMOVE') {
    return {
      ...state,
      cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };
    
  }
};
export default reducer;
