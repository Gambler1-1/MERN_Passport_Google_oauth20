const router = require("express").Router();
const passport = require("passport");
const bcrypt = require('bcryptjs');
const User = require('../models/user')
const express = require('express')
const app = express();
app.use(express.json());


router.get("/login/success", (req, res) => {
	if (req.user) {



		res.status(200).json({
			error: false,
			message: "Successfully Loged In",
			user: req.user,
		});
	} else {
		res.status(403).json({ error: true, message: "Not Authorized" });
	}
});

router.get("/login/failed", (req, res) => {
	res.status(401).json({
		error: true,
		message: "Log in failure",
	});
});

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get(
	"/google/callback",
	passport.authenticate("google", {
		successRedirect: process.env.CLIENT_URL,
		failureRedirect: "/login/failed",
	})
);

///////////////////////////////////////////////////////////////

router.post('/post-login', passport.authenticate('local',{
    failureRedirect: './login',
    successRedirect: '/',
    successFlash: 'Succesfully Logged !',
    failureFlash: 'Invalid username or password.'
}))
///////////////////////////////////////////////////////////////////
router.post('/post-signup', (req, res) => {
	console.log(req)
    
})

// 	const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     console.log(errors.array())
//     return res.status(422).render('signup', {
//       errorMessage: errors.array()[0].msg,
//       oldInput: {
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password,
//         confirmPassword: req.body.confirmPassword,
//         phoneNum: req.body.phoneNum
//       }
//     })
//   }
//   const user = await User.findOne({ email: req.body.email })
//   if (!user) {

//     try {
//       var hash = await bcrypt.hash(req.body.password, 12)
//       var hashedPassword = hash
//     }
//     catch (err) {
//       console.log(err)
//     }
//     const user = new User({
//       name: req.body.name,
//       email: req.body.email,
//       password: hashedPassword,
//       phoneNum: req.body.phoneNum
//     });
//     user.save();
//     console.log('User Signed Up')
//     res.redirect('./login')
//   }
// if (user) {
//     req.flash('error', 'User Already Exist with this Email.')
//     console.log('User Already Exist with this Email')
//     res.redirect('./signup')
//   }

// })
 
////////////////////////////////////////////////////////////////////
router.get("/logout", (req, res) => {
	req.logout();
	res.redirect(process.env.CLIENT_URL);
});

module.exports = router;
