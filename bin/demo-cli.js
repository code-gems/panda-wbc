#! /usr/bin/env node

const { Command } = require('commander');
const inquirer = require('inquirer');
const child_process = require('child_process');
const { spawn } = require('child_process');


const runScript = () => {
	spawn('pnpm', ['run', 'design'], {
		stdio: 'inherit',
		shell: true
	});
};

runScript();

const questions = [
	{
		type: 'list',
		name: 'devMode',
		message: "Do you want to start component development?",
		default: "No",
		choices: ["No", "Yes"],
	},
	{
		type: 'list',
		name: 'watchRepo',
		message: 'Which component do you want to work on?',
		choices: [
			"panda-icon",
			"panda-flag",
			"panda-date-picker",
		],
		when: (answers) => answers.devMode === 'Yes'
	},
	{
		type: 'confirm',
		name: 'askAgain',
		message: 'Do you want to enter more information?',
		default: false
	}
];

function promptUser() {
	inquirer
		.prompt(questions)
		.then(answers => {
			console.log(answers);
			if (answers.askAgain) {
				promptUser();
			}
		});
}

promptUser();