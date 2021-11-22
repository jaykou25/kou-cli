const program = require("commander");

const fs = require("fs").promises;
const path = require("path");

const utils = require("./utils");
const generateCols = require("../template/columns");
const generatePage = require("../template/index");
const generatePageNoModal = require("../template/indexNoModal");

module.exports = generate = ({
  noInput = false,
  noModal = false,
  noCol = false,
  onlyCol = false,
}) => {
  // 根据输入的内容确定路径或者文件名
  const input = program.args[1];

  let folderName;
  let targetPath;

  if (input.includes("/")) {
    // 如果输入的是路径, 路径的最后位就是类名
    targetPath = path.join(process.cwd(), "pages", input);

    const arr = input.split("/");
    const last = arr[arr.length - 1];
    folderName = last;
  } else {
    folderName = utils.toFolderName(input);
    targetPath = path.join(process.cwd(), "src/pages", folderName);
  }

  fs.mkdir(targetPath, { recursive: true }).then((res) => {
    fs.writeFile(
      path.join(targetPath, "index.tsx"),
      noModal
        ? generatePageNoModal(utils.toClassName(folderName))
        : generatePage(utils.toClassName(folderName))
    ).then(() => {
      console.log("创建文件", path.join(targetPath, "index.tsx"));
      console.log("");

      if (noCol) {
        return;
      }

      if (noInput) {
        fs.writeFile(path.join(targetPath, "columns.tsx"), generateCols([]));
        console.log("创建文件", path.join(targetPath, "columns.tsx"));
        return;
      }

      const inquirer = require("inquirer");
      inquirer
        .prompt([
          {
            type: "editor",
            message:
              "在文本编辑器中粘贴进swagger参数, 共五列, 参数名称, 说明, in, 是否必须, 类型",
            name: "params",
          },
        ])
        .then((answer) => {
          const rows = answer.params.split("\r\n").filter((n) => !!n);
          console.log("rows", rows);

          const cols = rows.map((row) => {
            const arr = row.split("\t").filter((n) => !!n);
            return {
              dataIndex: arr[0],
              title: arr[1],
              isRequired: arr[3],
              type: arr[4],
            };
          });

          fs.writeFile(
            path.join(targetPath, "columns.tsx"),
            generateCols(cols)
          );
          console.log("创建文件", path.join(targetPath, "columns.tsx"));
        });
    });
  });
};
