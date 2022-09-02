export function getImage(images: any): string {
  if (images && images.length > 0) {
    return images[0].filename;
  } else {
    return null;
  }
}
