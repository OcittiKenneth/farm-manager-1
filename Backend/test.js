// const usePasswordHashToMakeToken = ({
//   password: passwordHash,
//   id: userId,
//   createdAt
// }) => {
//   const secret = passwordHash + "-" + createdAt
//   const token = jwt.sign({ userId }, secret, {
//     expiresIn: 3600
//   })
//   return token
// }

// const sendPasswordResetEmail = async (req, res) => {
//   const { email } = req.params
//   let user;
//   try {
//     user = await User.findOne({ email }).exec()
//   } catch (err) {
//     res.status(404).json("No user with that email");
//   }
//   const token = usePasswordHashToMakeToken(user);
//   const url = getPasswordResetURL(user, token);
//   const emailTemplate = resetPasswordTemplate(user, url);

//   const sendEmail = () => {
//     transporter.sendEmail(emailTemplate, (err, info) => {
//       if (err) {
//         res.status(500).json("Error sending email");
//       }
//       console.log(`** Email sent **`, info.res);
//     })
//   }
//   sendEmail();
// }

// const receiveNewPassword = (req, res) => {
//     const { userId, token } = req.params
//     const { password } = req.body

//     User.findOne({ id: userId })

//       .then(user => {
//         const secret = user.password + "-" + user.createdAt
//         const payload = jwt.decode(token, secret)
//         if (payload.userId === user.id) {
//           bcrypt.genSalt(10, (err, salt) => {
//             if (err) return
//             bcrypt.hash(password, salt, (err, hash) => {
//               if (err) return
//               User.findOneAndUpadte({ id: userId }, { password: hash })
//                 .then(() => res.status(202).json("Password changed accepted"))
//                 .catch(ere => res.status(500).json(err));
//             })
//           })
//         }
//       })
//       .catch(() => {
//         res.status(404).json("Invalid user");
//       })
//   }