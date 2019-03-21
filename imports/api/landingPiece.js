import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";

export const LandingPiece = new Mongo.Collection("landing-piece");

if (Meteor.isServer) {
  if (
    LandingPiece.find({}) == undefined ||
    LandingPiece.find({}).count() == 0
  ) {
    LandingPiece.insert({
      size: 20,
      board: [
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
      cells: [{}, {}, {}, {}, {}, {}, {}, {}],
      editors: [{}, {}, {}, {}, {}, {}, {}, {}],
      modifiedAt: [{}, {}, {}, {}, {}, {}, {}, {}]
    });
  }
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish("landing-piece", function landingPiecePublication() {
    return LandingPiece.find(
      {},
      {
        fields: {
          size: 1,
          board: 1,
          colors: 1,
          cells: 1,
          editors: 1,
          modifiedAt: 1
        },
        limit: 1
      }
    );
  });
}

Meteor.methods({
  "landing-piece.fill"(r, c, color) {
    check(r, Number);
    check(c, Number);
    check(color, String);
    color = color.toUpperCase();
    const res = LandingPiece.findOne({});
    if (res) {
      
      const area = res.board[r][c];
      const oldColor = res.colors[area];
      const oldEditor = res.editors[area];
      const oldModify = res.modifiedAt[area];
      console.log(res, color, oldColor);
      if (!(color === oldColor)) {
        const colorString = "colors." + area;
        const cellString = "cells." + area;
        const editorString = "editors." + area;
        const modifyString = "modifiedAt." + area;
        LandingPiece.update(
          { },
          {
            $set: {
              [colorString]: color,
              [cellString]: { r, c },
              [editorString]: this.userId ? Meteor.user().username : oldEditor,
              [modifyString]: this.userId ? new Date() : oldModify
            }
          }
        );
      }
    }
  }
});
