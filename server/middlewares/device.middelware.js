import { UAParser } from "ua-parser-js";

const deviceCheck = (req, res, next) => {
  const parser = new UAParser(req.headers["user-agent"]);
  const result = parser.getResult();

  req.deviceinfo = {
    browser: result.browser.name || "UNKNOWN",
    os: result.os.name || "UNKNOWN",
    devicetype: result.device.type || "desktop",
  };

  next();
};

export default deviceCheck;
