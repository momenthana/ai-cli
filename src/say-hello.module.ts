import { Module } from '@nestjs/common';
import { Command, Option, CommandRunner } from 'nest-commander';

@Command({ name: 'Hello', options: { isDefault: true } })
export class HelloCommand extends CommandRunner {
  async run(
    _inputs: string[],
    options: { name: string; age: number },
  ): Promise<void> {
    if (options.age < 13) {
      console.log(`Hello ${options.name}, you're still rather young!`);
    } else if (12 < options.age && options.age < 50) {
      console.log(`Hello ${options.name}, you're in the prime of your life!`);
    } else {
      console.log(
        `Hello ${options.name}, getting up there in age, huh? Well, you're only as young as you feel!`,
      );
    }
  }

  @Option({ flags: '-n, --name <name>' })
  parseName(val: string) {
    console.log(val);
    return val;
  }

  @Option({ flags: '-a, --age <age>' })
  parseAge(val: string) {
    return Number.parseInt(val, 10);
  }
}

@Module({
  providers: [HelloCommand],
})
export class SayHelloModule {}
