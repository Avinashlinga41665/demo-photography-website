export const GET_ABOUT = `
  query GetAbout {
    aboutItems(first: 1) {
      id
      yearsOfExperience
      profilePhoto { url }
      images { url }
    }
  }
`;
