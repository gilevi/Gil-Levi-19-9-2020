import React, { Component } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import { connect } from 'react-redux';
import { fetchSentMessages, deleteMessagesSent } from '../../actions';


// import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};
const useStyles = makeStyles(styles);

class SentMessages extends Component {
    constructor(props) {
      super(props);
      this.state = {apiResponse:""};
    }  

    
    componentDidMount() {
        this.props.fetchSentMessages();
       
    }
    onClick = (event)=> {
      event.preventDefault();
      var id = parseInt(event.currentTarget.id);
      console.log(id);
      this.props.deleteMessagesSent(id);
      window.location.reload();

  }

    render() {
        
        const classes = this.props;
        var lists = [];
        for(var i=0; i<this.props.sent_messages.length; i++){
            lists[i] = [this.props.sent_messages[i]['id'],this.props.sent_messages[i]['receiver'], this.props.sent_messages[i]['subject'], this.props.sent_messages[i]['message'],this.props.sent_messages[i]['creationDate'],
            ( <Button color="primary" id={this.props.sent_messages[i]['id']} onClick={(event) => this.onClick(event)}>
            Remove
          </Button>) ];
        }
  
        return (
  
        <div>
     
      <GridContainer>
      
      
        <GridItem xs={24} sm={24} md={12}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Sent messages</h4>
              <p className={classes.cardCategoryWhite}>
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={["ID", "Receiver", "Subject", "Message", "Date", "Delete"]}
                
                tableData={lists}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
}
const mapStateToProps = (state) => {
  return { sent_messages: state.sent_messages }

}
export default connect (mapStateToProps, {fetchSentMessages, deleteMessagesSent})(SentMessages);
