import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import healthy from '../../api/healthy';
import { useParams } from 'react-router-dom';
import meal from '../../assets/meal.png';
import { DIALOG_MENU } from '../../shared/constants/constants';
import DialogComponent from '../DialogComponent/DialogComponent';
import { CARD_HEADER_TITLE } from '../../shared/strings/strings';

/**
 * Hook API to generate and apply styles (its JSS object) using Material ui
 */
const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: 'auto',
  },
}));
const MenusRealtedRecommendation = (props) => {
  const menu = props.menus; //get the menu from the props
  const classes = useStyles(); //add styles to variable classes
  const params = useParams(); //get the params from url
  const [deleteMenuId, setDeleteMenuId] = useState(''); //to retrieve the Menus id to delete
  const [open, setOpen] = useState(false); //to open and close the Dialog when i want to delete Menus (initial value is false)
  const [menus, setMenus] = useState([]);
  /**
   * Associate the props(menu) with the state (menus)
   */
  useEffect(() => {
    setMenus(menu);
  }, [menu]);
  /**
   * arrow function to open the dialogue when the nutritionit want to delete a Menus
   * @param {int} id
   */
  const handleClickListItem = (id) => {
    setDeleteMenuId(id); // Set the id of the Menus inside the state
    setOpen(true); // Open the dialogue
  };
  /**
   * delete menu from recommendation
   *
   */
  const handleButtonDelete = async () => {
    setOpen(false);
    try {
      const authStr = `Bearer ${localStorage.getItem('token')}`; //Prepare the authorization with the token
      const response = await healthy.delete(
        `patients/${params.id}/recommendations/${params.idRecommendation}/menus/${deleteMenuId}`,
        {
          headers: { Authorization: authStr },
        }
      );
      setMenus(menus.filter((item) => item.id !== deleteMenuId)); //get the new data without the menu deleted)
      console.log('handleButtonDelete =', response);
    } catch (error) {
      console.log(error.response);
    }
  };
  /**
   * arrow function to close the dialogue
   */
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Card>
      <CardHeader
        avatar={<Avatar aria-label="recipe" src={meal} />}
        title={CARD_HEADER_TITLE}
      />
      <Divider />
      <List dense component="div" role="list">
        {menus.map((value) => {
          return (
            <ListItem
              key={value.id}
              className={classes.listItem}
              role="listitem"
              button
              onClick={() => handleClickListItem(value.id)}
            >
              {value.name}
            </ListItem>
          );
        })}
      </List>
      {/* Dialog when we want to delete Menus */}
      <DialogComponent
        handleButtonDelete={handleButtonDelete}
        open={open}
        handleClose={handleClose}
        message={DIALOG_MENU}
      />
    </Card>
  );
};

export default MenusRealtedRecommendation;
