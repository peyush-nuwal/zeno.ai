import axios from 'axios'

const URL="http://localhost:3000"
const reviewCode= async(code)=>{
    const response= await axios.post(`${URL}/ai/get-review`,
       { code}
    )
    return response


}


export {reviewCode}