const bcrypt = require("bcrypt");
const { supabase } = require("../superbaseClient");
const { hashPassword } = require("../utilities/passwordUtils");

const addUser = async (req, res) => {
  const { email, username, password } = req.body;

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      error:
        "Password must be at least 8 characters long and contain both letters and numbers.",
    });
  }

  const password_hash = await hashPassword(password);

  // Sätt in användaren i databasen
  const { user, error: signUpError } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (signUpError) {
    return res.status(400).json({ error: signUpError.message });
  }

  const { data, error: dbError } = await supabase
    .from("users")
    .insert([{ email, username, password_hash }]);

  console.log(data, error);

  if (dbError) {
    return res.status(400).json({ error: dbError.message });
  }

  res.status(200).json({ message: "User added successfully", data });
};

module.exports = addUser;
