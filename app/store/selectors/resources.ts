import { ResourceKey } from 'utils/interfaces/resource';
import { AppState } from '..';

export const getResources =
  <T extends ResourceKey>(resourceName: T) =>
  (state: AppState) =>
    state.resources[resourceName];

export const getResourceById =
  <T extends ResourceKey>(resourceName: T, id: number) =>
  (state: AppState) =>
    getResources(resourceName)(state)['rows'][id];
