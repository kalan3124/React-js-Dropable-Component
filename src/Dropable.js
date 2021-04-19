import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import "./AppTwo.css";

const styles = (theme) => ({
  root: {
    width: "100%",
    maxWidth: "63ch",
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: 500,
  },
  rootTwo: {
    width: "100%",
    height: "300px",
    maxWidth: "63ch",
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: 500,
  },
  inline: {
    display: "inline",
  },
});

class Dropable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
      msgs: [
        {
          id: "1",
          msg: "hi shssjjjkk jajksdhkjhdsfjd asijias",
          name: "imalsha kalansooriya",
        },
        {
          id: "2",
          msg: "hi shssjjjkk jajksdhkjhdsfjd asijias",
          name: "Ashnas sadiyan",
        },
        {
          id: "3",
          msg: "hi shssjjjkk jajksdhkjhdsfjd asijias",
          name: "Kishor Khan",
        },
        {
          id: "4",
          msg: "hi shssjjjkk jajksdhkjhdsfjd asijias",
          name: "lahiru sampath",
        },
      ],
      readed: [
        {
          id: "1",
          msg: "hi shssjjjkk jajksdhkjhdsfjd asijias",
          name: "imalsha kalansooriya",
        },
      ],
    };
  }

  async componentDidMount() {}
  async test() {}

  onDragStart = (event, key) => {
    console.log(key);
    event.dataTransfer.setData("key", key);
  };
  onDragOver = (event) => {
    event.preventDefault();
  };

  onDrop = (event) => {
    let key = event.dataTransfer.getData("key");

    let arr = this.state.msgs[key];
    this.setState({
      readed: {
        ...this.state.readed,
        [this.state.count]: arr,
      },
      count: this.state.count + 1,
    });

    let arrDel = this.state.msgs;
    delete arrDel[key];
    let resetArr = Object.values(arrDel).filter(function () {
      return true;
    });

    this.setState({
      msgs: resetArr,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div style={{ flexGrow: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Container
              maxWidth="sm"
              style={{ backgroundColor: "#cfe8fc", height: 500 }}
            >
              <br></br>
              <div
                style={{ height: "100px" }}
                onDragOver={(event) => this.onDragOver(event)}
                onDrop={(event) => {
                  this.onDrop(event, "inProgress");
                }}
              >
                <List className={classes.root}>
                  {Object.values(this.state.msgs).map((e, key) => {
                    return [
                      <div
                        draggable
                        onDragStart={(event) => this.onDragStart(event, key)}
                      >
                        <ListItem alignItems="flex-start">
                          <ListItemAvatar>
                            <Avatar
                              alt={e.name}
                              src="/static/images/avatar/1.jpg"
                            />
                          </ListItemAvatar>
                          <ListItemText
                            primary={e.name}
                            secondary={
                              <React.Fragment>
                                <Typography
                                  component="span"
                                  variant="body2"
                                  className={classes.inline}
                                  color="textPrimary"
                                >
                                  {e.name}
                                </Typography>
                                {e.msg}
                              </React.Fragment>
                            }
                          />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                      </div>,
                    ];
                  })}
                </List>
              </div>
            </Container>
          </Grid>
          <Grid item xs={6}>
            <Container
              maxWidth="sm"
              style={{ backgroundColor: "#cfe8fc", height: 500 }}
            >
              <br></br>
              <div
                onDragOver={(event) => this.onDragOver(event)}
                onDrop={(event) => this.onDrop(event)}
              >
                <List className={classes.rootTwo}>
                  {Object.values(this.state.readed).map((e, key) => {
                    return [
                      <div
                        draggable
                        onDragStart={(event) => this.onDragStart(event, key)}
                      >
                        <ListItem alignItems="flex-start">
                          <ListItemAvatar>
                            <Avatar
                              alt={e.name}
                              src="/static/images/avatar/1.jpg"
                            />
                          </ListItemAvatar>
                          <ListItemText
                            primary={e.name}
                            secondary={
                              <React.Fragment>
                                <Typography
                                  component="span"
                                  variant="body2"
                                  className={classes.inline}
                                  color="textPrimary"
                                >
                                  {e.name}
                                </Typography>
                                {e.msg}
                              </React.Fragment>
                            }
                          />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                      </div>,
                    ];
                  })}
                </List>
              </div>
            </Container>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Dropable);
