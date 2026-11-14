import { gql, type TypedDocumentNode } from '@apollo/client';
import type { ProfileSummary, Profile } from './types.js';

export const GET_PROFILES: TypedDocumentNode<
  { profiles: ProfileSummary[] },
  { limit: number, offset: number }
> = gql`
  query GetProfiles($limit: Int!, $offset: Int!) {
    profiles(limit: $limit, offset: $offset) {
      id
      name
      description
    }
  }
`;

export const GET_PROFILE: TypedDocumentNode<
  { profile: Profile | null },
  { id: number; }
> = gql`
  query GetProfile($id: ID!) {
    profile(id: $id) {
      id
      name
      description
      skills {
        id
        name
      }
      experience {
        id
        company
        position
        achievements
      }
      projects {
        id
        name
        url
      }
    }
  }
`;
