import {useState, useEffect, useContext} from 'react'
import {Context} from '../context/Cart'

const useCart = () => useContext(Context);

export default useCart;