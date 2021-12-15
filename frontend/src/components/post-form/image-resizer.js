import Resizer from 'react-image-file-resizer';

export const resizeFile = (file, maxWidth, maxHeight) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      maxWidth,
      maxHeight,
      'JPEG',
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      'blob'
    );
  });
