import jwt from "jsonwebtoken";

export const sendCookie = (user, res, message, statuscode = 200) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWt_SECRETE); //generate random user_id

  res
    .status(201)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000, //cookies timeout time
      sameSite: (process.env.NODE_ENV = "Development" ? "lex" : "none"),
      secure: (process.env.NODE_ENV = "Development" ? false : true),
    })
    .json({
      success: true,
      message: "Registed successfully", //if your registereed succeesfully
    });
};
