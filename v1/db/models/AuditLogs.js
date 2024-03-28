const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    level: String,
    username: String,
    location: String,
    proc_type: String,
    log: String,
  },
  { versionKey: false, timestamps: true }
);

class AuditLog extends mongoose.Model {}

schema.loadClass(AuditLog);


const AuditLogs = mongoose.model("audit_logs", schema);

module.exports = AuditLogs;
