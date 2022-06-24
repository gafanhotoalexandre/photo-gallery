import { ref, listAll, getDownloadURL } from 'firebase/storage';

import { Photo } from "../types/Photo";
import { storage } from '../libs/firebase';

export async function getAll(): Promise<Photo[]> {
  let list: Photo[] = [];

  const imagesFolder = ref(storage, 'images');
  const photoList = await listAll(imagesFolder);



  return list;
}
