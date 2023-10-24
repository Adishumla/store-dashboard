// pages/api/auth-check.js
import payload from "payload";

const authCheck = async (req, res) => {
  await payload.init({
    secret: "PAYLOAD_SECRET",
  });

  // If your user collection slug is 'users', update as follows:
  payload.authenticate("users")(req, res, (err) => {
    if (err) {
      return res.status(401).send("Not authenticated");
    }
    // If authenticated
    res.status(200).send("Authenticated");
  });
};

export default authCheck;
