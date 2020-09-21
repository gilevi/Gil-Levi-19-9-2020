import React,{ Component }  from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

class RecieveMessages extends Component {
    constructor(props) {
      super(props);
      this.state = {apiResponse:"", id: null, click:false};
    }    

    componentDidMount() {
        var lists = [];
        fetch("http://localhost:9000/messages-receive")
        .then(res =>res.text())
        .then(res => this.setState({apiResponse: JSON.parse(res)}));
    }
    onClick = (event)=> {
      event.preventDefault();
      console.log(event.currentTarget.id);
      var id = parseInt(event.currentTarget.id);
      fetch('http://localhost:9000/delete-message/:'+id, {
        method: 'DELETE',
      }).then(console.log(id));
      window.location.reload();

  }
    render() {

      
        const classes = this.props;
        var lists = [];
        for(var i=0; i<this.state.apiResponse.length; i++){
            var id = this.state.apiResponse[i];
            lists[i] = [this.state.apiResponse[i]['id'],this.state.apiResponse[i]['sender'], this.state.apiResponse[i]['subject'], this.state.apiResponse[i]['message'],this.state.apiResponse[i]['creationDate'], ( <Button color="primary" id={this.state.apiResponse[i]['id']} onClick={(event) => this.onClick(event)}>
            Remove
          </Button>) ];
         
        }

        
        return (
  
      <div>
     
      <GridContainer>
      
        <GridItem xs={24} sm={24} md={12}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Receive messages</h4>
              <p className={classes.cardCategoryWhite}>
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={["ID", "Sender", "Subject", "Message", "Date", "Delete"]}
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

export default RecieveMessages;



