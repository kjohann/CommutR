import { FC, useState } from 'react';
import styled from 'styled-components';
import { PlainButton } from '../../../../components/Buttons';
import { PlaceResult, getPlaces } from '../../../../entur/geocoderApi';
import { Modal } from '../../../../components/Modal';
import { PlacesResult } from './PlacesResults';


const Content = styled.div`

`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
`;


type AddPointModalProps = {
  isOpen: boolean;
  onClose: () => void;
}


export const AddPointModal: FC<AddPointModalProps> = ({ isOpen, onClose }) => {
  const [places, setPlaces] = useState<PlaceResult[]>([]);

  const search = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget

    const formElements = form.elements as typeof form.elements & {
      'search-place-input': HTMLInputElement
    }

    const placeName = formElements['search-place-input'].value;

    const response = await getPlaces(placeName);
    setPlaces(response);
  }

  const onSubmit = async () => {

  };

  return (
    <Modal
      title="Legg til stoppested"
      isOpen={isOpen}
      onClose={onClose}
      onProceed={onSubmit}
      canProceed={false}
    >
      <Content>
        <form onSubmit={search} id="search-place-form">
          <input id="search-place-input" type="search" placeholder="Skriv navn på stoppested" />
          <Buttons>
            <PlainButton type="submit">Søk</PlainButton>
            <PlainButton type="button">Legg til</PlainButton>
          </Buttons>
        </form>
        <form>
          <PlacesResult places={places} />
        </form>
      </Content>
    </Modal>
  )
}
