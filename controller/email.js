import emailSchema from "../models/emailSchema.js";
import { mailer } from "./mailer.js";

export const email = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res
        .status(400)
        .send({ message: "Please fill all the required Details" });
    }
    const result = await emailSchema.create({
      email,
    });
    await mailer({ email, type: "email", subject: "New Subscriber" });
    return res.status(201).send({
      message: "Subscribed Successfully",
    });
  } catch (err) {
    return res.status(500).send({ message: "Server Error" });
  }
};
