import { createContext } from 'react';

const ProductsContext = createContext({
    products: [],
    setProducts: (p: object) => {},
})

export default ProductsContext