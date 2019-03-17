import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";

export const Area = new Mongo.Collection("area");

if (Meteor.isServer) {
  Meteor.publish("area", function areaPublish() {
    return Area.find({});
  });
}


Meteor.methods({
  "area.update"(area, setToColor)  {
    check(area, Object);
    check(setToColor, String);

    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error("not-authorized");
    }

    
    Area.update(area._id, { $set: { color: setToColor } });
  }
});