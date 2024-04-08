const _enum = require("../config/enum");
const AuditLogsModel = require("../db/models/AuditLogs");

let instance = null;

class AuditLogs {
  constructor() {
    if (!instance) {
      instance = this;
    }
    return instance;
  }

  info(username, location, proc_type, log) {
    this.#saveToDB({
      level: _enum.LOG_LEVELS.INFO,
      username,location,proc_type,log
    });
  }

  error(username, location, proc_type, log) {
    this.#saveToDB({
      level: _enum.LOG_LEVELS.ERROR,
      username,location,proc_type,log
    });
  }

  warn(username, location, proc_type, log) {
    this.#saveToDB({
      level: _enum.LOG_LEVELS.WARN,
      username,location,proc_type,log
    });
  }

  verbose(username, location, proc_type, log) {
    this.#saveToDB({
      level: _enum.LOG_LEVELS.VERBOSE,
      username,location,proc_type,log
    });
  }
  
  http(username, location, proc_type, log) {
    this.#saveToDB({
      level: _enum.LOG_LEVELS.HTTP,
      username,location,proc_type,log
    });
  }
  debug(username, location, proc_type, log) {
    this.#saveToDB({
      level: _enum.LOG_LEVELS.DEBUG,
      username,location,proc_type,log
    });
  }


  #saveToDB({ level, username, location, proc_type, log }) {
    AuditLogsModel.create({
      level,
      username,
      location,
      proc_type,
      log,
    });
  }
}

module.exports = new AuditLogs();
