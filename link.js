module.exports = {
  run: [
    {
      method: "fs.link",
      params: {
        venv: "{{platform === 'linux' && arch === 'x64' ? 'app/env' : 'app/conda_env'}}"
      }
    }
  ]
}
