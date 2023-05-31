import { CommandFactory } from 'nest-commander';
import { AIModule } from './ai/ai.module';

async function bootstrap() {
  await CommandFactory.run(AIModule);
}
bootstrap();
