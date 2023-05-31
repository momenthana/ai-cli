import {
  Command,
  Option,
  CommandRunner,
  InquirerService,
} from 'nest-commander';
import { AIOptions } from './ai.interface';
import { spawn } from 'child_process';

@Command({ name: 'AI', options: { isDefault: true } })
export class AICommand extends CommandRunner {
  constructor(private readonly inquirerService: InquirerService) {
    super();
  }

  async run(inputs: string[], options?: AIOptions): Promise<void> {
    if (inputs.length < 1) {
      options = await this.inquirerService.ask('AI Description', options);
    }

    const description = options.description ?? inputs.join(' ');

    const response = await fetch('https://ai.hana.ooo/api/cli', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: description }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    let lastMessage = '';

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);

      lastMessage = lastMessage + chunkValue;
    }

    console.log(`Command for "${description}"\n> ${lastMessage}`);

    if (!options.yes) {
      options = await this.inquirerService.ask('AI Confirm', options);
    }

    if (options.yes || options.toBeRuned) {
      const args = lastMessage.split(' ');
      const command = args.shift();

      spawn(command, args, {
        cwd: process.cwd(),
        detached: true,
        stdio: 'inherit',
      });
    }
  }

  @Option({ flags: '-y, --yes [boolean]' })
  parseYes(val: string) {
    return JSON.parse(val);
  }
}
