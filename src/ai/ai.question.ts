import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'AI Confirm' })
export class AIConfirmQuestion {
  @Question({
    type: 'confirm',
    name: 'toBeRuned',
    message: 'Is this for run?',
    default: false,
  })
  parseToBeRuned(val: boolean) {
    return val;
  }
}

@QuestionSet({ name: 'AI Description' })
export class AIDescriptionQuestion {
  @Question({
    type: 'input',
    name: 'description',
    message: 'What is the command you want to run?',
    default: 'Please print out a line that says hello world!',
  })
  parseDescription(val: string) {
    return val;
  }
}
