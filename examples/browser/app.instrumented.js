function square(n) {
  return function multiply(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
      var f = function (v) {
        if ([null, undefined].indexOf(v) >= 0) return String(v);
        var s = String(v);

        try {
          s = JSON.stringify(v);
        } catch (e) {}

        s = s.length > 20 ? s.substr(0, 20) + '...' : s;
        return s + ' (' + typeof v + ')';
      };

      throw new Error('Numeric operation with non-numeric value: ' + f(a) + ' ' + '*' + ' ' + f(b));
    }

    return a * b;
  }(n, n);
}

window.document.getElementById('username').addEventListener('change', function (event) {
  square(event.target.value);
});

//# sourceMappingURL=app.instrumented.js.map