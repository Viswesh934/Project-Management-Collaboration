var Conversation = require("../Models/Conversation");
var Message = require("../Models/Message");
const jwt = require("jsonwebtoken");
var socketFunctions = require("../socket/socket.js");
var getReceiverSocketId = socketFunctions.getReceiverSocketId;
var io = socketFunctions.io;

const sendMessage = async function(req, res) {
	try {
		console.log(req.body);
		console.log('hi');
		var message = req.body.message;
		var receiverId = req.params.id;
		var token = req.body.jwt;
		var senderId = jwt.verify(token, 'jab').id;
		console.log(senderId,'hi');

		var conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] }
		});

		if (!conversation) {
			conversation = new Conversation({
				participants: [senderId, receiverId]
			});
		}

		var newMessage = new Message({
			senderId: senderId,
			receiverId: receiverId,
			message: message
		});

		if (newMessage) {
			conversation.messages.push(newMessage._id);
		}

		await Promise.all([conversation.save(), newMessage.save()]);

		var receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

		res.status(201).json(newMessage);
	} catch (error) {
		console.log("Error in sendMessage controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

const getMessages = async function(req, res) {
	try {
		var userToChatId = req.params.id;
		var token = req.body.jwt;
		var senderId = jwt.verify(token, 'jab').id;
		console.log(senderId,'hello');

		var conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] }
		}).populate("messages");
        console.log(conversation,'back');

		if (!conversation) return res.status(200).json([]);

		var messages = conversation.messages;
		res.status(200).json(messages);
	} catch (error) {
		console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

module.exports = {
    sendMessage,
    getMessages
}