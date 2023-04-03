import { FunctionComponent } from 'react';

type JourneyProps = {
  params: {
    id: string
  }
}


export const Journey: FunctionComponent<JourneyProps> = ({ params }) => {
  return (
    <div>
      Journey page for id: {params.id}
    </div>
  )
}
