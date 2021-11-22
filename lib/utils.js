module.exports = {
  // 文件名首字母小写
  toFolderName(name) {
    return name[0].toLowerCase() + name.substring(1);
  },

  // 类名(组件名)首字线大写
  toClassName(name) {
    return name[0].toUpperCase() + name.substring(1);
  },
};
