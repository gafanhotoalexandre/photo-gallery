import { useState, useEffect } from 'react';

// services
import * as Photos from './services/photos';

import * as C from './App.styles';
import { Photo } from './types/Photo';

export default function App() {
  const [loadingPhotos, setLoadingPhotos] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    async function getPhotos() {
      setLoadingPhotos(true);
      // pegando imagens
      setPhotos(await Photos.getAll());

      setLoadingPhotos(false);
    }
    getPhotos();
  }, []);

  return (
    <C.Container>
      <C.Area>

        <C.Header>Galeria de Fotos</C.Header>

        {/* Área de Upload */}

        {/* Lista de Fotos */}
        {loadingPhotos &&
          <C.ScreenWarning>
            <div className="emoji">🤚</div>
            <div className="">Carregando...</div>
          </C.ScreenWarning>
        }

        {!loadingPhotos && photos.length > 0 &&
          <C.PhotoList>
            {photos.map((item, index) => (
              <div>{item.name}</div>
            ))}
          </C.PhotoList>
        }

        {!loadingPhotos && photos.length === 0 &&
          <C.ScreenWarning>
            <div className="emoji">😞</div>
            <div className="">Não há fotos cadastradas.</div>
          </C.ScreenWarning>
        }
      </C.Area>
    </C.Container>
  );
}
