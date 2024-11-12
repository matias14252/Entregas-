const products = [
  {
    id: 1,
    title: 'remera',
    price: '1000',
    category: 'urbano',
    description: ' talles: XL, L, M, S, XS',
    image:
      'https://lafabricaderemeras.com.ar/wp-content/uploads/2023/02/2-REMERAS-DEPORTIVAS.jpg'
  },

  {
    id: 2,
    title: 'pantalon',
    price: '2000',
    category: 'deporte',
    description: ' talles: XL, L, M, S, XS',
    image:
      'https://media2.solodeportes.com.ar/media/catalog/product/cache/7c4f9b393f0b8cb75f2b74fe5e9e52aa/p/a/pantalon-de-argentina-adidas-dna-negro-100020ht8689001-1.jpg'

  },
  {

    id: 3,
    title: 'campera',
    price: '5000',
    category: 'urbano',
    description: ' talles: XL, L, M, S, XS',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8xnQV0WKTxEHpRXLZ1YVb2AGw-c6UY-yZkg&s'
  },
  {
    id: 4,
    title: 'zapatillas',
    price: '9000',
    category: 'deporte',
    description: ' talles: 36-44',
    image:
      'https://http2.mlstatic.com/D_NQ_NP_735410-MLA47191243382_082021-O.webp',

  },

];

export const getProducts = new Promise((resolve) => {
  setTimeout(() => {
    resolve(products);
  }, 3000);
});

export const getProduct = (id) => {
  return products.find((prod) => prod.id == id);
};

export const getCategory = (category) => {
  return products.filter((product) => product.category === category);
};