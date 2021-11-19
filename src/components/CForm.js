/**
 ** Name: Custom Form
 ** Author: IT-Team
 ** CreateAt: 2021
 ** Description: Description of CForm.js
 **/
import PropTypes from 'prop-types';
import React, {
  createRef, forwardRef, useContext, useState, useEffect,
  useImperativeHandle,
} from 'react';
import {useTranslation} from 'react-i18next';
import {Input, Button, Icon, Spinner} from '@ui-kitten/components';
import {TouchableWithoutFeedback, View, UIManager, LayoutAnimation} from 'react-native';
/* COMMON */
import {ThemeContext} from '~/configs/theme-context';
import {cStyles} from '~/utils/style';
import {IS_ANDROID, validatEemail} from '~/utils/helper';

if (IS_ANDROID) {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

/*********************
 ** OTHER COMPONENT **
 *********************/
const RenderIconPassword = (props, secureTextEntry, onToggleSecureEntry) => (
  <TouchableWithoutFeedback onPress={onToggleSecureEntry}>
    <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
  </TouchableWithoutFeedback>
);

const RenderLoadingIndicator = (props) => (
  <View style={[props.style, cStyles.center]}>
    <Spinner size='small' status='control' />
  </View>
);

/********************
 ** MAIN COMPONENT **
 ********************/
const CForm = forwardRef((props, ref) => {
  const {t} = useTranslation();
  const themeContext = useContext(ThemeContext);
  const {
    containerStyle = {},
    loading = false,
    level = '1',
    inputs = [
      {
        style: {},
        id: 'input-1',
        disabled: false,
        label: '',
        holder: '',
        value: '',
        required: true,
        email: false,
        phone: false,
        password: false,
        number: false,
        next: false,
        return: 'done',
        validate: {type: '', helper: ''},
      }
    ],
    customAddingForm = null,
    disabledButton = false,
    labelButton = '',
    typeButton = 'filled',
    onSubmit = () => {},
  } = props;

  /** Use state */
  const [values, setValues] = useState(null);
  const [errors, setErrors] = useState(null);

  /*****************
   ** HANDLE FUNC **
   *****************/
  const onToggleSecureEntry = idxInput => {
    let tmpValues = [...values];
    tmpValues[idxInput].secureTextEntry = !tmpValues[idxInput].secureTextEntry;
    setValues(tmpValues);
  };

  const handleChangeValue = (idxInput, newValue) => {
    let tmpValues = [...values];
    tmpValues[idxInput].value = newValue + '';
    setValues(tmpValues);
  };

  const handleSubmitEditing = (idxInput, isNext) => {
    if (isNext) {
      values[idxInput] && values[idxInput + 1].ref.current.focus();
    }
  };

  /**********
   ** FUNC **
   **********/
  const onCheckValidate = (idxInput, validate) => {
    let tmpIsError = false;

    /** Check empty */
    if (!idxInput) {
      let i = 0, tmpErrors = [...errors];
      for (i; i < values.length; i++) {
        if (values[i].required) {
          if (values[i].value.trim() === '') {
            tmpIsError = true;
            tmpErrors[i].status = true;
            tmpErrors[i].type = 'required';
            tmpErrors[i].helper = t('error:empty_length');
          } else if (values[i].value.trim() !== '' && tmpErrors[i].type === 'required') {
            tmpIsError = false;
            tmpErrors[i].status = false;
            tmpErrors[i].type = '';
            tmpErrors[i].helper = '';
          } else if (tmpErrors[i].status) {
            tmpIsError = true;
          }
        }
        if (values[i].validate === 'email') {
          let isTrueValue = validatEemail(values[i].value.trim());
          if (!isTrueValue) {
            tmpIsError = true;
            tmpErrors[i].status = true;
            tmpErrors[i].type = 'format_email';
            tmpErrors[i].helper = t('error:format_email');
          } else {
            tmpIsError = false;
            tmpErrors[i].status = false;
            tmpErrors[i].type = '';
            tmpErrors[i].helper = '';
          }
        }
      }
      if (tmpIsError) {
        return setErrors(tmpErrors);
      } else {
        setErrors(tmpErrors);
      }
    }

    if (validate) {
      /** Check is email */
      if (validate.type === 'email') {
        let isTrueValue = validatEemail(values[idxInput].value.trim());
        let tmpErrors = [...errors];
        if (!isTrueValue) {
          tmpIsError = true;
          tmpErrors[idxInput].status = true;
          tmpErrors[idxInput].type = 'format_email';
          tmpErrors[idxInput].helper = t('error:format_email');
        } else {
          tmpIsError = false;
          tmpErrors[idxInput].status = false;
          tmpErrors[idxInput].type = '';
          tmpErrors[idxInput].helper = '';
        }
        return setErrors(tmpErrors);
      }

      /** Check min length */
      if (validate.type === 'min_length') {
        let isTrueValue = values[idxInput].value.trim();
        isTrueValue = isTrueValue.length >= Number(validate.helper);
        let tmpErrors = [...errors];
        if (!isTrueValue) {
          tmpIsError = true;
          tmpErrors[idxInput].status = true;
          tmpErrors[idxInput].type = 'min_length';
          tmpErrors[idxInput].helper = 
            t('error:min_length') + ' ' +
              validate.helper + ' ' +
              t('common:character');
        } else {
          tmpIsError = false;
          tmpErrors[idxInput].status = false;
          tmpErrors[idxInput].type = '';
          tmpErrors[idxInput].helper = '';
        }
        return setErrors(tmpErrors);
      }
    }
    if (!tmpIsError) return onSubmit(values);
    return;
  };

  /****************
   ** LIFE CYCLE **
   ****************/
  useEffect(() => {
    if (inputs.length > 0) {
      let tmpInput = null, tmpValue = {}, tmpValues = [];
      let tmpError = {}, tmpErrors = [];
      for (tmpInput of inputs) {
        let tmpInputRef = createRef();
        tmpValue = {};
        tmpError = {};

        tmpValue = {
          ref: tmpInputRef,
          id: tmpInput.id,
          value: tmpInput.value,
          required: tmpInput.required,
          validate: tmpInput.validate ? tmpInput.validate.type : '',
          secureTextEntry: tmpInput.password,
        };
        tmpError = {
          status: false,
          type: tmpInput.required ? 'required' : '',
          helper: '',
        };
        tmpValues.push(tmpValue);
        tmpErrors.push(tmpError);
      }
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setValues(tmpValues);
      setErrors(tmpErrors);
    }
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      onCallbackValue() {
        return {valuesAll: values, errorsAll: errors};
      }
    }),
  )

  /************
   ** RENDER **
   ************/
  let kbType = 'default';
  if (inputs.length === 0) return;
  if (!values) return <View />;
  return (
    <View style={containerStyle} level={level}>
      {inputs.map((item, index) => {
        kbType = 'default';
        if (item.email) kbType = 'email-address';
        if (item.phone) kbType = 'phone-pad';
        if (item.number) kbType = 'number-pad';

        return (
          <Input
            key={item.id + '_' + index}
            ref={values[index].ref}
            style={cStyles.mt24}
            nativeID={item.id}
            disabled={item.disabled}
            value={values[index].value}
            label={t(item.label)}
            placeholder={t(item.holder)}
            keyboardAppearance={themeContext.themeApp}
            keyboardType={kbType}
            returnKeyType={item.return}
            secureTextEntry={values[index].secureTextEntry}
            accessoryRight={item.password
              ? props => RenderIconPassword(props, values[index].secureTextEntry, () => onToggleSecureEntry(index))
              : undefined
            }
            status={errors && errors[index].status ? 'danger' : 'basic'}
            caption={errors && errors[index].status ? errors[index].helper : undefined}
            onChangeText={newValue => handleChangeValue(index, newValue)}
            onSubmitEditing={() => handleSubmitEditing(index, item.next)}
            onEndEditing={() => onCheckValidate(index, item.validate)}
          />
        )
      })}

      {/** Custom adding for form */}
      {customAddingForm}

      {/** Button */}
      <Button
        style={cStyles.mt24}
        appearance={typeButton}
        accessoryLeft={loading && RenderLoadingIndicator}
        disabled={disabledButton}
        onPress={() => onCheckValidate()}>
        {t(labelButton)}
      </Button>
    </View>
  );
});

CForm.propTypes = {
  containerStyle: PropTypes.object,
  loading: PropTypes.bool,
  level: PropTypes.string,
  inputs: PropTypes.array.isRequired,
  customAddingForm: PropTypes.any,
  disabledButton: PropTypes.bool,
  labelButton: PropTypes.string,
  typeButton: PropTypes.oneOf(['filled', 'outline', 'ghost']),
  onSubmit: PropTypes.func.isRequired,
};

export default CForm;
