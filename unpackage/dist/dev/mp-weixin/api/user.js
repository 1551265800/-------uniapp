"use strict";
const utils_request = require("../utils/request.js");
function submitInquiry(data) {
  return utils_request.request({
    url: "/api/inquiry/submit",
    method: "POST",
    data
  });
}
exports.submitInquiry = submitInquiry;
