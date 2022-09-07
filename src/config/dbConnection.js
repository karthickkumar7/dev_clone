const { connect } = require("mongoose");

module.exports = async () => {
  try {
    await connect(process.env.MONGO);
  } catch (err) {
    console.log(err);
  }
};
