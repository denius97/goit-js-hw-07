import { galleryItems } from './gallery-items.js';
// Change code below this line

const gallery = document.querySelector('.gallery');

const galleryMarkup = galleryItems
  .map(
    ({ preview, original, description }) =>
      `<div class="gallery__item">
    <a class="gallery__link" href="${original}">
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </div>`
  )
  .join('');

gallery.insertAdjacentHTML('beforeend', galleryMarkup);

gallery.addEventListener('click', galleryItemClick);

function galleryItemClick(evt) {
  evt.preventDefault();
  if (!evt.target.classList.contains('gallery__image')) {
    return;
  }
  const imgUrl = evt.target.dataset.source;

  const instance = basicLightbox.create(`
	<img
        src="${imgUrl}"
        alt="${evt.target.alt} width="1280"}"
      />
`);
  instance.show();
  document.addEventListener('keyup', galleryModalClose);

  function galleryModalClose(evt) {
    if (evt.code === 'Escape') {
      instance.close(() => {
        document.removeEventListener('keyup', galleryModalClose);
      });
    }
  }
}
