var Spinner = function(){};

var spinnerChars = [ '|', '/', '-', '\\' ];

Spinner.prototype.start = function() {
  var current = 0;
  this.id = setInterval(function() {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(spinnerChars[current]);
    current = ++current % 4;
  }, 200);
};

Spinner.prototype.stop = function() {
  clearInterval(this.id);
};

exports.Spinner = Spinner;
