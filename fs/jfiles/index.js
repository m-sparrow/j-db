var fs = require('fs')

exports.createFile = (path, name, data) => {
  try {
    if(!fs.existsSync(path + name)) {
      fs.writeFileSync(path + name, data)
    } else {
      console.log('Already exist: ' + name)
    }
  } catch (err) {
    throw err
  }
}

exports.writeData = (path, name, data) => {
  try {
    fs.writeFileSync(path + name, data)
  } catch (err) {
    throw err
  }
}

exports.readData = (path) => {
  try {
    return JSON.parse(fs.readFileSync(path), 'utf8')
  } catch (err) {
    throw err
  }
}
