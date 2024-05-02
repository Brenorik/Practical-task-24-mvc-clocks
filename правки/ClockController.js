function ClockController() {
  let myModel = null;
  let myField = null;
  let run = null;
  let stop = null;

  this.start = function (model, field) {
    myModel = model;
    myField = field;

    run = myField.querySelector('.run');
    stop = myField.querySelector('.stop');

    run.addEventListener('click', function (e) {
      e.preventDefault();
      myModel.go = true;
      myModel.changeState(run, true);
      myModel.changeState(stop, false);
      myModel.viewUpdate();
    });

    stop.addEventListener('click', function (e) {
      e.preventDefault();
      myModel.go = false;
      myModel.changeState(run, false);
      myModel.changeState(stop, true);
      myModel.viewUpdate();
    });
  };
}
