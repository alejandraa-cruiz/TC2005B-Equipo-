#!/usr/bin/env node
import chalk from 'chalk';
import inquirer from 'inquirer';
import path from 'path';
import { existsSync } from 'fs';
import { readFile, writeFile } from 'fs/promises';
import 'dotenv/config';
import mysql from 'mysql2';

const projectDir = process.cwd();
const envTemplate = `ISSUER_BASE_URL=\nCLIENT_ID=\nBASE_URL=\nSECRET=\nDATABASE_USER=\nDATABASE_NAME=\nDATABASE_PASSWORD=\nDATABASE_PORT=\n`;
const notEnvFileMessage = chalk.red(`You don't have a .env file. We will create one in the correct directory. \nYou can get the environment variables for the project on:\n${chalk.bgCyan('https://docs.google.com/document/d/1hlApaC5fbsQCYkbQ6u3qfzW7x3dKWq0XdzwcEqB65YM/edit')}\n`);

const databaseUser = process.env.DATABASE_USER;
const databaseName = process.env.DATABASE_NAME;
const databasePassword = process.env.DATABASE_PASSWORD;
const databasePort = process.env.DATABASE_PORT;
const db = mysql.createPool({
    host: 'localhost',
    user: databaseUser,
    password: databasePassword,
    port: databasePort || 3306,
    multipleStatements: true
}).promise();
const dbResetQuery = `DROP DATABASE IF EXISTS ${databaseName};
                      CREATE DATABASE ${databaseName}; 
                      USE ${databaseName};`

/**
 * 
 * @returns {promise<boolean>} The status of the database name. true: taken, false: not taken
 */
const checkDatabase = async () => {
    try {
        const [rows] = await db.query('SELECT schema_name FROM information_schema.schemata WHERE schema_name = ?', [databaseName])
        return (rows[0])? true : false;

    } catch (err) {
        switch (err.code) {
            case 'ER_ACCESS_DENIED_ERROR':
                console.log(chalk.bgMagenta('Error: Database user name or password incorrect'));
                break;
            case 'ECONNREFUSED':
                console.log(chalk.bgMagenta('Error: The database service is not running or your port is incorrect'));
                break;
        }
        process.exit(1);
    }
}

/**
 * 
 * @param {Boolean} nameStatus 
 */
const resetDatabase = async (nameStatus) => {
    if(nameStatus) {
        const confirm = await inquirer.prompt({
            name: 'question',
            type: 'confirm',
            message: chalk.magenta(`The database ${databaseName} already exists do you really want to reset it? `),
        });
        if(!confirm.question) {
            process.exit(1);
        }
    }
    const query = await readFile(path.join(projectDir, 'src', 'sql', 'createDb.sql'), 'utf-8');

    try {
        await db.query(dbResetQuery + query);
        console.log(chalk.bgGreen.white('Success: the database was created successfully '));
    } catch (e){
        await db.query('DROP DATABASE IF EXISTS ?', [databaseName]);
        console.log(chalk.bgRed.white('Error: there is an error in your sql files '));
    }
}

/**
 * 
 * @param {Boolean} nameStatus 
 */
const createEmptyDatabase = async (nameStatus) => {
    if(nameStatus) {
        const confirm = await inquirer.prompt({
            name: 'question',
            type: 'confirm',
            message: chalk.magenta(`The database ${databaseName} already exists do you really want to reset it? `),
        });
        if(!confirm.question) {
            process.exit(1);
        }
    }
    const query = await readFile(path.join(projectDir, 'src', 'sql', 'createEmpty.sql'), 'utf-8');

    try {
        await db.query(dbResetQuery + query);
        console.log(chalk.bgGreen.white('Success: the database was created successfully '));
    } catch {
        await db.query('DROP DATABASE ?', [databaseName]);
        console.log(chalk.bgRed.white('Error: there is an error in your sql files '));
    }
}
const checkDotEnv = async () => {
    const envDir = path.join(projectDir, '.env');
    if(!existsSync(envDir)) {
        await inquirer.prompt({
            name: 'question_1',
            type: 'input',
            prefix: '',
            message: notEnvFileMessage
        });
        await writeFile(envDir, envTemplate);
        process.exit(1);
    }
    if(!(databaseUser && databaseName)) {
        const user = (!databaseUser)? chalk.bgMagenta(`Error: You don't have a database user name \n`): '';
        const dbname = (!databaseName)? chalk.bgMagenta(`Error: You don't have a database name \n`): '';
        console.log(user + dbname);
        process.exit(1);
    }
    const password = (!databasePassword)? chalk.bgGreen(`Note: Your password is empty \n`): '';
    const port = (!databasePort)? chalk.bgGreen(`Note: your port is empty, it will default to 3306 \n`): '';
    console.log(password + port);
}

const databaseOptions = async () => {
    const answers = await inquirer.prompt({
        name: 'question',
        type: 'list',
        message: 'Select what you want to do with your database: ',
        choices: [
            'Nothing',
            'Reset to the dummy data',
            'Create an empty database (just structure)'
        ]
    });
    switch (answers.question) {
        case 'Reset to the dummy data':
            await resetDatabase(await checkDatabase());
            break;
        case 'Create an empty database (just structure)':
            await createEmptyDatabase(await checkDatabase());
            break;
        case 'Nothing':
            break;
    }
}

process.on('exit', () => {
    console.log(chalk.greenBright('See you 😉'));
});

console.log(chalk.bgYellow.red('Hi 👋, this script will help you set up the project.'));

await inquirer.prompt({
    name: 'confirmEnter',
    type: 'input',
    prefix: '',
    message: chalk.cyan('Make shure you have a mysql/mariadb database process running and then hit enter \n')
});
await checkDotEnv();
await databaseOptions();
process.exit(0);
