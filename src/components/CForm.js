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
import {Input, Button, Icon, Spinner, Text, Select, SelectItem, Toggle, RadioGroup, Radio, useTheme} from '@ui-kitten/components';
import {TouchableWithoutFeedback, View, UIManager, LayoutAnimation} from 'react-native';
/* COMMON */
import {ThemeContext} from '~/configs/theme-context';
import {cStyles} from '~/utils/style';
import {IS_ANDROID, validatEemail} from '~/utils/helper';
import { FONTS } from '~/utils/style/Styles';

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
  const theme = useTheme();
  const themeContext = useContext(ThemeContext);
  const {
    containerStyle = {},
    loading = false,
    level = '1',
    inputs = [
      {
        style: {},
        id: 'input-1',
        type: '',
        position: '',
        disabled: false,
        label: '',
        holder: '',
        value: '',
        values: [],
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
  const [visible, setVisible] = useState(false);

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

  const handleSelectedIndex = (idxInput, newIndex) => {
    let tmpValues = [...values];
    tmpValues[idxInput].value = newIndex;
    setValues(tmpValues);
  };

  const handleToggle = idxInput => {
    let tmpValues = [...values];
    tmpValues[idxInput].value = !tmpValues[idxInput].value;
    setValues(tmpValues);
  };

  /**********
   ** FUNC **
   **********/
  const onCheckValidate = () => {
    let tmpIsError = false;
    let i, tmpErrors = [...errors];

    for (i = 0; i < values.length; i++) {
      /** Check required */
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

      /** Check is email */
      if (values[i].validate === 'format_email') {
        let isTrueValue = validatEemail(values[i].value.trim());
        if (!isTrueValue) {
          tmpIsError = true;
          tmpErrors[i].status = true;
          tmpErrors[i].type = 'format_email';
          tmpErrors[i].helper = t('error:format_email');
        } else if (tmpErrors[i].type === 'format_email') {
          tmpIsError = false;
          tmpErrors[i].status = false;
          tmpErrors[i].type = '';
          tmpErrors[i].helper = '';
        } else if (tmpErrors[i].status){
          tmpIsError = true;
        }
      }

      /** Check min length */
      if (values[i].validate === 'min_length') {
        let isTrueValue = values[i].value.trim();
        isTrueValue = isTrueValue.length >= Number(values[i].validateHelper);
        if (!isTrueValue) {
          tmpIsError = true;
          tmpErrors[i].status = true;
          tmpErrors[i].type = 'min_length';
          tmpErrors[i].helper = 
            t('error:min_length') + ' ' +
            values[i].validateHelper + ' ' +
            t('common:character');
        } else if (tmpErrors[i].type === 'min_length') {
          tmpIsError = false;
          tmpErrors[i].status = false;
          tmpErrors[i].type = '';
          tmpErrors[i].helper = '';
        } else if (tmpErrors[i].status){
          tmpIsError = true;
        }
      }
      if (tmpIsError) return setErrors(tmpErrors);
      
    }
    if (!tmpIsError) return onSubmit(values);
    else return setErrors(tmpErrors); 
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
          values: tmpInput.values,
          required: tmpInput.required,
          validate: tmpInput.validate ? tmpInput.validate.type : '',
          validateHelper: tmpInput.validate ? tmpInput.validate.helper : '',
          secureTextEntry: tmpInput.password,
        };
        tmpError = {
          status: false,
          type: tmpInput.required ? 'required' : tmpInput.validate ? tmpInput.validate.type : '',
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

        if (item.type === 'text') {
          return (
            <Input
              key={item.type + item.id + '_' + index}
              ref={values[index].ref}
              style={[cStyles.mt24, item.style]}
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
            />
          )
        }
        if (item.type === 'select') {
          return (
            <Select
              style={item.style}
              label={item.label}
              caption={errors && errors[index].status ? errors[index].helper : undefined}
              placeholder='Select one of below...'
              disabled={loading}
              selectedIndex={values[index].value}
              onSelect={idxSelect => handleSelectedIndex(index, idxSelect)}>
              {item.values.map((itemSelect, indexSelect) => {
                return <SelectItem key={itemSelect + indexSelect} title={itemSelect} />
              })}
            </Select>
          )
        }
        if (item.type === 'toggle') {
          return (
            <View style={[
              item.position === 'left' && cStyles.itemsStart,
              item.position === 'right' && cStyles.itemsEnd,
              item.position === 'center' && cStyles.itemsCenter,
              item.style
            ]}>
              <Toggle
                disabled={loading}
                checked={values[index].value}
                onChange={() => handleToggle(index)}>
                {item.label}
              </Toggle>
            </View>
          )
        }
        if (item.type === 'radio') {
          return (
            <View style={[item.style]}>
              <Text style={{color: theme['color-basic-600']}} category={'label'}>{item.label}</Text>
              <RadioGroup
                selectedIndex={values[index].value}
                onChange={indexRadio => handleSelectedIndex(index, indexRadio)}>
              {item.values.map((itemRadio, indexRadio) => {
                return <Radio key={itemRadio + indexRadio}>{itemRadio}</Radio>
              })}
              </RadioGroup>
            </View>
          )
        }
        return null;
      })}

      {/** Custom adding for form */}
      {customAddingForm}

      {/** Button */}
      {labelButton !== '' && (
        <Button
          style={cStyles.mt24}
          appearance={typeButton}
          accessoryLeft={loading && RenderLoadingIndicator}
          disabled={disabledButton}
          onPress={onCheckValidate}>
          {t(labelButton)}
        </Button>
      )}
    </View>
  );
});

CForm.propTypes = {
  containerStyle: PropTypes.object,
  type: PropTypes.string.isRequired,
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
