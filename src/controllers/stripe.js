require("dotenv").config();
const { SECRET_KEY, URL_PROTECTED } = process.env;
const stripe = require("stripe")(SECRET_KEY);

// /checkout-stripe
const checkoutStripe = async (req, res) => {
  const data = req.body; // 1 -establecemos el producto

  console.log(`${URL_PROTECTED}/payments`);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [data],
    mode: "payment",
    success_url: `${URL_PROTECTED}/payments/success`,
    cancel_url: `${URL_PROTECTED}/payments/fail`,
  });


  res.json({ id: session.id, stripe: session });
};

const getcheckout = (req, res) => {
  return res.send("hola");
};

module.exports = { checkoutStripe, getcheckout };
