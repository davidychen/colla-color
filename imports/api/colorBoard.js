import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";

export const ColorBoard = new Mongo.Collection("colorBoard");

if (Meteor.isServer) {
  Meteor.publish("colorBoard", function areaPublish() {
    return ColorBoard.find({});
  });
}


Meteor.methods({
  "colorBoard.update"(board, setToColor)  {
    check(board, Object);
    check(setToColor, String);

    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error("not-authorized");
    }

    
    ColorBoard.update(board._id, { $set: { color: setToColor } });
  },

  "colorBoard.insert"()  {
    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error("not-authorized");
    }

    
    ColorBoard.insert({
      color:"#FFFF00",
      allColor:[{
        x:0,
        y:0,
        color:"#000000"
      },{
        x:0,
        y:1,
        color:"#FF00FF"
      },{
        x:0,
        y:2,
        color:"#EEEE00"
      },{
        x:0,
        y:3,
        color:"#0000FF"
      },{
        x:0,
        y:4,
        color:"#99DD00"
      },{
        x:0,
        y:5,
        color:"#FFBB00"
      },{
        x:0,
        y:6,
        color:"#00DDDD"
      },{
        x:0,
        y:7,
        color:"#5500DD "
      },{
        x:0,
        y:8,
        color:"#9999FF"
      },{
        x:0,
        y:9,
        color:"#000088"
      },{
        x:0,
        y:10,
        color:"#AAAAAA"
      },{
        x:0,
        y:11,
        color:"#00FFCC"
      },{
        x:0,
        y:12,
        color:"#FF0000"
      },{
        x:0,
        y:13,
        color:"#00FFFF"
      }]
    });
  }
});