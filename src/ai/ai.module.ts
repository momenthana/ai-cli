import { Module } from '@nestjs/common';
import { AICommand } from './ai.command';
import { AIConfirmQuestion, AIDescriptionQuestion } from './ai.question';

@Module({
  providers: [AICommand, AIConfirmQuestion, AIDescriptionQuestion],
})
export class AIModule {}
