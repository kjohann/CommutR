import axios from 'axios';
import { FetchResult, failureResult, successResult } from './FetchResult';

type GeoCoderResponseFeatures = {
  properties: {
    id: string,
    name: string,
    county: string,
    locality: string,
    label: string,
    category: Array<'railStation' | 'onstreetBus' | 'vegadresse' | 'metroStation'>
  }
}

type GeoCoderResponse = {
  features: GeoCoderResponseFeatures[]
}

export enum PlaceType {
  Unknown = 'Unknown',
  Bus = 'Buss',
  Rail = 'Tog',
  Metro = 'T-bane',
  StreetAddress = 'Gateadresse'
}

export type PlaceResult = {
  stopPlaceId: string,
  name: string,
  locality: string,
  county: string,
  categories: PlaceType[]
}

export const getPlaces : (placeName: string) => Promise<FetchResult<PlaceResult[]>> = async (placeName) => {
  try{
    const { data, status } = await axios.get<GeoCoderResponse>(`https://api.entur.io/geocoder/v1/autocomplete?text=${placeName}&lang=en`);

    const mappedData = data.features.map((f) => {
      return {
        stopPlaceId: f.properties.id,
        name: f.properties.name,
        county: f.properties.county,
        locality: f.properties.locality,
        categories: f.properties.category.map((c) => {
          switch (c) {
            case 'onstreetBus':
              return PlaceType.Bus;
            case 'railStation':
              return PlaceType.Rail;
            case 'metroStation':
              return PlaceType.Metro;
            case 'vegadresse':
              return PlaceType.StreetAddress;
            default:
              return PlaceType.Unknown;
          }
        }).filter((value, index, categoriesArray) => {
          return categoriesArray.indexOf(value) === index;
        })
      }
    }).filter((place) => !!place.categories.find((c) => c !== PlaceType.Unknown));

    return successResult(mappedData, status);

  } catch (error)
  {
    const unknownErrorMessage = 'En ukjent feil oppstod.'
    if (axios.isAxiosError(error) && error.response) {
      return failureResult(JSON.stringify(error.response.data), error.response.status);
    }
    if (axios.isAxiosError(error)) {
      return failureResult(unknownErrorMessage, error.status ?? 500);
    }
    return failureResult(unknownErrorMessage, 500);
  }


}