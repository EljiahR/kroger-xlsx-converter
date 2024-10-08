'use server'
// DELETE method
import "dotenv/config";
import mongoose from "mongoose";
const db = process.env.MONGO_DB;

const employeeSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  birthday: String,
  break_preference: Number,
  first_name_preference: String,
  lunch_override: Boolean,
  position_override: String,
  bathroom_order: Number,
  call_up: Boolean,
});

let EmployeeModel;

const DELETE = async (req, { params }) => {
  const requestMethod = req.method;
  const storeNumber = params.storeNumber
  
  if (mongoose.models[storeNumber]) {
    EmployeeModel = mongoose.model(storeNumber);
  } else {
    EmployeeModel = mongoose.model(storeNumber, employeeSchema);
  }
  
  if (requestMethod !== "DELETE") {
    Respond.json({ result: "wrong method" });
  } else {
    const data = await req.json();
    const idToDelete = data.id;
    const result = await EmployeeModel.findByIdAndDelete(idToDelete);

    return Response.json({ result: "delete successful" });
  }
};

export { DELETE };
