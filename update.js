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
    when: "{{platform === 'win32'}}",
    method: "shell.run",
    params: {
      conda: "conda_env",
      path: "app",
      message: "conda install -y -c conda-forge pynini=2.1.7"
    }
  }, {
    method: "shell.run",
    params: {
      venv: "{{platform === 'win32' ? null : 'env'}}",
      conda: "{{platform === 'win32' ? 'conda_env' : null}}",
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
