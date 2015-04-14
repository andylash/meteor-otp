/* global MeteorOTP:true, moment */
/* jshint strict: false */

if (typeof MeteorOTP === "undefined")
  MeteorOTP = {};

MeteorOTP.checkOTP = function (user) {
  var delay = 20; // minutes
  try {
    delay = Meteor.settings.public.OTP.expiration;
  } catch (e) {
    console.log("No Application config for OTP expiration delay, using default: 20 minutes");
  }
  return user && user.onePassCode && user.onePassCode.lastCheckDate &&
    moment().diff(user.onePassCode.lastCheckDate, 'minutes') < delay;
};
