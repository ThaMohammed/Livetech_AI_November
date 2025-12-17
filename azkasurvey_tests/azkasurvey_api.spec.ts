import {expect, request, test} from "@playwright/test"
import fs from "fs"
import { createPayload } from "../payloads/azkapayload"

test('verify that user can post the payload',async({request})=>{
    let credentials={
        email:"test@azkasurvey.com",
        password:"kAYd3sjx"
    }
   let outToken=await request.post("http://azkasurvey.com/api/login",{data:credentials})
   let outJson=await outToken.json()
   console.log(outJson)
   let token=outJson.token
   //Json.key
   console.log(token)

//    let payload=[
// {"user_id":"31","is_submit":null,"name":"LiveTech","gender":"male","address":"Ameerpet","state":"TG","phone":"9000066611","town":null,"mla":null,"mandal":null,"mp":null,"religion":null,"age":null,"caste":null,"ward":null,"familymember":null,"children":null,"earningmembers":null,"females":null,"occupation":null,"totalmale":null,"totalearner":null,"totaldebt":null,"savingpermonth":null,"interestrate":null,"sourcedebt":null,"streetroad":null,"tvroads":null,"districtroads":null,"transportation":null,"hospitals":null,"schoolfacility":null,"facilityandavailability":null,"votefor":null,"created_at":"2024-03-21 18:16:41","updated_at":"2024-03-21 18:16:41"}
// ]
let payload=await fs.readFileSync("./payloads/azka_post_payload.json")
let postResponse=await request.post("http://azkasurvey.com/api/upload/json",{data:payload,headers:{Authorization:'Bearer '+token}})
let postJson=await postResponse.json()
console.log(postJson)
expect(postJson.message).toEqual("JSON data uploaded successfully")
})

test('verify that user can post the payload with random values',async({request})=>{
    let credentials={
        email:"test@azkasurvey.com",
        password:"kAYd3sjx"
    }
   let outToken=await request.post("http://azkasurvey.com/api/login",{data:credentials})
   let outJson=await outToken.json()
   console.log(outJson)
   let token=outJson.token
   //Json.key
   console.log(token)

//    let payload=[
// {"user_id":"31","is_submit":null,"name":"LiveTech","gender":"male","address":"Ameerpet","state":"TG","phone":"9000066611","town":null,"mla":null,"mandal":null,"mp":null,"religion":null,"age":null,"caste":null,"ward":null,"familymember":null,"children":null,"earningmembers":null,"females":null,"occupation":null,"totalmale":null,"totalearner":null,"totaldebt":null,"savingpermonth":null,"interestrate":null,"sourcedebt":null,"streetroad":null,"tvroads":null,"districtroads":null,"transportation":null,"hospitals":null,"schoolfacility":null,"facilityandavailability":null,"votefor":null,"created_at":"2024-03-21 18:16:41","updated_at":"2024-03-21 18:16:41"}
// ]
let payload=await createPayload()
let postResponse=await request.post("http://azkasurvey.com/api/upload/json",{data:payload,headers:{Authorization:'Bearer '+token}})
let postJson=await postResponse.json()
console.log(postJson)
expect(postJson.message).toEqual("JSON data uploaded successfully")
})