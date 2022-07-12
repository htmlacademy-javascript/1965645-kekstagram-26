import {isEscapeKey} from './util.js';
const MAX_COMMENT_LENGTH = 140;
const uploadForm = document.querySelector('.img-upload__form');
const editForm = uploadForm.querySelector('.img-upload__overlay');
const uploadFileButton = uploadForm.querySelector('.img-upload__input');
const closeFormButton = uploadForm.querySelector('.img-upload__cancel');
const uploadFileForm = uploadForm.querySelector('#upload-file');
const postHashtag = uploadFileForm.querySelector('.text__hashtags');
const postDescription = uploadFileForm.querySelector('.text__description');

const reHashtag = /(^#[A-Za-zА-Яа-яЁё0-9]{1,20}\b\s?)((\b\s#[A-Za-zА-Яа-яЁё0-9]{1,20}\b\s?){1,4})?$/;

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'text-error',
});

const validateComment = (value) => value.length <= MAX_COMMENT_LENGTH;
const validateHashtag = (value) => reHashtag.test(value);
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
  if(isEscapeKey(evt)) {
    closeImageForm();
  }
}
const openImageForm = () => {
  uploadFileButton.addEventListener('change', () => {
    editForm.classList.remove('hidden');
    document.body.classList.add('modal-open');
    closeFormButton.addEventListener('click', closeImageForm);
    window.addEventListener('keydown', handleKeydown);
  });
};
export {openImageForm};
