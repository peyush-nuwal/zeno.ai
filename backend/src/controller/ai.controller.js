import { generateAIResponse } from "../services/ai.service.js"


const getReview = async (req, res) => {
    const { code } = req.body
    if (!code) {
        return res.status(400).json({ error: "code is required" })
    }
    
    const response = await generateAIResponse(code)
    if (!response) {
        return res.status(500).json({ error: "Failed to generate response" })
    }
    res.send(response)

}



export default getReview;