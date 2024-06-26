import User from "@/models/user.models";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "d435d26f63d03b", // ❌ 🔥
        pass: "64eea3d9831444", // ❌
      },
    });

    const mailOptions = {
      from: "shiv2gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: ` "<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to $ {emailType === "VERIFY" ? "verify your email" : "reset your password"} or copy and paste the link below in your browser. <br>${process.env.DOMAIN}/verifyemail?token=${hashedToken} </p>"`,
    };
    const mailrespnse = await transport.sendMail(mailOptions);
    return mailrespnse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
