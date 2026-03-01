import { codegen } from "./codegen.js";
import resend from "../utils/resend.js";

/* ================= SET CODE ================= */
export const setcode = (user, minutes = 10) => {
  const code = codegen();

  user.emailVerificationCode = code;
  user.emailVerificationExpires = Date.now() + minutes * 60 * 1000;

  return code;
};

/* ================= SEND EMAIL ================= */
export const sendEmailcode = async (
  email,
  subject,
  code,
  min = 10
) => {
  if (!email || !subject || !code) {
    throw new Error("Email, subject, and code are required");
  }

  await resend.emails.send({
    from: "MyApp <onboarding@myapp.com>",
    to: [email],
    subject: subject, 
    html: `
      <div style="font-family:Arial,sans-serif">
        <h2>${subject}</h2>
        <h1 style="letter-spacing:3px">${code}</h1>
        <p>Expires in ${min} minutes</p>
      </div>
    `,
  });
};

/* ================= VERIFY CODE ================= */
export const verifycode = (user, code) => {
  return (
    user.emailVerificationCode === code &&
    user.emailVerificationExpires > Date.now()
  );
};
