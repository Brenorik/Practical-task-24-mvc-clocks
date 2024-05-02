function Clock(gtm) {
  this.go = true;

  let viewModel = null;
  let id = null;

  this.start = function (view) {
    viewModel = view;
  };

  this.getTime = function () {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    let hours = date.getUTCHours() + gtm;
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let option = new Date(year, month, day, hours, minutes, seconds);
    return option;
  };

  this.secRotation = function () {
    let sec = this.getTime().getSeconds();
    let f = sec * 6 - 180;
    if (viewModel.updateSArrow) {
      viewModel.updateSArrow(f);
    }
  };

  this.minRotation = function () {
    let min = this.getTime().getMinutes();
    let sec = this.getTime().getSeconds();
    let fullSec = min * 60;
    let f = fullSec * 0.1 + sec * 0.1 - 180;
    if (viewModel.updateMinRotation) {
      viewModel.updateMinRotation(f);
    }
  };

  this.hrRotation = function () {
    let hr = this.getTime().getHours() >= 12 ? this.getTime().getHours() - 12 : this.getTime().getHours();
    let min = this.getTime().getMinutes();
    let sec = this.getTime().getSeconds();
    let f = hr * 30 + min * 0.5 + (sec * 0.5) / 60 - 180;
    if (viewModel.updateHArrow) {
      viewModel.updateHArrow(f);
    }
  };

  this.viewUpdate = function () {
    if (this.go == true) {
      id = setInterval(
        function () {
          this.secRotation();
          this.minRotation();
          this.hrRotation();
          if (viewModel.init) {
            viewModel.init();
          }
        }.bind(this),
        100
      );
    } else if (this.go == false) {
      clearInterval(id);
    }
  };

  this.changeState = function (item, state) {
    viewModel.changeState(item, state);
  };
}
