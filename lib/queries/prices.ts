export const GET_PRICES = `
  query GetPrices {
  pricePackages {
    id
    title
    price
    editphotonumber
    photo1 { url }
    photo2 { url }
    photo3 { url }
  }
};
