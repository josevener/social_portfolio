// Keep gallery index changes predictable for buttons, keyboard navigation, and future gallery views.
function normalizeIndex(index, imageCount) {
  return ((index % imageCount) + imageCount) % imageCount;
}

export function getPreviousGalleryIndex(currentIndex, imageCount) {
  if (imageCount <= 1) return 0;

  return normalizeIndex(currentIndex - 1, imageCount);
}

export function getNextGalleryIndex(currentIndex, imageCount) {
  if (imageCount <= 1) return 0;

  return normalizeIndex(currentIndex + 1, imageCount);
}
