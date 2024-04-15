"use strict";

interface ApiResponse {
  success: string;
  message: string;
  data?: any;
}

export default function sendApiResult(success: any, message: string, data: any = {}): ApiResponse {
  const responseData: ApiResponse = {
    success: success,
    message: message,
    data: data,
  };
  return responseData;
}