const { ValidationError } = require("../../helpers");
const { Orders } = require("../../models");
const { Basket } = require("../../models");
const axios = require("axios");
const nodemailer = require("nodemailer");

const createOrder = async (req, res, next) => {
  try {
    const fullData = { ...req.body };
    let basketOrder = [];
    fullData?.basket?.optionData.map((it) => {
      basketOrder.push({
        name: it.title,
        qty: it.quantity,
        sum: it.newPrice * 100,
        icon: it?.mainImage,
        unit: "од.",
        code: it?.options,
        header: "Quillis",
        footer: "Thank for the order",
        tax: [],
        uktzed: "string",
        discounts: [
          {
            type: "DISCOUNT",
            mode: "PERCENT",
            value: ((it.oldPrice - it.newPrice) / it.oldPrice) * 100,
          },
        ],
      });
    });

    let customOrder = {
      amount: fullData?.totalPayment * 100,
      ccy: 980,
      merchantPaymInfo: {
        reference: "84d0070ee4e44667b31371d8f8813947",
        destination: "ФОП Новосад О.С.",
        comment: "Придбання одягу",
        customerEmails: [],
        basketOrder: [...basketOrder],
      },
      redirectUrl: "https://quillis.vercel.app/user/orders?page=1&perPage=5",
      webHookUrl:
        "https://store-of-stylish-clothes-backend.vercel.app/api/payment",
      validity: 3600,
      paymentType: "debit",
      saveCardData: {
        saveCard: false,
      },
    };

    console.log(
      "process.env.EMAIL_SEND",
      process.env.EMAIL_SEND,
      process.env.EMAIL_PASSWORD
    );
    const transporter = nodemailer.createTransport({
      host: "smtp.ukr.net",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_SEND,
        pass: process.env.EMAIL_PASSWORD,
        login: "Quillis",
      },
    });

    const from = "Quillis Support  <vlad_np@ukr.net>";
    const to = "for_test_mern@ukr.net";

    transporter.sendMail(
      {
        from,
        to,
        subject: "New Order Quillis",
        html: `<h1>Hello</h1>
        <p>${fullData.totalPayment}</p>
        ${fullData.basket.optionData.map((it) => 
          {return (`
            <p>${it?.title}</p>
            <p>${it?.article}</p>
            <p>${it?.newPrice}</p>
            <p>${it?.currency}</p>
            <p>${it?.quantity}</p>
            <p>${it?.options}</p>
            `
          )}
        )}
        <p>${fullData?.deliveryOrder.delivery}</p>
        <p>${fullData?.deliveryOrder.cityDelivery}</p>
        <p>${fullData?.deliveryOrder.departmentDelivery}</p>
        <p>${fullData?.selectedPaymentOption}</p>
        <p>${fullData?.name}</p>
        <p>${fullData?.phone}</p>
        <p>${fullData?.email}</p>   
        <p>Your Quillis Service Support</p>`,
      },
      (err, data) => {
        if (err) {
          console.error("Error sending:", err);
        } else {
          console.log("Letter sent");
        }
      }
    );

    const _id = fullData.basket._id;
    await Basket.deleteMany({ _id });
    const resCreate = await Orders.create(fullData);
    if (resCreate.selectedPaymentOption === "Payment by bank card") {
      await axios
        .post(
          `https://api.monobank.ua/api/merchant/invoice/create`,
          customOrder,
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "X-Token": process.env.X_TOKEN,
            },
          }
        )
        .then(function (response) {
          Orders.findOneAndUpdate(
            { _id: resCreate._id },
            { invoiceId: response.data.invoiceId }
          );
          return res.status(201).json(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    return res.status(201).json(resCreate);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};

module.exports = createOrder;
