import { isEscapeKey } from './util.js';
const MAX_COMMENT_LENGTH = 140;
const RE_HASHTAG = /(^#[A-Za-zА-Яа-яЁё0-9]{1,20}\b\s?)((\b\s#[A-Za-zА-Яа-яЁё0-9]{1,20}\b\s?){1,4})?$/;

const DEFAULT_VALUE = 100;
const SCALE_STEP = 25;
const MAX_VALUE = 100;
const MIN_VALUE = 25;

const uploadForm = document.querySelector('.img-upload__form');
const editForm = uploadForm.querySelector('.img-upload__overlay');
const uploadFileButton = uploadForm.querySelector('.img-upload__input');
const closeFormButton = uploadForm.querySelector('.img-upload__cancel');
const postHashtag = uploadForm.querySelector('.text__hashtags');
const postDescription = uploadForm.querySelector('.text__description');

const smallerScaleButton = document.querySelector('.scale__control--smaller');
const biggerScaleButton = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview').querySelector('img');

const effectRadioButtons = document.querySelectorAll('.effects__radio');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');

let currentValue = DEFAULT_VALUE;

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


const onSmallerScaleButtonClick = () => {
  currentValue -= SCALE_STEP;
  imgPreview.style.transform = `scale(${(currentValue) / 100})`;
  scaleControlValue.value = `${currentValue} %`;

  if (currentValue <= MIN_VALUE) {
    currentValue = MIN_VALUE;
    scaleControlValue.value = `${MIN_VALUE} %`;
    imgPreview.style.transform = `scale(${(MIN_VALUE) / 100})`;
  }
};

const onBiggerScaleButtonClick = () => {
  currentValue += SCALE_STEP;
  imgPreview.style.transform = `scale(${(currentValue) / 100})`;
  scaleControlValue.value = `${currentValue} %`;

  if (currentValue >= MAX_VALUE) {
    currentValue = MAX_VALUE;
    scaleControlValue.value = `${MAX_VALUE} %`;
    imgPreview.style.transform = `scale(${(MAX_VALUE) / 100})`;
  }
};

const changeScale = () => {
  smallerScaleButton.addEventListener('click', onSmallerScaleButtonClick);
  biggerScaleButton.addEventListener('click', onBiggerScaleButtonClick);
};

noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});


const applyEffect = () => {
  effectRadioButtons.forEach((effectRadioButton) => {

    effectRadioButton.addEventListener ('change', () => {
      imgPreview.className = `effects__preview--${effectRadioButton.value}`;
      effectLevelValue.value = '';

      if (effectRadioButton.value === 'none') {
        effectLevelSlider.classList.add('hidden');
      } else {
        effectLevelSlider.classList.remove('hidden');
      }

      if (effectRadioButton.value === 'chrome') {

        effectLevelSlider.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 1
          },
          start: 1,
          step: 0.1,
          connect: 'lower',
        });

        effectLevelSlider.noUiSlider.on('update', () => {
          effectLevelValue.value = effectLevelSlider.noUiSlider.get();
          imgPreview.style.filter = `grayscale(${effectLevelValue.value})`;
        });
      }

      if (effectRadioButton.value === 'sepia') {

        effectLevelSlider.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 1
          },
          start: 1,
          step: 0.1,
          connect: 'lower',
        });

        effectLevelSlider.noUiSlider.on('update', () => {
          effectLevelValue.value = effectLevelSlider.noUiSlider.get();
          imgPreview.style.filter = `sepia(${effectLevelValue.value})`;
        });
      }

      if (effectRadioButton.value === 'marvin') {
        effectLevelSlider.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 100
          },
          start: 100,
          step: 1,
          connect: 'lower',
        });
        effectLevelSlider.noUiSlider.on('update', () => {
          effectLevelValue.value = effectLevelSlider.noUiSlider.get();
          imgPreview.style.filter = `invert(${effectLevelValue.value}%)`;
        });
      }

      if (effectRadioButton.value === 'phobos') {
        effectLevelSlider.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 3
          },
          start: 3,
          step: 0.1,
          connect: 'lower',
        });
        effectLevelSlider.noUiSlider.on('update', () => {
          effectLevelValue.value = effectLevelSlider.noUiSlider.get();
          imgPreview.style.filter = `blur(${effectLevelValue.value}px)`;
        });
      }

      if (effectRadioButton.value === 'heat') {
        effectLevelSlider.noUiSlider.updateOptions({
          range: {
            min: 1,
            max: 3
          },
          start: 3,
          step: 0.1,
          connect: 'lower',
        });
        effectLevelSlider.noUiSlider.on('update', () => {
          effectLevelValue.value = effectLevelSlider.noUiSlider.get();
          imgPreview.style.filter = `brightness(${effectLevelValue.value})`;
        });
      }

      if (effectRadioButton.value === 'none') {
        imgPreview.style.removeProperty('filter');
      }

    });
  });
};

uploadForm.addEventListener('submit', (evt) => {
  if(!pristine.validate()) {
    evt.preventDefault();}
});

const closeImageForm = () => {
  editForm.classList.add('hidden');
  document.body.classList.remove('modal-open');

  smallerScaleButton.removeEventListener('click', onSmallerScaleButtonClick);
  biggerScaleButton.removeEventListener('click', onBiggerScaleButtonClick);

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

    scaleControlValue.value = `${DEFAULT_VALUE} %`;
    imgPreview.style.transform = `scale(${(DEFAULT_VALUE) / 100})`;
    imgPreview.className = 'effects__preview--none';
    imgPreview.style.removeProperty('filter');
    currentValue = DEFAULT_VALUE;
    effectLevelSlider.classList.add('hidden');

    changeScale();
    applyEffect();

    closeFormButton.addEventListener('click', closeImageForm);
    window.addEventListener('keydown', handleKeydown);
  });
};

export { initPostForm };
