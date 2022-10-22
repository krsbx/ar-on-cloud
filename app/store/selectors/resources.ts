import { AppState } from 'store';

export const getResources =
  <T extends CloudAR.Resource.ResourceKey>(resourceName: T) =>
  (state: AppState) =>
    state.resources[resourceName] as CloudAR.Resource.Resources[T];

export const getResourceById =
  <T extends CloudAR.Resource.ResourceKey>(resourceName: T, id: number) =>
  (state: AppState) =>
    getResources(resourceName)(state)['rows'][id] as CloudAR.Resource.ResourceMap[T];
