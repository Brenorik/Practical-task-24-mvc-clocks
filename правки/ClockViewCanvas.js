function ClockViewCanvas() {
  let myModel = null;
  let myField = null;

  let run = null;
  let stop = null;

  let clock = null;

  let canvas = null;
  let ctx = null;

  let hours = null;
  let min = null;
  let sec = null;

  const CLOCK_RADIUS = 100;
  const CLOCK_CENTER_X = 100;
  const CLOCK_CENTER_Y = 100;
  const CLOCK_HOUR_MARK_RADIUS = 75;
  const CLOCK_HOUR_MARK_FONT = '100 10px Arial';
  const CLOCK_HOUR_MARK_COLOR = '#fff';
  const CLOCK_HOUR_MARK_OFFSET_X = [-3, -6];
  const SEC_ARROW_LENGTH = 80;
  const MIN_ARROW_LENGTH = 75;
  const HR_ARROW_LENGTH = 40;
  const ARROW_WIDTH_SEC = 2;
  const ARROW_WIDTH_MIN = 3;
  const ARROW_WIDTH_HR = 4;
  const ARROW_COLOR = '#383535';

  this.start = function (model, field, city, gtm) {
    myModel = model;
    myField = field;

    this.clockCreate(city, gtm);

    run = myField.querySelector('.run');
    stop = myField.querySelector('.stop');

    run.disabled = true;
  };

  this.clockCreate = function (city, gtm) {
    this.createButtons();
    this.setCityTime(city, gtm);

    let canv = '<canvas class="CanvasClock" width="200" height="200">Не работает</canvas>';
    let canvas_wrapper = document.createElement('div');
    canvas_wrapper.className = 'clock-margin';
    canvas_wrapper.innerHTML = canv;
    myField.appendChild(canvas_wrapper);

    canvas = myField.querySelector('.CanvasClock');
    ctx = canvas.getContext('2d');
  };

  this.createButtons = function () {
    let button_run = '<button class="run">старт</button>';
    let button_stop = '<button class="stop">стоп</button>';
    let buttons = button_run + ' ' + button_stop;
    myField.innerHTML = buttons;
  };

  this.setCityTime = function (city, gtm) {
    let info = document.createElement('div');
    info.className = 'info';
    info.innerHTML = `${city} (GTM ${gtm > 0 ? '+' + gtm : gtm})`;
    myField.appendChild(info);
  };

  this.init = function () {
    this.update();
    this.clear();
    this.createClockField();
    this.createArrows();
  };

  this.clear = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  this.createClockField = function () {
    ctx.beginPath();
    ctx.fillStyle = '#e6db04';
    ctx.arc(CLOCK_CENTER_X, CLOCK_CENTER_Y, CLOCK_RADIUS, 0, Math.PI * 2, true);
    ctx.fill();

    ctx.beginPath();
    let delta = (Math.PI * 2) / 12;
    let angle = 0;
    let h = 3;

    for (let i = 0; i < 12; i++) {
      x = CLOCK_CENTER_X + CLOCK_HOUR_MARK_RADIUS * Math.cos(angle);
      y = CLOCK_CENTER_Y + CLOCK_HOUR_MARK_RADIUS * Math.sin(angle);

      ctx.beginPath();
      ctx.fillStyle = '#2fa50f';
      ctx.arc(x, y, 12, 0, Math.PI * 2, true);
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = CLOCK_HOUR_MARK_COLOR;
      ctx.font = CLOCK_HOUR_MARK_FONT;
      ctx.fillText(h, x + CLOCK_HOUR_MARK_OFFSET_X[h >= 10 ? 1 : 0], y + 3);

      angle += delta;
      h++;
      if (h > 12) h = 1;
    }
  };

  this.createArrows = function () {
    let x1 = CLOCK_CENTER_X;
    let y1 = CLOCK_CENTER_Y;

    let secAngle = 6 * sec;
    let minAngle = 6 * (min + (1 / 60) * sec);
    let hrAngle = 30 * (hours + (1 / 60) * min);

    this.drawArrow(x1, y1, secAngle, SEC_ARROW_LENGTH, ARROW_WIDTH_SEC);
    this.drawArrow(x1, y1, minAngle, MIN_ARROW_LENGTH, ARROW_WIDTH_MIN);
    this.drawArrow(x1, y1, hrAngle, HR_ARROW_LENGTH, ARROW_WIDTH_HR);
  };

  this.drawArrow = function (x, y, angle, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.translate(x - ctx.lineWidth / 2, y);
    ctx.rotate((angle * Math.PI) / 180 + Math.PI);
    ctx.moveTo(0, -10);
    ctx.lineTo(0, length);
    ctx.strokeStyle = ARROW_COLOR;
    ctx.stroke();
    ctx.resetTransform();
    ctx.closePath();
  };

  this.changeState = function (item, state) {
    if (state == false) {
      item.removeAttribute('disabled');
    } else if (state == true) {
      item.setAttribute('disabled', 'true');
    }
  };

  this.update = function () {
    let d = myModel.getTime();
    hours = d.getHours();
    min = d.getMinutes();
    sec = d.getSeconds();
  };
}
