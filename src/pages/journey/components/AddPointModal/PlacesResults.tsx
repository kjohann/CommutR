import { FC } from 'react';
import { PlaceResult, PlaceType } from '../../../../entur/geocoderApi';
import { Tag } from '../../../../components/Tag';

type PlacesResultsProps = {
  places: PlaceResult[]
}

const Place: FC<{place: PlaceResult}> = ({ place }) => {
  const tags = place.categories.filter((c) => c !== PlaceType.Unknown).map((c, i) => {
    
    return (
      <Tag key={`${place.stopPlaceId}-${c}-${i}`}>{c}</Tag>
    );
  });

  return (
    <div>
      <h4>{place.name} ({place.locality} - {place.county})</h4>
      <div>
        {tags}
      </div>
    </div>
  )
}

export const PlacesResult: FC<PlacesResultsProps> = ({ places }) => {
  return (
    <div>
      {places.map((p, i) => <Place key={`${p.stopPlaceId}-${i}`} place={p}/>)}
    </div>
  )
};
