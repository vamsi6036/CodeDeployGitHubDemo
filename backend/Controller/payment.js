const router = require("express").Router();

const Razorpay = require("razorpay"); // payment purpose testing package
const crypto = require("crypto"); // it is pre-installed package used for encryptng purpose

router.post("/orders", async (req, res) => { // processes the orders
	try {
		const instance = new Razorpay({
			key_id: process.env.KEY_ID,
			key_secret: process.env.KEY_SECRET,
		});

		const options = {
			amount: req.body.amount * 100,  // converting Paisa to Rupees
			currency: "INR",
			receipt: crypto.randomBytes(10).toString("hex"),
		};

		instance.orders.create(options, (error, order) => {
			if (error) {
				console.log(error);
				return res.status(500).json({ message: "Something Went Wrong!" });// if payment process disturbs...
			}
			res.status(200).json({ data: order });
		});
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error!" }); // overall disturbances if any..
		console.log(error);
	}
});

router.post("/verify", async (req, res) => { // verify the orders
	try {
		const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
		const sign = razorpay_order_id + "|" + razorpay_payment_id; // --->???
		const expectedSign = crypto
			.createHmac("sha256", process.env.KEY_SECRET) // these all are part of encrypting process, it follows sha256 code encryption method.
			.update(sign.toString()) // converts our sign to string format
			.digest("hex");

		if (razorpay_signature === expectedSign) {
			return res.status(200).json({ message: "Payment verified successfully" });
		} else {
			return res.status(400).json({ message: "Invalid signature sent!" });
		}
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error!" });
		console.log(error);
	}
});

module.exports = router;