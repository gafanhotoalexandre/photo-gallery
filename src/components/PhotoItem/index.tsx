import * as C from './styles';

interface PhotoItemProps {
  name: string;
  url: string;
}

export function PhotoItem({ name, url }: PhotoItemProps) {
  return (
    <C.Container>
      <img src={url} alt={name} />
      {name}
    </C.Container>
  );
}
