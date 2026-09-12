module.exports = {
  run: [
    // Edit this step to customize the git repository to use
    {
      when: "{{!exists('app')}}",
      method: "shell.run",
      params: {
        message: [
          "git clone https://github.com/Tencent-Hunyuan/AuK app",
        ]
      }
    },
    {
      when: "{{!exists('app/env')}}",
      method: "shell.run",
      params: {
        path: "app",
        message: "uv venv --python 3.10 env"
      }
    },
    // Delete this step if your project does not use torch
    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          venv: "env",                // Edit this to customize the venv folder path
          path: "app",                // Edit this to customize the path to start the shell from
          // flashattention: true   // uncomment this line if your project requires flashattention
          // xformers: true   // uncomment this line if your project requires xformers
          // triton: true   // uncomment this line if your project requires triton
          // sageattention: true   // uncomment this line if your project requires sageattention
        }
      }
    },
    // Edit this step with your custom install commands
    {
      method: "shell.run",
      params: {
        venv: "env",                // Edit this to customize the venv folder path
        path: "app",                // Edit this to customize the path to start the shell from
        message: [
          "uv pip install -e \".[gradio]\""
        ]
      }
    },
    {
      method: "hf.download",
      params: {
        path: "app",
        _: ["tencent/AuK"],
        "local-dir": "ckpts/AuK"
      }
    },
    {
      method: "hf.download",
      params: {
        path: "app",
        _: ["tencent/AuK-Flash"],
        "local-dir": "ckpts/AuK-Flash"
      }
    },
    {
      method: "hf.download",
      params: {
        path: "app",
        _: ["Qwen/Qwen2.5-Omni-3B"],
        "local-dir": "ckpts/Qwen2.5-Omni-3B"
      }
    }
  ]
}
