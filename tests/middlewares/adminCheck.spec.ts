import { NextFunction, Request, Response } from "express";

import adminCheck from "../../src/middlewares/adminCheck";
import { UserDocument } from "../../src/models/User";

const mockNextFunction = jest.fn();

describe("adminCheck middleware", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnValue("You do not have permission."),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call next() if user is an admin", () => {
    mockRequest.user = { role: "ADMIN" } as UserDocument;
    adminCheck(
      mockRequest as Request,
      mockResponse as Response,
      mockNextFunction
    );
    expect(mockNextFunction).toHaveBeenCalled();
    expect(mockResponse.status).not.toHaveBeenCalled();
  });
});