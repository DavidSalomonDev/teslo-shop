import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function main() {
	const app = await NestFactory.create(AppModule);
	await app.setGlobalPrefix("api/v1");
	await app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
		})
	);
	await app.listen(3000);
}
main();
