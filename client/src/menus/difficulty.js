import chalk from 'chalk';

export function difficultyMenu(){
    console.log(`
${chalk.blue.bold('----------------')}
1. ${chalk.green('easy')}
2. ${chalk.blue('medium')}
3. ${chalk.red('hard')}
${chalk.blue.bold('----------------')}
    `)
}

difficultyMenu();