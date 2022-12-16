import dotenv from "dotenv";
dotenv.config({path:'./.env'})
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";


const registerUser = asyncHandler(async (req, res) => {
		const { name, email, password } = req.body;
		console.log( { name, email, password })
	const userExists = await User.findOne({ where: { email } });

	if (userExists)
		return res.status(400).json({
			sucess: false,
			message: "User already exists!",
		});

	const user = await User.create({
		name,
		email,
		password,
	});

	if (user)
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		});
	else
		return res.status(400).json({
			sucess: false,
			message: "Invaid data!",
		});
});

const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		});
	} else {
		res.status(401).json({
			success: false,
			message: "Invalid email or password",
		});
	}
});


const getAllUsers = asyncHandler(async (req, res) => {
	const courses = await User.findAll();
	if (courses)
		return res.status(200).json({
			success: true,
			message: "Data fetched sucesfully.",
			courses,
		});
	else
		return res.status(404).json({
			success: false,
			message: "Data is empty!.",
		});
});

const getUserById = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const user = await User.findByPk(id);
	if (user)
		return res.status(200).json({
			success: true,
			message: "User fetched sucesfully.",
			user,
		});
	else
		return res.status(404).json({
			success: false,
			message: "User not found!.",
		});
});

const modifyUser = asyncHandler(async (req, res) => {
		const { id } = req.params;
		const { name, email, password } = req.body;
		const user = await User.findOne({ where: { id } });

		const f = await user.update({
				name: name || user.name,
				email: email || user.email,
				password: password || user.password,
		});
		console.log({ f })

		return res.status(201).json({
				sucess: true,
				message: "Course updated sucessfully.",
		});
})
		
const deleteUser = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const fd = await User.destroy({
	where: { id },
	})
		console.log({fd})
return res.status(201).json({
		sucess: true,
		message: "Course has been found and delested sucessfully.",
});
	
});

export { registerUser, authUser, modifyUser, deleteUser, getAllUsers, getUserById };