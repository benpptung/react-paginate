'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Return a self object with inspect getter to inspect the current object in React Developer
 * @param  {object} thisArg
 * @return {object}
 */
function selfInspect(thisArg) {
  if (process.env.NODE_ENV !== 'production') {

    if (typeof thisArg.inspect !== 'function') return;
    return Object.defineProperties({}, {
      inspect: {
        enumerable: true,
        get: function get(_) {
          return thisArg.inspect();
        }
      }
    });
  }
}

exports.default = selfInspect;
//# sourceMappingURL=self-inspect.js.map