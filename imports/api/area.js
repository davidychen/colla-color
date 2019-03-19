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
  "area.update"(area, index, setToColor)  {
    check(area, Object);
    check(setToColor, String);

    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error("not-authorized");
    }
    var toBeSet = "area." + index.toString() + ".color";
    Area.update({_id:area._id}, { $set: { [toBeSet]: setToColor } });
  },

  "area.insert"()  {
    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error("not-authorized");
    }

    
    Area.insert({area:[{
      color:"#FF0F05",
      coordinate:[{
        x:26,
        y:32
      },{
        x:27,
        y:32
      }]
    },{
      color:"#FF0F05",
      coordinate:[{
        x:0,
        y:1
      },{
        x:0,
        y:0
      }]
    }]});
    Area.insert({area:[{
      color:"#00FF00",
      coordinate:[{
        x:26,
        y:32
      },{
        x:27,
        y:32
      }]
    },{
      color:"#FF00FF",
      coordinate:[{
        x:0,
        y:1
      },{
        x:0,
        y:0
      }]
    }]});
    Area.insert({area:[{
      color:"#000000",
      coordinate:[{
        x:10,
        y:3
      },{
        x:10,
        y:4
      }]
    },{
      color:"#000000",
      coordinate:[{
        x:10,
        y:11
      },{
        x:10,
        y:12
      }]
    }]});
  },

  "area.add"(newPict)  {
    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error("not-authorized");
    }
    Area.insert(newPict);
    
  }
});