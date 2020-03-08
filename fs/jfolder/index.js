var fs = require('fs')

exports.createJfolder = (path, name) => {
  var recur = false
  if(!name) {
    recur = true
  } else {
    path += name
  }
  try{
    fs.mkdirSync(path, {recursive: recur})
  } catch(err) {
    throw err
  }
}
