import chalk from 'chalk';

export function mainMenu(){
    console.log(`
${chalk.blue.bold('welcome to the riddle game')}        
${chalk.blue.bold('--------------------------------')}
1. ${chalk.green('play')}
2. ${chalk.blue('create riddle')}
3. ${chalk.green('read all riddles')}
4. ${chalk.blue('update riddle')}
5. ${chalk.green('delete riddle')}
6. ${chalk.blue('show leaderboard')}
7. ${chalk.green('exit')}
${chalk.blue.bold('--------------------------------')}
             
        `)
}


mainMenu();