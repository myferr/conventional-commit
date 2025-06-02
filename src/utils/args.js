import { argv } from "process";

function getArgument(index) {
  return argv[index + 1];
}

export { getArgument };
