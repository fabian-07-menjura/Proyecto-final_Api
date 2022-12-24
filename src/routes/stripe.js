const { Router } = require("express");
const { checkoutStripe, getcheckout } = require("../controllers/stripe");

const router = Router();

// /api/stripe/
router.post("/checkout-stripe", checkoutStripe);
router.get("/checkout", getcheckout);

module.exports = router;
