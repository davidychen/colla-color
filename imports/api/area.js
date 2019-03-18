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
  },

  "area.insert"()  {
    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error("not-authorized");
    }

    
    Area.insert({
      color:"#FF0F05",
      coordinate:[{
        x:26,
        y:32
      },{
        x:27,
        y:32
      }]
    });
    
    Area.insert({
      color:"#FF0F05",
      coordinate:[{
        x:0,
        y:1
      },{
        x:0,
        y:0
      }]
    });
  }
});