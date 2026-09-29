module.exports = {
  run: [{
    method: "shell.run",
    params: {
      message: "git pull"
    }
  }, {
    method: "shell.run",
    params: {
      path: "app",
      message: "git pull"
    }
  }, {
    // Intentionally targets Pinokio's shared base environment: pins click so its `hf` CLI, used by hf.download, works
    method: "shell.run",
    params: {
      message: "uv pip install click==8.3.1"
    }
  }, {
    when: "{{!(platform === 'linux' && arch === 'x64')}}",
    method: "shell.run",
    params: {
      conda: "{{platform === 'linux' && arch === 'x64' ? null : 'conda_env'}}",
      path: "app",
      message: "conda install -y -c conda-forge pynini=2.1.7"
    }
  }, {
    method: "shell.run",
    params: {
      venv: "{{platform === 'linux' && arch === 'x64' ? 'env' : null}}",
      conda: "{{platform === 'linux' && arch === 'x64' ? null : 'conda_env'}}",
      path: "app",
      message: "uv pip install -e \".[gradio]\""
    }
  }, {
    method: "hf.download",
    params: {
      path: "app",
      _: ["tencent/AuK"],
      "local-dir": "ckpts/AuK"
    }
  }, {
    method: "hf.download",
    params: {
      path: "app",
      _: ["tencent/AuK-Flash"],
      "local-dir": "ckpts/AuK-Flash"
    }
  }, {
    method: "hf.download",
    params: {
      path: "app",
      _: ["Qwen/Qwen2.5-Omni-3B"],
      "local-dir": "ckpts/Qwen2.5-Omni-3B"
    }
  }]
}
