import Conversation from "../models/conversation.model.js"
import Messege from "../models/messege.model.js"

const sendMessege = async (req, res) => {
  try {
    const { messege } = req.body
    const { id: receiverId } = req.params
    const senderId = req.User._id

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] }
    })

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId]
      })
    }

    const newMessege = new Messege({
      senderId,
      receiverId,
      messege,
    })

    if (newMessege) {
      conversation.messeges.push(newMessege)
    }

// Socket.io functionality will go here in the future

    // 2 promises in series so it will be slower
    // await newMessege.save()
    // await conversation.save()

    // 2 promises in parallel so it will be faster
    await Promise.all([newMessege.save(), conversation.save()])

    res.status(200).json({ newMessege });

  } catch (error) {
    console.log("Error in sendMessege controller:", error.messege)
    res.status(500).json({ error: "Internal server error" })

  }
}

export { sendMessege };