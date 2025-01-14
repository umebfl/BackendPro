import { BootstrapModule } from './bootstrap/bootstrap.module';
import { SwaggerConfigModule } from './swagger/swagger.module';

async function bootstrap() {
  const app = await BootstrapModule.createApp();
  SwaggerConfigModule.setup(app);
  await app.listen(process.env.PORT || 7000);
}
bootstrap();
