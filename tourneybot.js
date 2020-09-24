const client_id = 758766654531305593;
const secret = 'BDqsSDbhMVx7zR433kt7bNlKeCVPFc3A';

const Discord = require('discord.js');
const fs = require('fs');


const client = new Discord.Client();

client.on('ready', () => {
	console.log("Bot online!!!");
});

client.on('message', message => {
	let msg_content = message.content.split(" ");
	if (msg_content[0].toLowerCase() === '/t' || msg_content[0].toLowerCase() === '/tourney') {
		if (msg_content[1] === undefined) {
			message.channel.send("Error, second argument is expected lol noob learn how this works.");
			msg_content[1] = '';
		}
		if (msg_content[1].toLowerCase() === "register") {
			fs.readFile('data.json', (err, data) => {
				if (err) {
					message.channel.send("Error!");
				} else {
					let stuff = JSON.parse(data);
					let numberof = stuff.participants.length + 1;
					console.log(numberof);
					let stuff1 = message.member.displayName;
					stuff.participants.push(stuff1);
					let final = JSON.stringify(stuff);
					fs.writeFileSync('data.json', final);
					message.channel.send("AYYY, YOU'RE REGISTERED FOR THE TOURNEY!! GL participant #" + stuff.participants.length + "!!!!");
				}
			});
		} else if (msg_content[1].toLowerCase() === "unregister") {
			fs.readFile('data.json', (err, data) => {
				if (err) {
					message.channel.send("Error!");
				} else {
					let stuff = JSON.parse(data);
					
					let middle = [];
					stuff.participants.forEach(item => {
						if (item !== message.member.displayName) {
							middle.push(item);
						}
					});
					stuff.participants = middle;
					let final = JSON.stringify(stuff);
					message.channel.send("HOPE YOU JOIN BACK SOON! NOW WE HAVE: " + middle.length + " PARTICIPANTS!!!!");
					fs.writeFileSync('data.json', final);
					
				}
			});
		} else if (msg_content[1].toLowerCase() === "list") {
			fs.readFile('data.json', (err, data) => {
				if (err) {
					message.channel.send("Error!");

				} else {
					let stuff = JSON.parse(data);

					const exampleEmbed = new Discord.RichEmbed()
							.setColor('#0099ff')
							.setTitle('Tourney Participants!')
							.setAuthor('TryHqrdTournies')
							.setDescription(``).setFooter('Made by: Aayush Mitra aka Hachiman');
					stuff.participants.forEach(item => {
						exampleEmbed.addField('Participant: ', `${item}`)
					});
							
							
							
							
					message.channel.send(exampleEmbed);
				}
			});
		} 
	}
});

client.login('NzU4NzY2NjU0NTMxMzA1NTkz.X2zugw.Py1B1uR9C4m2cX4bT2Ecvv9OV3E');