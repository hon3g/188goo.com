import Resizer from 'react-image-file-resizer';

export const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      861,
      861,
      'JPEG',
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      'blob'
    );
  });
