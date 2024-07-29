// src/helpers/getDataFromToken.ts
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
  try {
    // Extract token from cookies
    const token = request.cookies.get("token")?.value || "";
    // Verify and decode the token
    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    // Return the user ID from decoded token
    return decodedToken.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
