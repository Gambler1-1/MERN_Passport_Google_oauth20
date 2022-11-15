import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import React,{ useState } from "react";
import axios from 'axios';

function Signup() {
	const [username, setUsername] = useState('');
	const [useremail, setUseremail] = useState('');
	const [userpassword, setUserpassword] = useState('');
	  
	      const handleusername = (event)=>{
			const user_name = event.target.value;
			console.log(user_name);
			setUsername(user_name);
		  }
		  const handleuseremail = (event)=>{
			const user_email = event.target.value;
			console.log(user_email);
			setUseremail(user_email);
		  }
		  const handleuserpassword = (event)=>{
			const user_password = event.target.value;
			console.log(user_password);
			setUserpassword(user_password);
		  }

		  const submitUser = async (e)=>{
			e.preventDefault();
			console.log("USER SUMITTTTTTTTTTTTTTTTEED")
			const userData = {username:username , email:useremail , password:userpassword}
			console.log(userData);
			

			let res =await axios.post('http://localhost:8080/auth/post-signup', {...userData})
			.then((res) => {
				console.log(res)
			})
			.catch(err => {
				console.log(err)
			})


			// axios({
			// 	method: 'post',
			// 	url: 'http://localhost:8080/auth/post-signup',
			// 	headers: {'Content-Type' : 'application/json'},
			// 	body: {username , useremail, userpassword},
			// })
			// .then((res) => {
			// 	console.log(res)
			// })
			// .catch(err => {
			// 	console.log(err)
			// })


			// const res = await fetch('http://localhost:8080/auth/post-signup',{
			// 	method: "POST",
			// 	headers: {
			// 	   "content-type" : "application/json"
			// 	},
			// 	body: JSON.stringify(userData)
			// })
			

		  }


	const googleAuth = () => {
		window.open(
			`${process.env.REACT_APP_API_URL}/auth/google/callback`,
			"_self"
		);
	};
	return (
		<div className={styles.container}>
			<h1 className={styles.heading}>Sign up Form</h1>
			<div className={styles.form_container}>
				<div className={styles.left}>
					<img className={styles.img} src="./images/signup.jpg" alt="signup" />
				</div>
				<div className={styles.right}>
					<h2 className={styles.from_heading}>Create Account</h2>
					<input type="text" name="user_name" className={styles.input} placeholder="Username" onChange={ (e)=> handleusername(e) } />
					<input type="text" name="user_email" className={styles.input} placeholder="Email" onChange={ (e)=> handleuseremail(e) } />
					<input
						type="password"
						name="user_password"
						className={styles.input}
						placeholder="Password"
						onChange={ (e)=> handleuserpassword(e) }
					/>
					<button className={styles.btn} type="submit" onClick={submitUser}> Sign Up</button>
					<p className={styles.text}>or</p>
					<button className={styles.google_btn} onClick={googleAuth}>
						<img src="./images/google.png" alt="google icon" />
						<span>Sing up with Google</span>
					</button>
					<p className={styles.text}>
						Already Have Account ? <Link to="/login">Log In</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

export default Signup;
