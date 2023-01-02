import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	ParseUUIDPipe,
} from "@nestjs/common";
import { BrandsService } from "./brands.service";
import { CreateBrandDto } from "./dto/create-brand.dto";
import { UpdateBrandDto } from "./dto/update-brand.dto";

@Controller("brands")
export class BrandsController {
	constructor(private readonly brandsService: BrandsService) {}

	@Post()
	create(@Body() createBrandDto: CreateBrandDto) {
		const brand = this.brandsService.create(createBrandDto);
		return {
			status: "success",
			method: "POST",
			data: { brand },
		};
	}

	@Get()
	findAll() {
		const brands = this.brandsService.findAll();
		return {
			status: "success",
			count: brands.length,
			method: "GET",
			data: { brands },
		};
	}

	@Get(":id")
	findOne(@Param("id", ParseUUIDPipe) id: string) {
		const brand = this.brandsService.findOne(id);
		return { status: "success", method: "GET", data: { brand } };
	}

	@Patch(":id")
	update(
		@Param("id", ParseUUIDPipe) id: string,
		@Body() updateBrandDto: UpdateBrandDto
	) {
		const brand = this.brandsService.update(id, updateBrandDto);
		return {
			status: "success",
			method: "PATCH",
			data: { brand },
		};
	}

	@Delete(":id")
	remove(@Param("id", ParseUUIDPipe) id: string) {
		this.brandsService.remove(id);
		return { status: "success", method: "DELETE", data: {} };
	}
}
