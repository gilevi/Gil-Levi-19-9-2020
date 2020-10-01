import React from "react";
import { useForm } from 'react-hook-form';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import { connect } from 'react-redux';
import { addMessage } from '../../actions';

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  inputLabel: {
    border: "none",
    borderBottom: "2px solid $gray",
    marginTop:"5%",
    marginBottom:"5%",
    borderBottom: "0.1rem solid ",
    width: '80%',
    height: '2rem',
    fontSize: '1.0625rem',
    paddingLeft: '0.875rem',
    lineHeight: '147.6%',
    paddingTop: '0.825rem',
    paddingBottom: '0.5rem',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif"
  },
  
};
const useStyles = makeStyles(styles);

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
  
function UserProfile(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      email: "",
      subject: "",
      message: ""
    }
  }); 

  // Post method after validation form
  const onSubmit = (data) => {
    console.log(typeof(data))
    props.addMessage(data);
    setOpen(true);
    document.getElementById("form").reset();
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  


    return (

      <div>
        <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
        <Card>
        <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Add new message</h4>
              <CardAvatar>Please complete all fields</CardAvatar>
        </CardHeader>
        

            {/* Form Starts Here */}
            <form id="form" onSubmit={handleSubmit(onSubmit)}>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={5}>
                  <input
                  className={classes.inputLabel}
                    placeholder="From"
                    id="company-disabled"
                    name="from"
                    type="text"
                    value="gilevi@gmail.com"
                    formControlProps={{
                      fullWidth: true
                    }}
                    
                    inputProps={{
                      disabled: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={5} className="form-control">
                  <input
                    className={classes.inputLabel}
                    placeholder="To"
                    name="email"
                    formControlProps={{
                      fullWidth: true
                    }}
                    ref={register({ required: true })}
                  />
                        {errors.email ?(<div className="invalid-feedback">Email is required </div>):null}

                </GridItem>
                 <GridItem xs={12} sm={12} md={5} className="form-control">
                  <input
                   className={classes.inputLabel}
                    placeholder="Subject"
                    type="text"
                    name="subject"
                    formControlProps={{
                      fullWidth: true
                    }}
                    ref={register({ required: true })}

                  />
                        {errors.subject ?(<div className="invalid-feedback">Subject is required </div>):null}

                </GridItem>
                 
        </GridContainer>
        <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <textarea
                  className={classes.inputLabel}
                    placeholder="Write something.."
                    name="message"
                    rows="10"
                    style={{"height":'20vh'}}
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 5
                    }}
                    ref={register({ required: true })}
                  />
                   {errors.message ?(<div className="invalid-feedback">Message is required </div>):null}

                </GridItem>
              </GridContainer>
        </CardBody>
        <CardFooter>
              <Button type="submit" color="primary" >Send</Button>
            </CardFooter>
          
            </form>
            </Card>
        </GridItem>
        </GridContainer>
        {/* Alert if submition successful */}
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Your message sent successfully!
        </Alert>
      </Snackbar>
      </div>
  );
}


export default connect (null ,{addMessage})(UserProfile)