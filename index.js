var printf = require('printf');

var defaultSpinnerDelay = 60;

var Spinner = function(textToShow){
  this.text = textToShow || '';
  this.setSpinnerString(this.spinners[0]); // use default spinner string
  this.setSpinnerDelay(defaultSpinnerDelay);
};

Spinner.prototype.spinners = [
  "⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏",
  "⠋⠙⠚⠞⠖⠦⠴⠲⠳⠓",
  "⠄⠆⠇⠋⠙⠸⠰⠠⠰⠸⠙⠋⠇⠆",
  "⠋⠙⠚⠒⠂⠂⠒⠲⠴⠦⠖⠒⠐⠐⠒⠓⠋",
  "⠁⠉⠙⠚⠒⠂⠂⠒⠲⠴⠤⠄⠄⠤⠴⠲⠒⠂⠂⠒⠚⠙⠉⠁",
  "⠈⠉⠋⠓⠒⠐⠐⠒⠖⠦⠤⠠⠠⠤⠦⠖⠒⠐⠐⠒⠓⠋⠉⠈",
  "⠁⠁⠉⠙⠚⠒⠂⠂⠒⠲⠴⠤⠄⠄⠤⠠⠠⠤⠦⠖⠒⠐⠐⠒⠓⠋⠉⠈⠈",
  "⢄⢂⢁⡁⡈⡐⡠",
  "⢹⢺⢼⣸⣇⡧⡗⡏",
  "☱☲☴",
  "|/-\\",
  ".oO@*",
  "⣾⣽⣻⢿⡿⣟⣯⣷",
  "⠁⠂⠄⡀⢀⠠⠐⠈"
];

Spinner.setDefaultSpinnerString = function(value) {
  defaultSpinnerString = value;
};

Spinner.prototype.start = function() {
  var current = 0;
  var self = this;
  this.id = setInterval(function() {
    var msg = printf(self.text, self.chars[current]);
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(msg);
    current = ++current % self.chars.length;
  }, this.delay);
};

Spinner.prototype.setSpinnerDelay = function(n) {
  this.delay = n;
};

Spinner.prototype.setSpinnerString = function(str) {
  this.chars = str.split("");
};

Spinner.prototype.stop = function() {
  clearInterval(this.id);
};

exports.Spinner = Spinner;