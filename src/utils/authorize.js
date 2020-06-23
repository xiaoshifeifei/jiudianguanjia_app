var _ua = window.navigator.userAgent.toLowerCase();
var _isWeixin = _ua.indexOf('micromessenger') !== -1;
export {_isWeixin}
import { authUrl } from '@/setting'
function isArray(obj) {
  var res = Object.prototype.toString.call(obj);
  return res === '[object Array]';
}
function empty(val) {
  if (isArray(val) && val.length === 0) {
    return true;
  }
  if (val === undefined || val === null || val === '' || val === 'undefined') {
    return true;
  }
  return false;
}
function getLocalUserInfo() {
  var userJson = localStorage.userInfo;
  if (empty(userJson)) {
    return '';
  }

  if (userJson.indexOf('User_NickName') === -1) {
    return '';
  }

  return JSON.parse(userJson);
}

function getShareUserInfo(param, callback) {
  if (!_isWeixin) {
    if (typeof (callback) === 'function') {
      callback('Not_WeChat');
    }
    return;
  }
  param.code = location.href.split('?code=')[1];
  getWxUserGetInfo(param, callback);
}


export function getWxCodeUrl(appid, redirect_url, auth_url) {
  var redirect_uri = empty(redirect_url) ? location.href.split('?')[0] : redirect_url;
  var auth_redirect_uri = empty(auth_url) ? authUrl : auth_url;
  var codeUrl = "https://open.weixin.qq.com/connect/oauth2/authorize";
  codeUrl += "?appid=" + appid;
  codeUrl += "&redirect_uri=" + auth_redirect_uri;
  codeUrl += "&response_type=code";
  codeUrl += "&scope=snsapi_base";/* snsapi_base snsapi_userinfo*/
  codeUrl += "&state=" + redirect_uri;
  codeUrl += "#wechat_redirect";
  return codeUrl;
}
export function getQueryVariable(url,variable) {
  var query = url.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) { return pair[1]; }
  }
  return (false);
}