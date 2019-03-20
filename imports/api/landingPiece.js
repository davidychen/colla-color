import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";

export const LandingPiece = new Mongo.Collection("landing-piece");
LandingPiece.insert({
  size: 20,
  areas: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 8, 8, 8, 0, 0, 0, 0, 8, 8, 8, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 8, 3, 3, 3, 8, 0, 0, 8, 5, 5, 6, 8, 0, 0, 0, 0],
    [0, 0, 0, 8, 3, 3, 3, 2, 2, 8, 8, 5, 5, 6, 6, 6, 8, 0, 0, 0],
    [0, 0, 8, 3, 3, 3, 1, 2, 2, 5, 5, 5, 6, 6, 6, 7, 7, 8, 0, 0],
    [0, 0, 8, 3, 3, 1, 1, 1, 5, 5, 5, 6, 6, 6, 7, 7, 7, 8, 0, 0],
    [0, 0, 8, 3, 2, 2, 1, 5, 5, 5, 6, 6, 6, 7, 7, 7, 4, 8, 0, 0],
    [0, 0, 8, 2, 2, 2, 5, 5, 5, 6, 6, 6, 7, 7, 7, 4, 4, 8, 0, 0],
    [0, 0, 0, 8, 2, 5, 5, 5, 6, 6, 6, 7, 7, 7, 4, 4, 8, 0, 0, 0],
    [0, 0, 0, 8, 5, 5, 5, 6, 6, 6, 7, 7, 7, 4, 4, 4, 8, 0, 0, 0],
    [0, 0, 0, 0, 8, 5, 6, 6, 6, 7, 7, 7, 4, 4, 4, 8, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 8, 6, 6, 7, 7, 7, 4, 4, 4, 8, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 8, 7, 7, 7, 4, 4, 4, 8, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 8, 7, 4, 4, 4, 8, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 8, 4, 4, 8, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ],
  colors: [
    "#FFFFFF",
    "#F3D1D1",
    "#951CD2",
    "#EB0B80",
    "#F36105",
    "#6CB6EF",
    "#58ED4E",
    "#F2F533",
    "#000000"
  ],
  editors: [{}, {}, {}, {}, {}, {}, {}, {}, {}]
});

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish("tasks", function tasksPublication() {
    return LandingPiece.find({
      $or: [{ private: { $ne: true } }, { owner: this.userId }]
    });
  });
}

Meteor.methods({
  "tasks.insert"(text) {
    check(text, String);

    // Make sure the user is logged in before inserting a task
    if (!this.userId) {
      throw new Meteor.Error("not-authorized");
    }

    Tasks.insert({
      text,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username
    });
  },
  "tasks.remove"(taskId) {
    check(taskId, String);

    const task = Tasks.findOne(taskId);
    if (task.private && task.owner !== this.userId) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error("not-authorized");
    }

    Tasks.remove(taskId);
  },
  "tasks.setChecked"(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);

    const task = Tasks.findOne(taskId);
    if (task.private && task.owner !== this.userId) {
      // If the task is private, make sure only the owner can check it off
      throw new Meteor.Error("not-authorized");
    }

    Tasks.update(taskId, { $set: { checked: setChecked } });
  },
  "tasks.setPrivate"(taskId, setToPrivate) {
    check(taskId, String);
    check(setToPrivate, Boolean);

    const task = Tasks.findOne(taskId);

    // Make sure only the task owner can make a task private
    if (task.owner !== this.userId) {
      throw new Meteor.Error("not-authorized");
    }

    Tasks.update(taskId, { $set: { private: setToPrivate } });
  }
});
