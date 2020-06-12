import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import React, { useEffect, useState } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import Skeleton from '@material-ui/lab/Skeleton';
import * as services from '../../shared/services/services';
import { ENDPOINT_MEALS } from '../../shared/constants/endpoint';
import FormHelperText from '@material-ui/core/FormHelperText';
import * as strings from '../../shared/strings/strings';
import * as constants from '../../shared/constants/constants';
import * as validations from '../../shared/constants/validation';
import { PATH_MENU, PATH_INGREDIENTS } from '../../routes/path';
import { useStyles } from './styles';
import ModifyIngredientMenu from '../../components/ModifyIngredientMenu/ModifyIngredientMenu';

export default function UpdateMenuForm({ changeFlag }) {
  const classes = useStyles(); //add styles to variable classes
  const history = useHistory(); //useHistory hook gives you access to the history instance that you may use to navigate
  const [maxAge, setMaxAge] = useState(''); // to retrieve the maximum age entered by the user (initial value empty string)
  const [minAge, setMinAge] = useState(''); // to retrieve the minimum age entered by the user (initial value empty string)
  const [typeMenu, setTypeMenu] = useState(''); // to retrieve the type menu entered by the user (initial value empty string)
  const [name, setName] = useState(''); // to retrieve the name entered by the user (initial value empty string)
  const [ingredients, setIngredients] = useState([]); // to get the ingredient related to menu
  const [openSkeleton, setOpenSkeleton] = useState(true); //to open and close the Skeleton
  const params = useParams(); //to get params URL
  //RULES NAME OF MIN AND MAX AGE
  const RULES_NAME_OF_TEXTFIELD_AGE = [
    validations.RULES_NAME_IS_INTEGER,
    validations.RULES_NAME_VALIDATION_AGE,
    validations.RULES_NAME_REQUIRED,
  ];
  //ERROR MESSAGE OF MIN AND MAX AGE
  const MESSAGE_OF_TEXTFIELD_AGE = [
    validations.MESSAGE_VALIDATORS_INTEGER,
    validations.MESSAGE_VALIDATORS_AGE,
    validations.MESSAGE_VALIDATORS_REQUIRED,
  ];

  useEffect(() => {
    services.isInteger();
    services.validationAge();
    //Prepare cancel request
    let mounted = true;
    services.axiosService(
      `${ENDPOINT_MEALS}${params.id}`,
      constants.GET,
      true,
      null,
      (error, response) => {
        if (response) {
          if (mounted) {
            setName(response.data.data.name);
            setMaxAge(response.data.data.max_age);
            setMinAge(response.data.data.min_age);
            setIngredients(response.data.data.ingredients);
            setTypeMenu(response.data.data.type_menu);
            setOpenSkeleton(false);
          }
        } else console.log('error to get a mealStore', error);
      }
    );
    return () => {
      mounted = false;
    };
  }, [params.id]);
  //handle name
  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  //handle MaxAge
  const handleChangeMaxAge = (e) => {
    setMaxAge(e.target.value);
  };
  //handle MinAge
  const handleChangeMinAge = (e) => {
    setMinAge(e.target.value);
  };
  //handle TypeMen
  const handleTypeMenu = (e) => {
    setTypeMenu(e.target.value);
  };

  const onSubmitFrom = async () => {
    const menu = {
      name: name,
      max_age: maxAge,
      min_age: minAge,
      type_menu: typeMenu,
    };
    changeFlag(true);
    services.axiosService(
      `${ENDPOINT_MEALS}${params.id}`,
      constants.PUT,
      true,
      menu,
      (error, response) => {
        if (response)
          history.push(`${PATH_MENU}/${params.id}${PATH_INGREDIENTS}`);
        else changeFlag(false);
      }
    );
  };

  const customeTextField = (
    name,
    value,
    handleChange,
    validator,
    errorMessage,
    endadorment = ''
  ) => {
    return (
      <TextValidator
        variant={constants.OUTLINED}
        required
        fullWidth
        label={name}
        value={value}
        onChange={handleChange}
        validators={validator}
        errorMessages={errorMessage}
        InputProps={{
          endAdornment: endadorment,
        }}
      />
    );
  };

  /**
   * Function to render
   */

  const renderFunction = () => {
    if (openSkeleton) {
      return (
        <div className={classes.skeleton}>
          {/* Loading when the data is empty */}
          <Skeleton
            variant={constants.SKELETON_VARIANT_TEXT}
            className={classes.skeletonText}
          />
        </div>
      );
    } else
      return (
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <ValidatorForm onSubmit={onSubmitFrom} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  {customeTextField(
                    strings.NAME,
                    name,
                    handleChangeName,
                    [validations.RULES_NAME_REQUIRED],
                    [validations.MESSAGE_VALIDATORS_REQUIRED]
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Select
                    variant={constants.OUTLINED}
                    value={typeMenu}
                    onChange={handleTypeMenu}
                    className={classes.select}
                  >
                    {strings.SELECT_TYPE_MENU.map((row, index) => (
                      <MenuItem key={row} value={index}>
                        {row}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{strings.MENU_TYPE}</FormHelperText>
                </Grid>
                <Grid item xs={12} sm={6}>
                  {customeTextField(
                    strings.MIN_AGE,
                    minAge,
                    handleChangeMinAge,
                    RULES_NAME_OF_TEXTFIELD_AGE,
                    MESSAGE_OF_TEXTFIELD_AGE,
                    <InputAdornment position="end">
                      {strings.YEARS}
                    </InputAdornment>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  {customeTextField(
                    strings.MAX_AGE,
                    maxAge,
                    handleChangeMaxAge,
                    RULES_NAME_OF_TEXTFIELD_AGE,
                    MESSAGE_OF_TEXTFIELD_AGE,
                    <InputAdornment position="end">
                      {strings.YEARS}
                    </InputAdornment>
                  )}
                </Grid>
                <ModifyIngredientMenu ingredients={ingredients} />
              </Grid>
              <Button
                type="submit"
                variant={constants.CONTAINED}
                color={constants.PRIMARY_COLOR}
                className={classes.submit}
              >
                {strings.VALIDATE}
              </Button>
            </ValidatorForm>
          </Paper>
        </Grid>
      );
  };

  return <div>{renderFunction()}</div>;
}
