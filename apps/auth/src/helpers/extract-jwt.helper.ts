export class ExtractJwtHelper {
  fromRequestToken() {
    return function (request: any) {
      var token = null;
      if (request && Object.prototype.hasOwnProperty.call(request, 'token')) {
        token = request['token'];
      }
      return token;
    };
  }
}
