const { supabase } = require("../superbaseClient");

const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("Received username:", email);

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password: password,
  });

  if (error || !data) {
    console.error("Error during login:", error);
    return res.status(400).json({ error: "Invalid email or password" });
  }

  const token = jwt.sign({ userId: data.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.status(200).json({ message: "Login successfull", token });
};

module.exports = loginUser;
