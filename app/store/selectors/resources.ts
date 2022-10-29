import { AppState } from 'store';

export const getResources =
  <T extends CloudAR.Resource.ResourceKey>(resourceName: T) =>
  (state: AppState) =>
    state.resources[resourceName] as CloudAR.Resource.Resources[T];

export const getResourceData =
  <T extends CloudAR.Resource.ResourceKey>(resourceName: T) =>
  (state: AppState) =>
    getResources(resourceName)(state).data as CloudAR.Resource.Resources[T]['data'];

export const getResourceById =
  <T extends CloudAR.Resource.ResourceKey>(resourceName: T, id: number) =>
  (state: AppState) =>
    getResources(resourceName)(state).data.get(id) as CloudAR.Resource.ResourceMap[T];

export const getResourceInformation =
  <T extends CloudAR.Resource.ResourceKey>(resourceName: T) =>
  (state: AppState) =>
    getResources(resourceName)(state).page as CloudAR.Resource.Resources[T]['page'];
