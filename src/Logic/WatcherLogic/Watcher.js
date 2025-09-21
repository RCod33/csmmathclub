import chokidar from "chokidar";
import { spawn } from "child_process";

let parserRunning = false;

const watcher = chokidar.watch("src/MathClubProblems", {
  persistent: true,
  ignoreInitial: false,
  usePolling: true,
  interval: 100,
  cwd: ".",
  disableGlobbing: false,
  ignored: /(^|[\\/])\../,
  awaitWriteFinish: {
    stabilityThreshold: 500,
    pollInterval: 100,
  },
});

watcher.on("ready", () => {
  console.log("Watcher is ready");
});

watcher.on("all", () => {
  if (parserRunning) {
    return;
  }

  parserRunning = true;
  const pythonProcess = spawn("python", ["src/Logic/ParserLogic/ParserCaller.py"], {
    stdio: "inherit",
  });

  const resetFlag = () => {
    parserRunning = false;
  };

  pythonProcess.on("exit", resetFlag);
  pythonProcess.on("error", (error) => {
    console.error("Problem parser failed to start:", error);
    resetFlag();
  });
});