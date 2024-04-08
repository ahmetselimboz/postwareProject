class Flash {
  constructor() {
    this.flash = {};
  }

  flashMessage(req, ...args) {
    const newObj = new Map();

    Object.keys(args[0]).forEach((key) => {
      newObj.set(key, args[0][key]);
    });

    const arrayOfObjects = Array.from(newObj, ([key, value]) => ({
      [key]: value,
    }));

    Object.entries(arrayOfObjects).forEach(([key, value]) => {
      let param = Object.keys(value);
      req.flash(param, value[param]);
    });
  }

  flashLocals(req, res) {
    var flashData = req.flash();

    for (var key in flashData) {
      if (flashData.hasOwnProperty(key)) {
        res.locals[key] = flashData[key][0];
      }
    }
  }
}

module.exports = new Flash();
