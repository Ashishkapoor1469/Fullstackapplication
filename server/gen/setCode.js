import gen from "./codegen";

export const setcode = (user, minutes = 10) => {
  const code = gen();
  user.emailVerificationCode = code;
  user.emailVerificationExpires = Date.now() + minutes * 60 * 1000;
  return code;
};

export const sendEmailcode = async (email, sub, code, min) => {
  await resend.emails.send({
    from: "MyApp <onboarding@resend.dev>",
    to: email,
    subject,
    html: `
      <h2>${subject}</h2>
      <h1>${code}</h1>
      <p>Expires in ${minutes} minutes</p>
    `,
  });
};

export const verifycode = (user, code) => {
  return (
    user.emailVerificationCode === code &&
    user.emailVerificationExpires > Date.now()
  );
};
