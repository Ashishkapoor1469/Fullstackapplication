import uaParser from "ua-parser-js";

const deviceCheck = (req, res, next) => {
  const parser = new uaParser(req.headers["user-agent"]);
  const res = parser.getResult();

  req.deviceinfo = {
    browser: res.browser.name || "UNKNOWN",
    os: res.os.name || "UNKNPWN",
    devicetype: res.device.type || "desktop",
  };
  next();
};

export default deviceCheck;
