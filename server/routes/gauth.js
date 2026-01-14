import passport from "passport";

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = req.user.generateToken();
    res.redirect(`${process.env.CLIENT_URL}/oauth-success?token=${token}`);
  }
);
