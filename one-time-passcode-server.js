/* global MeteorOTP */
/* jshint camelcase:false */
"use strict";
/* OnLogin
Accounts.onLogin(function () {
  // We don't want to bug the user with One Time Passcode
  // We will ask for it when doing hot things
});*/

// Publish
Meteor.publish("userOTP", function() {
  if (this.userId) {
    return Meteor.users.find({
      _id: this.userId
    }, {
      fields: {
        'onePassCode.lastCheckDate': 1
      }
    });
  } else {
    this.ready();
  }
});

// Methods
var speakeasy = Npm.require('speakeasy');

var init = function(user) {
  var otpAppName = Meteor.settings.public.OTP.appName;
  if (!otpAppName)
    throw new Meteor.Error(500, "No OTP app name configured");

  if (!isEnabledForUser(user._id))
    return;

  var username = user && user.username;
  if (!username)
    throw new Meteor.Error(500, "Unable to init OTP, No username found for user: " + user._id);

  var key = speakeasy.generate_key({
    length: 20
  });
  var otpURL = "otpauth://totp/" + otpAppName + ":" + username + "?secret=" + key.base32 +
    "&issuer=" + otpAppName;

  Meteor.users.update({ _id: user._id }, {
    $set: {
      'onePassCode': {
        key: key,
        url: otpURL
      }
    }
  });
  return { key: key, url: otpURL};
};


var isEnabledForUser = function(userId) {
  if (typeof MeteorOTP.isEnabledForUser === 'function')
    return MeteorOTP.isEnabledForUser(userId);
  return true;
};

Meteor.methods({
  checkOTP: function(code, checkWithoutStoring) {
    check(code, String);
    check(checkWithoutStoring, Boolean);

    if (!this.userId)
      return new Meteor.Error(403, "Can only be called by a connected user.");

    var user = Meteor.users.findOne({ _id: this.userId });
    if (!user)
      throw new Meteor.Error(500, "Failed to find user record");

    var key;
    if (!user.onePassCode) {
      key = init(user).key;
    } else {
      key = user.onePassCode.key;
    }

    var result = (code === speakeasy.totp({
      key: key.base32,
      encoding: 'base32'
    }));

    if (result && !checkWithoutStoring)
      Meteor.users.update(this.userId, {
        $set: {
          'onePassCode.lastCheckDate': new Date()
        }
      });
    return result;
  }
});
