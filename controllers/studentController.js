// sign up handler
export const signup = async (req, res) => {
  try {
    //this is where the logic code will go
    console.log("request has been received"); // for debugging
    console.log(req.body);
    res.send("Student sign UP endpoint reached");
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

// sign in handler
export const signin = async (req, res) => {
  try {
    //this is where the logic code will go
    console.log("request has been received"); // for debugging
    res.send("Student sign IN endpoint reached");
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};
