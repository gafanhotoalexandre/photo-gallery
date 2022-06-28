import { useState, useEffect, FormEvent } from 'react';

// components
import { PhotoItem } from './components/PhotoItem';

// services
import * as Photos from './services/photos';

import * as C from './App.styles';
import { Photo } from './types/Photo';

export default function App() {
  const [uploading, setUploading] = useState(false);
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

  async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const file = formData.get('image') as File;

    if (file && file.size > 0) {
      setUploading(true);
      // inserindo imagem
      let result = await Photos.insert(file);
      setUploading(false);

      if (result instanceof Error) alert(`${result.name} - ${result.message}`);
      else {
        let newPhotoList = [...photos];
        newPhotoList.push(result);
        setPhotos(newPhotoList);
      }
    }
  }

  return (
    <C.Container>
      <C.Area>

        <C.Header>Galeria de Fotos</C.Header>

        {/* Área de Upload */}
        <C.UploadForm method="POST" onSubmit={handleFormSubmit}>
          <input type="file" name="image" />
          <input type="submit" value="Enviar" />
          {uploading && "Enviando..."}
        </C.UploadForm>

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
              <PhotoItem key={index}
                name={item.name}
                url={item.url}
              />
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
