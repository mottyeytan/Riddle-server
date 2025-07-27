
import chalk from 'chalk';
import { signUpApi, loginApi } from '../api/auth.js';
import { userOption } from '../utils/userInputs.js';


export async function MainLoginMenu() {
    console.clear();
    console.log(`
${chalk.green.bold('welcome to the riddle game')}
${chalk.green.bold('--------------------------------')}
${chalk.blue('1. signup')}
${chalk.blue('2. login')}
${chalk.blue('3. admin signup (with special password)')}
${chalk.blue('4. guest login')}
${chalk.blue('5. exit')}
${chalk.green.bold('--------------------------------')}
        `);
    const option = await userOption();
    switch(option){
        case '1':
            await signupMenu();
            break;
        case '2':
            await loginMenu();
            break;
        case '3':
            await adminSignupMenu();
            break;
        case '4':
            await guestLoginMenu();
            break;
        case '5':
            console.log(chalk.green.bold('--------------------------------'))
            console.log(chalk.red('exiting...'))
            console.log(chalk.green.bold('--------------------------------'))
            process.exit(0);
            break;
    }
}


async function signupMenu(){
    console.log(chalk.green.bold('--------------------------------'))
    let name = await userOption("enter your name: ");
    let password = await userOption("enter your password: ");
    const data = await signUpApi(name, password);
    while(data.loggedIn === false){
        const data = await signUpApi(name, password);
        if (data.loggedIn !== false){
            break;
        }
        console.log(chalk.gray("--------------------------------"))
        console.log(chalk.red('name already exists, please choose another name'));
        console.log(chalk.gray("--------------------------------"))
        name = await userOption("enter your name: ");
        password = await userOption("enter your password: ");
    }   
}

async function loginMenu(){
    console.log(chalk.green.bold('--------------------------------'))
    let name = await userOption("enter your name: ");
    let password = await userOption("enter your password: ");
    const data =  await loginApi(name, password)

    while(data.loggedIn === false){
        const data =  await loginApi(name, password)
        if (data.loggedIn !== false){
            break;
        }
        console.log(chalk.red('wrong name or password'));
        name = await userOption("enter your name: ");
        password = await userOption("enter your password: ");
    }
}

async function adminSignupMenu(){
    console.log(chalk.green.bold('--------------------------------'))
    const code = await userOption("enter your password(special password): ");
    const specialPassword = '1234';
    while(code !== specialPassword){
        console.log(chalk.red('wrong password'));
        code = await userOption("enter your password(special password): ");
    }
    const name = await userOption("enter your name: ");
    const password = await userOption("enter your password: ");
    const data = await signUpApi(name, password, 'admin');
    console.log(data);
}

async function guestLoginMenu(){
    console.log(chalk.green.bold('--------------------------------'))
    const name = await userOption("enter your name: ");
    await signUpApi(name, null, 'guest');
}







