const Enquiry = require("../models/enquiryModel");
const Factory = require("../utils/handlerFactory");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const sendEmail = require("../utils/email");

//1) CREATE PROJECT API
exports.createEnquirey = Factory.createOne(Enquiry);
exports.sendEnquries = catchAsync(async (req, res, next) => {
  const { userName, userEmail, userNumber, enquryPath, userMessage } = req.body;

  const data = await Enquiry.create(req.body);

  const sendResutl = await sendEmail({
    email: "test@gmail.com",
    subject: "New Enquire",
    message: `
      Name : ${userName},
      Email : ${userEmail},
      Number : ${userNumber},
      Message : ${userMessage},
      enquryPath : ${enquryPath}
      `,
  });

  res.status(201).json({
    status: "success",
    message: "Enqurey sent",
  });
});

exports.getAllEnquirey = Factory.getAll(Enquiry);
exports.deleteEnquirey = Factory.deleteOneByBody(Enquiry);
