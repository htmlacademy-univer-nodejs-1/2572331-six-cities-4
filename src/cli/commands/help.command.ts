import { Command } from './command.interface.js';
import chalk from 'chalk';

export class HelpCommand implements Command {
  public getName(): string {
    return '--help';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    const exampleCommand = chalk.rgb(0, 101, 255);
    const exampleArguments = chalk.cyan;
    const command = chalk.rgb(0, 162, 255);
    const commandArgument = chalk.rgb(255, 120, 0);
    const comment = chalk.magenta;

    console.info(`
        Программа для подготовки данных для REST API сервера.
        Пример:
            cli.js --<${exampleCommand('command')}> [${exampleArguments('--arguments')}]
        Команды:
            ${command('--version')}:                   ${comment('# выводит номер версии')}
            ${command('--help')}:                      ${comment('# печатает этот текст')}
            ${command('--import')} <${commandArgument('path')}>:             ${comment('# импортирует данные из TSV')}
            ${command('--generate')} <${commandArgument('n')}> <${commandArgument('path')}> <${commandArgument('url')}>  ${comment('# генерирует произвольное количество тестовых данных')}
    `);
  }
}
