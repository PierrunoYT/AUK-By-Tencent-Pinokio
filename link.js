module.exports = {
  run: [
    {
      method: "fs.link",
      params: {
        venv: "{{platform === 'win32' ? 'app/conda_env' : 'app/env'}}"
      }
    }
  ]
}
