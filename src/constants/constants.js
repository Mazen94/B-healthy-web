/**
 * Constant used in the PatientStatistics component
 * the labels of the chart (bar)
 */
const PATIENT_STATISTICS_LABELS = [
  '',
  '[10,15]',
  '[16,20]',
  '[21,25]',
  '[26,30]',
  '[31,35]',
  '[36,40]',
  '[41,45]',
  '[46,50]',
  '[51,55]',
  '[56,60]',
  ''
];
/**
 * Constant used in the PatientStatistics component
 * The background color of the chart (bar)
 */
const PATIENT_STATISTICS_BACKGROUNDCOLOR = [
  'rgba(255, 99, 132, 0.6)',
  'rgba(54, 162, 235, 0.6)',
  'rgba(255, 206, 86, 0.6)',
  'rgba(75, 192, 192, 0.6)',
  'rgba(153, 102, 255, 0.6)',
  'rgba(255, 159, 64, 0.6)',
  'rgba(255, 99, 132, 0.6)',
  'rgba(70, 215, 132, 0.6)',
  'rgba(100, 140, 64, 0.6)',
  'rgba(50, 10, 200, 0.6)'
];
/**
 * Constant used in the Dashboard component
 * The background color of the chart (Ingredient)
 */
const DASHBOARD_INGREDIENT_BACKGROUNDCOLOR = 'rgba(54, 162, 235, 0.6)';
/**
 * Constant used in the Dashboard component
 * The name of the chart (Ingredient)
 */
const DASHBOARD_INGREDIENT_NAME = 'Ingredients';
/**
 * Constant used in the Dashboard component
 * The background color of the chart (Menu)
 */
const DASHBOARD_MENU_BACKGROUNDCOLOR = 'rgba(255, 99, 132, 0.6)';
/**
 * Constant used in the Dashboard component
 * The name of the chart (Menu)
 */
const DASHBOARD_MENU_NAME = 'Menus';
/**
 * Constant used in the Dashboard component
 * The title of the MenuBar component
 */
const DASHBOARD_MENU_BAR_TITLE = 'Dashboard';
/**
 * Constant used in the Chart component
 * the label 'Homme' of the chart component
 */
const CHART_LABEL_MALE = 'Homme';
/**
 * Constant used in the Chart component
 * the label 'Femme' of the chart component
 */
const CHART_LABEL_FEMALE = 'Femme';
/**
 * Constant used in the Chart component
 * The background color of the chart ('Homme','Femme')
 */
const CHART_BACKGROUNDCOLOR = [
  'rgba(255, 99, 132, 0.6)',
  'rgba(54, 162, 235, 0.6)'
];
/**
 * The title  of the Patient component
 */
const PATIENT_MENU_BAR_TITLE = 'Patient';
/**
 * placeholder used in the patient component
 */
const PATIENT_PLACEHOLDER = 'Chercher un patient';
/**
 * The title of the AddPatient component
 */
const ADD_PATIENT_TITLE = 'Creer un patient';

/**
 * Constant message : use when field is required
 */
const MESSAGE_VALIDATORS_REQUIRED = 'Ce champ est requis';
/**
 * Constant message : min length password
 */
const MESSAGE_VALIDATORS_PASSWORD =
  'Le mot de passe doit contenir au moins 8 caractères.';
/**
 * Constant message : email validation
 */
const MESSAGE_VALIDATORS_EMAIL = "L'email n'est pas valide";
/**
 * The title of the Ingredient page
 */
const INGREDIENTS_MENU_BAR_TITLE = 'Ingredients';
/**
 * The title of the AddIngredient component
 */
const ADD_INGREDIENT_TITLE = 'Ajouter un ingredient';
/**
 * Constant message : is integer validation
 */
const MESSAGE_VALIDATORS_INTEGER = 'Ce champ doit être un nombre';
/**
 * The title of the Update page
 */
const MENU_BAR_UPDATE_TITLE = 'Modifier';
/**
 * Constant used in the AddRecommendation Page
 * name of the creation
 */
const ADDRECOMMENDATION_STEPPER_CREATION = 'Crée une Recommendation';
/**
 * Constant used in the AddRecommendation,UpdateRecommendation Page
 *
 */
const RECOMMENDATION_STEPPER_ADD = 'Ajouter des menus';
/**
 * Constant used in the UpadateRecommendation Page
 * name of the creation
 */
const UPDATERECOMMENDATION_STEPPER_CREATION = 'Modifier Recommandation';
/**
 * The title of the menus page
 */
const MENUS_TITLE = 'Menus';
/**
 * The title of the AddMenu component
 */
const ADD_MENU_TITLE = 'Ajouter un menu';
/**
 * Constant used in the AddMenu Page
 * name of creation
 */
const ADDMENU_STEPPER_CREATION = 'Crée un menu';
/**
 * Constant used in the AddMenu Page
 *
 */
const ADDMENU_STEPPER_ADD = 'Ajouter des ingredients au menu';
/**
 * The title of the Profil component
 */
const PROFIL_TITLE = 'Profil';

export {
  PATIENT_STATISTICS_LABELS,
  PATIENT_STATISTICS_BACKGROUNDCOLOR,
  DASHBOARD_INGREDIENT_BACKGROUNDCOLOR,
  DASHBOARD_INGREDIENT_NAME,
  DASHBOARD_MENU_BACKGROUNDCOLOR,
  DASHBOARD_MENU_NAME,
  DASHBOARD_MENU_BAR_TITLE,
  CHART_LABEL_MALE,
  CHART_LABEL_FEMALE,
  CHART_BACKGROUNDCOLOR,
  PATIENT_MENU_BAR_TITLE,
  PATIENT_PLACEHOLDER,
  ADD_PATIENT_TITLE,
  MESSAGE_VALIDATORS_PASSWORD,
  MESSAGE_VALIDATORS_REQUIRED,
  MESSAGE_VALIDATORS_EMAIL,
  INGREDIENTS_MENU_BAR_TITLE,
  ADD_INGREDIENT_TITLE,
  MESSAGE_VALIDATORS_INTEGER,
  MENU_BAR_UPDATE_TITLE,
  ADDRECOMMENDATION_STEPPER_CREATION,
  RECOMMENDATION_STEPPER_ADD,
  UPDATERECOMMENDATION_STEPPER_CREATION,
  MENUS_TITLE,
  ADD_MENU_TITLE,
  ADDMENU_STEPPER_CREATION,
  ADDMENU_STEPPER_ADD,
  PROFIL_TITLE
};
