"use strict";

Package.describe({
  name: "pascoual:otp",
  summary: "MFA solution with One Time PassCode, compatible with google authenticator",
  version: "0.1.3",
  git: "https://github.com/pascoual/meteor-otp.git"
});

Npm.depends({
  "speakeasy": "https://github.com/markbao/speakeasy/tarball/d9525fdde341624109557da52ad6cdd270025059"
});


Package.onUse(function(api) {
  api.versionsFrom('METEOR@0.9.2.2');
  api.addFiles('one-time-passcode-common.js');
  api.addFiles('one-time-passcode-client.js', 'client');
  api.addFiles('one-time-passcode-server.js', 'server');
  api.use('momentjs:moment');
  api.export('MeteorOTP');
});
