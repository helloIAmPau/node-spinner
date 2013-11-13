var spinnerChars = [ '|', '/', '-', '\\' ];

var Spinner = function(textToShow){
  this.text = textToShow || '';
};

Spinner.prototype.start = function() {
  var current = 0;
  var self = this;
  this.id = setInterval(function() {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(spinnerChars[current] + ' ' + self.text);
    current = ++current % 4;
  }, 200);
};

Spinner.prototype.stop = function() {
  clearInterval(this.id);
};

exports.Spinner = Spinner;
