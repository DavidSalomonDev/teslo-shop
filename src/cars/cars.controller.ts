import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	ParseUUIDPipe,
	Patch,
	Post,
} from "@nestjs/common";
import { CarsService } from "./cars.service";
import { CreateCarDto, UpdateCarDto } from "./dtos";

@Controller("cars")
export class CarsController {
	constructor(private readonly carsService: CarsService) {}
	@Get()
	getAllCars() {
		const cars = this.carsService.findAll();
		return {
			status: "success",
			method: "GET",
			count: cars.length,
			data: { cars },
		};
	}

	@Get(":id")
	getCarById(@Param("id", ParseUUIDPipe) id: string) {
		const car = this.carsService.findOneById(id);
		return { status: "success", method: "GET", data: { car } };
	}

	@Post()
	createCar(@Body() createCarDto: CreateCarDto) {
		const car = this.carsService.create(createCarDto);
		return {
			status: "success",
			method: "POST",
			data: { car },
		};
	}

	@Patch(":id")
	updateCar(@Param("id") id: string, @Body() updateCarDto: UpdateCarDto) {
		const car = this.carsService.update(id, updateCarDto);
		return {
			status: "success",
			method: "PATCH",
			data: { car },
		};
	}

	@Delete(":id")
	deleteCar(@Param("id", ParseUUIDPipe) id: string) {
		this.carsService.delete(id);
		return {
			status: "success",
			method: "DELETE",
			data: {},
		};
	}
}
