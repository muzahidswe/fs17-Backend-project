import { NextFunction, Request, Response } from "express";

import ordersService from "../services/orders";
import Order from "../models/Order";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from "../errors/ApiError";
import mongoose from "mongoose";

// Todo: Get all orders by Admin
export async function getAllOrders(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const orders = await ordersService.getAllOrders();
    response.status(200).json(orders);
  } catch (error) {
    next(new InternalServerError());
  }
}

// export async function getAllOrders(
//   request: Request,
//   response: Response,
//   next: NextFunction
// ) {
//   try {
//     const page = Number(request.query?.page) || 1;
//     const limit = Number(request.query?.limit) || 8;
//     const search = request.query?.search as string;
//     const minPrice = Number(request.query?.minPrice) || 0;
//     const maxPrice = Number(request.query?.maxPrice) || 1000;
//     const skip = (page - 1) * limit;

//     const { orders, count } = await ordersService.getAllOrders(
//       limit,
//       skip,
//       search,
//       minPrice,
//       maxPrice
//     );
//     response.status(200).json({ orders, totalCount: count });
//   } catch (error) {
//     next(new InternalServerError());
//   }
// }

// Todo: Create a new order by user
export async function createOrder(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const userId = request.params.userId;
    if (!userId) {
      throw new NotFoundError("Missing userId!");
    }
    const data = new Order(request.body);
    const newOrder = await ordersService.createOrder(data, userId);

    response.status(201).json(newOrder);
  } catch (error) {
    if (error instanceof BadRequestError) {
      response.status(400).json({
        message: `Missing order information or userId!`,
      });
      return;
    } else if (error instanceof mongoose.Error.CastError) {
      response.status(404).json({
        message: "Wrong user id format",
      });
    }
    console.log(error);
    next(new InternalServerError());
  }
}

// Todo: Get a single order by Admin
export async function getOrderById(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const foundOrder = await ordersService.getOrderById(request.params.orderId);
    response.status(200).json(foundOrder);
  } catch (error) {
    if (error instanceof NotFoundError) {
      response.status(404).json({
        message: `Cant find order with id ${request.params.orderId}`,
      });
    } else if (error instanceof mongoose.Error.CastError) {
      response.status(404).json({
        message: "Wrong id format",
      });
      return;
    } else if (error instanceof BadRequestError) {
      response.status(400).json({
        message: `Missing orderId`,
      });
    }

    next(new InternalServerError());
  }
}

export async function updateOrder(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const orderId = request.params.id;
    const newData = new Order(request.body);
    await ordersService.updateOrder(orderId, newData);
    response.sendStatus(204);
  } catch (error) {
    if (error instanceof NotFoundError) {
      response.status(404).json({
        message: `Cant find order with id ${request.params.orderId}`,
      });
    } else if (error instanceof mongoose.Error.CastError) {
      response.status(404).json({
        message: "Wrong id format",
      });
      return;
    } else if (error instanceof BadRequestError) {
      response.status(400).json({
        message: `Missing  update information or orderId`,
      });
    }

    next(new InternalServerError());
  }
}

export async function deleteOrder(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const orderId = request.params.id;
    await ordersService.deleteOrderById(orderId);

    response.sendStatus(204);
  } catch (error) {
    if (error instanceof NotFoundError) {
      response.status(404).json({
        message: `Cant find order with id ${request.params.orderId}`,
      });
      return;
    } else if (error instanceof mongoose.Error.CastError) {
      response.status(404).json({
        message: "Wrong id format",
      });
      return;
    } else if (error instanceof BadRequestError) {
      response.status(400).json({
        message: `Missing orderId`,
      });
      return;
    }

    next(new InternalServerError());
  }
}

export async function getAllOrdersByUserId(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const userId = request.params.userId;
    const orders = await ordersService.getAllOrdersByUserId(userId);
    console.log(orders);

    response.status(200).json(orders);
  } catch (error) {
    if (error instanceof NotFoundError) {
      response.status(404).json({
        message: `Can not find orders with userId: ${request.params.userId}`,
      });
      return;
    } else if (error instanceof mongoose.Error.CastError) {
      response.status(404).json({
        message: "Wrong id format",
      });
      return;
    } else if (error instanceof BadRequestError) {
      response.status(400).json({
        message: `Missing orderId`,
      });
      return;
    }

    next(new InternalServerError());
  }
}
