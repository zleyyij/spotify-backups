//obtaining various modules
import fs from 'fs';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import path from 'path';


//searching for all files of a certain type
function listJson() {
  
    let files = fs.readdirSync('./');
    let jsons = [];
    let excludedFiles = ['package-lock.json', 'package.json'];
    let result = [];
    for(var i = 0; i < files.length; i++){

   // files = files.match(/(.*)(.json)/g);
if(files[i].match(/(.*)(.json)/g)){
    jsons.push(files[i].match(/(.*)(.json)/g)[0]);
    }

}
for(var i = 0; i < excludedFiles.length; i++){
    for(var u = 0; u < jsons.length; u++){
    if(jsons[u] == excludedFiles[i]){
        jsons.splice(u, 1);

    }
    }

}

return jsons;

   
}

const rl = readline.createInterface({ input, output});



console.log(listJson().join('\n'));


let fileName = await rl.question('Please put a JSON generated using Spotify Backup(https://github.com/caseychu/spotify-backup) in this project directory.\n----------\n'+`Autodetected files:\n ${listJson().join('\n')}\n----------` + '\nWhat is the name of the json EG:songs.json? (Use no arguments for autodetected file)\n');
if(fileName == ''){
    fileName = listJson()[0];

}
if(!fs.existsSync(fileName)){
fileName = await rl.question('File not found, please try again:\n');

} 
let file = JSON.parse(fs.readFileSync(fileName), {encoding: 'utf-8'})
let playlist = await rl.question('File loaded, what playlist would you like exported?\n(l to list all playlists)\n');
if(playlist == 'l' || playlist == 'L'){
    let plNames = [];
    for(var i = 0; i < fileName.length; i++){
        plNames.push(file[i].name);

    }
playlist = await rl.question(plNames.join('\n') + '\nMake your selection:')

}
if(file.find(plName => plName.name == playlist)){
let exportStyle = await rl.question('Playlist found, how would you like your playlist exported? [file/console]:\n')
if(exportStyle == 'file' || exportStyle == 'console' || exportStyle == 'f' || exportStyle == 'c'){
switch(exportStyle){
    case 'f':
    case 'file':
    let exportFileName = await rl.question('What would you like to name the file(please include extension, EG: .txt):\n');
    let listOfSongs = []; 
        let plnm = file.find(playl => playl.name = playlist);
    for(var i = 0; i < plnm.tracks.length; i++){
        listOfSongs.push(plnm.tracks[i].track.name + ' - ' + plnm.tracks[i].track.album.artists[0].name);

    }
    try{
        fs.writeFileSync(exportFileName, listOfSongs.join('\n'));

    }catch{
        exportFileName = await rl.question('Invalid file name, try again:\n')

        fs.writeFileSync(exportFileName, listOfSongs.join('\n'));
    }
        console.log(`Exported Successfully to: ${exportFileName}`)
    break;
    case 'c':
    case 'console':
    
        let pl = file.find(playl => playl.name = playlist);
    for(var i = 0; i < pl.tracks.length; i++){
        console.log(pl.tracks[i].track.name + ' - ' + pl.tracks[i].track.album.artists[0].name);


    }

    break;

}
} else {

    exportStyle = await rl.question('Invalid option, options are: [file/console]:\n');

}

} else{

    let playlist = await rl.question("Unable to find playlist, please try again:\n");
}


rl.close();