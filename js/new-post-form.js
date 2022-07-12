import { isEscapeKey } from './util.js';
const MAX_COMMENT_LENGTH = 140;
const RE_HASHTAG = /(^#[A-Za-zА-Яа-яЁё0-9]{1,20}\b\s?)((\b\s#[A-Za-zА-Яа-яЁё0-9]{1,20}\b\s?){1,4})?$/;
const uploadForm = document.querySelector('.img-upload__form');
const editForm = uploadForm.querySelector('.img-upload__overlay');
const uploadFileButton = uploadForm.querySelector('.img-upload__input');
const closeFormButton = uploadForm.querySelector('.img-upload__cancel');
const postHashtag = uploadForm.querySelector('.text__hashtags');
const postDescription = uploadForm.querySelector('.text__description');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'text-error'
});

const validateComment = (value) => value.length <= MAX_COMMENT_LENGTH;
const validateHashtag = (value) => RE_HASHTAG.test(value);
const validateRepeatingHashtags = (value) => {
  if(!value) {
    return true;
  }
  const hashtags = value.replace(/ +/,' ').trim().toLowerCase().split(' ');
  return hashtags.length === new Set(hashtags).size;
};

pristine.addValidator(postHashtag, validateHashtag,'Хештег должен начинаться с символа "#" и содержать не больше 20 символов');
pristine.addValidator(postHashtag, validateRepeatingHashtags, 'Хештеги не должны повторяться');
pristine.addValidator(postDescription, validateComment, `Комментарий не должен быть длиннее ${MAX_COMMENT_LENGTH} символов`);

uploadForm.addEventListener('submit', (evt) => {
  if(!pristine.validate()) {
    evt.preventDefault();}
});

const closeImageForm = () => {
  editForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadForm.reset();
  pristine.reset();
};
function handleKeydown (evt) {
  if (!isEscapeKey(evt)) {
    return;
  }
  if (evt.target.matches('input')) {
    return;
  }
  closeImageForm();
}
const initPostForm = () => {
  uploadFileButton.addEventListener('change', () => {
    editForm.classList.remove('hidden');
    document.body.classList.add('modal-open');
    closeFormButton.addEventListener('click', closeImageForm);
    window.addEventListener('keydown', handleKeydown);
  });
};
export { initPostForm };
