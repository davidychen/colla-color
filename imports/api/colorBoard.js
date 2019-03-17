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
  }
});