var fs = require('fs')

exports.createJfolder = (path, name) => {
  if(name) {
    path += name
  }
  try{
      fs.mkdirSync(path)
  } catch(err) {
    throw err
  }
}
