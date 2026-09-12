# AuK by Tencent for Pinokio

This launcher installs and runs [Tencent AuK](https://github.com/Tencent-Hunyuan/AuK) locally. AuK provides speech generation, content and acoustic editing, paralinguistic editing, speech enhancement, and source separation through natural-language instructions.

The installation downloads AuK Base, AuK-Flash, and the shared Qwen2.5-Omni-3B encoder. These models require substantial disk space. An NVIDIA GPU is strongly recommended; CPU inference is available upstream but is significantly slower.

## Use

1. Open the launcher in Pinokio.
2. Click **Install** and wait for the application, Python environment, and all three model repositories to download.
3. Choose a launch mode:
   - **Start Base + Flash** exposes both variants through the model selector in the Web UI.
   - **Start Base only** loads only the higher-quality Base variant.
   - **Start Flash only** loads only the faster four-step Flash variant.
4. Open **Web UI** when it appears.
5. Enter an instruction and optionally provide source or reference audio.

Models load lazily on first use. When Prompt Enhancer is disabled, set a duration greater than zero. Prompt Enhancer requires OpenAI-compatible `LLM_API_KEY`, `LLM_BASE_URL`, and `LLM_MODEL_NAME` environment variables; the rest of the interface works without them.

## Command-line API

After installation, run commands inside `app/conda_env` on Windows or `app/env` on macOS/Linux from the `app` directory. For example:

```bash
auk-infer --instruction "Generate a calm voice saying: Hello from AuK." --output output.wav --gen_seconds 4
```

Use the Flash checkpoint by adding:

```bash
--ckpt ckpts/AuK-Flash/auk_flash.safetensors
```

## Gradio API

Use the URL shown by Pinokio in place of `http://127.0.0.1:7860`. Call `Client.view_api()` or open `/gradio_api/info` to inspect the schema exposed by the installed AuK revision.

### Python

```python
from gradio_client import Client

client = Client("http://127.0.0.1:7860")
result = client.predict(
    False,
    "AuK (Base)",
    None,
    "Generate a calm voice saying: Hello from AuK.",
    4,
    "",
    "",
    32,
    2.0,
    42,
    api_name="/run_generate_with_pe",
)
print(result)
```

### JavaScript

```javascript
const baseUrl = "http://127.0.0.1:7860"
const response = await fetch(`${baseUrl}/gradio_api/call/run_generate_with_pe`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    data: [false, "AuK (Base)", null, "Generate a calm voice saying: Hello from AuK.", 4, "", "", 32, 2.0, 42]
  })
})
const { event_id } = await response.json()
const result = await fetch(`${baseUrl}/gradio_api/call/run_generate_with_pe/${event_id}`)
console.log(await result.text())
```

### Curl

```bash
curl -X POST http://127.0.0.1:7860/gradio_api/call/run_generate_with_pe \
  -H "Content-Type: application/json" \
  -d '{"data":[false,"AuK (Base)",null,"Generate a calm voice saying: Hello from AuK.",4,"","",32,2.0,42]}'
```

The response contains an event ID. Read the result stream with:

```bash
curl -N http://127.0.0.1:7860/gradio_api/call/run_generate_with_pe/EVENT_ID
```
