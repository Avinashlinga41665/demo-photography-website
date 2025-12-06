import { GraphQLClient } from "graphql-request";

export const hygraph = new GraphQLClient(
  process.env.NEXT_PUBLIC_HYGRAPH_URL!,
  {
    headers: {
      Authorization: `Bearer ${process.env.HYGRAPH_TOKEN}`,
    },
  }
);
