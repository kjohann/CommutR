import axios from 'axios';

type GeoCoderResponseFeatures = {
  properties: {
    id: string,
    name: string,
    county: string,
    locality: string,
    label: string,
    category: Array<'railStation' | 'onstreetBus'>
  }
}

type GeoCoderResponse = {
  features: GeoCoderResponseFeatures[]
}

enum PlaceType {
  Unknown,
  Bus,
  Rail
}

type PlaceResult = {
  stopPlaceId: string,
  name: string,
  locality: string,
  county: string,
  categories: PlaceType[]
}

export const getPlaces : (placeName: string) => Promise<PlaceResult[]> = async (placeName) => {
  const { data } = await axios.get<GeoCoderResponse>(`https://api.entur.io/geocoder/v1/autocomplete?text=${placeName}&lang=en`);

  return data.features.map((f) => {
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
          default:
            return PlaceType.Unknown;
        }
      }).filter((value, index, categoriesArray) => {
        return categoriesArray.indexOf(value) === index;
      })
    }
  });
}