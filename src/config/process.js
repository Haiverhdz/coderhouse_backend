import { Command } from "commander";

const program = new Command();
program
  .option("--port <port>", "Puerto de la app", 3000)
  .option("--mode, -m <mode>", "Entorno de la app", "development")
  .option("--help, -h <help>", "Ayuda", "ESTA ES LA AYUDA DE LA APLICACION");

program.parse();

export default program;