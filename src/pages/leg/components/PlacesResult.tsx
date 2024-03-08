import { FC } from 'react';
import styled from 'styled-components';
import { PlaceResult, PlaceType } from '../../../entur/geocoderApi';
import { Tag } from '../../../components/Tag';

const PlaceCard = styled.div`
  border: 1px solid grey;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  display: block;
  margin: 0.95em 0 1.2em;
  max-width: 100%;
  cursor: pointer;

  &:hover {
    box-shadow: 12px 12px 20px 20px rgba(0, 0, 0, 0.06);
  }
`;

type PlacesResultsProps = {
  searchPhrase?: string,
  places: PlaceResult[];
  onClick: (place: PlaceResult) => Promise<void>
}

type PlaceProps = {
  place: PlaceResult,
  onClick: (place: PlaceResult) => Promise<void>
}

const Place: FC<PlaceProps> = ({ place, onClick }) => {
  const tags = place.categories.filter((c) => c !== PlaceType.Unknown).map((c, i) => {
    
    return (
      <Tag key={`${place.stopPlaceId}-${c}-${i}`}>{c}</Tag>
    );
  });

  return (
    <PlaceCard onClick={() => onClick(place)}>
      <h4>{place.name} ({place.locality} - {place.county})</h4>
      <div>
        {tags}
      </div>
    </PlaceCard>
  )
}

export const PlacesResult: FC<PlacesResultsProps> = ({ searchPhrase, places, onClick }) => {
  if (places.length === 0 && searchPhrase) {
    return (
      <div>
        Søket etter {searchPhrase} gav ingen treff.
      </div>
    );
  }
  
  return (
    <div>
      {places.map((p, i) => <Place key={`${p.stopPlaceId}-${i}`} place={p} onClick={onClick}/>)}
    </div>
  );
};
