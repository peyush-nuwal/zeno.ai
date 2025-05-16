import axios from 'axios'

const URL ="https://zeno-ai-d9eq.onrender.com"
const reviewCode= async(code)=>{
    const response= await axios.post(`${URL}/ai/get-review`,
       { code}
    )
    return response


}


export {reviewCode}