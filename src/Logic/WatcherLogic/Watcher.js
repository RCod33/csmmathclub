import chokidar from 'chokidar';
import { spawn } from 'child_process';

let parserRunning = false;

const watcher = chokidar.watch('src/MathClubProblems', {
   persistent: true,
   ignoreInitial: false,
   usePolling: true,
   interval: 100,
   cwd: '.',
   disableGlobbing: false,
   ignored: /(^|[/\\])\../,
   awaitWriteFinish: {
      stabilityThreshold: 500,
      pollInterval: 100,
   },
});

watcher.on('ready', () => {
   console.log('Watcher is ready ✅');
});

watcher.on('all', ( ) => {
   if (!parserRunning) {
      parserRunning = true;
      const pythonProcess = spawn('python', ['src/Logic/ParserLogic/ParserCaller.py'], {
      stdio: 'inherit',
      });

      pythonProcess.on('exit', () => {
      parserRunning = false;
      });
   }
});
