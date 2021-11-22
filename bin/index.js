#!/usr/bin/env node

const program = require("commander");
program
  .version(`version ${require("../package.json").version}`)
  .option("-v, --version");

program
  .command("g <pathOrName>")
  .option("-ni, --noInput")
  .option("-nm, --noModal")
  .option("-nc, --noCol")
  .action((name, options) => {
    require("../lib/generate")({
      noInput: options.noInput,
      noCol: options.noCol,
      noModal: options.noModal,
    });
  })
  .command("col <pathOrName>")
  .option("-np, --noPrompt")
  .action((name, options) => {
    require("../lib/colOnly")({
      noInput: options.noPrompt,
    });
  });

program.parse(process.argv);
