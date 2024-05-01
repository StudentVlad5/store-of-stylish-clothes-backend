const { ValidationError } = require("../../helpers");
const { Orders } = require("../../models");
const { Basket } = require("../../models");
const axios = require("axios");
const nodemailer = require("nodemailer");

const createOrder = async (req, res, next) => {
  try {
    const fullData = { ...req.body };
    let servicePayment;
    if (
      (fullData.currency === "$" || fullData.currency === "€") &&
      fullData.country === "Ukraine"
    ) {
      servicePayment = 2;
    } else if (fullData.currency === "₴" && fullData.country === "Ukraine") {
      servicePayment = 70;
    } else if (fullData.currency === "₴" && fullData.country !== "Ukraine") {
      servicePayment = 1000;
    } else {
      servicePayment = 25;
    }
    let basketOrder = [];
    fullData?.basket?.optionData.map((it) => {
      basketOrder.push({
        name: it.title,
        qty: it.quantity,
        sum: Math.round(it.newPrice * 100, 2),
        icon: it?.mainImage,
        unit: "од.",
        code: it?.options,
        header: "Quillis",
        footer: "Thank for the order",
        tax: [],
        uktzed: "",
        discounts: [
          {
            type: "DISCOUNT",
            mode: "PERCENT",
            value: Math.round(
              ((it.oldPrice - it.newPrice) / it.oldPrice) * 100,
              2
            ),
          },
        ],
      });
    });

    basketOrder.push({
      name: "Delivery service",
      qty: 1,
      sum: Math.round(servicePayment * 100, 2),
      icon: "",
      unit: "",
      code: "",
      header: "Quillis",
      footer: "Thank for the order",
      tax: [],
      uktzed: "",
    });

    let customOrder = {
      amount: Math.round((fullData?.totalPayment + servicePayment) * 100, 2),
      ccy:
        fullData?.currency === "$"
          ? 840
          : fullData?.currency === "€"
          ? 978
          : 980,
      merchantPaymInfo: {
        reference: "84d0070ee4e44667b31371d8f8813947",
        destination: "ФОП Новосад О.С.",
        comment: `Оплата за замовлення ${fullData?.basket?.optionData._id}без ПДВ.`,
        customerEmails: [],
        basketOrder: [...basketOrder],
      },
      redirectUrl: "https://quillis.shop/user/orders?page=1&perPage=5",
      webHookUrl:
        "https://store-of-stylish-clothes-backend.vercel.app/api/payment",
      validity: 3600,
      paymentType: "debit",
      saveCardData: {
        saveCard: false,
      },
    };

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_SEND,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const from = "Quillis Support  <quillis.info@gmail.com>";
    const to = "for_test_mern@ukr.net, quillis.info@gmail.com";
    const toUser = `${fullData?.email}`;
    const deliveryType = fullData?.deliveryOrder.delivery === 'NovaPoshta' ? 'Нова Пошта' : fullData?.deliveryOrder.delivery === 'UkrPoshta' ? 'УкрПошта' : 'Доставка за адресою';
    const paymentType = fullData?.selectedPaymentOption === "Payment by bank card" ? "Оплата карткою Visa|Mastercard, Google Pay, Apple Pay" : "Оплата при отримані";
    transporter.sendMail(
      {
        from,
        to,
        subject: "New Order Quillis",
        html: `<h1>Вітаю, в магазині оформлено замовлення</h1>
        <p>Сума оплати : ${fullData.totalPayment}</p>
        ${fullData.basket.optionData.map((it) => {
          return `
            <p>Замовлено товар: ${it?.title}</p>
            <p>Код товару: ${it?.article}</p>
            <p>Ціна 1 шт:  ${it?.newPrice}</p>
            <p>Валюта: ${it?.currency}</p>
            <p>Кількість: ${it?.quantity}</p>
            <p>Розміри або додаткові умови:  ${it?.options}</p>
            `;
        })}
        <p>Доставку замовлено від: ${fullData?.deliveryOrder.delivery}</p>
        <p>У населений пункт:  ${fullData?.deliveryOrder.cityDelivery}</p>
        <p>У відділення:  ${fullData?.deliveryOrder.departmentDelivery}</p>
        <p>Метод оплати:  ${fullData?.selectedPaymentOption}</p>
        <p>Замовник: ${fullData?.name}</p>
        <p>Телефон замовника:  ${fullData?.phone}</p>
        <p>Пошта замовника:  ${fullData?.email}</p>   
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

    transporter.sendMail(
      {
        from,
        to: toUser,
        subject: "New Order Quillis - store of stylish clothes and shoes",
        html: `<h1>Вітаємо</h1>, 
        <h3>Дякую за оформлення замовлення в магазині Quillis</h3>
        ${fullData.basket.optionData.map((it) => {
          return `
            <p>Замовлено товар: ${it?.title}</p>
            <p>Код товару: ${it?.article}</p>
            <p>За ціною  ${it?.newPrice} ${it?.currency}</p>
            <p><img src=${it?.mainImage} style="width:250px; height:250px"/></p>
            <p>Кількість: ${it?.quantity}</p>
            <p>Розміри & додаткові умови:  ${it?.options}</p>
            `;
        })}
        <p>Доставку замовлено від: ${deliveryType}</p>
        <p>У населений пункт:  ${fullData?.deliveryOrder.cityDelivery} ${
          fullData?.deliveryOrder.departmentDelivery
        }</p>
        <p>Метод оплати:  ${paymentType}</p>
        <p>Ми вже працюємо над пакуванням замовлення.</p>
        <p>З вдячніст'ю, служба підтримки  Quillis Service</p>
        <br/>
        <br/>
        <h1>Hello</h1>, 
        <h3>Thank you for an order at the Quillis store</h3>
        ${fullData.basket.optionData.map((it) => {
          return `
            <p>Ordered goods: ${it?.title}</p>
            <p>Product code: ${it?.article}</p>
            <p>For the price  ${it?.newPrice} ${it?.currency}</p>
            <p><img src=${it?.mainImage} style="width:250px; height:250px"/></p>
            <p>The amount: ${it?.quantity}</p>
            <p>Sizes or additional conditions:  ${it?.options}</p>
            `;
        })}
        <p>Delivery ordered from: ${fullData?.deliveryOrder.delivery}</p>
        <p>To the settlement:  ${fullData?.deliveryOrder.cityDelivery} ${
          fullData?.deliveryOrder.departmentDelivery
        }</p>
        <p>Payment method:  ${fullData?.selectedPaymentOption}</p>
        <p>We are already working on packing the order.</p>
        <p>Sincerely, Quillis Service Support</p>`,
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

    if (fullData.selectedPaymentOption === "Payment by bank card") {
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
          fullData.invoiceId = response.data.invoiceId;
          fullData.pageUrl = response.data.pageUrl;
          Orders.create(fullData);
          return res.status(201).json(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      const resCreate = await Orders.create(fullData);
      return res.status(201).json(resCreate);
    }
  } catch (err) {
    throw new ValidationError(err.message);
  }
};

module.exports = createOrder;
