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
        color:"#FFFF00"
      },{
        x:0,
        y:3,
        color:"#0000FF"
      }]
    });
  }
});