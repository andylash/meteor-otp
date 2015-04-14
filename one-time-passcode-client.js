/**
 * To be used :
 * - https://github.com/markbao/speakeasy
 * - otpauth://totp/Example:alice@google.com?secret=JBSWY3DPEHPK3PXP&issuer=Example
 * - install npm module:
 *   > sudo npm install qrcode -g
 *   > npm install speakeasy
 * - Create with:
 *   > var qrcode = require('qrcode');
 *   > var speakeasy = require('speakeasy');
 *   >
 *   > var key = speakeasy.generate_key( {length : 20} );
 *   > var otpURL = "otpauth://totp/marvin.morea.fr:prichier@morea.fr?secret=" + key.base32 + "&issuer=marvin.morea.fr"
 *   > qrcode.toDataURL( otpURL, function(qrcode ) {
 *       console.log( qrcode );
 *     });
 * // http://stackoverflow.com/questions/21944544/what-data-do-i-have-to-use-to-generate-a-qr-code-for-google-authenticator
 * - Check with :
 *   > speakeasy.totp({key: key.base32, encoding: 'base32'});
 */

// subscrib
Meteor.subscribe("userOTP");

