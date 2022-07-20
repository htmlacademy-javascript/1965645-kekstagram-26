import { isEscapeKey } from './util.js';
const MAX_COMMENT_LENGTH = 140;
const RE_HASHTAG = /(^#[A-Za-zА-Яа-яЁё0-9]{1,19}\b\s?)((\b\s#[A-Za-zА-Яа-яЁё0-9]{1,19}\b\s?){1,4})?$/;

const DEFAULT_SCALE_VALUE = 100;
const SCALE_STEP = 25;
const MAX_SCALE_VALUE = 100;
const MIN_SCALE_VALUE = 25;

const effectType = {
  NONE: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
};

const effectValue = {
  [effectType.CHROME]: 'grayscale',
  [effectType.SEPIA]: 'sepia',
  [effectType.MARVIN]: 'invert',
  [effectType.PHOBOS]: 'blur',
  [effectType.HEAT]: 'brightness'
};

const effectLevelConfig = {
  [effectType.CHROME]: {
    range: {
      min: 0,
      max: 1
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
    format: {
      to: function (value) {
        return (value);
      },
      from: function (value) {
        return (value);
      },
    }
  },
  [effectType.SEPIA]: {
    range: {
      min: 0,
      max: 1
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
    format: {
      to: function (value) {
        return (value);
      },
      from: function (value) {
        return (value);
      },
    }
  },
  [effectType.MARVIN]: {
    range: {
      min: 0,
      max: 100
    },
    start: 100,
    step: 1,
    connect: 'lower',
    format: {
      to: function (value) {
        return (`${value}%`);
      },
      from: function (value) {
        return (value);
      },
    }
  },
  [effectType.PHOBOS]: {
    range: {
      min: 0,
      max: 3
    },
    start: 3,
    step: 0.1,
    connect: 'lower',
    format: {
      to: function (value) {
        return (`${value}px`);
      },
      from: function (value) {
        return (value);
      },
    }
  },
  [effectType.HEAT]: {
    range: {
      min: 1,
      max: 3
    },
    start: 3,
    step: 0.1,
    connect: 'lower',
    format: {
      to: function (value) {
        return (value);
      },
      from: function (value) {
        return (value);
      },
    }
  }
};

const uploadForm = document.querySelector('.img-upload__form');
const editForm = uploadForm.querySelector('.img-upload__overlay');
const uploadFileButton = uploadForm.querySelector('.img-upload__input');
const closeFormButton = uploadForm.querySelector('.img-upload__cancel');
const postHashtag = uploadForm.querySelector('.text__hashtags');
const postDescription = uploadForm.querySelector('.text__description');

const smallerScaleButton = uploadForm.querySelector('.scale__control--smaller');
const biggerScaleButton = uploadForm.querySelector('.scale__control--bigger');
const scaleControlValue = uploadForm.querySelector('.scale__control--value');
const imgPreview = uploadForm.querySelector('.img-upload__preview').querySelector('img');

const effectLevelSlider = uploadForm.querySelector('.effect-level__slider');
const effectLevelValue = uploadForm.querySelector('.effect-level__value');
const effectLevel = uploadForm.querySelector('.effect-level');
const effectList = uploadForm.querySelector('.effects__list');

let currentScaleValue = DEFAULT_SCALE_VALUE;
let currentEffect;

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
  if (currentScaleValue === MIN_SCALE_VALUE) {
    return;
  }

  currentScaleValue -= SCALE_STEP;
  imgPreview.style.transform = `scale(${(currentScaleValue) / 100})`;
  scaleControlValue.value = `${currentScaleValue}%`;
};

const onBiggerScaleButtonClick = () => {
  if (currentScaleValue === MAX_SCALE_VALUE) {
    return;
  }

  currentScaleValue += SCALE_STEP;
  imgPreview.style.transform = `scale(${(currentScaleValue) / 100})`;
  scaleControlValue.value = `${currentScaleValue}%`;
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

const onEffectListChange = (evt) => {
  if (evt.target.closest('.effects__radio')) {
    currentEffect = evt.target.value;
    imgPreview.className = `effects__preview--${currentEffect}`;

    if (currentEffect !== effectType.NONE) {
      effectLevelSlider.noUiSlider.reset();
      effectLevelValue.value = '';
      effectLevelSlider.classList.remove ('hidden');

      effectLevelSlider.noUiSlider.updateOptions(effectLevelConfig[currentEffect]);
      imgPreview.style.filter = `${effectValue[currentEffect]}(${effectLevelSlider.noUiSlider.get()})`;
    } else {
      effectLevel.backgroundColor = '';
      effectLevelSlider.classList.add('hidden');
      imgPreview.style.removeProperty('filter');
    }
  }
};

effectLevelSlider.noUiSlider.on('update', () => {
  effectLevelValue.value = effectLevelSlider.noUiSlider.get();
  imgPreview.style.filter = `${effectValue[currentEffect]}(${effectLevelSlider.noUiSlider.get()})`;
});

uploadForm.addEventListener('submit', (evt) => {
  if(!pristine.validate()) {
    evt.preventDefault();}
});

const closeImageForm = () => {
  editForm.classList.add('hidden');
  document.body.classList.remove('modal-open');

  currentScaleValue = DEFAULT_SCALE_VALUE;
  imgPreview.style.transform = `scale(${(DEFAULT_SCALE_VALUE) / 100})`;

  imgPreview.className = 'effects__preview--none';
  effectLevelSlider.classList.add('hidden');

  smallerScaleButton.removeEventListener('click', onSmallerScaleButtonClick);
  biggerScaleButton.removeEventListener('click', onBiggerScaleButtonClick);
  effectList.removeEventListener ('change', onEffectListChange);

  effectLevelSlider.noUiSlider.reset();
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
    imgPreview.style.filter = '';

    smallerScaleButton.addEventListener('click', onSmallerScaleButtonClick);
    biggerScaleButton.addEventListener('click', onBiggerScaleButtonClick);
    effectList.addEventListener ('change', onEffectListChange);

    closeFormButton.addEventListener('click', closeImageForm);
    window.addEventListener('keydown', handleKeydown);
  });
};

export { initPostForm };
