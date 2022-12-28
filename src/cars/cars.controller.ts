import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Patch,
	Post,
} from "@nestjs/common";
import { CarsService } from "./cars.service";

@Controller("cars")
export class CarsController {
	constructor(private readonly carsService: CarsService) {}
	@Get()
	getAllCars() {
		const cars = this.carsService.findAll();
		return { success: true, method: "GET", count: cars.length, data: cars };
	}

	@Get(":id")
	getCarById(@Param("id", ParseIntPipe) id: number) {
		const car = this.carsService.findOneById(id);
		return { success: true, method: "GET", data: car };
	}

	@Post()
	createCar(@Body() body) {
		return {
			success: true,
			method: "POST",
			data: body,
		};
	}

	@Patch(":id")
	updateCar(@Param("id", ParseIntPipe) id: number, @Body() body) {
		return {
			success: true,
			method: "PATCH",
			data: body,
		};
	}

	@Delete(":id")
	deleteCar(@Param("id", ParseIntPipe) id: number) {
		return {
			success: true,
			method: "DELETE",
			data: {},
		};
	}
}
