export const GET_PORTFOLIO = `
  query GetPortfolio {
  portfolioItems {
    id
    title
    description
    images {
      url
    }
  }
}
`;
